FROM node:20-alpine

WORKDIR /app

COPY package.json .

COPY yarn.lock .

COPY prisma ./prisma/

RUN apk update && apk upgrade openssl --no-cache

RUN yarn install

RUN npx prisma generate

COPY . .

CMD [ "yarn", "dev" ]