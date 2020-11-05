FROM node:12.18.2

# Where our code is stored in docker file system
WORKDIR /usr/src/app

# We don't have to mention working directory again and again (. will represent the WORKDIR that we declared earlier)
COPY package.json .
COPY yarn.lock .

# Installs packages
RUN yarn install

# Copy code in working directory
COPY . .

# This port is running inside container, so we need to expose it
EXPOSE 3001

# This command will run once the container starts
# Double quotes mandatory
CMD ["yarn", "dev"]

# -t is the tag name. we have to assign a tag to image
# . is the path of dockerfile. As we are in the same directory we can use .
# docker build -t docker-shopify-image .

# -d run in detached mode
# -p 3002:3001 map the port 3001 that is running in docker to the host's port 3002
# --name is not necessary
# docker run -d -p 3002:3001 --name docker-shopify-container docker-shopify-image

# Enter the container
# $ docker exec -it <container id> /bin/bash