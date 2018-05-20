#!/usr/bin/env bash
set -e
set -x

npm run build-prod
npm run upload
eb deploy
