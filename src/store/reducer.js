import { saveToStorage, STORAGE_KEYS } from '~/utils';
import {
    SET_INFO_USER,
    SET_OFFCANVAS_MENU,
    SEARCH_TOUR,
    SET_SHOW_SEARCH,
    ADD_TO_CART,
    UPDATE_TO_CART,
    DELETE_TO_CART,
    CLEAR_TO_CART,
    SET_VALUE_CART,
    ADD_VALUE_CART,
    ADD_DATA,
    SET_INFO_CART,
    SET_AUTHEN,
} from './constants';

function reducer(state, action) {
    const persistCart = (cart) => {
        saveToStorage(STORAGE_KEYS.CART, cart);
        return { ...state, cart };
    };

    switch (action.type) {
        case ADD_DATA:
            return {
                ...state,
                listData: action.payload,
            };

        case SET_AUTHEN:
            return {
                ...state,
                isAuthen: action.payload,
            };

        case SET_INFO_USER:
            return {
                ...state,
                user: action.payload,
            };

        case SET_OFFCANVAS_MENU:
            return {
                ...state,
                setOffCanvasMenu: action.payload,
            };

        case SEARCH_TOUR:
            return {
                ...state,
                search: action.payload,
            };

        case SET_SHOW_SEARCH:
            return {
                ...state,
                setShowSearch: action.payload,
            };

        case SET_VALUE_CART:
            return {
                ...state,
                setValueCart: action.payload,
            };

        case ADD_VALUE_CART:
            return persistCart(action.payload);

        case SET_INFO_CART:
            return {
                ...state,
                infoCart: action.payload,
            };
        case ADD_TO_CART: {
            // Gộp cart cũ và mới theo id + guestCode
            const mergedCartMap = new Map();

            [...state.cart, ...action.payload].forEach((item) => {
                const key = `${item.tourId}_${item.guestId}_${item.departureDate}`;
                if (!mergedCartMap.has(key)) {
                    mergedCartMap.set(key, { ...item });
                } else {
                    const exist = mergedCartMap.get(key);
                    mergedCartMap.set(key, {
                        ...exist,
                        quantity: (exist.quantity || 0) + (item.quantity || 0),
                    });
                }
            });

            const newCart = Array.from(mergedCartMap.values());
            return persistCart(newCart);
        }

        case UPDATE_TO_CART:
            const updateCart = state.cart.map((product) => {
                if (
                    product.tourId === action.payload.tourId &&
                    product.guestId === action.payload.guestId &&
                    product.departureDate === action.payload.departureDate
                ) {
                    return {
                        ...product,
                        quantity: action.payload.quantity,
                        totalPrice: action.payload.quantity * product.price,
                    };
                }
                return product;
            });
            return persistCart(updateCart);

        case DELETE_TO_CART:
            const filteredCart = state.cart.filter((product) => {
                return !(
                    product.id === action.payload.id &&
                    product.guestCode === action.payload.guestCode &&
                    product.departureDate === action.payload.departureDate
                );
            });

            return persistCart(filteredCart);

        case CLEAR_TO_CART:
            return persistCart([]);
        default:
            throw new Error('Invalid action type');
    }
}

export default reducer;
