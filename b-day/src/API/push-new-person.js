import React from 'react';
import axios from 'axios';

export const PushNewPerson = () => {
  const data = {
    name: "test",
    birth_day: "01/01/2000",
    reminder: false,
    reminder_days: 0,
    id:12
  };
    axios({
    method: 'post',
    // url: '/login',
    url: 'http://localhost:3000/users',
    data:data
  });





}
