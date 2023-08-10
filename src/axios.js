import axios from 'axios';
// import _ from 'lodash';

// instance.interceptors.response.use((response) => {
//     return response.data;
// });
const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true,
    timeout: 7000,
});

instance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default instance;
