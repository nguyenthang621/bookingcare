import actionTypes from './actionTypes';
import {
    getAllCodeServices,
    createUserServices,
    filterAndPagingUser,
    editUserServices,
    checkQueueNewsServices,
    checkQueueHandbookServices,
} from '../../services/userServices';

import { toast } from 'react-toastify';

export const fetchKeyForm = () => {
    return async (dispatch, getState) => {
        try {
            let keyForm = {};
            let genderRes = await getAllCodeServices('gender');
            let PositionRes = await getAllCodeServices('position');
            let RoleRes = await getAllCodeServices('role');
            keyForm.genders = genderRes;
            keyForm.positions = PositionRes;
            keyForm.roles = RoleRes;

            if (checkRes(keyForm)) {
                keyForm.genders = [...genderRes.data];
                keyForm.positions = [...PositionRes.data];
                keyForm.roles = [...RoleRes.data];
                dispatch(fetchKeyFormSuccess(keyForm));
            } else {
                dispatch(fetchKeyFormFail());
            }
        } catch (error) {
            dispatch(fetchKeyFormFail());
            console.log('fetch Fail: ', error);
        }
    };
};

//get all key word form data:
const fetchKeyFormSuccess = (keyForm) => ({
    type: actionTypes.FETCH_KEY_FORM_SUCCESS,
    data: keyForm,
});
const fetchKeyFormFail = () => ({
    type: actionTypes.FETCH_KEY_FORM_FAIL,
});

const checkRes = (res) => {
    let result = false;
    for (let key in res) {
        if (res[key] && res[key].errorCode === 0) {
            result = true;
        } else {
            return false;
        }
    }
    return result;
};
//----------------------------------------
//create new user redux
export const createNewUserRedux = (dataUser) => {
    return async (dispatch) => {
        try {
            let res = await createUserServices(dataUser);
            if (res && res.errorCode === 0) {
                dispatch(createNewUserReduxSuccess());
                toast.success('Create new user done', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(filterAndPagingUserRedux());
            } else {
                dispatch(createNewUserReduxFail());
                toast.error(res.message, {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            dispatch(createNewUserReduxFail());
            console.log('create user redux Fail: ', error);
        }
    };
};

const createNewUserReduxSuccess = () => ({
    type: actionTypes.CREATE_USER_REDUX_SUCCESS,
});
const createNewUserReduxFail = () => ({
    type: actionTypes.CREATE_USER_REDUX_FAIL,
});
//----------------------------------------------------------------
// fetch all users :

export const filterAndPagingUserRedux = (paramsSearch) => {
    return async (dispatch) => {
        try {
            let res = await filterAndPagingUser(paramsSearch);
            if (res && res.errorCode === 0) {
                dispatch(filterAndPagingUserReduxSuccess(res.data));
            } else {
                console.log('errorCode -1');
                dispatch(filterAndPagingUserReduxFail());
            }
        } catch (error) {
            console.log('fail get all user redux :', error);
            dispatch(filterAndPagingUserReduxFail());
        }
    };
};

const filterAndPagingUserReduxSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    data,
});
const filterAndPagingUserReduxFail = () => ({
    type: actionTypes.FETCH_ALL_USER_FAIL,
});

// update user

export const editUserRedux = (user) => {
    return async (dispatch) => {
        try {
            let res = await editUserServices(user);
            if (res && res.errorCode === 0) {
                dispatch({ type: actionTypes.UPDATE_USER_SUCCESS });
                toast.success('update user succeed', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(filterAndPagingUserRedux());
            } else {
                dispatch({ type: actionTypes.UPDATE_USER_FAIL });
            }
        } catch (error) {
            dispatch({ type: actionTypes.UPDATE_USER_FAIL });
            console.log('update user fail: ' + error);
        }
    };
};
export const checkQueueNewsRedux = () => {
    return async (dispatch) => {
        try {
            let res = await checkQueueNewsServices();
            if (res && res.errorCode === 0) {
                dispatch({ type: actionTypes.GET_QUEUE_NEW_SUCCESS, data: res.queueNews });
            } else {
                dispatch({ type: actionTypes.GET_QUEUE_NEW_FAIL });
            }
        } catch (error) {
            dispatch({ type: actionTypes.GET_QUEUE_NEW_FAIL });
            console.log(error);
        }
    };
};
export const checkQueueHandbookRedux = () => {
    return async (dispatch) => {
        try {
            let res = await checkQueueHandbookServices();
            if (res && res.errorCode === 0) {
                dispatch({ type: actionTypes.GET_QUEUE_HANDBOOK_SUCCESS, data: res.queueHandbooks });
            } else {
                dispatch({ type: actionTypes.GET_QUEUE_HANDBOOK_FAIL });
            }
        } catch (error) {
            dispatch({ type: actionTypes.GET_QUEUE_HANDBOOK_FAIL });
            console.log(error);
        }
    };
};
