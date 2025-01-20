import { HttpRequest } from '~/utils';

const getCartAuthor = async (id) => {
    try {
        const res = await HttpRequest.get(`/cart/author/${id}`, {});
        return res;
    } catch (error) {
        throw error;
    }
};
const postCart = async (data) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };
        const body = JSON.stringify(data);
        const res = await HttpRequest.post(`/cart`, body, config);
        return res;
    } catch (error) {
        throw error;
    }
};
const putCart = async (id, data) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };
        const body = JSON.stringify(data);
        const res = await HttpRequest.put(`/cart/${id}`, body, config);
        return res;
    } catch (error) {
        throw error;
    }
};
// const getTourDetail = async (slug) => {
//     try {
//         const res = await HttpRequest.get(`/tour/${slug}`, {});
//         return res.result;
//     } catch (error) {
//         throw error;
//     }
// };

// const postTourBookings = async (data) => {
//     try {
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         };
//         const res = await HttpRequest.post(`/book-tour`, data, config);
//         return res;
//     } catch (error) {
//         throw error;
//     }
// };
export { getCartAuthor, postCart, putCart };
