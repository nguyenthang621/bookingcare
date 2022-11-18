import actionTypes from './actionTypes';
import { classCookies } from '../../cookies';
import { processLogoutServices } from '../../services/userServices';

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
// export const processLogout = () => ({ type: actionTypes.PROCESS_LOGOUT_SUCCESS });
export const processLogout = () => {
    return async (dispatch) => {
        try {
            let refreshToken = classCookies.getRefreshToken();
            let res = await processLogoutServices(refreshToken);
            if (res && res.errorCode === 0) {
                dispatch({ type: actionTypes.PROCESS_LOGOUT_SUCCESS });
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
