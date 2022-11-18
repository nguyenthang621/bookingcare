import axios from '../axios';
import axiosJWT from '../axiosJWT';

const getTopDoctorServices = async (limit) => {
    try {
        return await axios.get(`/api/top-doctor-home?limit=${limit}`);
    } catch (error) {
        console.log(error);
    }
};

const getAllDoctorService = async () => {
    try {
        return await axios.get(`/api/get-all-doctor`);
    } catch (error) {
        console.log(error);
    }
};

const saveDetailDoctorServices = async (data) => {
    try {
        return await axiosJWT.post(`/api/save-detail-doctor`, data);
    } catch (error) {
        console.log(error);
    }
};

const getDetailDoctorService = async (id) => {
    try {
        return await axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
    } catch (error) {
        console.log(error);
    }
};
const getDoctorService = async (id) => {
    try {
        return await axios.get(`/api/get-doctor-by-id?id=${id}`);
    } catch (error) {
        console.log(error);
    }
};

const saveScheduleDoctorServices = async (data) => {
    try {
        return await axiosJWT.post(`/api/save-schedule-doctor`, data);
    } catch (error) {
        console.log(error);
    }
};

const getScheduleDoctorByDateService = async (doctorId, date) => {
    try {
        return await axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
    } catch (e) {
        console.log(e);
    }
};

export {
    getTopDoctorServices,
    getAllDoctorService,
    saveDetailDoctorServices,
    getDetailDoctorService,
    saveScheduleDoctorServices,
    getScheduleDoctorByDateService,
    getDoctorService,
};
