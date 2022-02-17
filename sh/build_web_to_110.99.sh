#!/bin/sh
yarn

yarn build

docker build -t ginlink/coolswap-dashboard:latest .

docker login --username $DOCKER_ACCESS_NAME -p $DOCKER_ACCESS_TOKEN

docker push ginlink/coolswap-dashboard:latest
