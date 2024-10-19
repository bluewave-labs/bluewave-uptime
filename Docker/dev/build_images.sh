#!/bin/bash

# Change directory to root Server directory for correct Docker Context
cd "$(dirname "$0")"
cd ../..

# Define an array of services and their Dockerfiles
declare -A services=(
  ["uptime_client"]="./Docker/dev/client.Dockerfile"
  ["uptime_database_mongo"]="./Docker/dev/mongoDB.Dockerfile"
  ["uptime_redis"]="./Docker/dev/redis.Dockerfile"
  ["uptime_server"]="./Docker/dev/server.Dockerfile"
)

# Loop through each service and build the corresponding image
for service in "${!services[@]}"; do
  docker build -f "${services[$service]}" -t "$service" .
  
  ## Check if the build succeeded
  if [ $? -ne 0 ]; then
    echo "Error building $service image. Exiting..."
    exit 1
  fi
done

echo "All images built successfully"
