FROM node:14.1-alpine AS builder
ARG PORT
ARG REACT_APP_BACK_END_URL
ARG REACT_APP_SWAGGER_LINK
ARG REACT_APP_MAIL_EXAMPLE

WORKDIR /opt/web
COPY package.json package-lock.json ./
RUN npm install

ENV PATH="./node_modules/.bin:$PATH"

COPY . ./
RUN REACT_APP_BACK_END_URL=${REACT_APP_BACK_END_URL} \
  PORT=${PORT} \
  REACT_APP_SWAGGER_LINK=${REACT_APP_SWAGGER_LINK} \
  REACT_APP_MAIL_EXAMPLE=${REACT_APP_MAIL_EXAMPLE} \
  npm run build

#RUN npm run build

FROM nginx:1.17-alpine
RUN apk --no-cache add curl
RUN curl -L https://github.com/a8m/envsubst/releases/download/v1.1.0/envsubst-`uname -s`-`uname -m` -o envsubst && \
    chmod +x envsubst && \
    mv envsubst /usr/local/bin
COPY ./nginx.config /etc/nginx/nginx.template
CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
COPY --from=builder /opt/web/build /usr/share/nginx/html
