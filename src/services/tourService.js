import * as httpRequest from '~/utils/httpRequest';

const getTour = async () => {
    try {
        const res = await httpRequest.get('/tour', {});
        return res.result;
    } catch (error) {
        throw error;
    }
};
const getTourDetail = async (slug) => {
    try {
        const res = await httpRequest.get(`/tour/${slug}`, {});
        return res.result;
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
        const res = await httpRequest.post(`/book-tour`, data, config);
        return res;
    } catch (error) {
        throw error;
    }
};
export { getTour, getTourDetail, postTourBookings };
