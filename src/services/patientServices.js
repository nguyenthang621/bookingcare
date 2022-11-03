import axios from '../axios';

const postBookingAppointmentServices = async (data) => {
    try {
        return await axios.post(`/api/patient-booking-appointment`, data);
    } catch (error) {
        console.log(error);
    }
};
const verifyBookingAppointmentServices = async (data) => {
    try {
        return await axios.post(`/api/verify-appointment`, data);
    } catch (error) {
        console.log(error);
    }
};

const getAllSpecialtyServices = async () => {
    try {
        return await axios.get(`/api/all-specialty`);
    } catch (error) {
        console.log(error);
    }
};
const getSpecialtyByIdServices = async (id, location) => {
    try {
        return await axios.get(`/api/get-specialty-by-id?id=${id}&location=${location}`);
    } catch (error) {
        console.log(error);
    }
};

export {
    postBookingAppointmentServices,
    verifyBookingAppointmentServices,
    getAllSpecialtyServices,
    getSpecialtyByIdServices,
};
