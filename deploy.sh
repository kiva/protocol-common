#!/usr/bin/env bash

localVersion=$(jq -r '.version' package.json)
echo "$localVersion"

remoteVersion=$(npm show protocol-common version)
echo "$remoteVersion"

if [ "$localVersion" == "$remoteVersion" ]; then
  echo "Equal"
else
  echo "Not equal"
fi
