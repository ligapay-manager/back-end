dockerize -wait tcp://$DB_HOST:$DB_PORT

adonis migration:refresh
adonis serve