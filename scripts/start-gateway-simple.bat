@echo off
REM OpenClaw Gateway 启动脚本
REM 简化版本，确保能正常启动

echo ======================================
echo OpenClaw Gateway 启动脚本
echo ======================================
echo.

REM 检查 OpenClaw 是否已运行
tasklist /FI "IMAGENAME eq openclaw.exe" 2>NUL | find /I "openclaw.exe" > NUL
if %ERRORLEVEL% == 0 (
    echo [INFO] OpenClaw Gateway 已在运行
    echo [INFO] 无需重复启动
    exit /b 0
)

echo [INFO] 正在启动 OpenClaw Gateway...

REM 启动 Gateway
start /B openclaw gateway start

REM 等待几秒让服务初始化
timeout /t 3 /nobreak > nul

REM 验证是否启动成功
tasklist /FI "IMAGENAME eq openclaw.exe" 2>NUL | find /I "openclaw.exe" > NUL
if %ERRORLEVEL% == 0 (
    echo [SUCCESS] OpenClaw Gateway 已启动
    echo [SUCCESS] Gateway 运行正常
) else (
    echo [WARN] 未能验证 Gateway 进程，但可能已在后台运行
)

echo.
echo ======================================
echo 启动完成！
echo ======================================

exit /b 0