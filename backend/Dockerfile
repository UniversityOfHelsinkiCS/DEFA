FROM node:8

RUN useradd --create-home --home-dir /app appuser
RUN apt-get update
RUN apt-get install openjdk-8-jdk --assume-yes

COPY . /app
WORKDIR /app
RUN chown --recursive appuser /app

USER appuser
RUN mkdir src/utils/samldata
RUN npm install
RUN npm run build
EXPOSE 3000

CMD ["npm", "start"]
