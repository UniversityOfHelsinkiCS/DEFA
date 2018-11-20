#!/bin/bash

# Creates a DEV dump from mongodb and copies it to current folder.

docker exec mongodb mongodump --db db -u user -p pass --authenticationDatabase admin
docker exec mongodb tar -cvzf dump.tar.gz /dump
docker exec mongodb rm -rf dump
docker cp mongodb:dump.tar.gz ./
