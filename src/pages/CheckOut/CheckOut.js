import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faCheck, faChevronDown, faCreditCard } from '@fortawesome/free-solid-svg-icons';

import styles from './CheckOut.module.scss';
import { actions, useStore } from '~/store';
import config from '~/config';
import images from '~/assets/images';
import { BookingTourService } from '~/services';
import { BoxError, BoxSuccess } from '~/components/CustomAlert/CustomAlert';
import { ListPaymentMethod } from '~/data';
import { createMarkup, formatDate, formatPrice, keysToSnakeCase } from '~/utils';

const cx = classNames.bind(styles);

const InputField = ({
    label = '',
    type = 'text',
    value = '',
    onChange = () => {},
    onBlur = () => {},
    error,
    options = [],
    ...rest
}) => {
    const inputProps = {
        className: cx('form-control'),
        placeholder: label?.replace(':', ''),
        autoComplete: 'off',
        value,
        onChange,
        onBlur,
        ...rest,
    };

    const renderField = () => {
        switch (type) {
            case 'textarea':
                return <textarea {...inputProps} />;
            default:
                return <input type={type} {...inputProps} />;
        }
    };

    return (
        <div className="input-group mb-3">
            {/* {label && <h5 className={cx('mb-3')}>{label}</h5>} */}
            {renderField()}
            {error && <p className={cx('message-error mt-2')}>{error}</p>}
        </div>
    );
};

