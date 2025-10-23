export const toSnakeCase = (str = '') => {
    if (typeof str !== 'string') return '';

    return str
        .trim()
        .replace(/([a-z\d])([A-Z])/g, '$1_$2')
        .replace(/[-\s]+/g, '_')
        .replace(/_+/g, '_')
        .toLowerCase();
};

export const toCamelCase = (str = '') => {
    if (typeof str !== 'string') return '';

    return str
        .trim()
        .toLowerCase()
        .replace(/[-_\s]+(.)?/g, (_, chr) => (chr ? chr.toUpperCase() : ''));
};

export const keysToCamelCase = (data) => {
    if (Array.isArray(data)) {
        return data.map((item) => keysToCamelCase(item));
    } else if (data && typeof data === 'object' && data.constructor === Object) {
        return Object.entries(data).reduce((acc, [key, value]) => {
            acc[toCamelCase(key)] = keysToCamelCase(value);
            return acc;
        }, {});
    }
    return data;
};

export const keysToSnakeCase = (data) => {
    if (Array.isArray(data)) {
        return data.map((item) => keysToSnakeCase(item));
    } else if (data && typeof data === 'object' && data.constructor === Object) {
        return Object.entries(data).reduce((acc, [key, value]) => {
            acc[toSnakeCase(key)] = keysToSnakeCase(value);
            return acc;
        }, {});
    }
    return data;
};

export const toKebabCase = (str = '') => {
    if (typeof str !== 'string') return '';

    return str
        .trim()
        .replace(/([a-z\d])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .replace(/-+/g, '-')
        .toLowerCase();
};
