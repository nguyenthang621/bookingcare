import {
    postBookingAppointmentServices,
    getAllSpecialtyServices,
    getAllClinicServices,
    getHandbookServices,
} from '../../services/patientServices';
import actionTypes from './actionTypes';
import { toast } from 'react-toastify';

export const postBookingAppointment = (data) => {
    return async (dispatch) => {
        try {
            let res = await postBookingAppointmentServices(data);
            if (res && res.errorCode === 0) {
                dispatch({ type: actionTypes.POST_BOOKING_APPOINTMENT_SUCCESS });
                toast.success(res.message, {
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
            dispatch({ type: actionTypes.POST_BOOKING_APPOINTMENT_FAIL });
            toast.success('BOOKING_APPOINTMENT_FAIL', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };
};

export const getAllSpecialty = () => {
    return async (dispatch) => {
        try {
            let specialtyData = await getAllSpecialtyServices();
            if (specialtyData && specialtyData.errorCode === 0) {
                dispatch({ type: actionTypes.GET_ALL_SPECIALTY_SUCCESS, data: specialtyData.data });
            }
        } catch (error) {
            console.log(error);
            dispatch({ type: actionTypes.GET_ALL_SPECIALTY_FAIL });
        }
    };
};
export const getAllClinicRedux = (isGetImage) => {
    return async (dispatch) => {
        try {
            let clinicData = await getAllClinicServices(isGetImage);
            if (clinicData && clinicData.errorCode === 0) {
                dispatch({ type: actionTypes.GET_ALL_CLINIC_SUCCESS, data: clinicData.data });
            }
        } catch (error) {
            console.log(error);
            dispatch({ type: actionTypes.GET_ALL_CLINIC_FAIL });
        }
    };
};
export const getHandbookRedux = () => {
    return async (dispatch) => {
        try {
            let handbookData = await getHandbookServices();
            if (handbookData && handbookData.errorCode === 0) {
                dispatch({ type: actionTypes.GET_ALL_HANDBOOK_SUCCESS, data: handbookData.data });
            }
        } catch (error) {
            console.log(error);
            dispatch({ type: actionTypes.GET_ALL_HANDBOOK_FAIL });
        }
    };
};