function CheckOut() {
    const navigate = useNavigate();
    const [store, dispatch] = useStore();
    const { cart, user } = store;

    const initBooking = {
        userId: null,
        fullName: '',
        email: '',
        phone: '',
        address: '',
        note: '',
        totalPrice: 0,
        deposit: 0,
        paymentMethod: '',
        details: [],
        currency: 'VND',
    };
    const [alterBox, setAlterBox] = useState({
        success: false,
        error: false,
        message: '',
    });
    //Data form
    const [infoBook, setInfoBook] = useState(initBooking);

    useEffect(() => {
        if (cart.length === 0) {
            navigate(config.routes.cart);
            return;
        }
    }, []);

    useEffect(() => {
        if (!user) return;

        setInfoBook((prev) => {
            return {
                ...prev,
                userId: user?.id || null,
                fullName: user?.fullName || '',
                email: user?.email || '',
                phone: user?.phone || '',
                address: user?.address || '',
            };
        });
    }, [user]);

    //Tour
    useEffect(() => {
        if (cart.length === 0) return;

        const formatDetails = cart.map((item) => {
            return {
                tour_id: item.tourId,
                guest_id: item.guestId,
                price: item.unitPrice,
                quantity: item.quantity,
                departure_date: new Date(item.departureDate).toISOString().split('T')[0],
            };
        });

        setInfoBook((prev) => {
            return {
                ...prev,
                details: formatDetails,
            };
        });
    }, [cart]);

    const handleFieldChange = useCallback(
        (field) => (e) => {
            const { value, type } = e.target;
            const rawValue = type === 'radio' ? parseInt(value) : value;

            setInfoBook((prevInfoBook) => ({
                ...prevInfoBook,
                [field]: rawValue,
            }));
        },
        [],
    );

    const totalPriceCart = useMemo(() => {
        if (cart.length === 0) return 0;

        const total = cart.reduce((acc, item) => {
            return acc + (item.unitPrice * item.quantity);
        }, 0);

        setInfoBook((prev) => ({ ...prev, totalPrice: total }));
        return total;
    }, [cart]);

    const totalQuantityCart = useMemo(() => {
        if (cart.length === 0) return 0;
        return cart.reduce((acc, item) => {
            return acc + item.quantity;
        }, 0);
    }, [cart]);

    const handleBooking = async (e) => {
        e.preventDefault();

        try {
            const { status, error_code, data, message } = await BookingTourService.postBookingTour(
                keysToSnakeCase(infoBook),
            );
            const isSuccess = status === 'success' && error_code === 0;
            setAlterBox({
                success: isSuccess,
                error: !isSuccess,
                message,
            });

            if (isSuccess) {
                dispatch(actions.clearToCart([]));

                setTimeout(() => {
                    navigate(config.routes.home);
                }, 2000);
            }
        } catch (error) {
            console.log('Error booking tour:', error);
        }
    };

    return (
        <Fragment>
            <div className={cx('row')}>
                <div className={cx('col-md-8')}>
                    <div className={cx('main')}>
                        <div className={cx('main-header')}>
                            <div className={cx('logo', 'text-center')}>
                                <h1>
                                    <Link to={config.routes.home}>
                                        <img src={images.logoColor} alt="Logo" />
                                    </Link>
                                </h1>
                            </div>
                        </div>
                        <div className={cx('main-content')}>
                            <div className={cx('row')}>
                                {/* info customer */}
                                <div className={cx('col-md-12')}>
                                    <div className={cx('section-header')}>
                                        <div className={cx('layout-flex')}>
                                            <h2 className={cx('section-title')}>
                                                <i>
                                                    <FontAwesomeIcon icon={faAddressCard} />
                                                </i>
                                                Thông tin khách hàng
                                            </h2>
                                        </div>
                                    </div>
                                    <div className={cx('section-content')}>
                                        <InputField
                                            label="Email"
                                            type="email"
                                            value={infoBook.email}
                                            onChange={handleFieldChange('email')}
                                            onBlur={() => {}}
                                        />

                                        <InputField
                                            label="Họ và tên"
                                            value={infoBook.fullName}
                                            onChange={handleFieldChange('fullName')}
                                            onBlur={() => {}}
                                        />

                                        <InputField
                                            label="Số điện thoại"
                                            value={infoBook.phone}
                                            onChange={handleFieldChange('phone')}
                                            onBlur={() => {}}
                                        />

                                        <InputField
                                            label="Địa chỉ"
                                            value={infoBook.address}
                                            onChange={handleFieldChange('address')}
                                            onBlur={() => {}}
                                        />

                                        <InputField
                                            label="Ghi chú"
                                            type="textarea"
                                            value={infoBook.note}
                                            onChange={handleFieldChange('note')}
                                            onBlur={() => {}}
                                        />
                                    </div>
                                </div>
                                {/* payment */}
                                <div className={cx('col-md-12', 'mt-3')}>
                                    <div className={cx('section-header')}>
                                        <div className={cx('layout-flex')}>
                                            <h2 className={cx('section-title')}>
                                                <i>
                                                    <FontAwesomeIcon icon={faCreditCard} />
                                                </i>
                                                Thanh toán
                                            </h2>
                                        </div>
                                    </div>
                                    <div className={cx('section-content')}>
                                        {ListPaymentMethod?.map((method) => {
                                            return (
                                                <div
                                                    key={method.value}
                                                    className={cx('method')}
                                                    data-payment-type={method['payment-type']}
                                                >
                                                    <input
                                                        type="radio"
                                                        className={cx('payment-method', 'd-none')}
                                                        name="method"
                                                        id={`method-payment${method.value}`}
                                                        value={method.value}
                                                        onChange={handleFieldChange('paymentMethod')}
                                                    />
                                                    <div className={cx('method-content')}>
                                                        <label
                                                            className={cx('title')}
                                                            htmlFor={`method-payment${method.value}`}
                                                            toggle={method.value}
                                                        >
                                                            <h4>{method.label}</h4>
                                                            <div className={cx('description')}>
                                                                {method.description}
                                                            </div>
                                                            <i className={cx('down')}>
                                                                <FontAwesomeIcon icon={faChevronDown} />
                                                            </i>
                                                            <i className={cx('check')}>
                                                                <FontAwesomeIcon icon={faCheck} />
                                                            </i>
                                                        </label>
                                                        <div
                                                            className={cx('content')}
                                                            dangerouslySetInnerHTML={createMarkup(method.content)}
                                                        ></div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('col-md-4')}>
                    <div className={cx('sidebar')}>
                        <div className={cx('sidebar-header')}>
                            <h2 className={cx('sidebar-title')}>Đơn hàng ({totalQuantityCart || 0} sản phẩm)</h2>
                        </div>
                        <div className={cx('sidebar-content')}>
                            <div className={cx('order-summary')}>
                                <div className={cx('order-summary-wrapper')}>
                                    {/* order-summary-product */}
                                    <div className={cx('order-summary-sections', 'order-summary-product')}>
                                        {cart?.map((item, index) => {
                                            const {
                                                label,
                                                departureDate,
                                                unitPrice,
                                                quantity,
                                                thumbnailUrl,
                                                tourName,
                                            } = item;
                                            return (
                                                <div key={index} className={cx('product-item')}>
                                                    <div className={cx('product-image')}>
                                                        <div className={cx('product-thumbnail')}>
                                                            <img src={thumbnailUrl} alt={tourName} />
                                                            <span className={cx('product-thumbnail-quantity')}>
                                                                {quantity}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className={cx('product-description')}>
                                                        <span className={cx('product-description-name')}>
                                                            {tourName}
                                                        </span>
                                                        <span className={cx('product-description-property')}>
                                                            {label}
                                                        </span>
                                                        <span className={cx('product-description-property')}>
                                                            Ngày đi:&nbsp; {formatDate(departureDate)}
                                                        </span>
                                                    </div>
                                                    <div className={cx('product-total-price')}>
                                                        {formatPrice(unitPrice)}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className={cx('order-summary-sections', 'order-summary-discount-code')}>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Nhập mã giảm giá"
                                            />
                                            <span className={cx('input-group-text')}>Áp dụng</span>
                                        </div>
                                    </div>
                                    <div className={cx('order-summary-sections', 'order-summary-price')}>
                                        <div className={cx('box-style')}>
                                            <p className={cx('list-info-price')}>
                                                <span>Tạm tính:</span>
                                                <strong>{formatPrice(totalPriceCart || 0)}</strong>
                                            </p>
                                        </div>
                                        <div className={cx('box-style')}>
                                            <p className={cx('list-info-price')}>
                                                <span>Giảm giá:</span>
                                                <strong>{formatPrice(0)}</strong>
                                            </p>
                                        </div>
                                        <div className={cx('box-style', 'total-price')}>
                                            <p className={cx('list-info-price')}>
                                                <span>Tổng cộng:</span>
                                                <strong>{formatPrice(totalPriceCart || 0)}</strong>
                                            </p>
                                        </div>
                                    </div>
                                    <div className={cx('order-summary-action')}>
                                        <Link to={config.routes.cart} title="Quay về giỏ hàng">
                                            {'<<<'}&nbsp;Quay về giỏ hàng
                                        </Link>
                                        <button
                                            onClick={handleBooking}
                                            disabled={!infoBook?.paymentMethod}
                                            type="button"
                                            className="btn btn-primary"
                                        >
                                            Đặt tour
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {alterBox.success && (
                <BoxSuccess>
                    <p>Bạn đã đặt tour thành công. Chúng tôi sẽ sớm liên hệ với bạn để xác nhận</p>
                </BoxSuccess>
            )}
            {alterBox.error && (
                <BoxError>
                    <p>{alterBox.message}</p>
                </BoxError>
            )}
        </Fragment>
    );
}

export default CheckOut;
