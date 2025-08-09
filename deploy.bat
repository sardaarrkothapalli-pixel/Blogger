@echo off
echo 🚀 Revenue Blog Deployment Script
echo ================================

echo.
echo Step 1: Installing dependencies...
call npm install

echo.
echo Step 2: Testing build...
call npm run build

if %errorlevel% neq 0 (
    echo ❌ Build failed! Please check the errors above.
    pause
    exit /b 1
)

echo.
echo ✅ Build successful!
echo.
echo Next steps:
echo 1. Push your code to GitHub
echo 2. Deploy to Vercel (https://vercel.com)
echo 3. Configure environment variables
echo.
echo Commands to push to GitHub:
echo git init
echo git add .
echo git commit -m "Initial blog setup"
echo git remote add origin YOUR_GITHUB_REPO_URL
echo git push -u origin main
echo.
echo Then go to vercel.com and deploy!
echo.
pause
