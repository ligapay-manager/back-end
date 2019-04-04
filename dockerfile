FROM node:11-alpine

RUN npm i -g @adonisjs/cli

WORKDIR /home/ligapay

COPY package.json .

RUN npm i