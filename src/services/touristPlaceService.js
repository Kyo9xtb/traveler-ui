import { HttpRequest } from '~/utils';

const getTouristPlace = async () => {
    try {
        const res = await HttpRequest.get('/tourist-place');
        console.log('=>>>>>>>>>>>>>>>>>>', res);

        return res.data.result || res.data.data ? res.data.result : res.data;
    } catch (error) {
        throw error;
    }
};
const getTouristPlaceDetails = async (slug) => {
    try {
        const res = await HttpRequest.get(`/tourist-place/${slug}`);
        return res.data.result || res.data.data ? res.data.result : res.data;
    } catch (error) {
        throw error;
    }
};
const postTouristPlace = async (data) => {
    try {
        const res = await HttpRequest.post(`/tourist-place`, data);
        return res.data;
    } catch (error) {
        throw error;
    }
};
const putTouristPlace = async (id, data) => {
    try {
        const res = await HttpRequest.put(`/tourist-place/${id}`, data);
        return res.data;
    } catch (error) {
        throw error;
    }
};
// const deleteTouristPlace = async (id) => {
//     try {
//         const res = await HttpRequest.deleted(`/tourist-place/${id}`);
//         return res;
//     } catch (error) {
//         throw error;
//     }
// };
export { getTouristPlace, getTouristPlaceDetails, postTouristPlace, putTouristPlace };
