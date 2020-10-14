# # Dockerfile for client

# # Stage 1: Build react client
# FROM node:14.10.0

# # Working directory be app
# WORKDIR /usr/src/app

# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # copy local files to app folder
# COPY . .

# EXPOSE 3000

# CMD ["npm","start"]

# build environment
FROM node:13.12.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@3.4.0 -g --silent
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]