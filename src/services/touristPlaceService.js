import * as httpRequest from '~/utils/httpRequest';

const getTouristPlace = async () => {
    try {
        const res = await httpRequest.get('/tourist-place');
        return res.result;
    } catch (error) {
        throw error;
    }
};
const getTouristPlaceDetails = async (slug) => {
    try {
        const res = await httpRequest.get(`/tourist-place/${slug}`);
        return res.result;
    } catch (error) {
        throw error;
    }
};
const postTouristPlace = async (data) => {
    try {
        const res = await httpRequest.post(`/tourist-place`, data);
        return res;
    } catch (error) {
        throw error;
    }
};
const putTouristPlace = async (id, data) => {
    try {
        const res = await httpRequest.put(`/tourist-place/${id}`, data);
        return res;
    } catch (error) {
        throw error;
    }
};
// const deleteTouristPlace = async (id) => {
//     try {
//         const res = await httpRequest.deleted(`/tourist-place/${id}`);
//         return res;
//     } catch (error) {
//         throw error;
//     }
// };
export { getTouristPlace, getTouristPlaceDetails, postTouristPlace, putTouristPlace };
