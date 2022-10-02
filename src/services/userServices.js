import axios from '../axios';

const handleLoginApi = async (userName, password) => {
    try {
        return await axios.post('/api/login', { email: userName, password: password });
    } catch (error) {
        console.log(error);
    }
};

const getUsersById = async (inputId) => {
    try {
        return await axios.get(`/api/get-users?id=${inputId}`);
    } catch (error) {
        console.log(error);
    }
};

const createUserServices = async (dataUser) => {
    try {
        return await axios.post('/api/create-user', dataUser);
    } catch (error) {
        console.log(error);
    }
};

const deleteUserServices = async (id) => {
    try {
        return await axios.delete('/api/delete-user', { data: { id: id } });
    } catch (error) {
        console.log(error);
    }
};

const editUserServices = async (user) => {
    try {
        return await axios.put('/api/update-user', user);
    } catch (error) {
        console.log(error);
    }
};

const getAllCodeServices = async (type) => {
    try {
        console.log('services get all code');
        return await axios.get(`/api/allcode?type=${type}`);
    } catch (error) {
        console.log('fail', error);
    }
};

export { handleLoginApi, getUsersById, createUserServices, deleteUserServices, editUserServices, getAllCodeServices };
