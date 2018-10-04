#!/bin/bash
openssl req -x509 -new -newkey rsa:2048 -nodes -subj '/C=FI/ST=Helsinki/L=Helsinki/O=Hy/CN=Defa Dev' \
  -keyout ./backend/src/utils/key.pem \
  -out ./backend/src/utils/cert.pem -days 7300

openssl req -x509 -new -newkey rsa:2048 -nodes -subj '/C=FI/ST=Helsinki/L=Helsinki/O=Hy/CN=Defa IDP Dev' \
  -keyout ./idp/idp-private-key.pem \
  -out ./idp/idp-public-cert.pem -days 7300

cp ./idp/idp-public-cert.pem ./backend/src/utils/

echo "
  DATABASE_URI=localhost:27017
  DATABASE_USER=user
  DATABASE_PASS=pass
  DATABASE_NAME=db
  SECRET=long0string1of2random3alphanumerical4characters5
  ALLOWED_REDIRECTS=https://localhost,http://localhost
  ENTITY_ID=http://localhost:3000
  ASSERT_ENDPOINT=http://localhost:3000/api/login/assert
  SSO_LOGIN_URL=http://localhost:7000
  SSO_LOGOUT_URL=http://localhost:7000" > ./backend/.env

echo "
  API_URL=http://127.0.0.1:3000/api
  REDIRECT_URL=http://localhost:8080/login" > ./frontend/.env

echo "
  ASCURL=http://localhost:3000/api/login/assert
  AUDIENCE=http://localhost:3000" > ./idp/.env

x-terminal-emulator -e 'bash -c "cd ./backend; npm run dev; bash"'
x-terminal-emulator -e 'bash -c "cd ../; docker-compose up; bash"'
x-terminal-emulator -e 'bash -c "cd ./frontend; npm run dev; bash"'
x-terminal-emulator -e 'bash -c "cd ./idp; npm run start; bash"'
