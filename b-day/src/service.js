import axios from 'axios';

class Service {
    getUsers(REST_API_URL) {
        console.log('in service ', REST_API_URL);
        let resData = null;
        let isPending = null;
        let error = null;
        axios
            .get(REST_API_URL)
            .then((res) => {
                if (res.statusText !== '') {
                    throw Error('could not fetch the data');
                } // adds a error check, so that if the server exists but the endpoint is not available/ down then throw an error
                // return res.json();
                return res;
            })
            .then((data) => {
                console.log('data is ', data);
                resData = data;
                isPending = false;
                error = null;
            });

        /*const abortCont = new AbortController();
        axios.get(REST_API_URL, {signal:abortCont.signal})
          .then(res => {
            if(res.statusText !== "") {throw Error("could not fetch the data")}  // adds a error check, so that if the server exists but the endpoint is not available/ down then throw an error
            // return res.json();
            return res;
          })
          .then(data => {
            console.log('data is ', data)
            resData = (data);
            isPending = (false);
            error = (null);
          })
          .catch( err => {
            if (err.name==="AbortError"){
              console.log("fetch aborted");
            }else {
              error = (err.message);
              isPending = (false);
            }
          })  // it will catch network errors/ cant connect to the server at all
    console.log(resData);*/
        return { resData, isPending, error };
    }

    getUserByID(REST_API_URL, id) {
        const path = REST_API_URL + id;
        axios.get(path).then(function (response) {
            return response;
        });
    }
    postNewUser(REST_API_URL, storage) {
        axios.post(REST_API_URL, storage).then((res) => {
            return res;
        });
    }
    deleteUser(REST_API_URL, item_id) {
        const path = REST_API_URL + '/' + item_id;
        axios.delete(path).then(function (response) {
            console.log(response);
            return response;
        });
    }
    Delete(URL, item_id) {
        const path = URL + item_id;
        axios.delete(path).then(() => {
            window.location.reload();
        });
    }
    PUT(URL, id, data) {
        const path = URL + id;
        console.log('data is');
        console.log(data);

        console.log('Put path is ', path);
        axios.put(path, data).then(() => {
            window.location.reload();
        });
    }
}

export default new Service();
