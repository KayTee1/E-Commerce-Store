docker compose down
sleep 1

lsof -ti:5000 | xargs kill
echo "killed port 5000"

sleep 1
lsof -ti:5173 | xargs kill
echo "killed port 5173"

sleep 1
exit
