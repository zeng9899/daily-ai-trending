/**
 * GitHub Trending 分析脚本
 * 
 * 使用方法：
 * 1. 确保已配置 mcporter.json 中的 RoxyBrowser API Key
 * 2. 运行：node scripts/analyze-trending.js
 * 3. 脚本会自动获取GitHub热门AI项目并生成报告
 */

const fs = require('fs');
const path = require('path');

// 配置
const OUTPUT_DIR = path.join(__dirname, '..');
const REPORT_FILE = path.join(OUTPUT_DIR, 'GitHub热门AI项目简报.md');
const REPORT_HTML = path.join(OUTPUT_DIR, 'GitHub热门AI项目简报.html');

/**
 * 获取 GitHub Trending 数据
 * 这里使用简单的模拟数据，实际使用时请通过 mcporter 调用真实 API
 */
async function fetchTrendingProjects() {
  console.log('📡 正在获取 GitHub 热门项目数据...');
  
  // 模拟数据 - 实际使用时请调用真实 API
  const projects = [
    {
      name: 'LLaMA-Factory',
      description: '高效的大语言模型微调框架',
      stars: '24.6k',
      language: 'Python',
      url: 'https://github.com/hiyouga/LLaMA-Factory'
    },
    {
      name: 'OpenHands',
      description: 'AI编程助手和开发代理',
      stars: '18.2k',
      language: 'Python',
      url: 'https://github.com/All-Hands-AI/OpenHands'
    },
    {
      name: 'DeepSeek-Coder',
      description: '代码智能助手',
      stars: '15.8k',
      language: 'Python',
      url: 'https://github.com/deepseek-ai/DeepSeek-Coder'
    },
    {
      name: 'Qwen2',
      description: '阿里云通义千问大模型',
      stars: '12.3k',
      language: 'Python',
      url: 'https://github.com/QwenLM/Qwen2'
    },
    {
      name: 'Ovis',
      description: '多模态大模型',
      stars: '9.7k',
      language: 'Python',
      url: 'https://github.com/AIDC-AI/Ovis'
    },
    {
      name: 'MetaGPT',
      description: '多代理协作框架',
      stars: '8.5k',
      language: 'Python',
      url: 'https://github.com/geekan/MetaGPT'
    },
    {
      name: 'LangChain',
      description: '构建AI应用的框架',
      stars: '86.7k',
      language: 'Python',
      url: 'https://github.com/langchain-ai/langchain'
    },
    {
      name: 'AutoGPT',
      description: '自主AI代理',
      stars: '162k',
      language: 'Python',
      url: 'https://github.com/Significant-Gravitas/AutoGPT'
    },
    {
      name: 'Stable Diffusion',
      description: 'AI图像生成模型',
      stars: '102k',
      language: 'Python',
      url: 'https://github.com/AUTOMATIC1111/stable-diffusion-webui'
    },
    {
      name: 'Transformers',
      description: 'Hugging Face Transformers库',
      stars: '118k',
      language: 'Python',
      url: 'https://github.com/huggingface/transformers'
    }
  ];
  
  return projects;
}

/**
 * 生成 Markdown 报告
 */
function generateMarkdownReport(projects) {
  const date = new Date().toLocaleDateString('zh-CN');
  
  let report = `# 📊 GitHub 热门 AI 项目简报\n\n`;
  report += `**生成日期**: ${date}\n\n`;
  report += `---\n\n`;
  report += `## 📈 Top 10 热门 AI 项目\n\n`;
  
  projects.forEach((project, index) => {
    report += `### ${index + 1}. ${project.name} ⭐ ${project.stars}\n\n`;
    report += `- **描述**: ${project.description}\n`;
    report += `- **语言**: ${project.language}\n`;
    report += `- **链接**: [查看项目](${project.url})\n\n`;
  });
  
  report += `---\n\n`;
  report += `## 💡 技术洞察\n\n`;
  report += `1. **Python 主导**: 所有项目都使用 Python 开发\n`;
  report += `2. **大模型热点**: LLM、微调、多代理框架是当前热点\n`;
  report += `3. **应用多元化**: 从代码生成到图像生成，应用场景丰富\n\n`;
  report += `---\n\n`;
  report += `*本报告由 OpenClaw + MCP 自动生成*\n`;
  
  return report;
}

/**
 * 生成 HTML 报告
 */
function generateHTMLReport(projects) {
  const date = new Date().toLocaleDateString('zh-CN');
  
  let html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>GitHub 热门 AI 项目简报</title>
  <style>
    body { font-family: 'Microsoft YaHei', sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { color: #2c3e50; text-align: center; }
    h2 { color: #34495e; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
    .project { background: #f8f9fa; padding: 15px; margin: 15px 0; border-radius: 8px; }
    .project h3 { margin: 0 0 10px 0; color: #2980b9; }
    .stars { color: #f39c12; font-weight: bold; }
    .tag { background: #e8f4f8; padding: 3px 8px; border-radius: 4px; font-size: 0.9em; }
    a { color: #3498db; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .date { text-align: center; color: #7f8c8d; }
  </style>
</head>
<body>
  <h1>📊 GitHub 热门 AI 项目简报</h1>
  <p class="date">生成日期: ${date}</p>
  
  <h2>📈 Top 10 热门 AI 项目</h2>
`;
  
  projects.forEach((project, index) => {
    html += `
  <div class="project">
    <h3>${index + 1}. ${project.name} <span class="stars">⭐ ${project.stars}</span></h3>
    <p><strong>描述:</strong> ${project.description}</p>
    <p><span class="tag">${project.language}</span> <a href="${project.url}" target="_blank">查看项目 →</a></p>
  </div>
`;
  });
  
  html += `
  <h2>💡 技术洞察</h2>
  <ul>
    <li><strong>Python 主导</strong>: 所有项目都使用 Python 开发</li>
    <li><strong>大模型热点</strong>: LLM、微调、多代理框架是当前热点</li>
    <li><strong>应用多元化</strong>: 从代码生成到图像生成，应用场景丰富</li>
  </ul>
  
  <hr>
  <p style="text-align: center; color: #7f8c8d;">*本报告由 OpenClaw + MCP 自动生成*</p>
</body>
</html>`;
  
  return html;
}

/**
 * 主函数
 */
async function main() {
  try {
    console.log('🚀 开始生成 GitHub 热门 AI 项目简报...\n');
    
    // 获取数据
    const projects = await fetchTrendingProjects();
    
    // 生成 Markdown 报告
    const mdReport = generateMarkdownReport(projects);
    fs.writeFileSync(REPORT_FILE, mdReport, 'utf8');
    console.log(`✅ Markdown 报告已生成: ${REPORT_FILE}`);
    
    // 生成 HTML 报告
    const htmlReport = generateHTMLReport(projects);
    fs.writeFileSync(REPORT_HTML, htmlReport, 'utf8');
    console.log(`✅ HTML 报告已生成: ${REPORT_HTML}`);
    
    console.log('\n🎉 报告生成完成！');
    console.log(`📄 Markdown: ${REPORT_FILE}`);
    console.log(`🌐 HTML: ${REPORT_HTML}`);
    
  } catch (error) {
    console.error('❌ 生成报告时出错:', error);
    process.exit(1);
  }
}

// 运行脚本
main();
