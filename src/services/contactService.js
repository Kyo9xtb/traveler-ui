import { HttpRequest } from '~/utils';

export const postContact = async (data) => {
    try {
        const res = await HttpRequest.post(`/contact-customer`, data);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

