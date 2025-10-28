import { Fragment, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Cart.module.scss';
import BannerPage from '~/components/BannerPage';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';
import { actions, useStore } from '~/store';
import CartEmpty from './CartEmpty';
import { CartService } from '~/services';
import { formatDate, formatPrice, keysToSnakeCase } from '~/utils';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import images from '~/assets/images';
import { ListCustomer } from '~/data';

const cx = classNames.bind(styles);

function ItemProduct({ data }) {
    const [, dispatch] = useStore();
    const { thumbnailUrl, tourName, guestId, departureDate, unitPrice, slug } = data;
    const [quantity, setQuantity] = useState(data.quantity || 1);
    const linkPath = config.routes.tourDetail.replace(':slug', slug);

    const labelGuest = useMemo(() => {
        return ListCustomer.find((item) => item.value === guestId)?.label || '';
    }, [guestId]);

    const handleIncrement = (e) => {
        e.preventDefault();
        setQuantity(quantity + 1);
        handleUpdateBooking(quantity + 1);
    };
    const handleDecrement = (e) => {
        e.preventDefault();
        if (quantity > 1) {
            setQuantity(quantity - 1);
            handleUpdateBooking(quantity - 1);
        }
    };

    const handleDeleteItems = (e) => {
        e.preventDefault();
        dispatch(actions.deleteToCart(data));
    };

    const handleUpdateBooking = (quantity) => {
        dispatch(actions.updateToCart({ ...data, quantity: quantity }));
    };

    return (
        <div className={cx('row', 'shopping-cart-item')}>
            <div className={cx('col-12 col-md-3', 'thumbnail-item')}>
                <Link to={linkPath} title={tourName}>
                    <img
                        src={thumbnailUrl || images.logoFooter}
                        alt={tourName}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = images.logoFooter;
                        }}
                    />
                </Link>
            </div>
            <div className={cx('col-12 col-md-9', 'info-item')}>
                <div className={cx('row', 'align-items-center')}>
                    <div className={cx('col-md-6', 'box-info-product')}>
                        <h3>
                            <Link to={linkPath} title={tourName}>
                                {tourName}
                            </Link>
                        </h3>
                        <p className={cx('mb-0')}>
                            <strong>Ngày đi:</strong>
                            &nbsp;{formatDate(departureDate)}
                        </p>
                        <p>
                            <strong>Loại vé:</strong>
                            &nbsp;{labelGuest}
                        </p>
                        <button className={cx('btn', 'btn-danger')} onClick={handleDeleteItems}>
                            <FontAwesomeIcon icon={faTrashCan} />
                            &nbsp;Xóa
                        </button>
                    </div>
                    <div className={cx('col-md-3', 'box-price')}>
                        <p className={cx('mb-0', 'price')}>{formatPrice(unitPrice)}</p>
                    </div>
                    <div className={cx('col-md-3', 'box-quantity')}>
                        <div className={cx('wrapper')}>
                            <button onClick={handleDecrement} disabled={quantity <= 1}>
                                -
                            </button>
                            <input type="text" disabled value={quantity} />
                            <button onClick={handleIncrement}>+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Cart() {
    const navigate = useNavigate();
    const [store] = useStore();
    const { user, cart, infoCart } = store;

    const totalPrice = useMemo(() => {
        if (!Array.isArray(cart) || cart.length === 0) return 0;
        return cart?.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
    }, [cart]);
    console.log('totalPrice', totalPrice);

    useEffect(() => {
        const dataReq = {
            id: infoCart.id,
            user_id: infoCart.userId,
            total_amount: totalPrice ?? 0,
            status: infoCart.status,
            details: cart,
        };

        if (user.id !== infoCart.userId) return;
        (async () => {
            const { status, error_code, data } = await CartService.putCart(keysToSnakeCase(dataReq));
        })();
    }, [cart, infoCart, totalPrice, user]);

    const handlePayment = (e) => {
        e.preventDefault();
        navigate(`${config.routes.checkout}`);
    };
    return (
        <Fragment>
            <BannerPage title="Giỏ hàng" />
            <div className={cx('main-content')}>
                <div className={cx('container')}>
                    {!cart?.length ? (
                        <CartEmpty />
                    ) : (
                        <div className={cx('shopping-cart')}>
                            <div className={cx('row')}>
                                <div className={cx('col-12', 'cart-content')}>
                                    {cart?.map((product) => {
                                        return <ItemProduct key={product.id} data={product} />;
                                    })}
                                </div>
                                <div className={cx('col-12', 'cart-footer')}>
                                    <div className={cx('row')}>
                                        <div className={cx('col-lg-6')}>
                                            <Link to={config.routes.tour} title="Tiếp tục mua hàng">
                                                Tiếp tục mua hàng
                                            </Link>
                                        </div>
                                        <div className={cx('col-lg-6')}>
                                            <div className={cx('price-box')}>
                                                <div className={cx('box-style')}>
                                                    <p className={cx('list-info-price')}>
                                                        <span>Tạm tính:</span>
                                                        <strong>{formatPrice(totalPrice)}</strong>
                                                    </p>
                                                </div>
                                                <div className={cx('box-style')}>
                                                    <p className={cx('list-info-price')}>
                                                        <span>Thành tiền:</span>
                                                        <strong className={cx('total-price')}>
                                                            {formatPrice(totalPrice)}
                                                        </strong>
                                                    </p>
                                                </div>
                                                <div className={cx('box-style', 'text-end')}>
                                                    <button onClick={handlePayment} className={cx('round-btn')}>
                                                        Thanh toán ngay
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
}

export default Cart;
