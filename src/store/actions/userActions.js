import actionTypes from './actionTypes';
import { classCookies } from '../../cookies';
import { classStorage } from '../../storage';
import { processLogoutServices } from '../../services/userServices';
import { getDetailUserServices } from '../../services/patientServices';

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS,
});

export const userLoginSuccess = (userInfo, roleId) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo,
    roleId: roleId,
});

export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL,
});

export const processLogout = () => {
    return async (dispatch) => {
        try {
            let res = await processLogoutServices();

            if (res && res.errorCode === 0) {
                dispatch({ type: actionTypes.PROCESS_LOGOUT_SUCCESS });
                classStorage.removeItemStorage('refreshToken');
                classCookies.removeToken('refreshToken');
                classCookies.removeToken('accessToken');
            } else {
                console.log('You are not user');
                dispatch({ type: actionTypes.PROCESS_LOGOUT_FAIL });
            }
        } catch (error) {
            console.log(error);
            dispatch({ type: actionTypes.PROCESS_LOGOUT_FAIL });
        }
    };
};
export const getDetailUser = () => {
    return async (dispatch) => {
        try {
            let dataUser = await getDetailUserServices();

            if (dataUser && dataUser.errorCode === 0) {
                dispatch({ type: actionTypes.GET_DETAIL_USER_SUCCESS, data: dataUser.data });
            } else {
                dispatch({ type: actionTypes.GET_DETAIL_USER_FAIL });
            }
        } catch (error) {
            console.log(error);
            dispatch({ type: actionTypes.GET_DETAIL_USER_FAIL });
        }
    };
};
