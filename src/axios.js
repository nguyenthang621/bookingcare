import axios from 'axios';
import Cookies from 'universal-cookie';
// import _ from 'lodash';
const cookies = new Cookies();
const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true,
    headers: {
        token: {
            // can be common or any other method
            headers: { token: cookies.get('token') },
        },
    },
});

// const createError = (httpStatusCode, statusCode, errorMessage, problems, errorCode = '') => {
//     const error = new Error();
//     error.httpStatusCode = httpStatusCode;
//     error.statusCode = statusCode;
//     error.errorMessage = errorMessage;
//     error.problems = problems;
//     error.errorCode = errorCode + "";
//     return error;
// };

// export const isSuccessStatusCode = (s) => {
//     // May be string or number
//     const statusType = typeof s;
//     return (statusType === 'number' && s === 0) || (statusType === 'string' && s.toUpperCase() === 'OK');
// };

// axios.defaults.headers.common['headers'] = { token: cookies.get('token') };
// instance.interceptors.request.use((config) => {
//     config.headers.common['headers'] = { token: cookies.get('token') };
//     return config;
// });

instance.interceptors.response.use((response) => {
    // Thrown error for request with OK status code
    // const { data } = response;
    return response.data;
});

export default instance;
