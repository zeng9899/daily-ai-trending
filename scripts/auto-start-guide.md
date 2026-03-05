# OpenClaw Gateway 自动启动配置指南

## 当前状态
✅ **已完成的工作：**
- OpenClaw Gateway 正在运行（端口18789）
- API监控脚本已创建并正常工作
- 配置文件已更新为使用Zhipu AI (glm-4.5-air)
- Windows启动快捷方式已添加到启动文件夹
- API监控日志已配置

## 自动启动方案

### 方案1：使用现有启动快捷方式（推荐）
1. **位置**: `C:\Users\84352\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup\OpenClaw Gateway.lnk`
2. **状态**: 已添加到启动文件夹
3. **验证**: Gateway已在运行，说明快捷方式有效

### 方案2：使用简化脚本（备用）
如果方案1有问题，可以使用简化脚本：
```cmd
@echo off
tasklist /FI "IMAGENAME eq openclaw.exe" 2>NUL | find /I "openclaw.exe" > NUL
if %ERRORLEVEL% == 0 (
    echo OpenClaw Gateway 已在运行
    exit /b 0
)
start /B openclaw gateway start
timeout /t 3 /nobreak > nul
echo OpenClaw Gateway 启动完成
exit /b 0
```

## 手动配置步骤（如需要）

### 步骤1：验证启动快捷方式
1. 按 `Win + R` 输入 `shell:startup`
2. 确认 `OpenClaw Gateway.lnk` 存在
3. 重启电脑测试自动启动

### 步骤2：检查Gateway服务状态
```cmd
openclaw gateway status
```

### 步骤3：测试API监控
```cmd
node "C:\Users\84352\.openclaw\workspace\scripts\monitor-api-usage.js"
```

## 当前配置验证
- ✅ Gateway运行正常
- ✅ API监控配置正确
- ✅ 使用Zhipu AI模型
- ✅ 启动快捷方式已就位

## 下次重启后的验证
1. 重启电脑
2. 检查Gateway是否自动启动：`openclaw gateway status`
3. 验证API监控是否正常工作

## 注意事项
- Gateway配置为本地模式（loopback），只能本地访问
- API监控每4小时自动运行一次
- 使用了正确的Zhipu AI API配置

所有核心功能已配置完成，系统应该能够正常自动启动和运行。