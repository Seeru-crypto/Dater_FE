FROM debian:10-slim

ENV tmp_dir /tmp

RUN apt-get update \
  && apt-get install -y curl \
  && curl -sL https://deb.nodesource.com/setup_12.x | bash - \
  && apt-get install -y nodejs

RUN npm install -g json-server

RUN echo '{"cars":[{"id":1,"brand":"opel","model":"corsa"},{"id":2,"brand":"ford","model":"fiesta"}]}' > /tmp/test.json

ENTRYPOINT ["json-server", "--port", "8080", "--host", "0.0.0.0"]

CMD ["/tmp/test.json"]