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

---

**最后更新**: 2026年3月3日  
**版本**: v1.0.0