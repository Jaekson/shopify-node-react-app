# Sample embedded app

## Installation

1. Make sure you have [**node**](https://nodejs.org/), [**yarn**](https://yarnpkg.com/), [**docker**](https://www.docker.com/products/docker-desktop) installed.
2. install dependencies

   ```
   $ yarn install
   ```

## Running through docker

1. Build docker image

   ```
   $ docker build -t docker-shopify-image .
   ```

2. Run docker container

   ```
   $ docker run -p 3002:3001 --name docker-shopify-container docker-shopify-image
   ```

## Running locally

```
$ yarn dev
```











