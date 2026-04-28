@echo off
echo ===================================================
echo Automated GitHub Pusher
echo ===================================================

set /p commit_msg="Enter name for the change (Commit Message): "

if "%commit_msg%"=="" (
    echo Error: Commit message cannot be empty.
    pause
    exit /b
)

echo.
echo Adding files...
git add .

echo.
echo Committing with message: "%commit_msg%"
git commit -m "%commit_msg%"

echo.
echo Pushing to GitHub...
git push

echo.
echo ===================================================
echo Done!
echo ===================================================
pause
