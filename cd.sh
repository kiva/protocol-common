#!/bin/bash
set -ev

echo "This script stands up an stack and runs all tests for continuous integration"

# prepare environment
docker network create kiva-network

# build containers
docker-compose -f docker-compose.ci.yml build

# run stack
docker-compose -f docker-compose.ci.yml up -d

# install integration tests (most efficient to do it here during stack wait time)

# run setup and tests
docker exec -it protocol-common npm install
docker exec -it protocol-common npm run test
docker exec -it protocol-common publish.sh

docker-compose -f docker-compose.ci.yml down
docker network rm kiva-network
