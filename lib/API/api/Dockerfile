FROM node:14

# Create app directory
RUN mkdir -p /api
WORKDIR /api

# Install app dependencies
COPY package*.json /api/
RUN npm install

# Bundle app source
COPY . /api

EXPOSE 80

CMD npm run dev