import { HttpRequest } from '~/utils';

export const getTouristPlace = async () => {
    try {
        const res = await HttpRequest.get('/tourist-destinations');
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const getTouristPlaceDetails = async (slug) => {
    try {
        const res = await HttpRequest.get(`/tourist-destinations/${slug}`);
        return res.data;
    } catch (error) {
        throw error;
    }
};
