FROM node:19.2.0-alpine
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package*.json  ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start"]