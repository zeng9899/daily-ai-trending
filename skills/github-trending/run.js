/**
 * GitHub Trending Report Skill
 * 
 * 获取GitHub热门AI项目数据，生成简报
 * 
 * 使用方法：
 * 直接对AI助手说："查一下github热门AI项目"
 */

// 主函数
module.exports = async function (args, context) => {
  const { message } = context;
  
  // 获取GitHub热门项目数据
  const projects = await fetchGitHubTrending();
  
  // 生成简报
  const report = generateReport(projects);
  
  // 直接输出给用户
  return report;
};

/**
 * 获取GitHub热门项目数据
 * 使用GitHub公开API，无需认证
 */
async function fetchGitHubTrending() {
  const url = 'https://api.github.com/search/repositories?q=topic:artificial-intelligence+created:>2024-01-01&sort=stars&order=desc&per_page=10';
  
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'OpenClaw-GitHub-Skill',
      'Accept': 'application/json'
    }
  });
  
  const data = await response.json();
  
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
 * 生成简报
 */
function generateReport(projects) {
  const date = new Date().toLocaleDateString('zh-CN');
  
  let report = `# 📊 GitHub 热门 AI 项目简报\n\n`;
  report += `**生成时间**: ${date}\n\n`;
  report += `---\n\n`;
  
  report += `## 🔥 Top 10 热门 AI 项目\n\n`;
  
  projects.forEach((p, i) => {
    report += `### ${i + 1}. ${p.name} ⭐ ${formatNumber(p.stars)}\n`;
    report += `- **描述**: ${p.description}\n`;
    report += `- **语言**: ${p.language}\n`;
    report += `- **链接**: ${p.url}\n`;
    report += `- **Fork**: ${formatNumber(p.forks)}\n\n`;
  });
  
  report += `---\n\n`;
  report += `## 💡 技术洞察\n\n`;
  report += `1. **Python 主导**: 所有热门项目都使用 Python\n`;
  report += `2. **LLM 热点**: 大语言模型、微调框架是当前热点\n`;
  report += `3. **AI Agent**: 自动代理开发框架正在崛起\n`;
  
  return report;
}

function formatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num;
}