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

2. Start React server

- Navigate to root level
- For dev run:
  - npm start
- For production run:
  - docker build -t dater-react-app .
  - docker run -it --name dater-react-app --rm -d -v %cd%:/app -v /app/node_modules -p 4000:3000 -e CHOKIDAR_USEPOLLING=true dater-react-app

## Front-end

### Technical info

- uses React framework, react prime components and axios.
- Ports:
  - prod uses: 4000
  - dev uses: 4001

### ToDo:

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
- [ ] <ins>Table to display current entry´s</ins>
  - [x] Table UI is created
  - [x] table gets data from GET request
  - [x] table is sortable
  - [ ] User can click on the table field and be redirected to update view
- [x] Mock-data with JSON
  - [x] Create local json-server, to serve API requests, for in-depth FE development.
  - [x] Dockerize json-server.
- [x] Dockerize react app
- [ ] misc tasks
  - [ ] Convert all dockerfiles to docker-compose format

## Back-End

### Technical info

- Ports:
  - prod uses: 5000
  - dev uses: 5001
- uses ...

### ToDo:

- [ ] Server servers API endpoints
  - [ ] uses Swagger automated API documentation
  - [ ] GET events
    - [ ] with specific ID
  - [ ] POST Events
  - [ ] DELETE Event
  - [ ] UPDATE Event
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
