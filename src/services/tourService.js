import { HttpRequest } from '~/utils';

export const getTour = async () => {
    try {
        const res = await HttpRequest.get('/tour');
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const getTourDetail = async (slug) => {
    try {
        const res = await HttpRequest.get(`/tour/${slug}`, {});
        return res.data;
    } catch (error) {
        throw error;
    }
};
