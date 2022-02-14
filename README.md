# Dater

An application for creating reminders and getting email notifications for impending dates.

## set up

1. Start React server

1.5 Dev server: 
    
   1. run `npm i` at root level
   2. Navigate to root level
   3. run `npm start`

**OR**

// ToDo test docker run.
- Docker container:
    -   `docker build -t dater-react-app .` at root level
    -   `docker run -it --name dater-react-app --rm -d -v %cd%:/app -v /app/node_modules -p 4000:3000 -e CHOKIDAR_USEPOLLING=true dater-react-app`


2. To mock backend data start JSON server via docker:

- Navigate to the docker folder
    - run:
    ```
    docker build -t json-server .
    docker run -it --name json-server-container -d -p 5432:8080 json-server
    docker cp .\db.json json-server-container:/tmp/test.json
    ```
    - if needed restart docker container
    
## Front-end

### ToDo:
  - [x] Heroku CI/CD
     - [x] Deploy front-end
     - [x] Setup live DB
     - [x] Deploy Back-end
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
  - [x] misc tasks
      -   [x] Define SQL schema datafields
  - [x] create a general calendar view, where ALL dates are displayed (ignore year values).
  - [x] Add proper entry and update confirmations (green thumbs up, or smth like that)
  - [x] add error handling for API requests
  - [x] convert Bootstrap styling to Prime-react
  - [ ] Styling
      - [x] Add incorrect field specific css, to signal a field is missing or incorrectly filled. 
      - [x] Add loading animations
      - [x] Export all inline styling into a App.css file / styled components
      - [x] Add a manual button for switching themes on the navBar far right side
      - [ ] fix mobile view
