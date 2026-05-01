@echo off
npx -y create-next-app@latest temp-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
xcopy /E /I /H /Y temp-app\* .
rmdir /S /Q temp-app
npm install lucide-react framer-motion
