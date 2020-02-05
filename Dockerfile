FROM node:alpine

RUN mkdir /app && \
    cd /app

COPY . /app
WORKDIR /app

RUN npm install && \

CMD npm start 
