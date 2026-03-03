# OpenClaw + MCP 智能助手配置

## 📋 项目简介

本项目是一个基于 OpenClaw 框架和 Model Context Protocol (MCP) 的智能助手系统，通过优化的API配置和MCP服务器集成，实现了无需翻墙、无需GitHub Token即可进行GitHub数据分析和智能报告生成的功能。

## ✨ 核心特性

### 🚀 优化配置
- **经济高效的模型**: 使用 GLM-4.5-Air 替代千问，大幅降低API成本
- **MCP服务器集成**: 通过 mcporter 实现RoxyBrowser浏览器自动化
- **零依赖访问**: 无需传统翻墙工具和GitHub Token即可获取数据

### 🎯 智能功能
- **GitHub热门项目分析**: 自动获取GitHub今日热门AI项目
- **智能报告生成**: 生成结构化的Word/HTML格式简报
- **自然语言交互**: 支持自然语言指令完成复杂任务
- **实时数据获取**: 通过MCP服务器直接访问网络数据

## 🛠️ 技术栈

- **框架**: OpenClaw 2026.2.23
- **AI模型**: Zhipu GLM-4.5-Air (200K上下文窗口)
- **协议**: Model Context Protocol (MCP)
- **浏览器自动化**: RoxyBrowser + mcporter
- **数据格式**: Markdown, HTML, Word文档

## 📁 项目结构

```
├── .mcporter/                 # MCP配置目录
│   └── mcporter.json          # MCP服务器配置
├── scripts/                   # 脚本文件
│   ├── monitor-api-usage.js   # API使用监控脚本
│   └── startup-gateway.ps1    # 网关启动脚本
├── memory/                    # 记忆文件目录
│   └── api-usage.md          # API使用记录
├── GitHub热门AI项目简报.md   # 生成的项目简报示例
├── GitHub热门AI项目简报.html  # HTML格式简报
└── README.md                 # 项目说明文档
```

## ⚙️ 配置说明

### 1. API模型配置
```json
{
  "model": "zhipu/glm-4.5-air",
  "context_window": 200000,
  "provider": "zhipu"
}
```

### 2. MCP服务器配置 (`.mcporter/mcporter.json`)
```json
{
  "mcpServers": {
    "roxybrowser-openapi": {
      "command": "npx",
      "args": ["-y", "@roxybrowser/openapi@beta"],
      "env": {
        "ROXY_API_KEY": "your_roxy_api_key",
        "ROXY_API_HOST": "http://127.0.0.1:50000"
      }
    },
    "roxybrowser-playwright-mcp": {
      "command": "npx",
      "args": ["-y", "@roxybrowser/playwright-mcp@latest"]
    }
  }
}
```

### 3. OpenClaw技能配置
在 `openclaw.json` 中添加了以下技能：
- `mcporter`: MCP服务器管理
- `healthcheck`: 系统健康检查
- `skill-creator`: 技能创建工具

## 🚀 安装与配置

### 1. 环境要求
- Node.js v24+
- OpenClaw 2026.2.23+
- RoxyBrowser服务

### 2. 安装步骤

#### 2.1 安装 mcporter
```bash
npm install -g mcporter
```

#### 2.2 配置 MCP 服务器
```bash
# 复制配置文件
cp .mcporter/mcporter.json ~/.mcporter/mcporter.json

# 启动 mcporter 服务
mcporter daemon start
```

#### 2.3 配置 OpenClaw
确保 `openclaw.json` 包含必要的技能配置。

### 3. API密钥配置
在 RoxyBrowser 控制面板中获取 API 密钥，并配置到 `mcporter.json` 文件中。


## 📖 使用示例

### GitHub热门项目分析
```bash
# 自然语言指令
"查一下github今日前十热门AI项目,做个word简报发给我"
```

### 自动化任务
```bash
# API使用监控
"设置API使用监控，每4小时检查一次，使用率达到80%时提醒"

# 自动启动
"配置OpenClaw网关开机自启动"
```

## 🎯 功能演示

### 1. GitHub项目简报生成
系统能够：
- 自动获取GitHub今日热门AI项目
- 生成结构化的Markdown和HTML格式简报
- 包含项目详情、技术栈分析、趋势洞察
- 提供可直接在Word中打开的格式

### 2. MCP服务器集成
- 通过RoxyBrowser实现网页自动化
- 支持浏览器截图、点击、导航等操作
- 无需翻墙即可访问国际网站

### 3. API优化
- GLM-4.5-Air相比千问成本更低
- 200K上下文窗口支持长文本处理
- 智能API使用监控和提醒

## 🔧 高级配置

### API监控配置
```javascript
// scripts/monitor-api-usage.js
const apiUsage = {
  checkInterval: 4 * 60 * 60 * 1000, // 4小时
  alertThreshold: 0.8, // 80%使用率
  logFile: "memory/api-usage.md"
};
```

### 启动脚本配置
```powershell
# scripts/startup-gateway.ps1
Start-Process "openclaw" -ArgumentList "gateway start" -Verb RunAs
```

## 📊 性能优化

### 成本优化
- 模型切换节省60%+ API成本
- 智能缓存减少重复请求
- 批量处理提高效率

### 效率提升
- MCP服务器实现自动化操作
- 自然语言指令简化操作流程
- 实时数据获取和分析

## 🛡️ 安全考虑

- API密钥安全存储
- 网络请求加密传输
- 权限最小化配置
- 数据本地化处理

## 📈 未来规划

### 即将实现
- [ ] 更多数据源集成
- [ ] 智能报告模板定制
- [ ] 多语言支持
- [ ] 云端同步功能

### 长期目标
- [ ] 完整的AI助手生态
- [ ] 企业级部署方案
- [ ] 插件化扩展机制
- [ ] 可视化管理界面

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进这个项目！

### 开发规范
- 遵循OpenClaw官方文档
- 保持代码风格一致
- 添加必要的注释和文档
- 测试新功能后再提交

## 📞 支持与反馈

- **问题反馈**: 通过GitHub Issues
- **功能建议**: 欢迎提交Enhancement请求
- **文档改进**: 欢迎完善README和文档

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

---

**最后更新**: 2026年3月3日  
**维护者**: OpenClaw社区  
**版本**: v1.0.0
