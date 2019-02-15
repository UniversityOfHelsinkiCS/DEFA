FROM node:8

RUN useradd --create-home --home-dir /app appuser
RUN apt-get update

COPY . /app
WORKDIR /app
RUN chown --recursive appuser /app

USER appuser
RUN npm install
EXPOSE 3001

CMD ["npm", "start"]
