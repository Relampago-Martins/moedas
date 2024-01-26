# Use uma imagem base do Ubuntu para ARM (substitua "buster" pelo nome apropriado)
# FROM balenalib/raspberrypi4-64-debian-python:latest
FROM python:latest

WORKDIR /var/app

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY ./app /var/app

# CMD [ "python", "manage.py", "runserver", "0.0.0.0:8001"]