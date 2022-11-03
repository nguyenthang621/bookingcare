import actionTypes from '../actions/actionTypes';

const initialState = {
    topDoctors: [],
    allDoctor: [],
    detailDoctor: [],
    schedule: [],
    scheduleDoctorCurrent: [],
    DoctorRelatedInfor: [],
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

        default:
            return state;
    }
};

export default doctorReducer;
