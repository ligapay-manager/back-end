curl https://cli-assets.heroku.com/install.sh | sh
docker login --username=_ --password=$(heroku auth:token) registry.heroku.com
docker tag ligapay:latest registry.heroku.com/$APP_NAME/$HEROKU_PROCESS
docker push registry.heroku.com/$APP_NAME/$HEROKU_PROCESS
heroku container:release web -a ligapay