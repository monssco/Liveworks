FROM node:latest

# Create app directory
RUN mkdir -p /api
WORKDIR /api

# Install app dependencies
COPY package*.json /api/
RUN npm install

# Bundle app source
COPY . /api

EXPOSE 4000

CMD npm run dev