import * as httpRequest from '~/utils/httpRequest';

// const getNews = async () => {
//     try {
//         const res = await httpRequest.get('/news', {});
//         return res.result;
//     } catch (error) {
//         console.log(error);
//     }
// };
// const getNewsDetail = async (slug) => {
//     try {
//         const res = await httpRequest.get(`/news/${slug}`, {});
//         return res.result;
//     } catch (error) {
//         console.log(error);
//     }
// };
const getLogin = async () => {
    try {
        const options = {
            withCredentials: true,
        };
        const res = await httpRequest.get('/user/me', options);
        return res;
    } catch (error) {
        // console.error('Error fetching data:', error);
        throw error;
    }
};
const postAuthor = async (data) => {
    try {
        const res = await httpRequest.post(`/user`, data);
        return res;
    } catch (error) {
        // console.error('Error fetching data:', error);
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
        const res = await httpRequest.post(`/user/login`, body, config);
        return res;
    } catch (error) {
        // console.error('Error fetching data:', error);
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
        const res = await httpRequest.post(`/user/email`, body, config);
        return res;
    } catch (error) {
        // console.error('Error fetching data:', error);
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
        const res = await httpRequest.post(`/user/logout`, body, config);
        return res;
    } catch (error) {
        // console.error('Error fetching data:', error);
        throw error;
    }
};
export { postAuthor, postLogin, postLogout, postCheckEmail, getLogin };
