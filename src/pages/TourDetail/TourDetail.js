import { Fragment, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faPrint } from '@fortawesome/free-solid-svg-icons';

import styles from './TourDetail.module.scss';
import BannerPage from '~/components/BannerPage';
import images from '~/assets/images';
import ItemTour from '~/components/ItemTour';
import { MultipleItems } from '~/components/Slider';
import SimpleSliderBanner from '~/components/Slider/Slider';
import CustomDatePicker from '~/components/CustomDatePicker';
import * as tourServices from '~/services/tourService';
import AlterDismissible from '~/components/CustomAlert';
import { actions, FormatDate, FormatPrice, useStore } from '~/store';
import config from '~/config';

const cx = classNames.bind(styles);

function TourDetail() {
    let { slug } = useParams();
    const [, dispatch] = useStore();
    const navigate = useNavigate();

    const [tour, setTour] = useState();
    const [adult, setAdult] = useState(1);
    const [child, setChild] = useState(0);
    const [baby, setBaby] = useState(0);
    const [priceAdult, setPriceAdult] = useState(0);
    const [priceChild, setPriceChild] = useState(0);
    const [priceBaby, sePriceBaby] = useState(0);
    const [total, setTotal] = useState(0);
    const [date, setDate] = useState('');
    const [listTourClassification, setListTourClassification] = useState({
        SimilarTour: [],
        TourPromotional: [],
    });
    const [booking, setBooking] = useState([]);

    //Set price
    useEffect(() => {
        tourServices
            .getTourDetail(slug)
            .then((res) => {
                setTour(res);
                res.guest_type &&
                    res.guest_type.map((item, index) => {
                        switch (item.customer_type) {
                            case 'children':
                                return setPriceChild(item.price);
                            case 'baby':
                                return sePriceBaby(item.price);
                            default:
                                return setPriceAdult(item.price);
                        }
                    });
            })
            .catch((err) => {
                console.error('Error fetching tour:', err);
            });

        dispatch(actions.setShowSearch(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    // Calculate total price
    useEffect(() => {
        setTotal(priceAdult * adult + priceChild * child + priceBaby * baby);
    }, [priceAdult, adult, priceChild, child, priceBaby, baby]);

    // useEffect(() => {
    //     const listElementSVG = document.querySelectorAll('svg');
    //     listElementSVG.forEach((svg) => {
    //         svg.style.pointerEvents = 'none';
    //     });
    // }, []);

    // Filter tour
    useEffect(() => {
        tourServices
            .getTour()
            .then((res) => {
                const similarTour = res.filter((item) => item.tour_group === tour.tour_group);
                setListTourClassification((prev) => {
                    return { ...prev, SimilarTour: similarTour };
                });
                const tourPromotional = res.filter((tour) => tour.sale > 0);
                setListTourClassification((prev) => {
                    return { ...prev, TourPromotional: tourPromotional };
                });
            })
            .catch((err) => {});
    }, [tour]);

    useEffect(() => {
        const updateBooking = (type, price, quantity) => {
            setBooking((prev) => {
                const filteredBooking = prev.filter((item) => item.customer_type !== type);
                if (quantity && tour) {
                    const { thumbnail_url, tour_id, tour_name, slug } = tour;
                    return [
                        ...filteredBooking,
                        {
                            thumbnail_url,
                            tour_id,
                            tour_name,
                            slug,
                            customer_type: type,
                            price,
                            quantity,
                            departure_date: FormatDate(date),
                        },
                    ];
                }
                return filteredBooking;
            });
        };

        updateBooking('adult', priceAdult, adult);
        updateBooking('child', priceChild, child);
        updateBooking('baby', priceBaby, baby);
    }, [priceAdult, adult, priceChild, child, priceBaby, baby, tour, date]);

    if (!tour) {
        return <></>;
    }

    const handleAddBooking = (e) => {
        e.preventDefault();
        dispatch(actions.addToCart(booking));
        navigate(config.routes.cart);
    };

    function createMarkup(data) {
        return { __html: `${data}` };
    }
    function AdultCustomers(data, index) {
        const { price } = data;
        return (
            <ul key={index} className={cx('variant_list', 'row')} id="2345">
                <li className={cx('col-sm-4 col-4')}>Người lớn</li>
                <li className={cx('col-sm-2 col-4')}>
                    <div className={cx('quantity')}>
                        <button
                            type="button"
                            className={cx('plus')}
                            onClick={(e) => {
                                setAdult(adult + 1);
                            }}
                        >
                            <FontAwesomeIcon icon={faAngleUp} />
                        </button>
                        <input className={cx('qty')} type="number" min="1" step="1" value={adult} disabled />
                        <button
                            type="button"
                            className={cx('minus')}
                            onClick={(e) => {
                                if (adult > 0) {
                                    setAdult(adult - 1);
                                }
                            }}
                        >
                            <FontAwesomeIcon icon={faAngleDown} />
                        </button>
                    </div>
                </li>
                <li className={cx('col-sm-3 col-4 text-end', 'variant_price')}>
                    {FormatPrice(price)}
                    <input type="hidden" value={price ? price : 0} name="variant_price" />
                </li>
                <li className={cx('col-sm-3 text-end', 'subtotal')}>{FormatPrice(price * adult)}</li>
            </ul>
        );
    }
    function ChildrenCustomers(data, index) {
        const { price } = data;
        return (
            <ul key={index} className={cx('variant_list', 'row')}>
                <li className={cx('col-sm-4 col-4')}>Trẻ em</li>
                <li className={cx('col-sm-2 col-4')}>
                    <div className={cx('quantity')}>
                        <button
                            type="button"
                            className={cx('plus')}
                            onClick={(e) => {
                                setChild(child + 1);
                            }}
                        >
                            <FontAwesomeIcon icon={faAngleUp} />
                        </button>
                        <input className={cx('qty')} type="number" min="1" value={child} disabled />
                        <button
                            type="button"
                            className={cx('minus')}
                            onClick={(e) => {
                                if (child > 0) {
                                    setChild(child - 1);
                                }
                            }}
                        >
                            <FontAwesomeIcon icon={faAngleDown} />
                        </button>
                    </div>
                </li>
                <li className={cx('col-sm-3 col-4 text-end', 'variant_price')}>
                    {FormatPrice(price)}
                    <input
                        type="hidden"
                        // value={price}
                        name="variant_price"
                    />
                </li>
                <li className={cx('col-sm-3 text-end', 'subtotal')}>{FormatPrice(price * child)}</li>
            </ul>
        );
    }
    function BabyCustomer(data, index) {
        const { price } = data;
        return (
            <ul key={index} className={cx('variant_list', 'row')}>
                <li className={cx('col-sm-4 col-4')}>Em bé</li>
                <li className={cx('col-sm-2 col-4')}>
                    <div className={cx('quantity')}>
                        <button
                            type="button"
                            className={cx('plus')}
                            onClick={(e) => {
                                setBaby(baby + 1);
                            }}
                        >
                            <FontAwesomeIcon icon={faAngleUp} />
                        </button>
                        <input
                            className={cx('qty')}
                            type="number"
                            onChange={(e) => {
                                console.log(e);
                            }}
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
                            }}
                        >
                            <FontAwesomeIcon icon={faAngleDown} />
                        </button>
                    </div>
                </li>
                <li className={cx('col-sm-3 col-4 text-end', 'variant_price')}>
                    {FormatPrice(price)}
                    <input type="hidden" value={price} name="variant_price" />
                </li>
                <li className={cx('col-sm-3 text-end', 'subtotal')}>{FormatPrice(price * baby)}</li>
            </ul>
        );
    }

    const handleGoElement = (e, element) => {
        e.preventDefault();
        const locationElement = document.querySelector(`${element}`);
        if (locationElement) {
            const topPosition = locationElement.offsetTop;
            window.scrollTo({
                top: topPosition,
                behavior: 'smooth',
            });
        }
    };

    const settingTourSlider = {
        arrows: false,
        accessibility: false,
        draggable: false,
        autoplaySpeed: 0,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    accessibility: true,
                    infinite: false,
                    arrows: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    accessibility: true,
                    arrows: true,
                    infinite: false,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1.5,
                    slidesToScroll: 1,
                    accessibility: true,
                    arrows: true,
                    infinite: false,
                },
            },
        ],
    };
    return (
        <Fragment>
            <BannerPage image={tour.thumbnail_url} title={tour.tour_name} />
            <div className={cx('details-tour-wrap', 'grey-bg')}>
                <div className={cx('container')}>
                    <div className={cx('row', 'details-tour')}>
                        <div className={cx('col-12 col-lg-8')}>
                            {tour.image_url && (
                                <div className={cx('tour-image-block')}>
                                    {tour.image_url ? (
                                        <Fragment>
                                            {Array.isArray(tour.image_url) ? (
                                                <SimpleSliderBanner>
                                                    {tour.image_url.map((item, index) => {
                                                        return (
                                                            <Link key={index} className={cx('image-wrapper')}>
                                                                <img src={item} alt={tour.tour_name} />
                                                            </Link>
                                                        );
                                                    })}
                                                </SimpleSliderBanner>
                                            ) : (
                                                <div className={cx('single-image')}>
                                                    <Link className={cx('image-wrapper')}>
                                                        <img src={tour.image_url} alt={tour.tour_name} />
                                                    </Link>
                                                </div>
                                            )}
                                        </Fragment>
                                    ) : (
                                        <div className={cx('single-image')}>
                                            <Link className={cx('image-wrapper')}>
                                                <img src={images.bannerAbout} alt={tour.tour_name} />
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            )}
                            <div className={cx('white-bg', 'tour-main-content')}>
                                <div id={cx('tour-schedule')} className={cx('tour-block')}>
                                    <div className={cx('tour-schedule-title')}>Chương trình Tour</div>
                                    {tour.tour_program ? (
                                        <div
                                            className={cx('rte')}
                                            dangerouslySetInnerHTML={createMarkup(tour.tour_program)}
                                        ></div>
                                    ) : (
                                        <div className={cx('rte')}>
                                            <AlterDismissible className={'alert-success'}>
                                                Chương trình Tour đang cập nhật
                                            </AlterDismissible>
                                        </div>
                                    )}
                                </div>
                                <div id={cx('tour-departure')} className={cx('tour-block')}>
                                    <div className={cx('tour-schedule-title')}>Chính sách Tour</div>
                                    {tour.tour_policy ? (
                                        <div
                                            className={cx('rte')}
                                            dangerouslySetInnerHTML={createMarkup(tour.tour_policy)}
                                        ></div>
                                    ) : (
                                        <div className={cx('rte')}>
                                            <AlterDismissible className={'alert-success'}>
                                                Chính sách Tour đang cập nhật
                                            </AlterDismissible>
                                        </div>
                                    )}
                                </div>
                                <div id={cx('tour-term-regulations')} className={cx('tour-block')}>
                                    <div className={cx('tour-schedule-title')}>Điều khoản & Quy định</div>

                                    {tour.terms_conditions ? (
                                        <div
                                            className={cx('rte')}
                                            dangerouslySetInnerHTML={createMarkup(tour.terms_conditions)}
                                        ></div>
                                    ) : (
                                        <div className={cx('rte')}>
                                            <AlterDismissible className={'alert-success'}>
                                                Điều khoản & Quy định đang cập nhật
                                            </AlterDismissible>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div id={cx('book-tour-now')} className={cx('tour-booking', 'white-bg')}>
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
                                            {tour.guest_type &&
                                                tour.guest_type.map((item, index) => {
                                                    switch (item.customer_type) {
                                                        case 'children':
                                                            return ChildrenCustomers(item, index);
                                                        case 'baby':
                                                            return BabyCustomer(item, index);
                                                        default:
                                                            return AdultCustomers(item, index);
                                                    }
                                                })}

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
                                                    <CustomDatePicker setDate={setDate} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('col-md-6 col-sm-5 col-12', 'add-to-card')}>
                                            <button
                                                onClick={handleAddBooking}
                                                disabled={date.length === 0}
                                                type="button"
                                                id={cx('submit-table')}
                                            >
                                                Đặt tour
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className={cx('col-12 col-lg-4 z-0', 'details-wrap')}>
                            <div className={cx('sticky-top')}>
                                <div className={cx('white-bg')}>
                                    <div className={cx('title-detail')}>
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
                                    <Link
                                        to={`/in-tour/${tour.slug}`}
                                        target="_blank"
                                        title=""
                                        className={cx('btn-print', 'round-btn')}
                                    >
                                        <FontAwesomeIcon icon={faPrint} />
                                        In chương trình tour
                                    </Link>
                                    {tour.trip && (
                                        <div className={cx('journey')}>
                                            <span>Hành trình:</span>&nbsp; {tour.trip}
                                        </div>
                                    )}
                                    <ul className={cx('ct_course_list')}>
                                        {tour.vehicle &&
                                            tour.vehicle.map((item, index) => {
                                                switch (item.toLowerCase()) {
                                                    case 'car':
                                                        return (
                                                            <li key={index}>
                                                                <img src={images.tagCar} alt="" />
                                                                Di chuyển:&nbsp;
                                                                <span className={cx('tag-color')}>
                                                                    Di chuyển bằng ô tô
                                                                </span>
                                                            </li>
                                                        );
                                                    case 'plane':
                                                        return (
                                                            <li key={index}>
                                                                <img src={images.tagPlane} alt="" />
                                                                Di chuyển:&nbsp;
                                                                <span className={cx('tag-color')}>
                                                                    Di chuyển bằng máy bay
                                                                </span>
                                                            </li>
                                                        );
                                                    case 'ship':
                                                        return (
                                                            <li key={index}>
                                                                <img src={images.tagShip} alt="" />
                                                                Di chuyển:&nbsp;
                                                                <span className={cx('tag-color')}>
                                                                    Di chuyển bằng tàu thủy
                                                                </span>
                                                            </li>
                                                        );
                                                    case 'train':
                                                        return (
                                                            <li key={index}>
                                                                <img src={images.tagTrain} alt="" />
                                                                Di chuyển:&nbsp;
                                                                <span className={cx('tag-color')}>
                                                                    Di chuyển bằng tàu hỏa
                                                                </span>
                                                            </li>
                                                        );
                                                    default:
                                                        return <></>;
                                                }
                                            })}
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
                                        {tour.tour_summary ? (
                                            <div
                                                className={cx('content-summary')}
                                                dangerouslySetInnerHTML={createMarkup(tour.tour_summary)}
                                            ></div>
                                        ) : (
                                            <div className={cx('content-summary')}>
                                                <AlterDismissible className="alert-success">
                                                    Nội dung đang được cập nhật
                                                </AlterDismissible>
                                            </div>
                                        )}
                                    </div>
                                    <div className={cx('call-me-back')}>
                                        <div className={cx('row')}>
                                            <div className={cx('col-12 col-sm-6')}>
                                                <Link
                                                    onClick={(e) => {
                                                        handleGoElement(e, `#${cx('book-tour-now')}`);
                                                    }}
                                                >
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
                                                className={cx('scroll-content')}
                                                title="Chương trình Tour"
                                                onClick={(e) => {
                                                    handleGoElement(e, `#${cx('tour-schedule')}`);
                                                }}
                                            >
                                                <img src={images.tourProgram} alt="Chương trình Tour" />
                                                <span>Chương trình Tour</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className={cx('scroll-content')}
                                                title="Chính sách Tour"
                                                onClick={(e) => {
                                                    handleGoElement(e, `#${cx('tour-departure')}`);
                                                }}
                                            >
                                                <img src={images.policy} alt="Chính sách Tour" />
                                                <span>Chính sách Tour</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className={cx('scroll-content')}
                                                title="Điều khoản & Quy định"
                                                onClick={(e) => {
                                                    handleGoElement(e, `#${cx('tour-term-regulations')}`);
                                                }}
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
            {/* /// */}
            <div className={cx('similar-tour-wrap', 'grey-bg')}>
                <div className={cx('container')}>
                    <div className={cx('white-bg', 'similar-tour')}>
                        <div className={cx('similar-tour-title', 'text-center')}>
                            <h2>
                                <Link to="#">Các Tour tương tự</Link>
                            </h2>
                        </div>
                        <div className={cx('similar-tour-content')}>
                            <div className={cx('row')}>
                                {listTourClassification.SimilarTour.length < 5 ? (
                                    listTourClassification.SimilarTour.map((item, index) => {
                                        return (
                                            <div key={index} className={cx('col-12 col-sm-6 col-md-4 col-lg-3')}>
                                                <ItemTour data={item} />
                                            </div>
                                        );
                                    })
                                ) : (
                                    <MultipleItems setting={settingTourSlider}>
                                        {listTourClassification.SimilarTour.map((item, index) => {
                                            return (
                                                <div key={index} className={cx('col-12 col-sm-6 col-md-4 col-lg-3')}>
                                                    <ItemTour data={item} />
                                                </div>
                                            );
                                        })}
                                    </MultipleItems>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /// */}
            <div className={cx('similar-tour-wrap', 'grey-bg')}>
                <div className={cx('container')}>
                    <div className={cx('white-bg', 'similar-tour')}>
                        <div className={cx('similar-tour-title', 'text-center')}>
                            <h2 className={cx('section-title')}>
                                <Link to="#">
                                    <span>Tour giờ chót</span>
                                    &nbsp; giá tốt
                                </Link>
                            </h2>
                        </div>
                        <div className={cx('similar-tour-content')}>
                            <div className={cx('row')}>
                                {listTourClassification.TourPromotional.length < 5 ? (
                                    listTourClassification.TourPromotional.map((item, index) => {
                                        return (
                                            <div key={index} className={cx('col-12 col-sm-6 col-md-4 col-lg-3')}>
                                                <ItemTour data={item} />
                                            </div>
                                        );
                                    })
                                ) : (
                                    <MultipleItems setting={settingTourSlider}>
                                        {listTourClassification.TourPromotional.map((item, index) => {
                                            return (
                                                <div key={index} className={cx('col-12 col-sm-6 col-md-4 col-lg-3')}>
                                                    <ItemTour data={item} />
                                                </div>
                                            );
                                        })}
                                    </MultipleItems>
                                )}
                                {/* {listTourClassification.TourDomestic.length > 0 && (
                                    <MultipleItems setting={settingTourSlider}>
                                        {listTourClassification.TourDomestic.slice(0, 4).map((item, index) => {
                                            return (
                                                <div key={index} className={cx('col-12 col-sm-6 col-md-4 col-lg-3')}>
                                                    <ItemTour data={item} />
                                                </div>
                                            );
                                        })}
                                    </MultipleItems>
                                )} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default TourDetail;
