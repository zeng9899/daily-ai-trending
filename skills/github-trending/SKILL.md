# GitHub Trending Skill

获取GitHub热门AI项目数据，生成简报。

## Trigger

- "github热门" / "GitHub趋势" / "热门AI项目"
- "查一下github" / "做一个简报"

## Tool

- web_fetch: 获取GitHub API数据

## Steps

1. **获取数据**
   - 使用 web_fetch 调用 GitHub 公开API
   - URL: `https://api.github.com/search/repositories?q=topic:artificial-intelligence+created:>2024-01-01&sort=stars&order=desc&per_page=10`

2. **解析数据**
   - 提取项目名称、star数、fork数、描述、语言、链接

3. **生成简报**
   - 格式：Markdown
   - 包含：Top 10项目、技术栈分析、趋势洞察
   - 输出给用户

## Output

GitHub热门AI项目简报（Markdown格式）

## Note

- 不需要RoxyBrowser
- 不需要GitHub Token
- 使用GitHub公开API
- 免费且无需认证