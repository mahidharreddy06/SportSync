@echo off
echo ========================================================
echo Starting Sports Tournament MERN Stack in ONE Terminal...
echo Press Ctrl+C to stop both servers.
echo ========================================================

npx concurrently -k -p "[{name}]" -n "BACKEND,FRONTEND" -c "bgRed.bold,bgBlue.bold" "cd backend && npm run dev" "cd frontend && npm run dev"

