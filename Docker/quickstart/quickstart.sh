default_server_base_url="http://localhost:5000/api/v1" 
default_client_host="http://localhost"
default_jwt_secret="my_secret"
default_db_type="MongoDB"
default_redis_host="redis"
default_redis_port=6379
default_token_ttl="99d"

default_db_username="uptime_user"
default_db_password="uptime_password" 

default_system_email_host="smtp.gmail.com"
default_system_email_port=465


echo "Welcome to the Uptime Monitor Setup Script! \n"
echo

echo "Configuring server"
printf '%*s\n' "${COLUMNS:-$(tput cols)}" '' | tr ' ' '*'
echo

db_type=$default_db_type
redis_host=$default_redis_host
redis_port=$default_redis_port
jwt_secret=$default_jwt_secret


read -p "Enter a username for your database [$default_db_username]: " db_username
db_username="${db_username:-$default_db_username}"

read -p "Enter a password for your database [$default_db_password]: " db_password
db_password="${db_password:-$default_db_password}"

read -p "Enter your system email host [$default_system_email_host]: " system_email_host
system_email_host="${system_email_host:-$default_system_email_host}"
echo "System email host: $system_email_host"
echo

read -p "Enter your DB connection string [$default_db_connection_string]: " db_connection_string
db_connection_string="mongodb://${db_username}:${db_password}@mongodb:27017/uptime_db"
echo "DB connection string: $db_connection_string"
echo

read -p "Enter your system email port [$default_system_email_port]: " system_email_port
system_email_port="${system_email_port:-$default_system_email_port}"
echo "System email port: $system_email_port"
echo


read -p "Enter your system email address: " system_email_address
echo "System email address: $system_email_address"
echo

read -p "Enter your system email password: " system_email_password
echo "System email password: $system_email_password"
echo

read -p "Enter your Token TTL [$default_token_ttl]: " token_ttl
token_ttl="${token_ttl:-$default_token_ttl}"
echo "Token TTL: $token_ttl"
echo

read -p "Enter your Pagespeed API key: " pagespeed_api_key
echo "Pagespeed API key: $pagespeed_api_key"
echo

echo "Writing to ./server.env"
echo

{
    echo "CLIENT_HOST=\"$client_host\""
    echo "JWT_SECRET=\"$jwt_secret\""
    echo "DB_TYPE=\"$db_type\""
    echo "DB_CONNECTION_STRING=\"$db_connection_string\""
    echo "REDIS_HOST=\"$redis_host\""
    echo "REDIS_PORT=$redis_port"
    echo "SYSTEM_EMAIL_HOST=\"$system_email_host\""
    echo "SYSTEM_EMAIL_PORT=$system_email_port"
    echo "SYSTEM_EMAIL_ADDRESS=\"$system_email_address\""
    echo "SYSTEM_EMAIL_PASSWORD=\"$system_email_password\""
    echo "TOKEN_TTL=\"$token_ttl\""
    echo "PAGESPEED_API_KEY=\"$pagespeed_api_key\""
} > ./server.env


echo 
{
    echo USERNAME_ENV_VAR=${db_username}
    echo PASSWORD_ENV_VAR=${db_password}
} > ./mongo.env

mkdir -p ./nginx/conf.d/


cat <<EOL > ./nginx/conf.d/default.conf
server {
    listen       80;
    listen  [::]:80;

    server_name uptime-demo.bluewavelabs.ca;
    server_tokens off;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        try_files \$uri \$uri/ /index.html;
    }
    
    location /api/ {
        proxy_pass http://server:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOL