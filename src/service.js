/* import axios from 'axios';

export const getUsers = (REST_API_URL) => {
    const data = axios.get(REST_API_URL);
    return data;
    //console.log('data is service ', data);
};

export const getUserByID = (REST_API_URL, id) => {
    const path = `${REST_API_URL}/${id}`;
    let resData = null;
    let isPending = null;
    let error = null;
    axios.get(path).then((data) => {
        resData = data.data;
        isPending = false;
        //console.log('in service ', resData);
        error = null;
        return { resData, isPending, error };
    });
    //console.log('in service ', resData);
    //return { resData, isPending, error };
};

export const postNewUser = (REST_API_URL, storage) => {
    axios.post(REST_API_URL, storage).then((res) => {
        return res;
    });
};

export const deleteUser = (REST_API_URL, item_id) => {
    const path = REST_API_URL + '/' + item_id;
    axios.delete(path).then(function (response) {
        console.log(response);
        return response;
    });
};

export const Delete = (URL, item_id) => {
    const path = URL + item_id;
    axios.delete(path).then(() => {
        window.location.reload();
    });
};

export const PUT = (URL, id, data) => {
    const path = URL + id;
    console.log('data is');
    console.log(data);
    console.log('Put path is ', path);
    axios.put(path, data).then(() => {
        window.location.reload();
    });
};
 */
