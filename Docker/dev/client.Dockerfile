FROM node:20-alpine AS build

WORKDIR /app

COPY ../../Client/package*.json ./

RUN npm install

COPY ../../Client .

RUN npm run build-dev

RUN npm install -g serve

CMD ["serve","-s", "dist", "-l", "5173"]
