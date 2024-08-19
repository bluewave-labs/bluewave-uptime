FROM node:20-alpine as build

WORKDIR /app

COPY ./Client/package*.json ./

RUN npm install

COPY ./Client .

RUN npm run build

# RUN npm install -g serve

# CMD ["serve","-s", "dist", "-l", "5173"]

FROM nginx:1.27.1-alpine

COPY --from=build /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]