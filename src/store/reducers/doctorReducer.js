import actionTypes from '../actions/actionTypes';

const initialState = {
    topDoctors: [],
    allDoctor: [],
    detailDoctor: [],
    schedule: [],
    scheduleDoctorCurrent: [],
    DoctorRelatedInfor: [],
    listAppointment: [],
    statusId: 'S2',
};

const doctorReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            return {
                ...state,
                topDoctors: action.data,
            };
        case actionTypes.FETCH_TOP_DOCTOR_FAIL:
            return {
                ...state,
                topDoctors: [],
            };
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            return {
                ...state,
                allDoctor: action.data,
            };
        case actionTypes.FETCH_ALL_DOCTOR_FAIL:
            return {
                ...state,
                allDoctor: [],
            };
        case actionTypes.GET_DETAIL_DOCTOR_SUCCESS:
            return {
                ...state,
                detailDoctor: action.data,
            };
        case actionTypes.GET_DETAIL_DOCTOR_FAIL:
            return {
                ...state,
                detailDoctor: [],
            };
        case actionTypes.FETCH_ALLCODE_SCHEDULE_SUCCESS:
            return {
                ...state,
                schedule: action.data,
            };
        case actionTypes.FETCH_ALLCODE_SCHEDULE_FAIL:
            return {
                ...state,
                schedule: [],
            };
        case actionTypes.GET_SCHEDULE_DOCTOR_SUCCESS:
            return {
                ...state,
                scheduleDoctorCurrent: action.data,
            };
        case actionTypes.GET_SCHEDULE_DOCTOR_FAIL:
            return {
                ...state,
                scheduleDoctorCurrent: [],
            };
        case actionTypes.FETCH_RELATE_TO_DOCTOR_INFOR_SUCCESS:
            return {
                ...state,
                DoctorRelatedInfor: action.data,
            };
        case actionTypes.FETCH_RELATE_TO_DOCTOR_INFOR_FAIL:
            return {
                ...state,
                DoctorRelatedInfor: [],
            };
        case actionTypes.GET_APPOINTMENT_DOCTOR_SUCCESS:
            return {
                ...state,
                listAppointment: action.data,
                // statusId: action.data.statusId,
            };
        case actionTypes.GET_APPOINTMENT_DOCTOR_FAIL:
            return {
                ...state,
                listAppointment: [],
                // statusId: 'S3',
            };
        case actionTypes.CHANGE_STATUS_SUCCESS:
            return {
                ...state,
                statusId: action.data,
            };
        case actionTypes.CHANGE_STATUS_FAIL:
            return {
                ...state,
                statusId: 'S3',
            };

        default:
            return state;
    }
};

export default doctorReducer;
