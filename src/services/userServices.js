import axios from '../axios';
import axiosJWT from '../axiosJWT';

const handleLoginApi = async (userName, password) => {
    try {
        return await axios.post('/api/login', { email: userName, password: password });
    } catch (error) {
        console.log(error);
        // return error?.response?.data;
    }
};
const registerServices = async (data) => {
    try {
        return await axios.post('/api/register', data);
    } catch (error) {
        console.log(error);
        return error?.response?.data;
    }
};

const getUsersById = async (inputId) => {
    try {
        return await axios.get(`/api/get-users?id=${inputId}`);
    } catch (error) {
        console.log(error);
        return error?.response?.data;
    }
};
const filterAndPagingUser = async (paramsSearch = {}) => {
    let { page = 0, limit = 10, keyword = '', roleId = '' } = paramsSearch;
    try {
        return await axiosJWT.get(`/api/filter-user?page=${page}&limit=${limit}&keyword=${keyword}&roleId=${roleId}`);
    } catch (error) {
        console.log(error);
        return error?.response?.data;
    }
};

const createUserServices = async (dataUser) => {
    try {
        return await axiosJWT.post('/api/create-user', dataUser);
    } catch (error) {
        console.log(error);
        return error?.response?.data;
    }
};

const deleteUserServices = async (id) => {
    try {
        return await axiosJWT.delete('/api/delete-user', { data: { id: id } });
    } catch (error) {
        console.log(error);
        return error?.response?.data;
    }
};

const editUserServices = async (user) => {
    try {
        return await axiosJWT.put('/api/update-user', user);
    } catch (error) {
        console.log(error);
        return error?.response?.data;
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
        return error?.response?.data;
    }
};
// post detail clinic
const postDetailClinicServices = async (data) => {
    try {
        return await axiosJWT.post('/api/post-detail-clinic', data);
    } catch (error) {
        console.log(error);
        return error?.response?.data;
    }
};

// post detail clinic
const refreshToken = async () => {
    try {
        return await axiosJWT.post('/api/refresh-token');
    } catch (error) {
        console.log(error);
        return error?.response?.data;
    }
};

// logout
const processLogoutServices = async () => {
    try {
        return await axiosJWT.post(`/api/logout`);
    } catch (error) {
        console.log('error:::', error);
        return error?.response?.data;
    }
};

// post handbook:
const postHandbookServices = async (data) => {
    try {
        return await axiosJWT.post('/api/post-handbook', data);
    } catch (error) {
        console.log(error);
        return error?.response?.data;
    }
};
const confirmHandbookServices = async (id) => {
    try {
        return await axiosJWT.post(`/api/confirm-handbook?id=${id}`);
    } catch (error) {
        console.log(error);
        return error?.response?.data;
    }
};
const deleteHandbookServices = async (id) => {
    try {
        if (!id) id = '';
        return await axiosJWT.post(`/api/delete-handbook?id=${id}`);
    } catch (error) {
        console.log(error);
        return error?.response?.data;
    }
};
const checkQueueHandbookServices = async () => {
    try {
        return await axiosJWT.get(`/api/check-queue-handbook`);
    } catch (error) {
        console.log(error);
        return error?.response?.data;
    }
};

// News
const postNewsServices = async (data) => {
    try {
        return await axiosJWT.post('/api/post-news', data);
    } catch (error) {
        console.log(error);
        return error?.response?.data;
    }
};
const confirmNewsServices = async (id) => {
    try {
        return await axiosJWT.post(`/api/confirm-news?id=${id}`);
    } catch (error) {
        console.log(error);
        return error?.response?.data;
    }
};
const deleteNewsServices = async (id) => {
    try {
        if (!id) id = '';
        return await axiosJWT.post(`/api/delete-news?id=${id}`);
    } catch (error) {
        console.log(error);
        return error?.response?.data;
    }
};
const checkQueueNewsServices = async () => {
    try {
        return await axiosJWT.get(`/api/check-queue-news`);
    } catch (error) {
        console.log(error);
        return error?.response?.data;
    }
};

const filterAndPagingClinic = async (page = 0, limit = 5, keyword = '') => {
    try {
        return await axios.get(`/api/filter-paging-clinic?page=${page}&limit=${limit}&keyword=${keyword}`);
    } catch (error) {
        console.log(error);
        return error?.response?.data;
    }
};
const filterAndPagingSpecialty = async (page = 0, limit = 5, keyword = '') => {
    try {
        return await axios.get(`/api/filter-paging-specialty?page=${page}&limit=${limit}&keyword=${keyword}`);
    } catch (error) {
        console.log(error);
        return error?.response?.data;
    }
};

const deleteClinicByIdServices = async (id) => {
    try {
        return await axiosJWT.delete(`/api/clinic/${id}`);
    } catch (error) {
        console.log(error);
        return error?.response?.data;
    }
};
const deleteSpecialtyByIdServices = async (id) => {
    try {
        return await axiosJWT.delete(`/api/specialty/${id}`);
    } catch (error) {
        console.log(error);
        return error?.response?.data;
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
    postHandbookServices,
    confirmHandbookServices,
    deleteHandbookServices,
    postNewsServices,
    confirmNewsServices,
    deleteNewsServices,
    checkQueueNewsServices,
    checkQueueHandbookServices,
    filterAndPagingUser,
    filterAndPagingClinic,
    deleteClinicByIdServices,
    filterAndPagingSpecialty,
    deleteSpecialtyByIdServices,
};
