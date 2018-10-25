
FROM node:8

RUN mkdir -p /usr/src/app
RUN apt-get update
RUN apt-get install openjdk-7-jdk --assume-yes
COPY . /usr/src/app
WORKDIR /usr/src/app

RUN npm install
RUN npm run build
EXPOSE 3000

CMD ["npm", "start"]
