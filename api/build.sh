#!/usr/bin/env bash

V=$(git rev-parse --short HEAD)
IMG=moedas
case $1 in
    no-cache)
        /usr/bin/docker build --no-cache --tag=$IMG:$V .
    ;;
    prod)
        /usr/bin/docker build --no-cache --file Dockerfile.prod --tag=$IMG-prod:$V .
    ;;
    *)
        /usr/bin/docker build --tag=$IMG:$V .
    ;;
esac
