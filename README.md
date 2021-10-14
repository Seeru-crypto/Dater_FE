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


##ToDo:
###Front-end
- uses port 4000 
- [ ] Entry form
  - [x] Form UI is created
  - [ ] uses POST request
  - [ ] User can implement C function
- [ ] Change Entry Data
    - [ ] Form UI is created
    - [ ] uses GET & API request
    - [ ] User can implement U & D functions
- [ ] config tools to change email aadress/ port
- [ ] Table to display current entry´s 
    - [x] Table UI is created
    - [x] table gets data from GET request
    - [ ] table can be filtered
    - [ ] User can click on the table field and be redirected to update view
- [ ] Create react-app Dockerfile


###Back-End
- uses port 5000

- [ ] During start-up server creates a custom schema to DB
- [ ] Server can implement CRUD functionality to DB
- [ ] Server Check the dates in DB once every 24h
- [ ] function that sends e-mail to designated aadress
- [ ] Create server Dockerfile


### PostGRE Database
- uses port 5432
- [ ] Create DB Dockerfile, with default settings
