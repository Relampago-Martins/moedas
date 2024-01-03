#!/bin/bash

python3 manage.py migrate
if [ "$DEBUG" = "True" ]; then
    echo "DEBUG = true"
    python3 manage.py runserver 0.0.0.0:80
else
    echo "DEBUG = false"
    python3 manage.py collectstatic --noinput
    gunicorn  -b 0.0.0.0:80 --reload config.wsgi
fi