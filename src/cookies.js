import Cookies from 'universal-cookie';

import jwt_decode from 'jwt-decode';

const cookies = new Cookies();

export const classCookies = {
    getAccessToken: () => {
        let accessToken = cookies.get('accessToken');
        if (!accessToken) accessToken = '';

        return accessToken;
    },
    getRefreshToken: () => {
        let refreshToken = cookies.get('refreshToken');
        if (!refreshToken) refreshToken = '';

        return refreshToken;
    },
    setToken: (name, token) => {
        const cookies = new Cookies();
        cookies.set(name, token, { path: '/' });
    },
    removeToken: (name) => {
        cookies.remove(name, { path: '/' });
    },

    getDataAccessToken: () => {
        let dataToken = '';
        let token = '';
        token = cookies.get('accessToken');
        if (token) {
            const decodedToken = jwt_decode(token);
            dataToken = decodedToken;
        }

        return dataToken;
    },
};
