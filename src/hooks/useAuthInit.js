import { useEffect } from 'react';

import { AuthorService, CartService } from '~/services';
import { actions, useStore } from '~/store';
import { keysToCamelCase, removeFromStorage, saveToStorage, STORAGE_KEYS } from '~/utils';

export function useAuthInit() {
    const [store, dispatch] = useStore();
    const { user } = store;
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { status, error_code, data } = await AuthorService.getAuth();

                if (!(status === 'success' && error_code === 0)) {
                    removeFromStorage(STORAGE_KEYS.TOKEN);
                    removeFromStorage(STORAGE_KEYS.USER);
                    dispatch(actions.setInfoUser({}));
                    return;
                }
                dispatch(actions.setInfoUser(keysToCamelCase(data)));

                const {
                    status: cartStatus,
                    error_code: cartCode,
                    data: cartData,
                } = await CartService.getCart({ user_id: data.id });

                if (cartStatus === 'success' && cartCode === 0) {
                    const { details, ...cartDataWithoutDetails } = cartData;
                    saveToStorage(STORAGE_KEYS.INFO_CART, keysToCamelCase(cartDataWithoutDetails));
                    dispatch(actions.addInfoCart(keysToCamelCase(cartDataWithoutDetails || {})));
                    dispatch(actions.addValueCart(keysToCamelCase(details || [])));
                }
            } catch (error) {
                removeFromStorage(STORAGE_KEYS.TOKEN);
                removeFromStorage(STORAGE_KEYS.USER);
                dispatch(actions.setInfoUser({}));
            }
        };
        fetchUser();
    }, [dispatch, user?.id]);
}
