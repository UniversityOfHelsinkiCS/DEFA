#!/bin/bash

# Fills db with existing data.
# Assumes dump.tar.gz to exist in current location

docker cp dump.tar.gz  mongodb:/
docker exec mongodb tar -xvzf dump.tar.gz
docker exec mongodb mongorestore /dump -u user -p pass --authenticationDatabase admin
docker exec mongodb rm dump.tar.gz
docker exec mongodb rm -rf dump
