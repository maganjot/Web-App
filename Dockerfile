FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install
# Bundle app source
COPY . /usr/src/app

RUN npm install -g http-server
RUN npm install -g grunt
RUN grunt production

WORKDIR /usr/src/app/dist/

ENTRYPOINT ["http-server", "-s", "-p", "8090"]

EXPOSE 8090
