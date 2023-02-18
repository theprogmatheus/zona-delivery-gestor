# Docker Build Stage
FROM node:current-alpine AS build


# Build Stage
WORKDIR /opt/app

COPY ./ /opt/app

ENV REACT_APP_API_HOST=https://api-v2.zonadelivery.net

RUN npm install
RUN npm run build


# Docker Build Stage
FROM nginx:alpine

COPY --from=build /opt/app/build/ /usr/share/nginx/html/
COPY --from=build /opt/app/nginx.conf /etc/nginx/nginx.conf

ENV PORT 80

EXPOSE $PORT

CMD ["nginx", "-g", "daemon off;"]