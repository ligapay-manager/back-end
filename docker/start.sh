dockerize -wait tcp://$DB_HOST:$DB_PORT

bash /app/.profile.d/heroku-exec.sh

npm run migration:run
npm run start