
#!/bin/bash

# Change directory to root Server directory for correct Docker Context
cd ../..

#Client
client="./Docker/dev/client.Dockerfile"

# MongoDB
mongoDB="./Docker/dev/mongoDB.Dockerfile"

# Redis
redis="./Docker/dev/redis.Dockerfile"

# Server
server="./Docker/dev/server.Dockerfile"

docker build -f $client -t uptime_client .
docker build -f $mongoDB -t uptime_database_mongo .
docker build -f $redis -t uptime_redis .
docker build -f $server -t uptime_server .

echo "All images built"