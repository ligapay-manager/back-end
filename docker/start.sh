dockerize -wait tcp://$DB_HOST:$DB_PORT

npm run migration:run
npm run start