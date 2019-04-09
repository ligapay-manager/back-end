FROM jwilder/dockerize AS dockerize

FROM node:11-alpine

COPY --from=dockerize /usr/local/bin/dockerize /usr/local/bin

WORKDIR /home/ligapay

COPY package.json .

COPY .env .

RUN npm i -g @adonisjs/cli && \
    npm i

ENTRYPOINT [ "dockerize", "-template", ".env.tmpl:.env" ]

EXPOSE 3333

CMD [ "sh", "start.sh" ]