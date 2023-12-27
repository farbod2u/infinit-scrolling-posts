#!/bin/bash

docker compose up --build -d

xdg-open http://localhost:8080/index.html
