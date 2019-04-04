FROM node:11-alpine

WORKDIR /home/ligapay

COPY package.json .

RUN npm i -g @adonisjs/cli && \
    npm i
