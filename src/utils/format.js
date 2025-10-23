export const formatPrice = (price) => {
    return Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

export const formatDate = (date) => {
    if (!date) {
        return;
    }
    const today = new Date(date);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return dd + '/' + mm + '/' + yyyy;
};

export const readMoneyVietnamese = (number) => {
    if (typeof number !== 'number' || isNaN(number)) return 'Không hợp lệ';

    const units = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
    const scales = ['', 'nghìn', 'triệu', 'tỷ', 'nghìn tỷ', 'triệu tỷ'];

    function readThreeDigits(num) {
        let [hundreds, tens, unitsDigit] = [Math.floor(num / 100), Math.floor((num % 100) / 10), num % 10];
        let result = '';

        if (hundreds > 0) {
            result += `${units[hundreds]} trăm `;
            if (tens === 0 && unitsDigit > 0) result += 'lẻ ';
        }

        if (tens > 1) {
            result += `${units[tens]} mươi `;
            if (unitsDigit === 1) result += 'mốt ';
            else if (unitsDigit === 5) result += 'lăm ';
            else if (unitsDigit > 0) result += `${units[unitsDigit]} `;
        } else if (tens === 1) {
            result += 'mười ';
            if (unitsDigit === 5) result += 'lăm ';
            else if (unitsDigit > 0) result += `${units[unitsDigit]} `;
        } else if (tens === 0 && unitsDigit > 0) {
            result += `${units[unitsDigit]} `;
        }

        return result.trim();
    }

    function splitNumber(num) {
        const chunks = [];
        while (num > 0) {
            chunks.push(num % 1000);
            num = Math.floor(num / 1000);
        }
        return chunks;
    }

    const chunks = splitNumber(number);
    let result = '';

    for (let i = chunks.length - 1; i >= 0; i--) {
        const chunk = chunks[i];
        if (chunk > 0) {
            result += `${readThreeDigits(chunk)} ${scales[i]} `;
        } else if (i === 0 && result === '') {
            result = 'không ';
        }
    }

    return result.trim().replace(/\s+/g, ' ') + ' đồng';
};

export const getFileName = (path = '') => {
    return path.split('/').pop() || '';
};

export const toNonAccentVietnamese = (data) => {
    if (!data) return;
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

export function createMarkup(data) {
    return { __html: `${data}` };
}
