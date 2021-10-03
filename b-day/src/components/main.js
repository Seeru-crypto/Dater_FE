import React, { useState, useEffect } from 'react';
//import { getUsers } from '../service';
import useGetData from './API/get-data';
import { usePostData } from './API/post-data';

const Main = () => {
    const [test, setTest] = useState('');
    const [test2, setTest2] = useState('');

    //const service = new Service();

    const { data, isPending, error } = useGetData(
        `http://localhost:3000/users`
    );

    useEffect(() => {
        //setTest(getUsers('http://localhost:3000/users'));
    }, []);

    return (
        <div>
            {data && data.data.map((entry) => <p>{entry.name}</p>)}
            <button onClick={usePostData}> Click me!</button>
        </div>
    );
};
export default Main;
