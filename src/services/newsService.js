import { HttpRequest } from '~/utils';

export const getNews = async () => {
    try {
        const res = await HttpRequest.get('/news', {});
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const getNewsDetail = async (slug) => {
    try {
        const res = await HttpRequest.get(`/news/${slug}`, {});
        return res.data;
    } catch (error) {
        throw error;
    }
};

