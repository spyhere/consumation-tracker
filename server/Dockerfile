FROM node:18
RUN apt-get update
RUN apt-get install -y openssl

WORKDIR /app
COPY . .
COPY .env.example .env
RUN rm .env.example

ENV PORT=8080
ENV DATABASE_URL="mysql://root:password@mysql:3306/calories"
ENV TOKEN="token"
ENV ENTRIES_PAGINATION=4

CMD ./startup.sh
EXPOSE 8080
