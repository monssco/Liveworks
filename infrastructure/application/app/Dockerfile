FROM node:latest

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package*.json /app/
RUN npm install

# Bundle app source
COPY . /app

# Expose port 3000 for nextjs app
EXPOSE 3000

CMD npm run develop