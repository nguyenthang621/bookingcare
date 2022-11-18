import axios from 'axios';
import Cookies from 'universal-cookie';
import { classCookies } from './cookies.js';
import jwt_decode from 'jwt-decode';
import { refreshToken } from './services/userServices';

// import _ from 'lodash';

const axiosjwt = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true,
    // headers: { accessToken: cookies.get('accessToken') },
    // headers: { accessToken: classCookies.getAccessToken() },
});

axiosjwt.interceptors.request.use(async (config) => {
    if (
        config.url.indexOf('/login') >= 0 ||
        config.url.indexOf('/refresh-token') >= 0 ||
        config.url.indexOf('/logout') >= 0
    ) {
        return config;
    }
    const now = new Date().getTime() / 1000;
    const accessToken = classCookies.getAccessToken();

    const decodedToken = jwt_decode(accessToken);
    if (parseInt(decodedToken?.exp) < parseInt(now)) {
        classCookies.removeToken('accessToken');
        const data = await refreshToken();
        if (data && data.accessToken) {
            classCookies.setToken('accessToken', data.accessToken);
        }
    }
    config.headers['accessToken'] = classCookies.getAccessToken();
    return config;
});

// export const isSuccessStatusCode = (s) => {
//     // May be string or number
//     const statusType = typeof s;
//     return (statusType === 'number' && s === 0) || (statusType === 'string' && s.toUpperCase() === 'OK');
// };

// axios.defaults.headers.common['headers'] = { accessToken: cookies.get('accessToken') };

axiosjwt.interceptors.response.use((response) => {
    // Thrown error for request with OK status code
    // const { data } = response;
    return response.data;
});

export default axiosjwt;
