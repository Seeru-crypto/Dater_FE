import axios from 'axios';

const path = process.env.REACT_APP_BACK_END_URL;

const http = axios.create({
    baseURL: path,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default http;
