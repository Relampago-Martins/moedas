#!/usr/bin/env bash

V=$(<VERSION)
D=$(pwd)
IMG=moedas
PORT=8001

while getopts p: flag
do
    case "${flag}" in
        p) PORT=${OPTARG};;
    esac
done

/usr/bin/docker run -i -t --rm -v $D/app:/var/app -p $PORT:80 --name=$IMG-$V $IMG:$V /bin/bash