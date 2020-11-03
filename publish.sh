#!/usr/bin/env bash
cp package.json dist/
cp README.md dist/
cp .npmrc dist/
cd dist
npm publish
cd ..
