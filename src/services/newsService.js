import { HttpRequest } from '~/utils';

const getNews = async () => {
    try {
        const res = await HttpRequest.get('/news', {});
        return res.data.result || res.data.data ? res.data.result : res.data;
    } catch (error) {
        throw error;
    }
};
const getNewsDetail = async (slug) => {
    try {
        const res = await HttpRequest.get(`/news/${slug}`, {});
        return res.data.result || res.data.data ? res.data.result : res.data;
    } catch (error) {
        throw error;
    }
};
const postNews = async (data) => {
    try {
        const res = await HttpRequest.post(`/news`, data);
        return res.data;
    } catch (error) {
        throw error;
    }
};
const putNews = async (id, data) => {
    try {
        const res = await HttpRequest.put(`/news/${id}`, data);
        return res.data;
    } catch (error) {
        throw error;
    }
};
export { getNews, getNewsDetail, postNews, putNews };
