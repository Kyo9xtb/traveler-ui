import {
    SET_INFO_USER,
    SET_OFFCANVAS_MENU,
    SEARCH_TOUR,
    SET_SHOW_SEARCH,
    ADD_TO_CART,
    UPDATE_TO_CART,
    DELETE_TO_CART,
    CLEAR_TO_CART,
} from './constants';

const initState = {
    setOffCanvasMenu: false,
    setShowSearch: false,
    user: {},
    search: {},
    cart: [],
};
const storageCarts = JSON.parse(localStorage.getItem('SaoVietTravler-Carts'));
initState.cart = storageCarts || [];
function reducer(state, action) {
    switch (action.type) {
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

        case ADD_TO_CART:
            let newCart = [];
            if (state.cart.length > 0) {
                newCart = action.payload.map((product) => {
                    let found = false;
                    const updatedProduct = state.cart.reduce(
                        (acc, item) => {
                            if (product.tour_id === item.tour_id && product.customer_type === item.customer_type) {
                                acc.quantity += item.quantity;
                                found = true;
                            }
                            return acc;
                        },
                        { ...product },
                    );

                    return found ? updatedProduct : product;
                });

                const filterCart = state.cart.filter(
                    (item) =>
                        !action.payload.some(
                            (product) =>
                                product.tour_id === item.tour_id && product.customer_type === item.customer_type,
                        ),
                );

                newCart = [...filterCart, ...newCart];
            } else {
                newCart = [...state.cart, ...action.payload];
            }

            console.log('newCart', newCart);
            localStorage.setItem('SaoVietTravler-Carts', JSON.stringify(newCart));
            return {
                ...state,
                cart: newCart,
            };

        case UPDATE_TO_CART:
            const updateCart = state.cart.map((product) => {
                if (
                    product.tour_id === action.payload.tour_id &&
                    product.customer_type === action.payload.customer_type
                ) {
                    return { ...product, quantity: action.payload.quantity };
                }
                return product;
            });
            localStorage.setItem('SaoVietTravler-Carts', JSON.stringify(updateCart));
            return {
                ...state,
                cart: updateCart,
            };
        case DELETE_TO_CART:
            let deleteCart = [];
            deleteCart = state.cart.filter((product) => {
                return !(
                    product.tour_id === action.payload.tour_id && product.customer_type === action.payload.customer_type
                );
            });
            localStorage.setItem('SaoVietTravler-Carts', JSON.stringify(deleteCart));
            return {
                ...state,
                cart: deleteCart,
            };
        case CLEAR_TO_CART:
            localStorage.setItem('SaoVietTravler-Carts', JSON.stringify([]));
            return {
                ...state,
                cart: action.payload,
            };
        default:
            throw new Error('Invalid action type');
    }
}

export default reducer;
export { initState };
