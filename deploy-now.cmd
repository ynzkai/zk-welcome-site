@echo off
echo.
echo ========================================
echo     DEPLOY NOW - Cloudflare Pages
echo ========================================
echo.
echo This folder is ready for Cloudflare Pages.
echo NO package.json = NO npm install = NO 117MB workerd
echo.

echo Current files:
dir /b

echo.
echo To deploy:
echo.
echo 1. Create GitHub repository: zk-welcome-site
echo    https://github.com/new
echo.
echo 2. Run these commands:
echo    git init
echo    git add .
echo    git commit -m "Static site"
echo    git remote add origin https://github.com/ynzkai/zk-welcome-site.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 3. Cloudflare Pages:
echo    - Login: https://dash.cloudflare.com
echo    - Project name: zk-welcome
echo    - Framework: None
echo    - Build: (empty)
echo    - Output: .
echo.
echo 4. Visit: https://zk-welcome.pages.dev
echo.
echo [IMPORTANT] This will work because:
echo - No package.json (won't trigger npm install)
echo - Only static files (HTML/CSS/JS)
echo - Total size: ~30KB (under 25MB limit)
echo.
pause