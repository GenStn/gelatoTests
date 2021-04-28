# Repo for Cypress Browsers Images:
# https://github.com/cypress-io/cypress-docker-images/tree/master/browsers

#---------------------------Config One---------------------------

# Chrome 89 & Firefox 86

# pull image
FROM cypress/browsers:node14.16.0-chrome89-ff86
# make directory inside container
RUN mkdir /app
WORKDIR /app
# copy cypress code from host to container
COPY . /app
# execute the tests
RUN npm install
RUN $(npm bin)/cypress verify
RUN $(npm bin)/cypress run --browser firefox
RUN $(npm bin)/cypress run --browser chrome


#----------------------------Config Two--------------------------

# Chrome 79 & Firefox 71docker build -t cypress
FROM cypress/browsers:node12.14.0-chrome79-ff71
RUN mkdir /app
WORKDIR /app
COPY . /app
RUN npm install
RUN $(npm bin)/cypress verify
RUN $(npm bin)/cypress run --browser firefox
RUN $(npm bin)/cypress run --browser chrome