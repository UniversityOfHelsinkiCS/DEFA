# DEFA

master: [![Build Status](https://travis-ci.org/UniversityOfHelsinkiCS/DEFA.svg?branch=master)](https://travis-ci.org/UniversityOfHelsinkiCS/DEFA)

trunk:[![Build Status](https://travis-ci.org/UniversityOfHelsinkiCS/DEFA.svg?branch=trunk)](https://travis-ci.org/UniversityOfHelsinkiCS/DEFA)

## Development

### Backend

create a new folder outside the project and navigate to it.

create a file `docker-compose.yml` and paste the following into it:

```
version: '2'
services:
    mongodb:
        image: mongo:latest
        container_name: "mongodb"
        environment:
          - MONGO_INITDB_ROOT_USERNAME=user 
          - MONGO_INITDB_ROOT_PASSWORD=pass
          - MONGO_INITDB_DATABASE=db
          - MONGO_DATA_DIR=/data/db
          - MONGO_LOG_DIR=/dev/null
        volumes:
          - ./data/db:/data/db
        ports:
            - 27017:27017
        command: mongod --smallfiles --logpath=/dev/null
```

run

```
docker-compose up -d
```

The database should now be running in a docker container.

navigate to backend/

configure the .env file to include the following fields

```DATABASE_URI=localhost:27017
DATABASE_USER=user
DATABASE_PASS=pass
DATABASE_NAME=db
```

Make sure the fields in .env match the environment varables set in the docker-compose.yml file for the database.

run

```
npm i
npm run dev
```


### Frontend

navigate to frontend/

run

```
npm i
npm run dev
```

The app runs in http://localhost:8080/
