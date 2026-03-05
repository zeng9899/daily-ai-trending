# Brave Search API 配置指南

## 📋 配置概述

要使用 `web_search` 功能，需要配置 Brave Search API 密钥。以下是详细的配置步骤：

## 🔑 获取 Brave API 密钥

### 步骤1：创建账户
1. 访问 [Brave Search API 官网](https://brave.com/search/api/)
2. 点击 "Sign Up" 或 "Get Started"
3. 填写注册信息（邮箱、密码等）
4. 验证邮箱地址

### 步骤2：选择套餐
- **免费套餐**：提供一定数量的免费搜索请求
- **付费套餐**：更多请求量和更高限制
- **重要**：选择 "Data for Search" 套餐（"Data for AI" 不兼容）

### 步骤3：获取API密钥
1. 登录到 Brave 控制面板
2. 找到 API 密钥管理页面
3. 创建新的 API 密钥
4. 复制生成的密钥（格式如：`xxxxx-xxxxx-xxxxx-xxxxx`）

## ⚙️ 配置方法

### 方法1：使用 OpenClaw 配置命令（推荐）
```bash
openclaw configure --section web
```
这个命令会提示你输入 API 密钥并自动配置。

### 方法2：手动配置到配置文件
编辑 `C:\Users\84352\.openclaw\openclaw.json`，添加以下配置：

```json
{
  "tools": {
    "web": {
      "search": {
        "provider": "brave",
        "apiKey": "你的_BRAVE_API_KEY_在这里",
        "maxResults": 10,
        "timeoutSeconds": 30
      }
    }
  }
}
```

### 方法3：使用环境变量
设置系统环境变量：
```bash
set BRAVE_API_KEY=你的_BRAVE_API_KEY_在这里
```

## 🧪 测试配置

配置完成后，可以测试是否工作：
```bash
openclaw web-search "GitHub trending AI projects"
```

## 💡 注意事项

1. **免费额度**：Brave 提供免费套餐，但有请求限制
2. **套餐选择**：必须选择 "Data for Search"，不是 "Data for AI"
3. **密钥安全**：不要在公开场合分享你的 API 密钥
4. **更新配置**：如果密钥变更，需要重新配置

## 🚫 常见问题

### 问题1：提示 "missing_brave_api_key"
- **原因**：未配置 API 密钥
- **解决**：按照上述步骤配置密钥

### 问题2：提示 "Data for AI not compatible"
- **原因**：选择了错误的套餐
- **解决**：切换到 "Data for Search" 套餐

### 问题3：搜索结果为空
- **原因**：API密钥无效或额度用完
- **解决**：检查密钥有效性或升级套餐

## 📞 获取帮助

如果遇到问题：
1. 查看 [Brave Search API 文档](https://brave.com/search/api/docs/)
2. 查看 [OpenClaw Web 工具文档](/tools/web)
3. 在 [OpenClaw Discord](https://discord.com/invite/clawd) 寻求帮助

---

**配置完成后，你就可以使用 `web_search` 功能获取最新的GitHub热门AI项目数据了！**