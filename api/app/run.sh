#!/bin/bash

if [ "$DEBUG" = "true" ]; then
    echo "DEBUG = true"
    python3 manage.py runserver 0.0.0.0:80
else
    echo "DEBUG = false"
    python3 manage.py collectstatic --noinput
    python3 manage.py migrate
    gunicorn -b 0.0.0.0:80 --reload config.wsgi
fi