@echo off
call npx tsc
call npx sass calculator.scss calculator.css
start cmd "/c py -m http.server"
start firefox localhost:8000