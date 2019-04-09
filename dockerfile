FROM jwilder/dockerize AS dockerize

FROM node:11-alpine as build
WORKDIR /app
COPY . .
RUN npm i && npm i --no-save @adonisjs/cli

FROM node:11-alpine
WORKDIR /app
COPY --from=dockerize /usr/local/bin/dockerize /usr/local/bin
COPY --from=build /app /app

ENTRYPOINT [ "dockerize", "-template", "docker/.env.tmpl:.env" ]
CMD [ "sh", "docker/start.sh" ]