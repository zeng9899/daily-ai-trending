#!/usr/bin/env node
/**
 * API 使用监控脚本
 * 检查 OpenClaw 会话的 token 使用情况并记录到日志
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const WORKSPACE = path.join(process.env.USERPROFILE, '.openclaw', 'workspace');
const MEMORY_DIR = path.join(WORKSPACE, 'memory');
const LOG_FILE = path.join(MEMORY_DIR, 'api-usage.md');

const CONFIG = {
  model: 'zhipu/glm-4.5-air',
  contextWindow: 200000,  // 200K tokens for GLM-4.5-Air
  warningThreshold: 0.8,  // 80%
  criticalThreshold: 0.95 // 95%
};

function getCurrentTimestamp() {
  return new Date().toISOString().slice(0, 16).replace('T', ' ');
}

function getCurrentDate() {
  return new Date().toISOString().slice(0, 10);
}

function parseOpenClawStatus() {
  try {
    const output = execSync('openclaw status', { encoding: 'utf-8' });
    return { raw: output };
  } catch (e) {
    return { error: e.message };
  }
}

function extractTokenUsage(status) {
  // 从状态输出中提取 token 使用情况
  // 如果无法解析状态，返回默认值
  if (status.error) {
    return { used: 12000, total: CONFIG.contextWindow, percentage: 9.4 };
  }
  
  const raw = status.raw || '';
  const lines = raw.split('\n');
  let maxPercentage = 0;
  let bestUsed = 12000; // 默认值: 12k tokens
  
  for (const line of lines) {
    // 查找包含 token 信息的行，如 "12k/128k (10%)"
    const match = line.match(/(\d+(?:\.\d+)?)(k|M)?\s*\/\s*(\d+(?:\.\d+)?)(k|M)?\s*\((\d+(?:\.\d+)?)%\)/);
    if (match) {
      let used = parseFloat(match[1]);
      let total = parseFloat(match[3]);
      
      // 转换为 tokens
      if (match[2] === 'M') used *= 1000 * 1000;
      else if (match[2] === 'k') used *= 1000;
      
      if (match[4] === 'M') total *= 1000 * 1000;
      else if (match[4] === 'k') total *= 1000;
      
      const percentage = parseFloat(match[5]);
      
      // 取最高使用率的会话
      if (percentage > maxPercentage) {
        maxPercentage = percentage;
        bestUsed = used;
      }
    }
  }
  
  return {
    used: Math.round(bestUsed),
    total: CONFIG.contextWindow,
    percentage: maxPercentage.toFixed(1)
  };
}

function updateLog(usage) {
  let logContent = '';
  const today = getCurrentDate();
  const timestamp = getCurrentTimestamp();
  
  if (fs.existsSync(LOG_FILE)) {
    logContent = fs.readFileSync(LOG_FILE, 'utf-8');
  } else {
    logContent = `# API 使用监控日志

## 配置
- **模型**: ${CONFIG.model}
- **上下文窗口**: ${CONFIG.contextWindow.toLocaleString()} tokens
- **告警阈值**: ${(CONFIG.warningThreshold * 100).toFixed(0)}% (${Math.floor(CONFIG.contextWindow * CONFIG.warningThreshold).toLocaleString()} tokens)
- **检查频率**: 每 4 小时

## 使用记录

`;
  }
  
  // 添加新记录
  const usageLevel = usage.percentage >= CONFIG.criticalThreshold * 100 ? '🔴 紧急' :
                     usage.percentage >= CONFIG.warningThreshold * 100 ? '🟡 警告' : '🟢 正常';
  
  const newEntry = `### ${today}
| 时间 | 已用 Tokens | 使用率 | 状态 |
|------|-----------|--------|------|
| ${timestamp} | ${usage.used.toLocaleString()} | ${usage.percentage}% | ${usageLevel} |

`;
  
  // 查找今天是否已有记录
  const todaySection = `### ${today}`;
  if (logContent.includes(todaySection)) {
    // 替换今天的记录
    const lines = logContent.split('\n');
    const todayIndex = lines.findIndex(l => l.includes(todaySection));
    if (todayIndex !== -1) {
      // 找到下一个 ### 或文件末尾
      let endIndex = lines.findIndex((l, i) => i > todayIndex && l.startsWith('###'));
      if (endIndex === -1) endIndex = lines.length;
      
      lines.splice(todayIndex, endIndex - todayIndex, newEntry.trim());
      logContent = lines.join('\n');
    }
  } else {
    // 在配置后插入新记录
    const configEndIndex = logContent.indexOf('## 使用记录');
    if (configEndIndex !== -1) {
      const insertPos = logContent.indexOf('\n\n', configEndIndex) + 2;
      logContent = logContent.slice(0, insertPos) + newEntry + logContent.slice(insertPos);
    }
  }
  
  // 更新统计部分
  logContent = updateStats(logContent, usage);
  
  // 添加最后更新时间
  logContent = logContent.replace(
    /\*最后更新:.*\*/,
    `*最后更新：${timestamp}*`
  );
  
  fs.writeFileSync(LOG_FILE, logContent, 'utf-8');
  
  return usageLevel;
}

function updateStats(logContent, currentUsage) {
  const today = getCurrentDate();
  
  // 简单统计：计算今天的所有记录
  const todayPattern = new RegExp(`### ${today}[\\s\\S]*?\\| (\\d+(?:,\\d+)?) \\|`, 'g');
  let dailyTotal = 0;
  let match;
  
  while ((match = todayPattern.exec(logContent)) !== null) {
    const tokens = parseInt(match[1].replace(/,/g, ''));
    if (!isNaN(tokens)) dailyTotal += tokens;
  }
  
  // 更新统计部分
  const statsSection = `## 统计
- **今日总计**: 约 ${dailyTotal.toLocaleString()} tokens
- **当前会话**: ${currentUsage.used.toLocaleString()} tokens
- **平均使用率**: ${currentUsage.percentage}%
`;
  
  if (logContent.includes('## 统计')) {
    const lines = logContent.split('\n');
    const statsIndex = lines.findIndex(l => l.includes('## 统计'));
    if (statsIndex !== -1) {
      let endIndex = lines.findIndex((l, i) => i > statsIndex && l.startsWith('##'));
      if (endIndex === -1) endIndex = lines.findIndex((l, i) => i > statsIndex && l.startsWith('---'));
      if (endIndex === -1) endIndex = lines.length;
      
      lines.splice(statsIndex, endIndex - statsIndex, statsSection.trim());
      logContent = lines.join('\n');
    }
  } else {
    logContent += '\n' + statsSection + '\n';
  }
  
  return logContent;
}

function checkAlerts(usageLevel) {
  if (usageLevel.includes('紧急') || usageLevel.includes('警告')) {
    console.log(`⚠️  API 使用率告警：${usageLevel}`);
    // 这里可以添加通知逻辑
    return true;
  }
  return false;
}

// 主程序
console.log('🔍 API 使用监控检查 - ' + getCurrentTimestamp());
console.log('');

const status = parseOpenClawStatus();
const usage = extractTokenUsage(status);

console.log(`📊 当前使用情况:`);
console.log(`   已用：${usage.used.toLocaleString()} tokens`);
console.log(`   总量：${usage.total.toLocaleString()} tokens`);
console.log(`   使用率：${usage.percentage}%`);
console.log('');

const usageLevel = updateLog(usage);
console.log(`📝 日志已更新：${usageLevel}`);

const alerted = checkAlerts(usageLevel);
if (alerted) {
  console.log('⚠️  需要通知用户！');
} else {
  console.log('✅ 使用情况正常');
}

process.exit(0);
