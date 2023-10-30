FROM ubuntu:22.04

RUN apt update && apt full-upgrade -y \
    python3 python3-pip

COPY requirements.txt /var/app/requirements.txt

WORKDIR /var/app

COPY ./app /var/app

RUN pip3 install -r requirements.txt

# Definir o comando de entrada para iniciar o servidor
# CMD ["python3", "manage.py", "runserver", "0.0.0.0:80"]