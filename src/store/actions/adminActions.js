import actionTypes from './actionTypes';
import { getAllCodeServices } from '../../services/userServices';

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
export const fetchKeyFormSuccess = (keyForm) => ({
    type: actionTypes.FETCH_KEY_FORM_SUCCESS,
    data: keyForm,
});
export const fetchKeyFormFail = () => ({
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
