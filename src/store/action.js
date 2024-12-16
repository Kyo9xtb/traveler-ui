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

const setInfoUser = (payload) => ({
    type: SET_INFO_USER,
    payload,
});
const setOffCanvasMenu = (payload) => ({
    type: SET_OFFCANVAS_MENU,
    payload,
});
const setSearchTour = (payload) => ({
    type: SEARCH_TOUR,
    payload,
});
const setShowSearch = (payload) => ({
    type: SET_SHOW_SEARCH,
    payload,
});
const addToCart = (payload) => ({ type: ADD_TO_CART, payload });
const updateToCart = (payload) => ({ type: UPDATE_TO_CART, payload });
const deleteToCart = (payload) => ({ type: DELETE_TO_CART, payload });
const clearToCart = (payload) => ({ type: CLEAR_TO_CART, payload });

export {
    setInfoUser,
    setOffCanvasMenu,
    setSearchTour,
    setShowSearch,
    addToCart,
    updateToCart,
    deleteToCart,
    clearToCart,
};
