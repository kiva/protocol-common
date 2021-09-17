#!/usr/bin/env bash
set -ex

localVersion=$(jq -r '.version' package.json)
remoteVersion=$(npm show protocol-common version)

if [ "$localVersion" == "$remoteVersion" ]; then
  echo "The version of protocol-common has not been updated in package.json. Skipping publish step."
else
  echo "Publishing $localVersion"
  cp package.json dist/
  cp README.md dist/
  cp .npmrc dist/
  cd dist
  npm publish --verbose
  cd ..
fi
