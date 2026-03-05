# GitHub Trending Report Skill

获取GitHub热门AI项目数据，生成简报并发送到飞书。

## Trigger

以下任一关键词触发：
- "github热门" / "GitHub趋势" / "热门AI项目"
- "查一下github" / "做一个简报"
- "生成word简报"

## Tool

- web_fetch: 获取GitHub API数据
- message: 发送飞书消息

## Steps

1. **获取数据**
   - 使用 web_fetch 调用 GitHub 公开API
   - URL: `https://api.github.com/search/repositories?q=topic:artificial-intelligence+created:>2024-01-01&sort=stars&order=desc&per_page=10`

2. **解析数据**
   - 提取项目名称、star数、fork数、描述、语言、链接

3. **生成简报**
   - 格式：Markdown
   - 包含：Top 10项目、技术洞察

4. **发送飞书**
   - 使用 message 工具发送到飞书
   - channel: feishu

## Output

飞书消息：包含GitHub热门AI项目简报

## Note

- 不需要RoxyBrowser
- 不需要GitHub Token
- 使用GitHub公开API
- 所有配置通过环境变量或配置文件管理