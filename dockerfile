FROM node:latest

RUN npm i -g @adonisjs/cli

EXPOSE ${PORT}

WORKDIR /home/ligapay
