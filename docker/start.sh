dockerize -wait tcp://$DB_HOST:$DB_PORT

npm run migration:refresh
npm run start