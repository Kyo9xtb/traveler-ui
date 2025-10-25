import { useCallback, useEffect, useLayoutEffect } from 'react';
import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBagShopping,
    faCartShopping,
    faHeart,
    faPowerOff,
    faRightToBracket,
    faUser,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';

import styles from './OffcanvasMenu.module.scss';
import { actions, useStore } from '~/store';
import config from '~/config';
import { AuthorService } from '~/services';
import images from '~/assets/images';
import { removeFromStorage, STORAGE_KEYS } from '~/utils';

const cx = classNames.bind(styles);
function OffcanvasMenu() {
    const [action, dispatch] = useStore();
    const { setOffCanvasMenu, user } = action;
    const location = useLocation();

    const handleOffcanvasMenuClose = useCallback(
        (e) => {
            e.preventDefault();
            dispatch(actions.setOffCanvasMenu(false));
        },
        [dispatch],
    );

    useLayoutEffect(() => {
        dispatch(actions.setOffCanvasMenu(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    const handleLogOut = async (e) => {
        e.preventDefault();
        try {
            const { status, error_code } = await AuthorService.logout();
            if (status === 'success' && error_code === 0) {
                removeFromStorage(STORAGE_KEYS.TOKEN);
                removeFromStorage(STORAGE_KEYS.USER);
                dispatch(actions.setInfoUser({}));
                dispatch(actions.clearToCart([]));
                dispatch(actions.setValueCart(false));
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={setOffCanvasMenu ? cx('offcanvas-container', 'offcanvas-show') : cx('offcanvas-container')}>
            <div className={cx('offcanvas-inner')}>
                <div className={cx('offcanvas-side-bar')}>
                    {!_.isEmpty(user) && (
                        <div className={cx('widget', 'author-widget')}>
                            <h3 className={cx('widget-title')}>Xin chào</h3>
                            <div className={cx('widget-content', 'text-center')}>
                                <div className={cx('profile')}>
                                    <figure className={cx('avatar')}>
                                        <img
                                            src={user.avatarUrl || images.avatarDefault}
                                            alt="avatar"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = images.avatarDefault;
                                            }}
                                        />
                                    </figure>
                                    <div className={cx('text-content')}>
                                        <div className={cx('name-title')}>
                                            <h4>{user.full_name}</h4>
                                        </div>
                                        <ul className={cx('menu-drop')}>
                                            <li>
                                                <Link>
                                                    <i>
                                                        <FontAwesomeIcon icon={faUser} />
                                                    </i>
                                                    Thông tin tài khoản
                                                </Link>
                                            </li>
                                            <li>
                                                <Link>
                                                    <i>
                                                        <FontAwesomeIcon icon={faCartShopping} />
                                                    </i>
                                                    Đơn hàng
                                                </Link>
                                            </li>
                                            <li>
                                                <Link onClick={handleLogOut}>
                                                    <i>
                                                        <FontAwesomeIcon icon={faPowerOff} />
                                                    </i>
                                                    Đăng xuất
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className={cx('widget', 'text-center')}>
                        <ul className={cx('menu-drop')}>
                            {_.isEmpty(user) && (
                                <li>
                                    <Link to={config.routes.login}>
                                        <i>
                                            <FontAwesomeIcon icon={faRightToBracket} />
                                        </i>
                                        Đăng nhập
                                    </Link>
                                </li>
                            )}
                            <li>
                                <Link to={config.routes.cart}>
                                    <i>
                                        <FontAwesomeIcon icon={faBagShopping} />
                                    </i>
                                    Giỏ hàng
                                </Link>
                            </li>
                            <li>
                                <Link to="#">
                                    <i>
                                        <FontAwesomeIcon icon={faHeart} />
                                    </i>
                                    Yêu thích
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <Link className={cx('offcanvas-close')} onClick={handleOffcanvasMenuClose}>
                    <i>
                        <FontAwesomeIcon icon={faXmark} />
                    </i>
                </Link>
            </div>
            <div className={cx('overlay')} onClick={handleOffcanvasMenuClose}></div>
        </div>
    );
}

export default OffcanvasMenu;
