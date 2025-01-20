import { Fragment, useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Cart.module.scss';
import BannerPage from '~/components/BannerPage';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';
import { actions, FormatPrice, useStore } from '~/store';
import CartEmpty from './CartEmpty';
import { CartService } from '~/services';

const cx = classNames.bind(styles);

function ItemProduct({ data }) {
    const [, dispatch] = useStore();
    const { thumbnail_url, tour_name, customer_type, price, departure_date, slug } = data;
    const [quantity, setQuantity] = useState(data.quantity);

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
    const getCustomerTypeLabel = (customer_type) => {
        switch (customer_type) {
            case 'adult':
                return 'Người lớn';
            case 'child':
                return 'Trẻ em';
            case 'baby':
                return 'Em bé';
            default:
                return '';
        }
    };

    return (
        <div className={cx('row', 'shopping-cart-item')}>
            <div className={cx('col-12 col-md-3', 'thumbnail-item')}>
                <Link to={`${config.routes.tour}/${slug}`} title={tour_name}>
                    <img src={thumbnail_url} alt={tour_name} />
                </Link>
            </div>
            <div className={cx('col-12 col-md-9', 'info-item')}>
                <div className={cx('row', 'align-items-center')}>
                    <div className={cx('col-md-6', 'box-info-product')}>
                        <h3>
                            <Link to={`${config.routes.tour}/${slug}`} title={tour_name}>
                                {tour_name}
                            </Link>
                        </h3>
                        <p>Ngày đi: &nbsp;{departure_date}</p>
                        <p>Hành khách: &nbsp;{getCustomerTypeLabel(customer_type)}</p>
                        <Link onClick={handleDeleteItems}>Xóa</Link>
                    </div>
                    <div className={cx('col-md-3', 'box-price')}>
                        <p className={cx('mb-0', 'price')}>{FormatPrice(price)}</p>
                    </div>
                    <div className={cx('col-md-3', 'box-quantity')}>
                        <div className={cx('wrapper')}>
                            <button onClick={handleDecrement} disabled={quantity === 1 ? true : false}>
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
    const [store, dispatch] = useStore();
    const { user, cart, setValueCart } = store;
    const [totalCart, setTotalCart] = useState(0);
    const [infoCart, setInfoCart] = useState();
    useEffect(() => {
        if (user.user_id) {
            CartService.getCartAuthor(`${user.user_id}`)
                .then((res) => {
                    const { status, result } = res.data;
                    if (status) {
                        setInfoCart((prev) => {
                            return {
                                ...result,
                                cart,
                            };
                        });
                        if (result.cart && Array.isArray(result.cart)) {
                            if (!setValueCart) {
                                dispatch(actions.setValueCart(true));
                                dispatch(actions.addValueCart(result.cart));
                            }
                        }
                    } else {
                        CartService.postCart({
                            user_id: user.user_id,
                            cart: [],
                        }).then((result) => {
                            console.log(result);
                        });
                    }
                })
                .catch((err) => {
                    console.error('Error fetching or posting cart:', err);
                });
        }
    }, [user, dispatch, setValueCart, cart]);

    useEffect(() => {
        setTotalCart(
            cart.reduce((acc, item) => {
                return acc + item.price * item.quantity;
            }, 0),
        );
        if (infoCart && user.user_id) {
            CartService.putCart(infoCart.cart_id, { ...infoCart, cart }).then((result) => {});
        }
    }, [cart, infoCart, user]);

    const handlePayment = (e) => {
        e.preventDefault();
        // Call API payment
        navigate(`${config.routes.checkout}`);
    };
    return (
        <Fragment>
            <BannerPage title="Giỏ hàng" />
            <div className={cx('main-content')}>
                <div className={cx('container')}>
                    {!cart.length ? (
                        <CartEmpty />
                    ) : (
                        <div className={cx('shopping-cart')}>
                            <div className={cx('row')}>
                                <div className={cx('col-12', 'cart-content')}>
                                    {cart &&
                                        cart.map((product, index) => {
                                            return <ItemProduct key={index} data={product} />;
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
                                                        <strong>{FormatPrice(totalCart)}</strong>
                                                    </p>
                                                </div>
                                                <div className={cx('box-style')}>
                                                    <p className={cx('list-info-price')}>
                                                        <span>Thành tiền:</span>
                                                        <strong className={cx('total-price')}>
                                                            {FormatPrice(totalCart)}
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
