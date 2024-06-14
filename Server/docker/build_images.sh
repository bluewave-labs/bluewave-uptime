
#!/bin/bash

# Change directory to root Server directory for correct Docker Context
cd ..

# MongoDB
mongoDB="./docker/mongoDB.Dockerfile"

# Redis
redis="./docker/redis.Dockerfile"

# Server
server="./docker/server.Dockerfile"

docker build -f $mongoDB -t uptime_database_mongo .
docker build -f $redis -t uptime_redis .
docker build -f $server -t uptime_server .

echo "All images built"