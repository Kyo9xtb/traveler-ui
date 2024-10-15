import { Fragment, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faPrint } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import getYear from 'date-fns/getYear';
import getMonth from 'date-fns/getYear';
import range from 'lodash/range';

import styles from './TourDeatil.module.scss';
import BannerPage from '~/components/BannerPage';
import images from '~/assets/images';
import ItemTour from '~/components/ItemTour';
import { MultipleItems } from '~/components/Slider';
import SimpleSliderBanner from '~/components/Slider/Slider';

const cx = classNames.bind(styles);

function FormatPrice(price) {
    return Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

const listTest = [
    {
        path: '',
    },
    {
        path: '',
    },
    {
        path: '',
    },
    {
        path: '',
    },
    {
        path: '',
    },
    {
        path: '',
    },
    {
        path: '',
    },
    {
        path: '',
    },
    {
        path: '',
    },
    {
        path: '',
    },
    {
        path: '',
    },
    {
        path: '',
    },
    {
        path: '',
    },
    {
        path: '',
    },
    {
        path: '',
    },
    {
        path: '',
    },
    {
        path: '',
    },
    {
        path: '',
    },
    {
        path: '',
    },
];
function TourDeatil() {
    const [startDate, setStartDate] = useState(new Date());
    const years = range(getYear(new Date()), getYear(new Date()) + 20, 1);
    const months = [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
    ];

    useEffect(() => {
        const listElementSVG = document.querySelectorAll('svg');
        listElementSVG.forEach((svg) => {
            svg.style.pointerEvents = 'none';
        });
    }, []);
    const [changeQuantity, setChangeQuantity] = useState(true);
    const [padult, setAdult] = useState(1);
    const [child, setChild] = useState(0);
    const [baby, setBaby] = useState(0);
    const [total, setTotal] = useState(padult * 10000000 + child * 10000000 + baby * 10000000);
    useEffect(() => {
        setTotal(padult * 10000000 + child * 10000000 + baby * 10000000);
    }, [changeQuantity]);
    return (
        <Fragment>
            <BannerPage title="TourDeatil" />
            <div className={cx('deatils-tour-wrap')}>
                <div className={cx('container')}>
                    <div className={cx('row', 'deatils-tour')}>
                        <div className={cx('col-12 col-lg-8')}>
                            <div className={cx('tour-image-block')}>
                                <SimpleSliderBanner>
                                    {listTest.map((item, index) => {
                                        return (
                                            <Link to="" key={index}>
                                                <img src={images.bannerAbout} alt="imagees" />
                                            </Link>
                                        );
                                    })}
                                </SimpleSliderBanner>
                            </div>
                            <div className={cx('white-bg', 'tour-main-content')}>
                                <div id="tour-schedule" className={cx('tour-block')}>
                                    <div className={cx('tour-schedule-title')}>Chương trình Tour</div>
                                </div>
                                <div id="tour-departure" className={cx('tour-block')}>
                                    <div className={cx('tour-schedule-title')}>Chính sách Tour</div>
                                </div>
                                <div id="tour-term-regulations" className={cx('tour-block')}>
                                    <div className={cx('tour-schedule-title')}>Điều khoản & Quy định</div>
                                </div>
                            </div>
                            <div id="book-tour-now" className={cx('tour-booking')}>
                                <div className={cx('tour-schedule-title')}>Đặt Tour</div>
                                <form className={cx('has-validation-callback')}>
                                    <div className={cx('pd_tour_variants')}>
                                        <ul className={cx('pd_variants_title', 'row')}>
                                            <li className={cx('col-sm-4 col-4')}>Loại khách</li>
                                            <li className={cx('col-sm-2 col-4')}>Số người</li>
                                            <li className={cx('col-sm-3 col-4 text-end')}>Đơn giá</li>
                                            <li className={cx('col-sm-3 text-end')}>Tống giá</li>
                                        </ul>
                                        <div className={cx('pd_variants_content')}>
                                            <ul className={cx('variant_list', 'row')} id="2345">
                                                <li className={cx('col-sm-4 col-4')}>Loại khách</li>
                                                <li className={cx('col-sm-2 col-4')}>
                                                    <div className={cx('quanlity')}>
                                                        <button
                                                            type="button"
                                                            className={cx('plus')}
                                                            onClick={(e) => {
                                                                setAdult(padult + 1);
                                                                setChangeQuantity(!changeQuantity);
                                                            }}
                                                        >
                                                            <FontAwesomeIcon icon={faAngleUp} />
                                                        </button>
                                                        <input
                                                            className={cx('qty')}
                                                            type="number"
                                                            min="1"
                                                            step="1"
                                                            value={padult}
                                                            disabled
                                                        />
                                                        <button
                                                            type="button"
                                                            className={cx('minus')}
                                                            onClick={(e) => {
                                                                if (padult > 0) {
                                                                    setAdult(padult - 1);
                                                                }
                                                                setChangeQuantity(!changeQuantity);
                                                            }}
                                                        >
                                                            <FontAwesomeIcon icon={faAngleDown} />
                                                        </button>
                                                    </div>
                                                </li>
                                                <li className={cx('col-sm-3 col-4 text-end', 'variant_price')}>
                                                    {FormatPrice(10000000)}
                                                    <input type="hidden" value={10000000} name="variant_price" />
                                                </li>
                                                <li className={cx('col-sm-3 text-end', 'subtotal')}>
                                                    {FormatPrice(10000000 * padult)}
                                                </li>
                                            </ul>
                                            <ul className={cx('variant_list', 'row')}>
                                                <li className={cx('col-sm-4 col-4')}>Loại khách</li>
                                                <li className={cx('col-sm-2 col-4')}>
                                                    <div className={cx('quanlity')}>
                                                        <button
                                                            type="button"
                                                            className={cx('plus')}
                                                            onClick={(e) => {
                                                                setChild(child + 1);
                                                                setChangeQuantity(!changeQuantity);
                                                            }}
                                                        >
                                                            <FontAwesomeIcon icon={faAngleUp} />
                                                        </button>
                                                        <input
                                                            className={cx('qty')}
                                                            type="number"
                                                            min="1"
                                                            value={child}
                                                            disabled
                                                        />
                                                        <button
                                                            type="button"
                                                            className={cx('minus')}
                                                            onClick={(e) => {
                                                                if (child > 0) {
                                                                    setChild(child - 1);
                                                                }
                                                                setChangeQuantity(!changeQuantity);
                                                            }}
                                                        >
                                                            <FontAwesomeIcon icon={faAngleDown} />
                                                        </button>
                                                    </div>
                                                </li>
                                                <li className={cx('col-sm-3 col-4 text-end', 'variant_price')}>
                                                    {FormatPrice(10000000)}
                                                    <input type="hidden" value={10000000} name="variant_price" />
                                                </li>
                                                <li className={cx('col-sm-3 text-end', 'subtotal')}>
                                                    {FormatPrice(10000000 * child)}
                                                </li>
                                            </ul>
                                            <ul className={cx('variant_list', 'row')}>
                                                <li className={cx('col-sm-4 col-4')}>Loại khách</li>
                                                <li className={cx('col-sm-2 col-4')}>
                                                    <div className={cx('quanlity')}>
                                                        <button
                                                            type="button"
                                                            className={cx('plus')}
                                                            onClick={(e) => {
                                                                setBaby(baby + 1);
                                                                setChangeQuantity(!changeQuantity);
                                                            }}
                                                        >
                                                            <FontAwesomeIcon icon={faAngleUp} />
                                                        </button>
                                                        <input
                                                            className={cx('qty')}
                                                            type="number"
                                                            value={baby}
                                                            disabled
                                                        />
                                                        <button
                                                            type="button"
                                                            className={cx('minus')}
                                                            onClick={(e) => {
                                                                if (baby > 0) {
                                                                    setBaby(baby - 1);
                                                                }
                                                                setChangeQuantity(!changeQuantity);
                                                            }}
                                                        >
                                                            <FontAwesomeIcon icon={faAngleDown} />
                                                        </button>
                                                    </div>
                                                </li>
                                                <li className={cx('col-sm-3 col-4 text-end', 'variant_price')}>
                                                    {FormatPrice(10000000)}
                                                    <input type="hidden" value={10000000} name="variant_price" />
                                                </li>
                                                <li className={cx('col-sm-3 text-end', 'subtotal')}>
                                                    {FormatPrice(10000000 * baby)}
                                                </li>
                                            </ul>
                                            <div className={cx('total-price', 'text-end row')}>
                                                <span className={cx('col-md-8 col-sm-9 col-6')}>Tổng số tiền</span>
                                                <strong className={cx('col-md-4 col-sm-5 col-6')}>
                                                    {FormatPrice(total)}
                                                </strong>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('row', 'contact_btn_group')}>
                                        <div className={cx('col-md-6 col-sm-7 col-12')}>
                                            <div className={cx('date-booking')}>
                                                <div className={cx('input-group')}>
                                                    <div className={cx('input-group-text')}>
                                                        <img src={images.tagDate} alt="" />
                                                    </div>
                                                    <DatePicker
                                                        renderCustomHeader={({
                                                            date,
                                                            changeYear,
                                                            changeMonth,
                                                            decreaseMonth,
                                                            increaseMonth,
                                                            prevMonthButtonDisabled,
                                                            nextMonthButtonDisabled,
                                                        }) => (
                                                            <div
                                                                style={{
                                                                    margin: 10,
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                }}
                                                            >
                                                                <button
                                                                    onClick={decreaseMonth}
                                                                    disabled={prevMonthButtonDisabled}
                                                                >
                                                                    {'<'}
                                                                </button>

                                                                <select
                                                                    value={months[getMonth(date)]}
                                                                    onChange={({ target: { value } }) =>
                                                                        changeMonth(months.indexOf(value))
                                                                    }
                                                                >
                                                                    {months.map((option) => (
                                                                        <option key={option} value={option}>
                                                                            {option}
                                                                        </option>
                                                                    ))}
                                                                </select>

                                                                <select
                                                                    value={getYear(date)}
                                                                    onChange={({ target: { value } }) =>
                                                                        changeYear(value)
                                                                    }
                                                                >
                                                                    {years.map((option) => (
                                                                        <option key={option} value={option}>
                                                                            {option}
                                                                        </option>
                                                                    ))}
                                                                </select>

                                                                <button
                                                                    onClick={increaseMonth}
                                                                    disabled={nextMonthButtonDisabled}
                                                                >
                                                                    {'>'}
                                                                </button>
                                                            </div>
                                                        )}
                                                        selected={startDate}
                                                        onChange={(date) => setStartDate(date)}
                                                        dateFormat="dd/MM/YYYY"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('col-md-6 col-sm-5 col-12', 'add-to-card')}>
                                            <button type="button" id={cx('submit-table')}>
                                                Đặt tour
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className={cx('col-12 col-lg-4', 'deatils-wrap')}>
                            <div className={cx('sticky-top')}>
                                <div className={cx('white-bg')}>
                                    <div className={cx('title-deatil')}>
                                        <h1 className={cx('title-head')}>
                                            Du lịch Malaysia - Singapore [Thủy cung S.E.A AQUARIUM]
                                        </h1>
                                    </div>
                                    <div className={cx('price-box')}>
                                        <span className={cx('old-price')}>
                                            <del className={cx('product-price-old')}>{FormatPrice(1000000000)}</del>
                                        </span>
                                        <span className={cx('special-price')}>
                                            Giá mới:&nbsp;{FormatPrice(1000000000)}
                                        </span>
                                        <span className={cx('save-price')}>
                                            Tiết kiệm
                                            <span className={cx('save-price-value')}>5%</span>
                                        </span>
                                    </div>
                                    <Link to="" title="" className={cx('btn-print', 'round-btn')}>
                                        <FontAwesomeIcon icon={faPrint} />
                                        In chương trình tour
                                    </Link>
                                    <div className={cx('journey')}>
                                        <span>Hành trình:</span>&nbsp; Hồ Chí Minh - Huế
                                    </div>
                                    <ul className={cx('ct_course_list')}>
                                        <li>
                                            <img src={images.plane} alt="" />
                                            Di chuyển:&nbsp;
                                            <span className={cx('tag-color')}>Di chuyển bằng ô tô</span>
                                        </li>
                                        <li>
                                            <img src={images.tagDateTime} alt="" />
                                            Lịch khởi hành:&nbsp;
                                            <span className={cx('tag-color')}>Thứ 7 hằng tuần</span>
                                        </li>
                                        <li>
                                            <img src={images.tagDate} alt="" />
                                            Thời gian:&nbsp;
                                            <span className={cx('tag-color')}>4 ngày 3 đêm</span>
                                        </li>
                                    </ul>
                                    <div className={cx('product-summary')}>
                                        <div className={cx('content-summary')}>
                                            <p>- Viếng chùa Thiên Mụ - ngôi chùa cổ và nổi tiếng nhất ở đất Cố đô</p>
                                            <p>- Viếng chùa Thiên Mụ - ngôi chùa cổ và nổi tiếng nhất ở đất Cố đô</p>
                                            <p>- Viếng chùa Thiên Mụ - ngôi chùa cổ và nổi tiếng nhất ở đất Cố đô</p>
                                            <p>- Viếng chùa Thiên Mụ - ngôi chùa cổ và nổi tiếng nhất ở đất Cố đô</p>
                                        </div>
                                    </div>
                                    <div className={cx('call-me-back')}>
                                        <div className={cx('row')}>
                                            <div className={cx('col-12 col-sm-6')}>
                                                <Link to="#book-tour-now" className={cx('round-btn')}>
                                                    Đặt tour
                                                </Link>
                                            </div>
                                            <div className={cx('col-12 col-sm-6')}>
                                                <Link to="" className={cx('round-btn')}>
                                                    Yêu cầu đặt
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('white-bg', 'tour-program-wrap')}>
                                    <ul className={cx('tour-program')}>
                                        <li>
                                            <Link
                                                to="#tour-schedule"
                                                className={cx('scroll-content')}
                                                title="Chương trình Tour"
                                            >
                                                <img src={images.tourProgram} alt="Chương trình Tour" />
                                                <span>Chương trình Tour</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="#tour-departure"
                                                className={cx('scroll-content')}
                                                title="Chính sách Tour"
                                            >
                                                <img src={images.policy} alt="Chính sách Tour" />
                                                <span>Chính sách Tour</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="#tour-term-regulations"
                                                className={cx('scroll-content')}
                                                title="Điều khoản & Quy định"
                                            >
                                                <img src={images.termsConditions} alt="Điều khoản & Quy định" />
                                                <span>Điều khoản & Quy định</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('similar-tour-wrap')}>
                <div className={cx('container')}>
                    <div className={cx('white-bg', 'similar-tour')}>
                        <div className={cx('similar-tour-title', 'text-center')}>
                            <h2>
                                <Link to="#">Các Tour tương tự</Link>
                            </h2>
                        </div>
                        <div className={cx('similar-tour-content')}>
                            <div className={cx('row')}>
                                {listTest.map((item, index) => {
                                    return (
                                        <div key={index} className={cx('col-12 col-sm-6 col-md-4 col-lg-3')}>
                                            <ItemTour />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('similar-tour-wrap', 'promotional-tour')}>
                <div className={cx('container')}>
                    <div className={cx('white-bg', 'similar-tour')}>
                        <div className={cx('similar-tour-title', 'text-center')}>
                            <h2>
                                <Link to="#">Các Tour tương tự</Link>
                            </h2>
                        </div>
                        <div className={cx('similar-tour-content')}>
                            <div className={cx('row')}>
                                <MultipleItems>
                                    {listTest.map((item, index) => {
                                        return (
                                            <div key={index} className={cx('col-12 col-sm-6 col-md-4 col-lg-3')}>
                                                <ItemTour />
                                            </div>
                                        );
                                    })}
                                </MultipleItems>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default TourDeatil;
