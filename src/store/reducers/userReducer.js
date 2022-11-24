import actionTypes from '../actions/actionTypes';
import { classCookies } from '../../cookies';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    language: 'vi',
    roleId: classCookies.getDataAccessToken()?.roleId,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfor,
                roleId: action.roleId,
            };
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
            };
        case actionTypes.PROCESS_LOGOUT_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
            };
        case actionTypes.PROCESS_LOGOUT_FAIL:
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default userReducer;
