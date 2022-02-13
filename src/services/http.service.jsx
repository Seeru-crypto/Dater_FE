import axios from 'axios';
import config from "../config.json"

const path = process.env.REACT_APP_TOKEN_API_PATH || config.API_PATH

const http = axios.create({
    baseURL: path,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default http;
