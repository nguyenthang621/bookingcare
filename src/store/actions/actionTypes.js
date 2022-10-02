const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',

    //language
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',

    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'ADMIN_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',

    // admin:
    FETCH_GENDER_SUCCESS: 'FETCH_GENDER_SUCCESS',
    FETCH_GENDER_FAIL: 'FETCH_GENDER_FAIL',

    FETCH_POSITION_SUCCESS: 'FETCH_POSITION_SUCCESS',
    FETCH_POSITION_FAIL: 'FETCH_POSITION_FAIL',

    FETCH_KEY_FORM_SUCCESS: 'FETCH_KEY_FORM_SUCCESS',
    FETCH_KEY_FORM_FAIL: 'FETCH_KEY_FORM_FAIL',
});

export default actionTypes;