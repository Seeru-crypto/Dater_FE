# Dater

This is Dater front-end. It is built using React, Redux & primereact components. User can add events, change admin settings and receive emails. 

[Back-end github repo](https://github.com/Seeru-crypto/Dater_BE)


## set up

1. Start React server

1.5 Dev server:
   1. run `npm i` at root level
   2. Navigate to root level
   3. run `npm start`

**OR**

For production docker run 
    - `docker build -f Dockerfile -t dater-react-app .`
    - `docker run -it --rm -p 5000:80 dater-react-app`


## Front-end

### ToDo:
  - [x] Heroku CI/CD
     - [x] configure env settings
     - [x] Deploy front-end
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
      - [x] field validation
      - [ ] Sequential email option (none, every other day, daily)
  - [x] Table to display current event´s
      -   [x] Table UI is created
      -   [x] table gets data from GET request
      -   [x] table is sortable
      -   [x] User can click on the table field and be redirected to update view
  - [x] Mock-data with JSON
      -   [x] Create local json-server, to serve API requests, for in-depth FE development.
      -   [x] Dockerize json-server.
  - [x] Dockerize react app
  - [x] create a general calendar view, where ALL dates are displayed (ignore year values).
  - [x] Add proper entry and update confirmations (green thumbs up, or smth like that)
  - [x] add error handling for API requests
  - [x] SMS functionality
    - [x] add sms isEnabled and phone number fields to admin
    - [x] update Log table to handle sms specific data
  - [x] convert Bootstrap styling to Prime-react
  - [ ] Styling
      - [x] Add incorrect field specific css, to signal a field is missing or incorrectly filled. 
      - [x] Add loading animations
      - [x] Export all inline styling into a App.css file / styled components
      - [x] Add a manual button for switching themes on the navBar far right side
      - [ ] fix mobile view
