#!/usr/bin/env bash
set -e
set -x

npm run build-prod
./manage.py collectstatic --no-input
eb deploy
