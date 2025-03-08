import { HttpRequest } from '~/utils';

const getTour = async () => {
    try {
        const res = await HttpRequest.get('/tour', {});
        return res.data.result || res.data.data ? res.data.result : res.data;
    } catch (error) {
        throw error;
    }
};
const getTourDetail = async (slug) => {
    try {
        const res = await HttpRequest.get(`/tour/${slug}`, {});
        return res.data.result || res.data.data ? res.data.result : res.data;
    } catch (error) {
        throw error;
    }
};

const postTourBookings = async (data) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const res = await HttpRequest.post(`/book-tour`, data, config);
        return res.data;
    } catch (error) {
        throw error;
    }
};
export { getTour, getTourDetail, postTourBookings };
