import axios from 'axios';

//Adding token to request header
export function setTokenHeader(token) {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

//API calls - this allows for sending generic api calls
//This function can be imported anywhere for making requests
export function apiCall(method, path, data) {
    return new Promise((resolve, reject) => {
        return axios[method](path, data)
               .then(res => resolve(res.data))
               .catch( err => reject(err.response.data.error));
    });
}
