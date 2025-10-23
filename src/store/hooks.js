import { useContext } from 'react';
import Context from './Context';

const useStore = () => {
    const [store, dispatch] = useContext(Context);
    return [store, dispatch];
};
const toNonAccentVietnamese = (data) => {
    
    const dataFormat = data
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
        .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
        .replace(/ì|í|ị|ỉ|ĩ/g, 'i')
        .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
        .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
        .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
        .replace(/đ/g, 'd')
        // eslint-disable-next-line no-useless-escape
        .replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '')
        .replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '') // Huyền sắc hỏi ngã nặng
        .replace(/\u02C6|\u0306|\u031B/g, '') // Â, Ê, Ă, Ơ, Ư
        // eslint-disable-next-line no-useless-escape
        .replace(/\-+/gi, '-')
        .replace(/[^\w\s-]/g, '')
        .replace(/^-+|-+$/g, '');
    return dataFormat;
};

function FormatPrice(price) {
    return Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

function FormatDate(date) {
    if (date) {
        const today = new Date(date);
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        return dd + '/' + mm + '/' + yyyy;
    }
}
function createMarkup(data) {
    return { __html: `${data}` };
}
function SnakeCaseVariable(value) {
    return value
        .split(/(?=[A-Z])/)
        .join('_')
        .toLowerCase();
}
export { useStore, toNonAccentVietnamese, FormatPrice, FormatDate, createMarkup, SnakeCaseVariable };
