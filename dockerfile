FROM jwilder/dockerize AS dockerize

FROM node:11-alpine as build

WORKDIR /app

COPY . .
COPY --from=dockerize /usr/local/bin/dockerize /usr/local/bin

RUN npm i && npm i -g @adonisjs/cli

ENTRYPOINT [ "dockerize", "-template", "docker/.env.tmpl:.env" ]
CMD [ "sh", "docker/start.sh" ]