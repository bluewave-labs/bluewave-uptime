FROM node:20

WORKDIR /app

COPY ./Client/package*.json ./

RUN npm install

COPY ./Client .

RUN npm run build

RUN npm install -g serve

CMD ["serve","-s", "dist", "-l", "5173"]

EXPOSE 5000
