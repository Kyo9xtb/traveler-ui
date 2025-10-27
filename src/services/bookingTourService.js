import { HttpRequest } from '~/utils';

export const postBookingTour = async (data) => {
    try {
        const res = await HttpRequest.post(`/booking-tour`, data);
        return res.data;
    } catch (error) {
        throw error;
    }
};
