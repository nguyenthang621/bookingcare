import actionTypes from '../actions/actionTypes';

const initialState = {
    listDataSpecialty: [],
    listDataClinic: [],
    listDataHandbook: [],
};

const patientReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.POST_BOOKING_APPOINTMENT_SUCCESS:
            return {
                ...state,
            };
        case actionTypes.POST_BOOKING_APPOINTMENT_FAIL:
            return {
                ...state,
            };
        case actionTypes.GET_ALL_SPECIALTY_SUCCESS:
            return {
                ...state,
                listDataSpecialty: action.data,
            };
        case actionTypes.GET_ALL_SPECIALTY_FAIL:
            return {
                ...state,
                listDataSpecialty: [],
            };
        case actionTypes.GET_ALL_CLINIC_SUCCESS:
            return {
                ...state,
                listDataClinic: action.data,
            };
        case actionTypes.GET_ALL_CLINIC_FAIL:
            return {
                ...state,
                listDataClinic: [],
            };
        case actionTypes.GET_ALL_HANDBOOK_SUCCESS:
            return {
                ...state,
                listDataHandbook: action.data,
            };
        case actionTypes.GET_ALL_HANDBOOK_FAIL:
            return {
                ...state,
                listDataHandbook: [],
            };

        default:
            return state;
    }
};

export default patientReducer;
