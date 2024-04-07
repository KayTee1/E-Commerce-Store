#!/bin/bash

docker compose up -d
sleep 1

cd backend
npm run dev &

sleep 1
cd ../frontend
npm run dev &
