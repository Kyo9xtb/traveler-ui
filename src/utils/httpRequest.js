import axios from 'axios';

const httpRequest = axios.create({
    baseURL: "https://67b5942707ba6e59083d71c4.mockapi.io/api/v1/travler/",
});

export const get = async (path, options = {}, config = {}) => {
    try {
        const response = await httpRequest.get(path, options, config);
        return response;
    } catch (error) {
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
        return response;
    } catch (error) {
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
        return response;
    } catch (error) {
        throw error;
    }
};

export default httpRequest;
