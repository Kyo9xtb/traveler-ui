import { HttpRequest } from '~/utils';

export const getAuth = async () => {
    try {
        const options = {
            withCredentials: true,
        };
        const res = await HttpRequest.get('/customer/auth/me', options);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const postAuthor = async (data) => {
    try {
        const res = await HttpRequest.post(`/customer/auth/me`, data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const login = async (data) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const body = JSON.stringify(data);
        const res = await HttpRequest.post(`/customer/auth/login`, body, config);
        return res.data.original;
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    try {
        const res = await HttpRequest.post(`/customer/auth/logout`);
        return res.data.original;
    } catch (error) {
        throw error;
    }
};

export const register = async (data) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const body = JSON.stringify(data);
        const res = await HttpRequest.post(`/customer/auth/register`, body, config);
        return res.data;
    } catch (error) {
        throw error;
    }
};