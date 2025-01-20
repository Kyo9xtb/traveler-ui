import { HttpRequest } from '~/utils';

const getLogin = async () => {
    try {
        const options = {
            withCredentials: true,
        };
        const res = await HttpRequest.get('/user/me', options);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const postAuthor = async (data) => {
    try {
        const res = await HttpRequest.post(`/user`, data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const postLogin = async (data) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };
        const body = JSON.stringify(data);
        const res = await HttpRequest.post(`/user/login`, body, config);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const postCheckEmail = async (data) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };
        const body = JSON.stringify(data);
        const res = await HttpRequest.post(`/user/email`, body, config);
        return res.data;
    } catch (error) {
        throw error;
    }
};

const postLogout = async () => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };
        const body = JSON.stringify();
        const res = await HttpRequest.post(`/user/logout`, body, config);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export { postAuthor, postLogin, postLogout, postCheckEmail, getLogin };
