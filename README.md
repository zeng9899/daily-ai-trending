# 🚀 OpenClaw + MCP 智能助手 - 一键部署指南

## 📋 项目简介

这是一个基于 OpenClaw 框架和 Model Context Protocol (MCP) 的智能助手系统，能够自动获取 GitHub 热门 AI 项目并生成专业分析报告。

**⭐ 核心亮点：**
- ✅ 无需翻墙即可访问 GitHub
- ✅ 无需 GitHub Token 也能获取数据
- ✅ 自动生成 Word/HTML 格式简报
- ✅ 支持自然语言交互

---

## 🏁 快速开始

### 步骤 1：克隆项目

```bash
git clone https://github.com/zeng9899/daily-ai-trending.git
cd daily-ai-trending
```

### 步骤 2：安装 Node.js 环境

确保你的电脑安装了 **Node.js v18 或更高版本**：

```bash
node --version  # 检查版本
```

如果没有安装，请访问 [Node.js 官网](https://nodejs.org/) 下载安装。

### 步骤 3：安装依赖

```bash
npm install
```

### 步骤 4：配置 RoxyBrowser API

1. 访问 [RoxyBrowser](https://roxybrowser.com/) 注册账号
2. 在控制面板获取你的 **API Key**
3. 复制配置文件并填入你的 API Key：

```bash
# 复制配置模板
copy mcporter.json.example mcporter.json

# 编辑配置文件，替换 YOUR_ROXY_API_KEY 为你的真实 API Key
notepad mcporter.json
```

### 步骤 5：配置 OpenClaw

1. 复制配置文件：

```bash
copy openclaw.json.example openclaw.json
```

2. 编辑 `openclaw.json`，填入你的 Zhipu API Key：

```json
{
  "providers": {
    "zhipu": {
      "apiKey": "你的智谱AI API Key"
    }
  }
}
```

> 💡 如何获取智谱AI API Key？
> 1. 访问 [智谱AI开放平台](https://open.bigmodel.cn/)
> 2. 注册账号并获取 API Key

### 步骤 6：启动服务

```bash
# 启动 MCP 服务
mcporter daemon start

# 启动 OpenClaw 网关
openclaw gateway start
```

---

## 📖 使用方法

### 方法一：命令行交互

启动后，直接对 AI 助手发送指令：

```
查一下github今日前十热门AI项目,做个word简报发给我
```

系统会自动：
1. 访问 GitHub Trending 页面
2. 获取热门 AI 项目数据
3. 生成结构化分析报告
4. 保存到本地文件

### 方法二：自动运行脚本

```bash
# 运行项目分析脚本
node scripts/analyze-trending.js
```

---

## 📁 项目结构

```
daily-ai-trending/
├── README.md                    # 项目说明文档
├── GitHub热门AI项目简报.md     # 生成的分析报告示例
├── mcporter.json.example        # MCP配置模板
├── openclaw.json.example       # OpenClaw配置模板
├── scripts/
│   └── analyze-trending.js    # 分析脚本
└── docs/
    └── 部署指南.md             # 详细部署文档
```

---

## ⚙️ 配置说明

### mcporter.json 配置

```json
{
  "mcpServers": {
    "roxybrowser-openapi": {
      "command": "npx",
      "args": ["-y", "@roxybrowser/openapi@beta"],
      "env": {
        "ROXY_API_KEY": "你的RoxyBrowser API Key",
        "ROXY_API_HOST": "http://127.0.0.1:50000"
      }
    }
  }
}
```

### openclaw.json 配置

```json
{
  "model": "zhipu/glm-4.5-air",
  "context_window": 200000,
  "providers": {
    "zhipu": {
      "apiKey": "你的智谱AI API Key"
    }
  }
}
```

---

## 🔧 常见问题

### Q1: 提示 "mcporter: command not found"

```bash
# 全局安装 mcporter
npm install -g mcporter
```

### Q2: 提示 "API Key 无效"

1. 检查 `mcporter.json` 中的 API Key 是否正确
2. 检查 RoxyBrowser 账号是否到期
3. 重新获取 API Key 并更新配置

### Q3: 无法连接 GitHub

1. 检查 MCP 服务是否启动：`mcporter daemon status`
2. 重启服务：`mcporter daemon restart`
3. 检查网络代理设置

### Q4: 生成报告为空

1. 确保 RoxyBrowser 服务正常运行
2. 检查 API Key 配额是否用完
3. 尝试重新运行分析脚本

---

## 📞 获取帮助

- 📧 问题反馈：提交 [Issue](https://github.com/zeng9899/daily-ai-trending/issues)
- 📖 详细文档：查看 [docs/部署指南.md](./docs/部署指南.md)
- ⭐ 欢迎 Star：如果你觉得这个项目有帮助

---

## 📄 许可证

MIT License - 欢迎自由使用和修改

---

**最后更新**: 2026年3月5日  
**项目作者**: zeng9899
