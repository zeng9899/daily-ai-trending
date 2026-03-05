# OpenClaw Gateway 开机自启动脚本
# 用于在用户登录时自动启动 OpenClaw Gateway

$ErrorActionPreference = "SilentlyContinue"

Write-Host "======================================"
Write-Host "OpenClaw Gateway 自启动脚本"
Write-Host "======================================"
Write-Host ""

# 检查 Gateway 是否已经在运行
$existingProcess = Get-Process -Name "openclaw" -ErrorAction SilentlyContinue

if ($existingProcess) {
    Write-Host "[INFO] OpenClaw Gateway 已在运行中 (PID: $($existingProcess.Id))"
    Write-Host "[INFO] 无需重复启动"
    exit 0
}

Write-Host "[INFO] 正在启动 OpenClaw Gateway..."

# 启动 Gateway（后台运行）
$gatewayPath = "openclaw"
$gatewayArgs = "gateway start"

try {
    # 使用 Start-Process 在后台启动
    Start-Process -FilePath $gatewayPath -ArgumentList $gatewayArgs -WindowStyle Hidden
    
    Write-Host "[SUCCESS] OpenClaw Gateway 已启动"
    Write-Host ""
    
    # 等待几秒让服务初始化
    Start-Sleep -Seconds 5
    
    # 验证是否启动成功
    $newProcess = Get-Process -Name "openclaw" -ErrorAction SilentlyContinue
    if ($newProcess) {
        Write-Host "[VERIFY] Gateway 运行正常 (PID: $($newProcess.Id))"
    } else {
        Write-Host "[WARN] 未能验证 Gateway 进程，但可能已在后台运行"
    }
    
} catch {
    Write-Host "[ERROR] 启动失败：$($_.Exception.Message)"
    exit 1
}

Write-Host ""
Write-Host "======================================"
Write-Host "启动完成！"
Write-Host "======================================"
