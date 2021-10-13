

docker build -t json-server .
docker run --rm -it --name jsonserver-container -p 5432:8080 json-server
docker cp C:\Users\Green\Documents\Repo\bDay_front-end\db.json json-server-container:/tmp/test.json
