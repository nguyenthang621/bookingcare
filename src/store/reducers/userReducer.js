import actionTypes from '../actions/actionTypes';
import { getCookies } from '../../cookies';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    language: 'vi',
    roleId: getCookies.getToken().roleId,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo,
                roleId: action.roleId,
            };
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
            };
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
            };

        default:
            return state;
    }
};

export default userReducer;
