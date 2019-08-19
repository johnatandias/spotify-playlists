# ------ Node ------ #
FROM node:12.8.1-alpine as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json

RUN npm install --silent
RUN npm install react-scripts@3.1.0 -g --silent

COPY . /app
RUN npm run build

# ------ Nginx ------ #

FROM nginx:1.17.3-alpine

COPY --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY docker/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
