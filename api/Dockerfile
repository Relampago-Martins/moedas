# Use uma imagem base do Ubuntu para ARM (substitua "buster" pelo nome apropriado)
FROM balenalib/raspberrypi4-64-debian-python:latest
# FROM ubuntu:22.04
# RUN apt update && apt full-upgrade -y \
#     python3 python3-pip

WORKDIR /var/app

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY ./app /var/app
