FROM node:18-slim

WORKDIR /app

RUN apt-get update && apt-get install -y make g++ python3 openssl

COPY ./bot/package.json ./bot/pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY ./bot .

CMD ["pnpm", "server:start"]
