FROM node:18-alpine

WORKDIR /app

COPY . .
COPY .env.example .env
RUN rm .env.example

ENV REACT_APP_BASE_URL=http://localhost:8080

CMD npm install && npm run start
EXPOSE 3000

