FROM node:20-alpine

WORKDIR /frontend

COPY package.json package-lock.json ./

COPY . .

RUN npm install
RUN npm run build





