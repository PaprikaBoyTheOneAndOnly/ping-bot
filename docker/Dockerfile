FROM node:20-alpine3.18

WORKDIR /etc/app

COPY ./build/ .
COPY ./node_modules ./node_modules

ENTRYPOINT ["node", "index.js"]