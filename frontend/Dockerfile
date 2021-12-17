# FROM node:16.13.0-buster as dev 

# WORKDIR /code

# COPY package.json package.json
# COPY package-lock.json package-lock.json

# RUN npm install

# COPY . .

# CMD [ "npm","run","start"]

FROM node:14.18.2-alpine3.14 as build 

WORKDIR /code

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci --production

COPY . .

RUN npm run build

RUN npm install -g serve

CMD ["npx", "serve", "-s","build"]

# # NGINX web server
# FROM nginx:1.12-alpine as prod

# COPY --from=build /code/build /usr/share/nginx/html

# EXPOSE 80

# CMD ["nginx","-g","daemon off;"]