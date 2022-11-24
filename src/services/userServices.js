import axios from '../axios';
import axiosJWT from '../axiosJWT';

const handleLoginApi = async (userName, password) => {
    try {
        return await axios.post('/api/login', { email: userName, password: password });
    } catch (error) {
        console.log(error);
    }
};
const registerServices = async (data) => {
    try {
        return await axios.post('/api/register', data);
    } catch (error) {
        console.log(error);
    }
};

const getUsersById = async (inputId) => {
    try {
        return await axiosJWT.get(`/api/get-users?id=${inputId}`);
    } catch (error) {
        console.log(error);
    }
};

const createUserServices = async (dataUser) => {
    try {
        return await axiosJWT.post('/api/create-user', dataUser);
    } catch (error) {
        console.log(error);
    }
};

const deleteUserServices = async (id) => {
    try {
        return await axiosJWT.delete('/api/delete-user', { data: { id: id } });
    } catch (error) {
        console.log(error);
    }
};

const editUserServices = async (user) => {
    try {
        return await axiosJWT.put('/api/update-user', user);
    } catch (error) {
        console.log(error);
    }
};

const getAllCodeServices = async (type) => {
    try {
        return await axios.get(`/api/allcode?type=${type}`);
    } catch (error) {
        console.log('fail', error);
    }
};

// post specialty
const postSpecialtyServices = async (data) => {
    try {
        return await axiosJWT.post('/api/post-specialty', data);
    } catch (error) {
        console.log(error);
    }
};
// post detail clinic
const postDetailClinicServices = async (data) => {
    try {
        return await axiosJWT.post('/api/post-detail-clinic', data);
    } catch (error) {
        console.log(error);
    }
};

// post detail clinic
const refreshToken = async () => {
    try {
        return await axiosJWT.post('/api/refresh-token');
    } catch (error) {
        console.log(error);
    }
};

// logout
const processLogoutServices = async (refreshToken) => {
    try {
        return await axiosJWT.post('/api/logout', { refreshToken: refreshToken });
    } catch (error) {
        console.log(error);
    }
};

export {
    handleLoginApi,
    getUsersById,
    createUserServices,
    deleteUserServices,
    editUserServices,
    getAllCodeServices,
    postSpecialtyServices,
    postDetailClinicServices,
    refreshToken,
    processLogoutServices,
    registerServices,
};
