#!/bin/bash
sudo -i
python3 server.py &
cd client && pnpm run dev &