docker compose down
sleep 1

lsof -ti:5000 | xargs kill

sleep 1
lsof -ti:5173 | xargs kill

sleep 1
exit
