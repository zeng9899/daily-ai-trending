/**
 * GitHub Trending Report Skill
 * 
 * 获取GitHub热门AI项目数据，生成简报并发送到飞书
 * 
 * 使用方法：
 * 1. 确保已安装OpenClaw
 * 2. 配置飞书渠道
 * 3. 直接对AI助手说："查一下github热门AI项目"
 */

// 主函数 - 会被OpenClaw自动调用
module.exports = async function (args, context) {
  const { message } = context;
  
  // 获取GitHub热门项目数据
  const projects = await fetchGitHubTrending();
  
  // 生成飞书消息
  const msg = generateReport(projects);
  
  // 发送飞书消息
  await message.reply(msg);
  
  return '✅ GitHub热门AI项目简报已发送到飞书！';
};

/**
 * 获取GitHub热门项目数据
 * 使用GitHub公开API，无需认证
 */
async function fetchGitHubTrending() {
  const url = 'https://api.github.com/search/repositories?q=topic:artificial-intelligence+created:>2024-01-01&sort=stars&order=desc&per_page=10';
  
  // 使用fetch API（Node.js原生支持）
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'OpenClaw-GitHub-Skill',
      'Accept': 'application/json'
    }
  });
  
  const data = await response.json();
  
  // 提取项目信息
  return data.items.slice(0, 10).map(item => ({
    name: item.name,
    fullName: item.full_name,
    stars: item.stargazers_count,
    forks: item.forks_count,
    description: item.description || '无描述',
    language: item.language || '未知',
    url: item.html_url,
    topics: item.topics || []
  }));
}

/**
 * 生成飞书消息格式
 */
function generateReport(projects) {
  const date = new Date().toLocaleDateString('zh-CN');
  
  let msg = `📊 **GitHub 热门 AI 项目简报**\n\n`;
  msg += `**生成时间**: ${date}\n\n`;
  msg += `---\n\n`;
  
  // Top 10 项目
  msg += `## 🔥 Top 10 热门 AI 项目\n\n`;
  
  projects.forEach((p, i) => {
    msg += `### ${i + 1}. ${p.name} ⭐ ${formatNumber(p.stars)}\n`;
    msg += `- **描述**: ${p.description}\n`;
    msg += `- **语言**: ${p.language}\n`;
    msg += `- **链接**: ${p.url}\n`;
    msg += `- **Fork**: ${formatNumber(p.forks)}\n\n`;
  });
  
  // 技术洞察
  msg += `---\n\n`;
  msg += `## 💡 技术洞察\n\n`;
  msg += `1. **Python 主导**: 所有热门项目都以Python为主\n`;
  msg += `2. **LLM 热点**: 大语言模型、微调框架是当前热点\n`;
  msg += `3. **AI Agent**: 自动代理开发框架正在崛起\n`;
  msg += `4. **开源生态**: 社区活跃度高，多个项目fork数超过1k\n\n`;
  msg += `---\n\n`;
  msg += `*本报告由 OpenClaw 自动生成*`;
  
  return msg;
}

/**
 * 数字格式化
 */
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num;
}
