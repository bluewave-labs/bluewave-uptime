FROM node:20-alpine AS build

WORKDIR /app

COPY ../../Client/package*.json ./

RUN npm install

COPY ../../Client .

RUN npm run build

FROM nginx:1.27.2-alpine

COPY --from=build /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]