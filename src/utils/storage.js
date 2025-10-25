export const STORAGE_KEYS = {
    USER: 'SaoVietTraveler:user',
    CART: 'SaoVietTraveler:cart',
    TOKEN: 'SaoVietTraveler:token',
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
