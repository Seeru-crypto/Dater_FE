# Dater
An application for creating reminders and getting email notifications for impending dates. 


## set up

0. run "npm i" at root lever

1. Start JSON Server via docker

   - Navigate to the docker folder

   - run:
     - docker build -t json-server .
     - docker run -it --name json-server-container -d -p 5432:8080 json-server
     - docker cp .\db.json json-server-container:/tmp/test.json
     - if needed restart docker container

2. Start React server, run "npm start" at root level


## ToDo:
### Front-end
- uses React framework, react prime components and axios. 
- uses port 4000 
- [ ] Entry form
  - [x] Form UI is created
  - [ ] uses POST request
  - [ ] field validation
  - [ ] User can implement C function
- [ ] Change Entry Data
    - [ ] Form UI is created
    - [ ] uses GET & POST requests
    - [ ] field validation
    - [ ] User can implement U & D functions
- [ ] config tools to change email aadress, port and reminder email template
    - [ ] UI is created
    - [ ] UI uses GET & POST requests
    - [ ] field validation
- [ ] ***Table to display current entry´s***
    - [x] Table UI is created
    - [x] table gets data from GET request
    - [ ] table can be filtered
    - [ ] User can click on the table field and be redirected to update view
- [x] Mock-data with JSON
   - [x] Create local json-server, to serve API requests, for in-depth FE development.
   - [x] Dockerize json-server.
- [ ] Create react-app Dockerfile


### Back-End
- uses port 5000
- uses ...
- [ ] Server servers API endpoints
   - [ ] uses Swagger automated API documentation
- [ ] During start-up server creates a custom schema to DB
- [ ] Server can implement CRUD functionality to DB
- [ ] Server Check the dates in DB once every 24h
   - [ ] Server just sends the e-mail at a specified date. 
   - [ ] Server checks the dates and takes into account the days before variable, before sending the email. 
- [ ] function that sends e-mail to designated aadress
   - [ ] a function that sends a email
   - [ ] Design a unfiform template for the email, which uses given variables (name of event, date)
   - [ ] a function that that sends the email, using a given template
- [ ] Create server Dockerfile


### PostGRE Database
- uses port 5432
- [ ] Create DB Dockerfile, with default settings
