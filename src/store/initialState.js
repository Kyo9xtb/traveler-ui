import { STORAGE_KEYS, loadFromStorage } from '~/utils';

export const initState = {
    showOffCanvasMenu: false,
    showSearch: false,
    showCart: false,
    user: loadFromStorage(STORAGE_KEYS.USER, {}),
    cart: loadFromStorage(STORAGE_KEYS.CART, []),
    search: {},
    listData: {},
};
