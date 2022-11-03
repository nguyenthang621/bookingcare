import Cookies from 'universal-cookie';
import jwt from 'jsonwebtoken';
const cookies = new Cookies();

export const getCookies = {
    getToken: () => {
        let dataToken = '';
        let token = cookies.get('token');
        if (token) {
            dataToken = jwt.verify(token, 'password');
        }
        return dataToken;
    },
};
