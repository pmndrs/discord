FROM node:12

WORKDIR .

COPY package*.json ./

RUN npm ci --only=production

COPY . .
