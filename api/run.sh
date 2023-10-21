#!/bin/bash

docker run -it --rm --name my-finance -v ./app:/var/app -p 8001:8001 my-finance