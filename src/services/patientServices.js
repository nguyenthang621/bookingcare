import axios from '../axios';
import jwt_decode from 'jwt-decode';
import { classStorage } from '../storage';

const postBookingAppointmentServices = async (data) => {
    try {
        return await axios.post(`/api/patient-booking-appointment`, data);
    } catch (error) {
        console.log(error?.response?.data);
        return error?.response?.data;
    }
};
const verifyBookingAppointmentServices = async (data) => {
    try {
        return await axios.post(`/api/verify-appointment`, data);
    } catch (error) {
        console.log(error);
        return error?.response?.data;
    }
};

const getAllSpecialtyServices = async () => {
    try {
        return await axios.get(`/api/all-specialty`);
    } catch (error) {
        console.log(error);
        return error?.response?.data;
    }
};
const getSpecialtyByIdServices = async (id, location) => {
    try {
        return await axios.get(`/api/get-specialty-by-id?id=${id}&location=${location}`);
    } catch (error) {
        console.log(error);
        return error?.response?.data;
    }
};
const getAllClinicServices = async (isGetImageClinic, limit) => {
    try {
        limit = limit || 10;
        return await axios.get(`/api/get-all-clinic?isGetImageClinic=${isGetImageClinic}&limit=${limit}`);
    } catch (error) {
        console.log(error);
        return error?.response?.data;
    }
};
const getDetailClinicByIdServices = async (id) => {
    try {
        return await axios.get(`/api/get-detail-clinic-by-id?id=${id}`);
    } catch (error) {
        console.log(error);
        return error?.response?.data;
    }
};
const getHandbookServices = async (id, type, statusId) => {
    try {
        if (!id) id = '';
        if (!type) type = '';
        return await axios.get(`/api/get-handbook?id=${id}&type=${type}&statusId=${statusId}`);
    } catch (error) {
        console.log(error);
        return error?.response?.data;
    }
};

const getNewsServices = async (id, type, statusId) => {
    try {
        if (!id) id = '';
        if (!type) type = '';
        return await axios.get(`/api/get-news?id=${id}&type=${type}&statusId=${statusId}`);
    } catch (error) {
        console.log(error);
        return error?.response?.data;
    }
};
const getDetailUserServices = async () => {
    try {
        let refreshToken = classStorage.getItemStorage('refreshToken');
        let user = jwt_decode(refreshToken);
        return await axios.get(`/api/get-detail-users/${user.id}`);
    } catch (error) {
        console.log(error);
        return error?.response?.data;
    }
};

const searchAllServices = async (keyword) => {
    try {
        return await axios.get(`/api/search-all?keyword=${keyword}`);
    } catch (error) {
        console.log(error);
        return error?.response?.data;
    }
};
const searchDoctorServices = async (page = 0, limit = 10, keyword = '', roleId = 'R2') => {
    try {
        return await axios.get(`/api/filter-doctor?page=${page}&limit=${limit}&keyword=${keyword}&roleId=${roleId}`);
    } catch (error) {
        console.log(error);
        return error?.response?.data;
    }
};

const pagingHandbook = async (page = 0, limit = 5, statusId = 'S1') => {
    try {
        return await axios.get(`/api/paging-handbook?page=${page}&limit=${limit}&statusId=${statusId}`);
    } catch (error) {
        console.log(error);
        return error?.response?.data;
    }
};

export {
    postBookingAppointmentServices,
    verifyBookingAppointmentServices,
    getAllSpecialtyServices,
    getSpecialtyByIdServices,
    getAllClinicServices,
    getDetailClinicByIdServices,
    getHandbookServices,
    getNewsServices,
    getDetailUserServices,
    searchAllServices,
    searchDoctorServices,
    pagingHandbook,
};
