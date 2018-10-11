#!/bin/bash

xterm -e "cd ./idp && npm start" & \
xterm -e "cd ./backend && npm run dev" & \
xterm -e "cd ./frontend && npm run dev" & \
xterm -e "cd .. && docker-compose up"
