#!/usr/bin/env bash
./manage.py dumpdata --indent=2 core auth.user > database.json
