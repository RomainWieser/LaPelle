FROM node:argon

ENV NODE_ENV production 

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY dist /usr/src/app

# Install app dependencies
RUN npm install

EXPOSE 8080
CMD [ "npm", "start" ]
