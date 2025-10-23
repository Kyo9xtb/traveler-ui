import { Fragment, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faCheck, faChevronDown, faCreditCard } from '@fortawesome/free-solid-svg-icons';

import styles from './CheckOut.module.scss';
import { actions, createMarkup, FormatPrice, SnakeCaseVariable, useStore } from '~/store';
import config from '~/config';
import images from '~/assets/images';
import { AuthorService, TourService } from '~/services';
import { BoxError, BoxSuccess } from '~/components/CustomAlert/CustomAlert';

const cx = classNames.bind(styles);

const listMethods = [
    {
        id: 1,
        title: 'Thanh toán chuyển khoản qua ngân hàng',
        description: `Sau khi đặt vé thành công và chuyển khoản qua tài khoản SaoVietTravler, nhân viên sẽ gửi liên hệ Quý khách qua email/ DT.`,
        content: `
            <h2>TÀI KHOẢN NGÂN HÀNG CỦA SaoVietTravler</h2>
            <p><strong>Lưu ý khi chuyển khoản:</strong></p>
            <ul>
                <li>
                    <span style="color: #FF0000;">KHÔNG ÁP DỤNG CHUYỂN KHOẢN CHO CÁC TOUR BÁN DỊP SỰ KIỆN</span>
                </li>
                <li>
                    <span style="color: #FF0000;">Quý khách vui lòng liên hệ nhân viên tư vấn, để xác nhận số chỗ trước khi thanh toán qua ngân hàng</span>
                </li>
                <li>Khi chuyển khoản, quý khách vui lòng nhập nội dung chuyển khoản là:</li>
            </ul>
            <p>
                <strong><em>"MDH madonhang, Họ tên, Noi dung thanh toan"</em></strong><br />
                Ví dụ: "MDH 0000001, Ten khach , Mua tour tren web"<br />
                Ðể việc thanh toán được chính xác. Xin cảm ơn quý khách!
            </p>
        `,
        'payment-type': 'Offline',
        toggle: 'Bank',
    },
    {
        id: 2,
        title: 'Thanh toán bằng tiền mặt tại văn phòng SaoVietTravler',
        description: 'Quý khách vui lòng đến các văn phòng SaoVietTravler để thanh toán và nhận vé.',
        content: `
            <h2>Công Ty TNHH Du Lịch & Sự Kiện Sao Việt</h2>
            <strong>Địa chỉ:</strong> Số 143, đường Trần Thái Tông, Phường Trần Hưng Đạo, Thành Phố Thái Bình, Tỉnh Thái Bình, Việt Nam
            <br />
            <strong>Điện thoại:</strong> 0902.146.186
            <br />
            <strong>Email:</strong> 
            <a href="mailto:dieuhanh@dulichsaoviet.com.vn">dieuhanh@dulichsaoviet.com.vn</a>
        `,
        'payment-type': 'Offline',
        toggle: 'Cash',
    },
];
function CheckOut() {
    const navigate = useNavigate();
    const [store, dispatch] = useStore();
    const { cart, user } = store;
    const [showBoxSuccess, setShowBoxSuccess] = useState(false);
    const [showBoxError, setShowBoxError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    //Data form
    const [totalPriceCart, setTotalPriceCart] = useState(0);
    const [totalQuantityCart, setTotalQuantityCart] = useState(0);
    const [renderCity, setRenderCity] = useState();
    const [renderDistrict, setRenderDistrict] = useState();
    const [renderWard, setRenderWard] = useState();
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const [address, setAddress] = useState('');
    const [infoBook, setInfoBook] = useState();

    useEffect(() => {
        if (cart.length === 0) {
            navigate(config.routes.cart);
            return;
        }
        AuthorService.getLogin()
            .then((res) => {
                dispatch(actions.setInfoUser(res));
            })
            .catch((err) => {
                console.log('error', err);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setInfoBook((prev) => {
            return {
                ...prev,
                ...user,
            };
        });
    }, [user]);

    useEffect(() => {
        if (user.address) {
            const addressSeparation = user.address.split(',');
            setCity(addressSeparation[addressSeparation.length - 1].trim());
            setDistrict(addressSeparation[addressSeparation.length - 2].trim());
            setWard(addressSeparation[addressSeparation.length - 3].trim());
            setAddress(addressSeparation.slice(0, addressSeparation.length - 3));
        }
    }, [user]);

    const setInfoBookValue = ({ target: { name, value } }) => {
        setInfoBook((prev) => ({
            ...prev,
            [`${SnakeCaseVariable(name)}`]: value,
        }));
    };

    useEffect(() => {
        setTotalPriceCart(
            cart.reduce((acc, item) => {
                return acc + item.price * item.quantity;
            }, 0),
        );
        setTotalQuantityCart(
            cart.reduce((acc, item) => {
                return acc + item.quantity;
            }, 0),
        );
    }, [cart]);

    ///DiaGioiHanhChinhVN
    useEffect(() => {
        const Parameter = {
            url: 'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json',
            method: 'GET',
            responseType: 'json',
        };

        axios(Parameter)
            .then((result) => {
                setRenderCity(result.data);
            })
            .catch((error) => {
                console.error('Error fetching city data:', error); // Adding error handling
                setRenderCity([]);
            });
    }, []);

    //Address
    useEffect(() => {
        setInfoBook((prev) => {
            return {
                ...prev,
                address: `${address},${ward},${district},${city}`,
            };
        });
    }, [city, district, ward, address]);

    //Tour
    useEffect(() => {
        setInfoBook((prev) => {
            return {
                ...prev,
                select_booking: cart,
                total_price: totalPriceCart,
            };
        });
    }, [cart, totalPriceCart]);

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

    const handleSelectCity = (e) => {
        setCity(e.target.value);
    };

    const handleSelectDistrict = (e) => {
        setDistrict(e.target.value);
    };

    const handleSelectWard = (e) => {
        setWard(e.target.value);
    };

    useEffect(() => {
        if (city && renderCity) {
            const cityItem = renderCity.find((cityItem) => cityItem.Name === city);
            if (cityItem) {
                setRenderDistrict(cityItem.Districts);
            } else {
                setRenderDistrict([]);
            }
        }
    }, [renderCity, city]);

    useEffect(() => {
        if (district && renderDistrict) {
            const districtItem = renderDistrict.find((districtItem) => districtItem.Name === district);
            if (districtItem) {
                setRenderWard(districtItem.Wards);
            } else {
                setRenderWard([]);
            }
        }
    }, [renderDistrict, district]);

    const handleCheck = ({ target: { id } }) => {
        const parts = id.split('method-payment');
        const idCheck = parts[parts.length - 1];
        const methodItem = listMethods.find((method) => method.id.toString() === idCheck);

        setInfoBook((prevInfoBook) => ({
            ...prevInfoBook,
            payment_method: `${methodItem['payment-type']}-${methodItem.toggle}`,
        }));
    };

    const handleBooking = (e) => {
        e.preventDefault();
        // TourService.postTourBookings(infoBook)
        //     .then((res) => {
        //         const { status } = res;
        //         if (status) {
        //             dispatch(actions.clearToCart([]));
        //             setShowBoxSuccess(true);
        //             setTimeout(() => {
        //                 setShowBoxSuccess(false);
        //                 navigate(config.routes.home);
        //             }, 1000);
        //         } else {
        //             setShowBoxError(true);
        //             setErrorMessage('Bạn đặt tour không thành công vui lòng kiểm tra lại thông tin');
        //             setTimeout(() => {
        //                 setShowBoxError(false);
        //             }, 1000);
        //         }
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //         setShowBoxError(true);
        //         setErrorMessage('Đã xảy ra lỗi, vui lòng thử lại sau.');
        //         setTimeout(() => {
        //             setShowBoxError(false);
        //         }, 1000);
        //     });
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
                                        <div className="input-group mb-3">
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Email"
                                                name="Email"
                                                value={infoBook && infoBook.email ? infoBook.email : ''}
                                                onChange={setInfoBookValue}
                                            />
                                        </div>
                                        <div className="input-group mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Họ và tên"
                                                name="FullName"
                                                value={infoBook && infoBook.full_name ? infoBook.full_name : ''}
                                                onChange={setInfoBookValue}
                                            />
                                        </div>
                                        <div className="input-group mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Số điện thoại"
                                                name="PhoneNumber"
                                                value={infoBook && infoBook.phone_number ? infoBook.phone_number : ''}
                                                onChange={setInfoBookValue}
                                            />
                                        </div>
                                        <div className="input-group mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Địa chỉ"
                                                name="Address"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                            />
                                        </div>
                                        <select className="form-select mb-3" onChange={handleSelectCity} value={city}>
                                            <option value="">Chọn tỉnh thành</option>
                                            {renderCity &&
                                                renderCity.map((city) => {
                                                    return (
                                                        <option key={city.Name} value={city.Name}>
                                                            {city.Name}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                        <select
                                            className="form-select mb-3"
                                            onChange={handleSelectDistrict}
                                            value={district}
                                        >
                                            <option value="">Chọn quận huyện</option>
                                            {renderDistrict &&
                                                renderDistrict.map((city) => {
                                                    return (
                                                        <option key={city.Name} value={city.Name}>
                                                            {city.Name}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                        <select className="form-select mb-3" onChange={handleSelectWard} value={ward}>
                                            <option value="">Chọn phường xã</option>
                                            {renderWard &&
                                                renderWard.map((city) => {
                                                    return (
                                                        <option key={city.Name} value={city.Name}>
                                                            {city.Name}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                        <div className="input-group">
                                            <textarea
                                                className="form-control"
                                                placeholder="Ghi chú"
                                                onChange={setInfoBookValue}
                                                name="Note"
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                                {/* pay ment */}
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
                                        {listMethods &&
                                            listMethods.map((method) => {
                                                return (
                                                    <div
                                                        key={method.id}
                                                        className={cx('method')}
                                                        data-payment-type={method['payment-type']}
                                                    >
                                                        <input
                                                            type="radio"
                                                            className={cx('payment-method', 'd-none')}
                                                            name="method"
                                                            id={`method-payment${method.id}`}
                                                            onChange={handleCheck}
                                                        />
                                                        <div className={cx('method-content')}>
                                                            <label
                                                                className={cx('title')}
                                                                htmlFor={`method-payment${method.id}`}
                                                                toggle={method.toggle}
                                                            >
                                                                <h4>{method.title}</h4>
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
                            <h2 className={cx('sidebar-title')}>Đơn hàng ({totalQuantityCart} sản phẩm)</h2>
                        </div>
                        <div className={cx('sidebar-content')}>
                            <div className={cx('order-summary')}>
                                <div className={cx('order-summary-wrapper')}>
                                    {/* order-summary-product */}
                                    <div className={cx('order-summary-sections', 'order-summary-product')}>
                                        {cart.length &&
                                            cart.map((item, index) => {
                                                const {
                                                    customer_type,
                                                    departure_date,
                                                    price,
                                                    quantity,
                                                    thumbnail_url,
                                                    tour_name,
                                                } = item;
                                                return (
                                                    <div key={index} className={cx('product-item')}>
                                                        <div className={cx('product-image')}>
                                                            <div className={cx('product-thumbnail')}>
                                                                <img src={thumbnail_url} alt={tour_name} />
                                                                <span className={cx('product-thumbnail-quantity')}>
                                                                    {quantity}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className={cx('product-description')}>
                                                            <span className={cx('product-description-name')}>
                                                                {tour_name}
                                                            </span>
                                                            <span className={cx('product-description-property')}>
                                                                {getCustomerTypeLabel(customer_type)}
                                                            </span>
                                                            <span className={cx('product-description-property')}>
                                                                Ngày đi:&nbsp; {departure_date}
                                                            </span>
                                                        </div>
                                                        <div className={cx('product-total-price')}>
                                                            {FormatPrice(price * quantity)}
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
                                                <strong>{FormatPrice(totalPriceCart)}</strong>
                                            </p>
                                        </div>
                                        <div className={cx('box-style')}>
                                            <p className={cx('list-info-price')}>
                                                <span>Giảm giá:</span>
                                                <strong>{FormatPrice(0)}</strong>
                                            </p>
                                        </div>
                                        <div className={cx('box-style', 'total-price')}>
                                            <p className={cx('list-info-price')}>
                                                <span>Tổng cộng:</span>
                                                <strong>{FormatPrice(totalPriceCart)}</strong>
                                            </p>
                                        </div>
                                    </div>
                                    <div className={cx('order-summary-action')}>
                                        <Link to={config.routes.cart} title="Quay về giỏ hàng">
                                            {'<<< '}
                                            Quay về giỏ hàng
                                        </Link>
                                        <button
                                            onClick={handleBooking}
                                            disabled={infoBook && infoBook.payment_method ? false : true}
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
            {showBoxSuccess && (
                <BoxSuccess>
                    <p>Bạn đã đặt tour thành công. Chúng tôi sẽ sớm liên hệ với bạn để xác nhận</p>
                </BoxSuccess>
            )}
            {showBoxError && (
                <BoxError>
                    <p>{errorMessage}</p>
                </BoxError>
            )}
        </Fragment>
    );
}

export default CheckOut;
