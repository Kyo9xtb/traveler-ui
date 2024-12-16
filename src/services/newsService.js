import * as httpRequest from '~/utils/httpRequest';

const getNews = async () => {
    try {
        const res = await httpRequest.get('/news', {});
        return res.result;
    } catch (error) {
        console.log(error);
    }
};
const getNewsDetail = async (slug) => {
    try {
        const res = await httpRequest.get(`/news/${slug}`, {});
        return res.result;
    } catch (error) {
        console.log(error);
    }
};
const postNews = async (data) => {
    try {
        const res = await httpRequest.post(`/news`, data);
        return res;
    } catch (error) {
        console.log(error);
    }
};
const putNews = async (id, data) => {
    try {
        const res = await httpRequest.put(`/news/${id}`, data);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export { getNews, getNewsDetail, postNews, putNews };
