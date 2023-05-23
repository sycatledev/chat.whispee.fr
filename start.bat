@echo off
start cmd /k "python server.py"
start cmd /k "cd client && pnpm run dev"
