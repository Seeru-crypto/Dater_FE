#set up

0. run "npm i" at root lever

1. Start JSON Server via docker

   - Navigate to the docker folder

   - run:
     - docker build -t json-server .
     - docker run -it --name json-server-container -d -p 5432:8080 json-server
     - docker cp .\db.json json-server-container:/tmp/test.json
     - if needed restart docker container

2. Start React server, run "npm start" at root level
