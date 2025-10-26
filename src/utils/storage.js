export const STORAGE_KEYS = {
    USER: 'SaoVietTraveler:user',
    CART: 'SaoVietTraveler:cart',
    TOKEN: 'SaoVietTraveler:token',
    TOURS: 'SaoVietTraveler:tours',
    NEWS: 'SaoVietTraveler:news',
    PLACES: 'SaoVietTraveler:places',
};

export const loadFromStorage = (key, fallback = null) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : fallback;
    } catch {
        return fallback;
    }
};
export const saveToStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
export const removeFromStorage = (key) => localStorage.removeItem(key);

export const loadFromSession = (key, fallback = null) => {
    try {
        const data = sessionStorage.getItem(key);
        return data ? JSON.parse(data) : fallback;
    } catch {
        return fallback;
    }
};

export const saveToSession = (key, value) => sessionStorage.setItem(key, JSON.stringify(value));
export const removeFromSession = (key) => sessionStorage.removeItem(key);
