import actionTypes from '../actions/actionTypes';

const initialState = {
    listDataSpecialty: [],
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

        default:
            return state;
    }
};

export default patientReducer;
