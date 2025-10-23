import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
});

export const get = async (path, config = {}) => {
    try {
        const response = await httpRequest.get(path, config);
        return response;
    } catch (error) {
        throw error;
    }
};

export const post = async (path, data = {}, config = {}) => {
    try {
        const response = await httpRequest.post(path, data, config);
        return response;
    } catch (error) {
        throw error;
    }
};

export const put = async (path, data = {}, config = {}) => {
    try {
        const response = await httpRequest.put(path, data, config);
        return response;
    } catch (error) {
        throw error;
    }
};

export const del = async (path, config = {}) => {
    try {
        const response = await httpRequest.delete(path, config);
        return response;
    } catch (error) {
        throw error;
    }
};

export default httpRequest;
