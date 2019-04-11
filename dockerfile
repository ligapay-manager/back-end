FROM jwilder/dockerize AS dockerize

FROM node:11-alpine as build

WORKDIR /src

COPY ./ /src
COPY --from=dockerize /usr/local/bin/dockerize /usr/local/bin
COPY docker/heroku-exec.sh /app/.profile.d/

RUN apk update && \
    apk add bash openssh curl && \
    rm /bin/sh && \
    ln -s /bin/bash /bin/sh && \
    npm i && \
    npm i @adonisjs/cli

ENTRYPOINT [ "dockerize", "-template", "docker/.env.tmpl:.env" ]
CMD ["bash", "docker/start.sh"]