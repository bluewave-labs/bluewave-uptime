
#!/bin/bash

# Change directory to root Server directory for correct Docker Context
cd ../..

#Client
client="./Docker/dist/client.Dockerfile"

# MongoDB
mongoDB="./Docker/dist/mongoDB.Dockerfile"

# Redis
redis="./Docker/dist/redis.Dockerfile"

# Server
server="./Docker/dist/server.Dockerfile"

docker build -f $client -t dist_uptime_client .
docker build -f $mongoDB -t dist_uptime_database_mongo .
docker build -f $redis -t dist_uptime_redis .
docker build -f $server -t dist_uptime_server .

echo "All images built"