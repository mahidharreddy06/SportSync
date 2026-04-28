@echo off
setlocal enabledelayedexpansion

echo ===================================================
echo Automated GitHub Pusher
echo ===================================================

:: Check for changes
git status --porcelain > nul
if %errorlevel% neq 0 (
    echo Error: Not a git repository.
    pause
    exit /b
)

:: Prompt for commit message
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
echo Pushing to GitHub (Branch: main)...
:: Use -u to set upstream for the first time, and origin main for specificity
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo ---------------------------------------------------
    echo PUSH FAILED!
    echo Possible causes:
    echo 1. GitHub authentication failed.
    echo 2. The repository URL is incorrect.
    echo 3. You have no internet connection.
    echo ---------------------------------------------------
) else (
    echo.
    echo ===================================================
    echo SUCCESS! Your changes are now live on GitHub.
    echo ===================================================
)

pause
