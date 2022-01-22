import axios from 'axios';

const backendUrl = "http://localhost:8080/api";

const http = axios.create({
    baseURL: backendUrl,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default http;
