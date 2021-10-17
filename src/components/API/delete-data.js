import React from 'react';
import axios from 'axios';

export const DeleteData = async (url, id) => {
    const path = url + '/' + id;
    console.log('Delete data', path);
    const res = await axios.delete(path);
    console.log('Delete result', res.status);
    return res.status;
};

export const GetData = async (url) => {
    const axios = require('axios').default;
    const res = await axios.get(url);
    console.log('new final res ', res);
    return res;
};

export const PostData = async (url, data) => {
    console.log('in posted!');
    const axios = require('axios').default;
    const res = axios.post(url, data);
    console.log('POST res is ', res);
};
