import axios from 'axios';
import { classCookies } from './cookies.js';
import { classStorage } from './storage';
import jwt_decode from 'jwt-decode';
import { refreshToken } from './services/userServices';
import { processLogout } from './store/actions/userActions.js';
import reduxStore from './redux.js';

const axiosjwt = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true,
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
        classCookies.removeToken('refreshToken');

        if (data && data.accessToken) {
            classCookies.setToken('accessToken', data.accessToken);
            classCookies.setToken('refreshToken', data.refreshToken);
            classStorage.setItemStorage('refreshToken', data.refreshToken);
        } else {
            //chuyển sang trang login
            reduxStore.dispatch(processLogout());
        }
    }
    config.headers['accessToken'] = classCookies.getAccessToken();

    return config;
});

axiosjwt.interceptors.response.use((response) => {
    return response.data;
});

export default axiosjwt;
