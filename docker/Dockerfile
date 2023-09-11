FROM node:20-alpine3.18@sha256:f26160ea05f0275ab8a3f1708769fd83653a264930d54de819952e659a01ad6b AS BUILD

COPY src/ ./src
COPY package*.json .
COPY tsconfig.json .

RUN npm install
RUN npm run build

FROM node:20-alpine3.18@sha256:f26160ea05f0275ab8a3f1708769fd83653a264930d54de819952e659a01ad6b AS RUNTUME

WORKDIR /etc/app

COPY --from=BUILD build/ .
COPY --from=BUILD node_modules ./node_modules

ENTRYPOINT ["node", "index.js"]
