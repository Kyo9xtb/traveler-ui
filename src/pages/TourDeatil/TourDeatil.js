import { Fragment, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faPrint } from '@fortawesome/free-solid-svg-icons';

import styles from './TourDeatil.module.scss';
import BannerPage from '~/components/BannerPage';
import images from '~/assets/images';
import ItemTour from '~/components/ItemTour';
import { MultipleItems } from '~/components/Slider';
import SimpleSliderBanner from '~/components/Slider/Slider';
import CustomDatePicker from '~/components/CustomDatePicker';
import * as tourServices from '~/services/tourService';
import AlterDismissible from '~/components/CustomAlert';
import ErrorPage from '../Error';

const cx = classNames.bind(styles);

function FormatPrice(price) {
    return Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

const listTest = [
    {
        tour_id: 3,
        tour_name:
            ' Du lịch Nam Phi [Johannesburg - Pretoria - Soweto - Cape Town]Du lịch Nam Phi [Johannesburg - Pretoria - Soweto - Cape Town]',
        slug: 'du-lich-nam-phi-johannesburg-pretoria-soweto-cape-town',
        tour_group: null,
        area: null,
        price: 1000000,
        sale: 10,
        promotion_price: 900000,
        departure_schedule: null,
        vehicle: null,
        time: null,
        tour_progarm: null,
        tour_policy: null,
        terms_conditions: null,
        trip: null,
        guest_type: null,
        image: [
            'tour/3/1730012736535.jpg',
            'tour/3/1730012736536.png',
            'tour/3/1730012736541.png',
            'tour/3/1730012736544.png',
            'tour/3/1730012736552.png',
            'tour/3/1730012736555.png',
        ],
        thumbnail: 'tour/3/1730012736558.jpg',
        create_at: '2024-10-24T04:14:26.000Z',
        update_at: '2024-10-31T02:51:34.000Z',
        thumbnail_url: 'http://localhost:4090/images/tour/3/1730012736558.jpg',
        image_url: [
            'http://localhost:4090/images/tour/3/1730012736535.jpg',
            'http://localhost:4090/images/tour/3/1730012736536.png',
            'http://localhost:4090/images/tour/3/1730012736541.png',
            'http://localhost:4090/images/tour/3/1730012736544.png',
            'http://localhost:4090/images/tour/3/1730012736552.png',
            'http://localhost:4090/images/tour/3/1730012736555.png',
        ],
    },
    {
        tour_id: 4,
        tour_name: 'asdasdasd',
        slug: 'asdasdasd',
        tour_group: null,
        area: null,
        price: 1000000,
        sale: null,
        promotion_price: 1000000,
        departure_schedule: null,
        vehicle: null,
        time: null,
        tour_progarm: null,
        tour_policy: null,
        terms_conditions: null,
        trip: null,
        guest_type: null,
        image: 'default_thumbnail.png',
        thumbnail: 'default_thumbnail.png',
        create_at: '2024-10-24T04:20:09.000Z',
        update_at: '2024-10-27T09:24:38.000Z',
        thumbnail_url: 'http://localhost:4090/images/default_thumbnail.png',
        image_url: 'http://localhost:4090/images/default_thumbnail.png',
    },
    {
        tour_id: 5,
        tour_name: 'asdasdasd',
        slug: 'asdasdasd',
        tour_group: null,
        area: null,
        price: null,
        sale: null,
        promotion_price: null,
        departure_schedule: null,
        vehicle: null,
        time: null,
        tour_progarm: null,
        tour_policy: null,
        terms_conditions: null,
        trip: null,
        guest_type: null,
        image: [
            'tour/5/1730016909767.jpg',
            'tour/5/1730016909768.png',
            'tour/5/1730016909772.png',
            'tour/5/1730016909782.png',
            'tour/5/1730016909787.png',
            'tour/5/1730016909792.png',
        ],
        thumbnail: 'tour/5/1730016909797.jpg',
        create_at: '2024-10-24T04:20:13.000Z',
        update_at: '2024-10-27T08:15:09.000Z',
        thumbnail_url: 'http://localhost:4090/images/tour/5/1730016909797.jpg',
        image_url: [
            'http://localhost:4090/images/tour/5/1730016909767.jpg',
            'http://localhost:4090/images/tour/5/1730016909768.png',
            'http://localhost:4090/images/tour/5/1730016909772.png',
            'http://localhost:4090/images/tour/5/1730016909782.png',
            'http://localhost:4090/images/tour/5/1730016909787.png',
            'http://localhost:4090/images/tour/5/1730016909792.png',
        ],
    },
    {
        tour_id: 7,
        tour_name: 'asdasdasd',
        slug: 'asdasdasd',
        tour_group: null,
        area: null,
        price: null,
        sale: null,
        promotion_price: null,
        departure_schedule: null,
        vehicle: null,
        time: null,
        tour_progarm: null,
        tour_policy: null,
        terms_conditions: null,
        trip: null,
        guest_type: null,
        image: [
            'tour/7/1729913604351.jpg',
            'tour/7/1729913604352.png',
            'tour/7/1729913604357.png',
            'tour/7/1729913604358.png',
            'tour/7/1729913604360.png',
            'tour/7/1729913604364.png',
        ],
        thumbnail: 'tour/7/1729913604366.jpg',
        create_at: '2024-10-26T03:33:24.000Z',
        update_at: '2024-10-26T03:33:24.000Z',
        thumbnail_url: 'http://localhost:4090/images/tour/7/1729913604366.jpg',
        image_url: [
            'http://localhost:4090/images/tour/7/1729913604351.jpg',
            'http://localhost:4090/images/tour/7/1729913604352.png',
            'http://localhost:4090/images/tour/7/1729913604357.png',
            'http://localhost:4090/images/tour/7/1729913604358.png',
            'http://localhost:4090/images/tour/7/1729913604360.png',
            'http://localhost:4090/images/tour/7/1729913604364.png',
        ],
    },
];
function TourDeatil() {
    const [tour, setTour] = useState();
    let { slug } = useParams();
    useEffect(() => {
        tourServices
            .getTour(slug)
            .then((res) => {
                setTour(res);
            })
            .catch((err) => {
                console.error('Error fetching tour:', err);
            });
    }, [slug]);

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
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (tour) {
            setTotal(padult * tour.promotion_price + child * tour.promotion_price + baby * tour.promotion_price);
        }
    }, [padult, child, baby, tour]);
    if (!tour) {
        return <ErrorPage />;
    }
    return (
        <Fragment>
            <BannerPage title="TourDeatil" />
            <div className={cx('deatils-tour-wrap')}>
                <div className={cx('container')}>
                    <div className={cx('row', 'deatils-tour')}>
                        <div className={cx('col-12 col-lg-8')}>
                            <div className={cx('tour-image-block')}>
                                {tour.image_url ? (
                                    <Fragment>
                                        {Array.isArray(tour.image_url) ? (
                                            <SimpleSliderBanner>
                                                {tour.image_url.map((item, index) => {
                                                    return (
                                                        <Link key={index}>
                                                            <img src={item} alt={tour.tour_name} />
                                                        </Link>
                                                    );
                                                })}
                                            </SimpleSliderBanner>
                                        ) : (
                                            <div className={cx('single-image')}>
                                                <Link>
                                                    <img src={tour.image_url} alt={tour.tour_name} />
                                                </Link>
                                            </div>
                                        )}
                                    </Fragment>
                                ) : (
                                    <div className={cx('single-image')}>
                                        <Link>
                                            <img src={images.bannerAbout} alt={tour.tour_name} />
                                        </Link>
                                    </div>
                                )}
                            </div>
                            <div className={cx('white-bg', 'tour-main-content')}>
                                <div id="tour-schedule" className={cx('tour-block')}>
                                    <div className={cx('tour-schedule-title')}>Chương trình Tour</div>
                                    <div className={cx('rte')}>
                                        {tour.tour_progarm ? (
                                            tour.tour_progarm
                                        ) : (
                                            <Fragment>
                                                <AlterDismissible className={'alert-success'}>
                                                    Chương trình Tour đang cập nhật
                                                </AlterDismissible>
                                            </Fragment>
                                        )}
                                    </div>
                                </div>
                                <div id="tour-departure" className={cx('tour-block')}>
                                    <div className={cx('tour-schedule-title')}>Chính sách Tour</div>
                                    <div className={cx('rte')}>
                                        {tour.tour_policy ? (
                                            tour.tour_policy
                                        ) : (
                                            <Fragment>
                                                <AlterDismissible className={'alert-success'}>
                                                    Chính sách Tour đang cập nhật
                                                </AlterDismissible>
                                            </Fragment>
                                        )}
                                    </div>
                                </div>
                                <div id="tour-term-regulations" className={cx('tour-block')}>
                                    <div className={cx('tour-schedule-title')}>Điều khoản & Quy định</div>
                                    <div className={cx('rte')}>
                                        {tour.terms_conditions ? (
                                            tour.terms_conditions
                                        ) : (
                                            <Fragment>
                                                <AlterDismissible className={'alert-success'}>
                                                    Điều khoản & Quy định đang cập nhật
                                                </AlterDismissible>
                                            </Fragment>
                                        )}
                                    </div>
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
                                                <li className={cx('col-sm-4 col-4')}>Người lớn</li>
                                                <li className={cx('col-sm-2 col-4')}>
                                                    <div className={cx('quanlity')}>
                                                        <button
                                                            type="button"
                                                            className={cx('plus')}
                                                            onClick={(e) => {
                                                                setAdult(padult + 1);
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
                                                            }}
                                                        >
                                                            <FontAwesomeIcon icon={faAngleDown} />
                                                        </button>
                                                    </div>
                                                </li>
                                                <li className={cx('col-sm-3 col-4 text-end', 'variant_price')}>
                                                    {FormatPrice(tour.promotion_price)}
                                                    <input
                                                        type="hidden"
                                                        value={tour.promotion_price}
                                                        name="variant_price"
                                                    />
                                                </li>
                                                <li className={cx('col-sm-3 text-end', 'subtotal')}>
                                                    {FormatPrice(tour.promotion_price * padult)}
                                                </li>
                                            </ul>
                                            <ul className={cx('variant_list', 'row')}>
                                                <li className={cx('col-sm-4 col-4')}>Trẻ em</li>
                                                <li className={cx('col-sm-2 col-4')}>
                                                    <div className={cx('quanlity')}>
                                                        <button
                                                            type="button"
                                                            className={cx('plus')}
                                                            onClick={(e) => {
                                                                setChild(child + 1);
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
                                                    {FormatPrice(tour.promotion_price)}
                                                    <input
                                                        type="hidden"
                                                        value={tour.promotion_price}
                                                        name="variant_price"
                                                    />
                                                </li>
                                                <li className={cx('col-sm-3 text-end', 'subtotal')}>
                                                    {FormatPrice(tour.promotion_price * child)}
                                                </li>
                                            </ul>
                                            <ul className={cx('variant_list', 'row')}>
                                                <li className={cx('col-sm-4 col-4')}>Em bé</li>
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
                                                    {FormatPrice(tour.promotion_price)}
                                                    <input
                                                        type="hidden"
                                                        value={tour.promotion_price}
                                                        name="variant_price"
                                                    />
                                                </li>
                                                <li className={cx('col-sm-3 text-end', 'subtotal')}>
                                                    {FormatPrice(tour.promotion_price * baby)}
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
                                                    <CustomDatePicker />
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
                                        <h1 className={cx('title-head')}>{tour.tour_name}</h1>
                                    </div>
                                    <div className={cx('price-box')}>
                                        {tour.sale ? (
                                            <Fragment>
                                                <span className={cx('old-price')}>
                                                    <del className={cx('product-price-old')}>
                                                        {FormatPrice(tour.price)}
                                                    </del>
                                                </span>
                                                <span className={cx('special-price')}>
                                                    Giá mới:&nbsp;{FormatPrice(tour.promotion_price)}
                                                </span>
                                                <span className={cx('save-price')}>
                                                    Tiết kiệm
                                                    <span className={cx('save-price-value')}>{tour.sale}%</span>
                                                </span>
                                            </Fragment>
                                        ) : (
                                            <span className={cx('special-price')}>
                                                Giá mới:&nbsp;{FormatPrice(tour.promotion_price)}
                                            </span>
                                        )}
                                    </div>
                                    <Link to={`/in-tour/${tour.slug}`} title="" className={cx('btn-print', 'round-btn')}>
                                        <FontAwesomeIcon icon={faPrint} />
                                        In chương trình tour
                                    </Link>
                                    <div className={cx('journey')}>
                                        <span>Hành trình:</span>&nbsp; {tour.trip}
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
                                            <span className={cx('tag-color')}>{tour.departure_schedule}</span>
                                        </li>
                                        <li>
                                            <img src={images.tagDate} alt="" />
                                            Thời gian:&nbsp;
                                            <span className={cx('tag-color')}>{tour.time}</span>
                                        </li>
                                    </ul>
                                    <div className={cx('product-summary')}>
                                        <div className={cx('content-summary')}>
                                            {tour.description ? (
                                                tour.description
                                            ) : (
                                                <AlterDismissible className="alert-success">
                                                    Nội dung đang được cập nhật
                                                </AlterDismissible>
                                            )}
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
                                            <ItemTour data={item} />
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
                                                <ItemTour data={item} />
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
