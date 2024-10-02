
#!/bin/bash

# Change directory to root directory for correct Docker Context
cd ../..

#Client
client="./Docker/prod/client.Dockerfile"

# MongoDB
mongoDB="./Docker/prod/mongoDB.Dockerfile"

# Redis
redis="./Docker/prod/redis.Dockerfile"

# Server
server="./Docker/prod/server.Dockerfile"

docker build -f $client -t uptime_client .
docker build -f $mongoDB -t uptime_database_mongo .
docker build -f $redis -t uptime_redis .
docker build -f $server -t uptime_server .

echo "All images built"