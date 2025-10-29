@echo off
echo ========================================
echo Investment Calculator - Backup Creator
echo ========================================
echo.

REM Get current date and time for filename
set datetime=%date:~-4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set datetime=%datetime: =0%

set backup_name=investment-calculator-backup-%datetime%.zip

echo Creating backup: %backup_name%
echo.

REM Create backup using PowerShell
powershell -command "Compress-Archive -Path '%~dp0*' -DestinationPath '%~dp0..\%backup_name%' -Force"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo Backup created successfully!
    echo Location: %~dp0..\%backup_name%
    echo ========================================
) else (
    echo.
    echo ========================================
    echo Error creating backup!
    echo ========================================
)

echo.
echo Press any key to exit...
pause >nul
