import { HttpRequest } from '~/utils';

const postContact = async (data) => {
    try {
        const res = await HttpRequest.post(`/contact`, data);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export { postContact };
