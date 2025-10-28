import { HttpRequest } from '~/utils';

export const getCart = async (queryParams) => {
    try {
        const res = await HttpRequest.get(`/cart`, { params: queryParams });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const postCart = async (data) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };
        const body = JSON.stringify(data);
        const res = await HttpRequest.post(`/cart`, body, config);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const putCart = async ( data) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };
        const body = JSON.stringify(data);
        const res = await HttpRequest.put(`/cart`, body, config);
        return res.data;
    } catch (error) {
        throw error;
    }
};
