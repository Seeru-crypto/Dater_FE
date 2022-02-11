import axios from 'axios';
import config from "../config.json"

const http = axios.create({
    baseURL: config.API_PATH,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default http;
