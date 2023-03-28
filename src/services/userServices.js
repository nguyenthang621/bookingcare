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
const filterAndPagingUser = async (paramsSearch = {}) => {
    let { page = 0, limit = 10, keyword = '', roleId = '' } = paramsSearch;
    try {
        return await axiosJWT.get(`/api/filter-user?page=${page}&limit=${limit}&keyword=${keyword}&roleId=${roleId}`);
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
const processLogoutServices = async () => {
    try {
        return await axiosJWT.post('/api/logout');
    } catch (error) {
        console.log(error);
    }
};

// post handbook:
const postHandbookServices = async (data) => {
    try {
        return await axiosJWT.post('/api/post-handbook', data);
    } catch (error) {
        console.log(error);
    }
};
const confirmHandbookServices = async (id) => {
    try {
        return await axiosJWT.post(`/api/confirm-handbook?id=${id}`);
    } catch (error) {
        console.log(error);
    }
};
const deleteHandbookServices = async (id) => {
    try {
        if (!id) id = '';
        return await axiosJWT.post(`/api/delete-handbook?id=${id}`);
    } catch (error) {
        console.log(error);
    }
};
const checkQueueHandbookServices = async () => {
    try {
        return await axiosJWT.get(`/api/check-queue-handbook`);
    } catch (error) {
        console.log(error);
    }
};

// News
const postNewsServices = async (data) => {
    try {
        return await axiosJWT.post('/api/post-news', data);
    } catch (error) {
        console.log(error);
    }
};
const confirmNewsServices = async (id) => {
    try {
        return await axiosJWT.post(`/api/confirm-news?id=${id}`);
    } catch (error) {
        console.log(error);
    }
};
const deleteNewsServices = async (id) => {
    try {
        if (!id) id = '';
        return await axiosJWT.post(`/api/delete-news?id=${id}`);
    } catch (error) {
        console.log(error);
    }
};
const checkQueueNewsServices = async () => {
    try {
        return await axiosJWT.get(`/api/check-queue-news`);
    } catch (error) {
        console.log(error);
    }
};

const filterAndPagingClinic = async (page = 0, limit = 5, keyword = '') => {
    try {
        return await axiosJWT.get(`/api/filter-paging-clinic?page=${page}&limit=${limit}&keyword=${keyword}`);
    } catch (error) {
        console.log(error);
    }
};
const filterAndPagingSpecialty = async (page = 0, limit = 5, keyword = '') => {
    try {
        return await axiosJWT.get(`/api/filter-paging-specialty?page=${page}&limit=${limit}&keyword=${keyword}`);
    } catch (error) {
        console.log(error);
    }
};

const deleteClinicByIdServices = async (id) => {
    try {
        return await axiosJWT.delete(`/api/clinic/${id}`);
    } catch (error) {
        console.log(error);
    }
};
const deleteSpecialtyByIdServices = async (id) => {
    try {
        return await axiosJWT.delete(`/api/specialty/${id}`);
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
