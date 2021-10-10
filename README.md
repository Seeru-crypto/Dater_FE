#set up

0. run "npm i" at root lever

1. Start JSON Server via docker

   - Navigate to the docker folder

   - run:
     - docker build -t json-server .
     - docker run --rm -it --name jsonserver-container -p 5432:8080 json-server
     - docker cp \bDay_front-end\db.json json-server-container:/tmp/test.json
     - if needed restart docker container

2. Start React server, run "npm start" at root level

   - docker run -it --name jsonserver-container -p 5432:8080 json-server

     VS

   - docker run -it --name jsonserver-container -d -p 5432:8080 json-server
