FROM jwilder/dockerize AS dockerize

FROM node:11-alpine as build
WORKDIR /home/ligapay
COPY . ./
RUN npm i

FROM node:11-alpine
WORKDIR /home/ligapay
COPY --from=dockerize /usr/local/bin/dockerize /usr/local/bin
COPY --from=build /home/ligapay ./
RUN npm i -g @adonisjs/cli

ENTRYPOINT [ "dockerize", "-template", ".env.tmpl:.env" ]
CMD [ "sh", "start.sh" ]