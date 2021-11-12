# Dater

An application for creating reminders and getting email notifications for impending dates.

## set up

0. run "npm i" at root level

1. Start JSON Server via docker

    - Navigate to the docker folder
    - run:
        - docker build -t json-server .
        - docker run -it --name json-server-container -d -p 5432:8080 json-server
        - docker cp .\db.json json-server-container:/tmp/test.json
        - if needed restart docker container

2. Start React server

-   Navigate to root level
-   For dev run:
    -   npm start
-   For production run:
    -   docker build -t dater-react-app .
    -   docker run -it --name dater-react-app --rm -d -v %cd%:/app -v /app/node_modules -p 4000:3000 -e CHOKIDAR_USEPOLLING=true dater-react-app

## Front-end

### Technical info

-   uses React framework, react prime components and axios.
-   Ports:
    -   prod uses: 4000
    -   dev uses: 4001

### ToDo:

-   [ ] Entry form
    -   [x] Form UI is created
    -   [x] uses POST request
    -   [ ] field validation;
    -   [ ] User can implement C function
-   [ ] <ins>Change Entry Data</ins>
    -   [x] Form UI is created
    -   [x] uses GET requests for pulling
    -   [x] add Delete functionality
    -   [x] add proper form fields with css
    -   [x] add PUT functionality
    -   [ ] field validation
    -   [ ] User can implement U & D functions
-   [ ] config tools to change email aadress, port and reminder email template
    -   [ ] UI is created
    -   [ ] UI uses GET & POST requests
    -   [ ] field validation
-   [x] Table to display current entry´s
    -   [x] Table UI is created
    -   [x] table gets data from GET request
    -   [x] table is sortable
    -   [x] User can click on the table field and be redirected to update view
-   [x] Mock-data with JSON
    -   [x] Create local json-server, to serve API requests, for in-depth FE development.
    -   [x] Dockerize json-server.
-   [x] Dockerize react app
-   [ ] misc tasks
    -   [x] Define SQL schema datafields
    -   [ ] Convert all dockerfiles to docker-compose format
-   [ ] Sequentsial email functionality, (if person wants emails every day or every other day!)
- [ ] Add loading animations
- [ ] Setup Heroku CI/CD pipeline
- [ ] Add 80% test coverage
- [ ] Add proper entry and update confirmations (green thumbs up, or smth like that)
- [ ] add error handling for API requests
- [ ] convert Bootstrap styling to Semnantics UI



### Connection ports:
- spring back-end server:
    -   dev uses: 5001
    -   prod uses: 5000
- JSON server : 
    - dev uses: 5432
