FROM node:14.1-alpine AS builder

WORKDIR /opt/web
COPY package.json ./
RUN npm install

ENV PATH="./node_modules/.bin:$PATH"

COPY . ./
RUN npm run build
CMD [ "npm", "start" ]

