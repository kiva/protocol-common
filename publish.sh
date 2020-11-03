#!/usr/bin/env bash
set -ex

cp package.json dist/
cp README.md dist/
cp .npmrc dist/
cd dist
npm publish --verbose
cd ..
