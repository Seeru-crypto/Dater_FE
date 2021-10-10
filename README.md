#set up

npm start
json-server --watch db.json --- json-server -p 5432 db.json

line 3 will start the react server
line 4 will start the JSON server, which will mock a Backend server.

npm install -g json-server
npm install axios

docker -t name-of-image .

docker run -d -p 8000:80 name-of-image

docker run -d -p 5432:80 -v C:/Users/Green/Documents/Repo/bDay_front-end/db.json:/data/db.json json-server
