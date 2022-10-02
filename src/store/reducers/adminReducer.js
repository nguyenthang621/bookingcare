import actionTypes from '../actions/actionTypes';

const initialState = {
    keyForm: [],
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_KEY_FORM_SUCCESS:
            return {
                ...state,
                keyForm: action.data,
            };
        case actionTypes.FETCH_KEY_FORM_FAIL:
            return { ...state };
        default:
            return state;
    }
};

export default adminReducer;
