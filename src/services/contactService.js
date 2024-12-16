import * as httpRequest from '~/utils/httpRequest';

const postContact = async (data) => {
    try {
        // const config = {
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     withCredentials: true,
        // };
        // const body = JSON.stringify(data);
        const res = await httpRequest.post(`/contact`, data);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export { postContact };
