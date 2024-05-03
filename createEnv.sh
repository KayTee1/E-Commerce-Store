#!/bin/bash

# Function to create .env file with specified contents
createEnv() {
    cat <<EOF >$1/.env
VITE_API_URL="http://localhost:5000"

MYSQL_HOST=localhost
MYSQL_USERNAME=root
MYSQL_PASSWORD=password
MYSQL_DATABASE=react_store

JWT_KEY="gabagoo"
EOF
}

# Create .env file in frontend folder
createEnv "./frontend"

# Create .env file in backend folder
createEnv "./backend"

echo "Env files created successfully."
