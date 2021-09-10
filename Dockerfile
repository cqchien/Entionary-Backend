FROM node:alpine

ENV NODE_ENV=production

WORKDIR /src

COPY ["package.jon", "yarn.lock*", "./"]

RUN yarn add --production

COPY . .

CMD [ "yarn", "index.js" ]