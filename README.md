# DEFA

master: [![Build Status](https://travis-ci.org/UniversityOfHelsinkiCS/DEFA.svg?branch=master)](https://travis-ci.org/UniversityOfHelsinkiCS/DEFA)

trunk:[![Build Status](https://travis-ci.org/UniversityOfHelsinkiCS/DEFA.svg?branch=trunk)](https://travis-ci.org/UniversityOfHelsinkiCS/DEFA)

## Development

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
```

Make sure the fields in .env match the environment variables set in the docker-compose.yml file for the database.

#### Service provide in backend

To set up the service provider, you need to generate a cert and a key file in pem format. Store them in 

```
../src/utils
```
Make sure your filenames for certicate and key match the ones in sp_options and idp_options at saml.ts file.

You also need the idp public certificate. For that see the IDP section below.

Then add the following to your backend .env file

```
ENTITY_ID=http://localhost:3000
ASSERT_ENDPOINT=http://localhost:3000/api/login/assert
SSO_LOGIN_URL=http://localhost:7000
SSO_LOGOUT_URL=http://localhost:7000
```

run

```
npm i
npm run dev
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

navigate to frontend/

Create an .env file and add the following to it

```
API_URL=http://127.0.0.1:3000/api
REDIRECT_URL=http://localhost:8080/login
```
run

```
npm i
npm run dev
```

The app runs in http://localhost:8080/


### Idp

navigate to ../idp

Set up an .env file with the following

```
ASCURL=http://localhost:3000/api/login/assert
AUDIENCE=http://localhost:3000

```

You also need to generate a cert and a key file to use the idp.
You can follow the instructions here

https://www.npmjs.com/package/saml-idp#generating-idp-signing-certificate

After that copy the public cert to backend
```
cp idp-public-cert.pem ../backend/src/utils/
```

run

```
npm i
npm start
```

You should now have the IDP running.
