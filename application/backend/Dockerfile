FROM node:16.11

# Create app directory
RUN mkdir -p /api
WORKDIR /api

# Install app dependencies
COPY package*.json /api/
RUN npm install

RUN npm install -g cross-env

# Bundle app source
COPY . /api

EXPOSE 4000

CMD npm run dev