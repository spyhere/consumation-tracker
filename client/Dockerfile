FROM node:18-alpine

WORKDIR /app

COPY . .
COPY .env.example .env
RUN rm .env.example

CMD npm install && npm run start
EXPOSE 3000

