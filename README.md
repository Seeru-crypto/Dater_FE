# Dater

An application for creating reminders and getting email notifications for impending dates.

## set up

0. run "npm i" at root level

1. Start JSON Server via docker

    - Navigate to the docker folder
    - run:
    ```
    docker build -t json-server .
    docker run -it --name json-server-container -d -p 5432:8080 json-server
    docker cp .\db.json json-server-container:/tmp/test.json
    ```
    - if needed restart docker container

2. Start React server

-   Navigate to root level
-   For dev run:
    -   `npm start`
-   For production run:
    -   `docker build -t dater-react-app .`
    -   `docker run -it --name dater-react-app --rm -d -v %cd%:/app -v /app/node_modules -p 4000:3000 -e CHOKIDAR_USEPOLLING=true dater-react-app`

## Front-end

### Technical info

-   uses React library, Primereact components and axios.
-   Ports:
    -   prod uses: 4000
    -   dev uses: 4001

### ToDo:
  - [ ] Heroku CI/CD
     - [x] Deploy front-end
     - [x] Setup live DB
     - [ ] Deploy Back-end
     - [ ] Run integration tests to confirm functionality is intact
  - [x] event form
      -   [x] Form UI is created
      -   [x] uses POST request
      -   [x] field validation;
      -   [x] User can implement C function
      -   [x] user gets a notification if post is successful
  - [x] Change event Data
      -   [x] Form UI is created
      -   [x] uses GET requests for pulling
      -   [x] add Delete functionality
      -   [x] add proper form fields with css
      -   [x] add PUT functionality
      -   [x] field validation
      -   [x] User can implement U & D functions
      -   [x] user gets a notification if delete or post is successful
  - [ ] Admin view, change email aadress, port and reminder email template
      - [x] UI is created
      - [x] UI uses GET & POST requests
      - [ ] field validation
      - [ ] Sequentsial email option, (if person wants emails every day or every other day!)
  - [x] Table to display current event´s
      -   [x] Table UI is created
      -   [x] table gets data from GET request
      -   [x] table is sortable
      -   [x] User can click on the table field and be redirected to update view
  - [x] Mock-data with JSON
      -   [x] Create local json-server, to serve API requests, for in-depth FE development.
      -   [x] Dockerize json-server.
  - [x] Dockerize react app
  - [ ] misc tasks
      -   [x] Define SQL schema datafields
      -   [ ] Convert all dockerfiles to docker-compose format
  - [x] create a general calendar view, where ALL dates are displayed (ignore year values).
  - [ ] Add 66% test coverage (unit + integration tests)
  - [x] Add proper entry and update confirmations (green thumbs up, or smth like that)
  - [x] add error handling for API requests
  - [x] convert Bootstrap styling to Prime-react
  - [ ] Styling
      - [x] fix mobile view
      - [x] Add incorrect field specific css, to signal a field is missing or incorrectly filled. 
      - [x] Add loading animations
      - [ ] Export all inline styling into a App.css file / styled components
      - [x] Add a manual button for switching themes on the navBar far right side
      - [x] Make the website switch to dark theme, when the current time is between 18.00 - 07.00

### Connection ports:
- spring back-end server:
    -   dev uses: 5001
    -   prod uses: 5000
- JSON server : 
    - uses: 5432
- MongoDB server:
    - uses : 27017
