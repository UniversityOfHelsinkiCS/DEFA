# DEFA

master: [![Build Status](https://travis-ci.org/UniversityOfHelsinkiCS/DEFA.svg?branch=master)](https://travis-ci.org/UniversityOfHelsinkiCS/DEFA)

trunk:[![Build Status](https://travis-ci.org/UniversityOfHelsinkiCS/DEFA.svg?branch=trunk)](https://travis-ci.org/UniversityOfHelsinkiCS/DEFA)

## Development

### Services

#### DB

To access the local db from command line run: 

```
docker exec -it mongodb mongo -u user -p pass --authenticationDatabase admin
```
#### GraphQl web UI

graphQL web UI can be found in http://localhost:3001/graphql . To use it, first run 

```
cd graphql-backend
npm run login_service_token
```

The token printed from the request needs to be wrapped for each request to use the ui, for example:

```
query {
  authenticate(
    token: "longGeneratedTokenWithinQuotes"
  ) {
    users(user: {}) {
      id
      name
  	}
  }
}

```


### Init

run:

```
./init_dev_environment.sh
```

create a file `docker-compose.yml` outside the project folder and paste the following into it:

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

### Running in dev

If the docker-compose file exists  ../ from the DEFA-repostory, run: 

```
./start_dev.sh
```

If not:

#### DB

Locate to the folder the `docker-compose.yml` file is and run

```
docker-compose up -d
```

The database should now be running in a docker container.

#### Backend

navigate to ./backend and run

```
npm run dev
```

If you defined your own values for the DB, fix your ./backend/.env values to match those. 

#### Frontend

navigate to ./frontend and run

```
npm run dev
```
#### Idp

navigate to ./idp and run
```
npm start
```

Now DEFA should be running at http://localhost:8080
# All below: depracated, unnecessary? 

### Backend

navigate to backend/

configure the .env file to include the following fields

```
DATABASE_URI=localhost:27017
DATABASE_USER=user
DATABASE_PASS=pass
DATABASE_NAME=db
SECRET=long0string1of2random3alphanumerical4characters5
ALLOWED_REDIRECTS=https://localhost,http://localhost
FRONTEND_LOGIN=http://localhost:8080
```

run

```
npm i
npm run dev
```

You also need to generate metadata for your service provider in order to run it.



To use our existing metadata, write

```
curl https://defa-staging.cs.helsinki.fi/api/login/metadata > ./src/utils/samldata/metadata.xml
```


### Backend tests

Add the following line to the .env file.

```
TEST_DATABASE_NAME=test
```

run

```
npm test
```

### Frontend

run

```
npm i
npm run dev
```

The app runs in http://localhost:8080/
