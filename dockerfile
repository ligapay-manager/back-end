FROM node:alpine

RUN npm i -g @adonisjs/cli

EXPOSE ${PORT}

WORKDIR /home/ligapay