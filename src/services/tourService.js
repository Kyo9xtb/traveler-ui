import * as httpRequest from '~/utils/httpRequest';

const get = async () => {
    try {
        const res = await httpRequest.get('/tour', {});
        return res.result;
    } catch (error) {
        console.log(error);
    }
};
const getTour = async (slug) => {
    try {
        const res = await httpRequest.get(`/tour/${slug}`, {});
        return res.result;
    } catch (error) {
        console.log(error);
    }
};
export { get, getTour };
