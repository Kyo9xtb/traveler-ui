import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, options = {}, config = {}) => {
    try {
        const response = await httpRequest.get(path, options, config);
        return response.data;
    } catch (error) {
        // console.error('Error fetching data:', error);
        throw error;
    }
};
export const post = async (
    path,
    options = {},
    config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    },
) => {
    try {
        const response = await httpRequest.post(path, options, config);
        return response.data;
    } catch (error) {
        // console.error('Error fetching data:', error);
        throw error;
    }
};
export const put = async (
    path,
    options = {},
    config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    },
) => {
    try {
        const response = await httpRequest.put(path, options, config);
        return response.data;
    } catch (error) {
        // console.error('Error fetching data:', error);
        throw error;
    }
};

export default httpRequest;
