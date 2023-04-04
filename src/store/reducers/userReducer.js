import actionTypes from '../actions/actionTypes';
import { classCookies } from '../../cookies';

const initialState = {
    isLoggedIn: false,
    userInfo: classCookies.getDataAccessToken(),
    language: 'vi',
    queueNews: '',
    queueHandbook: '',
    detailUser: {},
    roleId: classCookies.getDataAccessToken()?.roleId,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfor || classCookies.getDataAccessToken(),
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
        case actionTypes.GET_QUEUE_NEW_SUCCESS:
            return {
                ...state,
                queueNews: action.data,
            };
        case actionTypes.GET_QUEUE_NEW_FAIL:
            return {
                ...state,
            };
        case actionTypes.GET_DETAIL_USER_SUCCESS:
            return {
                ...state,
                detailUser: action.data,
            };
        case actionTypes.GET_DETAIL_USER_FAIL:
            return {
                ...state,
            };
        case actionTypes.GET_QUEUE_HANDBOOK_SUCCESS:
            return {
                ...state,
                queueHandbook: action.data,
            };
        case actionTypes.GET_QUEUE_HANDBOOK_FAIL:
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default userReducer;
