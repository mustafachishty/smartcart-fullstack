@echo off
echo Stopping SmartCart Backend Server...
netstat -ano | findstr :5001
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5001') do (
    echo Killing process %%a
    taskkill /PID %%a /F
)
echo Backend server stopped!
pause