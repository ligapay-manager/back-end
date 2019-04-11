# Install Heroku Cli
curl https://cli-assets.heroku.com/install.sh | sh
# Docker Login
heroku auth:token | docker login --username=_ --password-stdin registry.heroku.com
# Tag Image
docker tag ligapay:latest registry.heroku.com/ligapay/web
# Push to heroku repository
docker push registry.heroku.com/ligapay/web
# Release
heroku container:release web -a ligapay