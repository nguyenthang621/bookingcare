import {
    getTopDoctorServices,
    getAllDoctorService,
    getDetailDoctorService,
    saveScheduleDoctorServices,
    getScheduleDoctorByDateService,
    getAppointmentDoctorService,
} from '../../services/doctorServices';
import { getAllCodeServices } from '../../services/userServices';
import { getAllSpecialtyServices, getAllClinicServices } from '../../services/patientServices';
import actionTypes from './actionTypes';
import { toast } from 'react-toastify';

export const fetchTopDoctor = (limit) => {
    return async (dispatch) => {
        try {
            let res = await getTopDoctorServices(limit);
            if (res && res.errorCode === 0) {
                dispatch({ type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS, data: res.data });
            }
        } catch (error) {
            console.log('error fetch top doctors :', error);
            dispatch({ type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS });
        }
    };
};

export const fetchAllDoctor = () => {
    return async (dispatch) => {
        try {
            let res = await getAllDoctorService();
            if (res && res.errorCode === 0) {
                dispatch({ type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS, data: res.data });
            } else {
                console.log('zo fetch all doctor fail');
                dispatch({ type: actionTypes.FETCH_ALL_DOCTOR_FAIL });
            }
        } catch (error) {
            console.log(error);
            dispatch({ type: actionTypes.FETCH_ALL_DOCTOR_FAIL });
        }
    };
};

export const getDetailDoctor = (id) => {
    return async (dispatch) => {
        try {
            if (!id) {
                dispatch({ type: actionTypes.GET_DETAIL_DOCTOR_FAIL });
            } else {
                let res = await getDetailDoctorService(id);
                dispatch({ type: actionTypes.GET_DETAIL_DOCTOR_SUCCESS, data: res.data });
            }
        } catch (error) {
            console.log(error);
            dispatch({ type: actionTypes.GET_DETAIL_DOCTOR_FAIL });
        }
    };
};

export const fetchAllcodeSchedule = () => {
    return async (dispatch) => {
        try {
            let res = await getAllCodeServices('TIME');
            if (res && res.errorCode === 0) {
                dispatch({ type: actionTypes.FETCH_ALLCODE_SCHEDULE_SUCCESS, data: res.data });
            } else {
                dispatch({ type: actionTypes.FETCH_ALLCODE_SCHEDULE_FAIL });
            }
        } catch (error) {
            console.log(error);
            dispatch({ type: actionTypes.FETCH_ALLCODE_SCHEDULE_FAIL });
        }
    };
};

export const saveScheduleDoctor = (data) => {
    return async (dispatch) => {
        try {
            let res = await saveScheduleDoctorServices(data);
            if (res && res.errorCode === 0) {
                dispatch({ type: actionTypes.SAVE_SCHEDULE_DOCTOR_SUCCESS });
                toast.success(res.message, {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                dispatch({ type: actionTypes.SAVE_SCHEDULE_DOCTOR_FAIL });
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
            console.log(error);
            dispatch({ type: actionTypes.SAVE_SCHEDULE_DOCTOR_FAIL });
        }
    };
};

export const getScheduleDoctorByDate = (doctorId, date) => {
    return async (dispatch) => {
        try {
            let res = await getScheduleDoctorByDateService(doctorId, date);
            if (res && res.errorCode === 0) {
                dispatch({ type: actionTypes.GET_SCHEDULE_DOCTOR_SUCCESS, data: res.data });
            } else {
                dispatch({ type: actionTypes.GET_SCHEDULE_DOCTOR_FAIL });
            }
        } catch (e) {
            console.log(e);
            dispatch({ type: actionTypes.GET_SCHEDULE_DOCTOR_FAIL });
        }
    };
};
export const getAppointmentDoctor = (doctorId, initDate, statusId) => {
    return async (dispatch) => {
        try {
            let res = await getAppointmentDoctorService(doctorId, initDate, statusId);
            if (res && res.errorCode === 0) {
                res.data.statusId = statusId;
                dispatch({ type: actionTypes.GET_APPOINTMENT_DOCTOR_SUCCESS, data: res.data });
            } else {
                dispatch({ type: actionTypes.GET_APPOINTMENT_DOCTOR_FAIL });
            }
        } catch (e) {
            console.log(e);
            dispatch({ type: actionTypes.GET_APPOINTMENT_DOCTOR_FAIL });
        }
    };
};
export const changeStatusId = (statusId) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.CHANGE_STATUS_SUCCESS, data: statusId });
        } catch (e) {
            console.log(e);
            dispatch({ type: actionTypes.CHANGE_STATUS_FAIL });
        }
    };
};

export const fetchRelateToDoctorInfor = () => {
    return async (dispatch) => {
        try {
            let result = {};
            let resListPrice = await getAllCodeServices('PRICE');
            let resListPayment = await getAllCodeServices('PAYMENT');
            let resListProvince = await getAllCodeServices('PROVINCE');
            let resListClinics = await getAllClinicServices();
            let resListSpecialty = await getAllSpecialtyServices();

            if (
                resListPrice &&
                resListPrice.errorCode === 0 &&
                resListPayment &&
                resListPayment.errorCode === 0 &&
                resListProvince &&
                resListProvince.errorCode === 0 &&
                resListSpecialty &&
                resListSpecialty.errorCode === 0 &&
                resListClinics &&
                resListClinics.errorCode === 0
            ) {
                result.listPrice = resListPrice.data;
                result.listPayment = resListPayment.data;
                result.listProvince = resListProvince.data;
                result.listSpecialty = resListSpecialty.data;
                result.listClinics = resListClinics.data;
                dispatch({ type: actionTypes.FETCH_RELATE_TO_DOCTOR_INFOR_SUCCESS, data: result });
            } else {
                dispatch({ type: actionTypes.FETCH_RELATE_TO_DOCTOR_INFOR_FAIL });
            }
        } catch (error) {
            console.log(error);
            dispatch({ type: actionTypes.FETCH_RELATE_TO_DOCTOR_INFOR_FAIL });
        }
    };
};
