import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faPrint } from '@fortawesome/free-solid-svg-icons';

import styles from './TourDetail.module.scss';
import BannerPage from '~/components/BannerPage';
import images from '~/assets/images';
import ItemTour from '~/components/ItemTour';
import { SimpleSliderBanner, MultipleItems } from '~/components/Slider';
import CustomDatePicker from '~/components/CustomDatePicker';
import AlterDismissible from '~/components/CustomAlert';
import { actions, useStore } from '~/store';
import config from '~/config';
import { getCategorizedToursData, ListCustomer, listVehicle } from '~/data';
import { TourService } from '~/services';
import { convertDaysToNumbers, createMarkup, formatPrice, keysToCamelCase } from '~/utils';
import { useSlidesToShow } from '~/hooks';

const cx = classNames.bind(styles);

const VehiclesList = ({ tour }) => {
    const vehicles = useMemo(() => {
        if (!tour?.vehicles?.length) return null;

        return tour?.vehicles?.map((veh) => {
            const vehicleType = listVehicle.find((item) => item.value === veh.codeVehicle);
            return {
                ...veh,
                label: vehicleType.label,
                image: vehicleType.image,
            };
        });
    }, [tour]);

    return (
        <ul className={cx('ct_course_list')}>
            {vehicles?.map((veh) => {
                return (
                    <li key={veh.codeVehicle}>
                        <img src={veh.image} alt="" />
                        Di chuyển:&nbsp;
                        <span className={cx('tag-color')}>{`Di chuyển bằng ${veh.label.toLowerCase()}`}</span>
                    </li>
                );
            })}
            <li>
                <img src={images.tagDateTime} alt="" />
                Lịch khởi hành:&nbsp;
                <span className={cx('tag-color')}>{tour?.departureSchedule}</span>
            </li>
            <li>
                <img src={images.tagDate} alt="" />
                Thời gian:&nbsp;
                <span className={cx('tag-color')}>{tour?.time}</span>
            </li>
        </ul>
    );
};

const BookingTour = ({ tour, guestPrice, total, date, handleQuantityChange, handleAddBooking, setDate }) => {
    return (
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
                        {guestPrice?.map((guest) => {
                            return (
                                <ul key={guest.guestCode} className={cx('variant_list', 'row')}>
                                    <li className={cx('col-sm-4 col-4')}>{guest.label}</li>
                                    <li className={cx('col-sm-2 col-4')}>
                                        <div className={cx('quantity')}>
                                            <button
                                                type="button"
                                                className={cx('plus')}
                                                onClick={(e) => {
                                                    if (guest.quantity < 20) {
                                                        handleQuantityChange(guest.guestCode, 1);
                                                    }
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faAngleUp} />
                                            </button>
                                            <input
                                                className={cx('qty')}
                                                type="number"
                                                min="1"
                                                value={guest.quantity}
                                                disabled
                                            />
                                            <button
                                                type="button"
                                                className={cx('minus')}
                                                onClick={(e) => {
                                                    if (guest.quantity > 0) {
                                                        handleQuantityChange(guest.guestCode, -1);
                                                    }
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faAngleDown} />
                                            </button>
                                        </div>
                                    </li>
                                    <li className={cx('col-sm-3 col-4 text-end', 'variant_price')}>
                                        {formatPrice(guest.price)}
                                        <input
                                            type="hidden"
                                            // value={price}
                                            name="variant_price"
                                        />
                                    </li>
                                    <li className={cx('col-sm-3 text-end', 'subtotal')}>
                                        {formatPrice(guest.totalPrice)}
                                    </li>
                                </ul>
                            );
                        })}
                        <div className={cx('total-price', 'text-end row')}>
                            <span className={cx('col-md-8 col-sm-9 col-6')}>Tổng số tiền</span>
                            <strong className={cx('col-md-4 col-sm-5 col-6')}>{formatPrice(total)}</strong>
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
                                <CustomDatePicker
                                    departDays={convertDaysToNumbers(tour?.departureSchedule)}
                                    setDate={setDate}
                                />
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
    );
};

const ExtendedTour = ({ label = '', path = '#', tours = [], settingTourSlider }) => {
    const { shouldUseSlider } = useSlidesToShow(tours.length);

    return (
        <div className={cx('similar-tour-wrap', 'grey-bg')}>
            <div className={cx('container')}>
                <div className={cx('white-bg', 'similar-tour')}>
                    <div className={cx('similar-tour-title', 'text-center')}>
                        <h2>
                            <Link to={path}>{label}</Link>
                        </h2>
                    </div>
                    <div className={cx('similar-tour-content')}>
                        {shouldUseSlider ? (
                            <MultipleItems setting={settingTourSlider}>
                                {tours?.map((tour) => {
                                    return <ItemTour key={tour.tourCode} data={tour} />;
                                })}
                            </MultipleItems>
                        ) : (
                            <div className={cx('row')}>
                                {tours?.map((tour) => {
                                    return (
                                        <div key={tour.tourCode} className={cx('col-12 col-sm-6 col-md-4 col-lg-3')}>
                                            <ItemTour data={tour} />
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

function TourDetail() {
    let { slug } = useParams();
    const [, dispatch] = useStore();
    const navigate = useNavigate();

    const [tour, setTour] = useState();
    const [date, setDate] = useState('');
    const [listTourClassification, setListTourClassification] = useState({
        similarTours: [],
        promotionalTours: [],
    });
    const [tours, setTours] = useState([]);
    const [guestPrice, setGuestPrice] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const { listTours, promotionalTours } = await getCategorizedToursData();
                setTours(listTours);
                setListTourClassification((prev) => ({ ...prev, promotionalTours }));
            } catch (error) {
                console.error('Error fetching tours data:', error);
            }
        })();
    }, []);

    useEffect(() => {
        if (!slug || tours.length === 0) return;

        const findTour = tours.find((item) => item.slug === slug);
        if (findTour) {
            setTour(findTour);
            return;
        }

        const fetchTour = async () => {
            try {
                const { status, error_code, data } = await TourService.getTourDetail(slug);
                if (status === 'success' && error_code === 0) {
                    setTour(keysToCamelCase(data));
                }
            } catch (error) {}
        };
        fetchTour();
    }, [slug, tours]);

    useEffect(() => {
        if (!tour?.guests?.length || !Array.isArray(ListCustomer)) return;

        const updateGuests = tour?.guests?.map((guest) => {
            const customerType = ListCustomer.find((item) => item.value === guest.guestCode);
            if (!customerType) return null;

            const price = Math.round((tour?.price || 0) * (customerType.ticketRate || 1));
            const quantity = customerType.value === 1 ? 1 : 0;
            return { ...guest, price, label: customerType.label, quantity, totalPrice: price * quantity };
        });

        const filteredGuests = updateGuests.filter((item) => item !== null);
        setGuestPrice(filteredGuests);

        const temp = tours.filter((item) => {
            return item.tourGroup === tour.tourGroup && item.id !== tour.id;
        });

        setListTourClassification((prev) => ({ ...prev, similarTours: temp }));
    }, [tour, tours]);

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
        arrows: true,
        accessibility: false,
        draggable: true,
        // autoplaySpeed: 0,
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

    const handleQuantityChange = useCallback(
        (type, delta) => {
            const temp = guestPrice.find((item) => item.guestCode === type);
            if (!temp) return;

            const updatedGuestPrice = guestPrice.map((item) => {
                if (item.guestCode === type) {
                    const quantity = Math.max(0, item.quantity + delta);
                    return { ...item, quantity, totalPrice: item.price * quantity };
                }
                return item;
            });
            setGuestPrice(updatedGuestPrice);
        },
        [guestPrice],
    );

    const total = useMemo(() => {
        return guestPrice.reduce((sum, item) => sum + item.totalPrice, 0);
    }, [guestPrice]);

    const handleAddBooking = useCallback(
        (e) => {
            e.preventDefault();

            if (!tour || !Array.isArray(guestPrice) || guestPrice.length === 0) return;

            // Lọc chỉ lấy khách có số lượng > 0
            const filterBooking = guestPrice
                .filter((guest) => guest.quantity > 0)
                .map((guest) => ({
                    // ...guest,
                    quantity: guest.quantity,
                    guestId: guest.guestCode,
                    tourId: tour.id,
                    slug: tour.slug,
                    tourName: tour.tourName,
                    tourCode: tour.tourCode,
                    unitPrice: tour.price,
                    thumbnailUrl: tour.thumbnailUrl,
                    departureDate: new Date(date).toLocaleDateString('en-CA'),
                }));

            if (filterBooking.length === 0) {
                console.warn('Không có khách nào được chọn để đặt tour.');
                return;
            }

            dispatch(actions.addToCart(filterBooking));
            navigate(config.routes.cart);
        },
        [tour, guestPrice, date, dispatch, navigate],
    );

    return (
        <Fragment>
            <BannerPage image={tour?.thumbnailUrl || images.defaultBanner} title={tour?.tourName} />
            <div className={cx('details-tour-wrap', 'grey-bg')}>
                <div className={cx('container')}>
                    <div className={cx('row', 'details-tour')}>
                        <div className={cx('col-12 col-lg-8')}>
                            {tour?.imagesUrl && (
                                <div className={cx('tour-image-block')}>
                                    {tour?.imagesUrl ? (
                                        <Fragment>
                                            {Array.isArray(tour?.imagesUrl) ? (
                                                <SimpleSliderBanner>
                                                    {tour?.imagesUrl.map((item, index) => {
                                                        return (
                                                            <Link key={index} className={cx('image-wrapper')}>
                                                                <img src={item} alt={tour?.tourName} />
                                                            </Link>
                                                        );
                                                    })}
                                                </SimpleSliderBanner>
                                            ) : (
                                                <div className={cx('single-image')}>
                                                    <Link className={cx('image-wrapper')}>
                                                        <img src={tour?.imagesUrl} alt={tour?.tourName} />
                                                    </Link>
                                                </div>
                                            )}
                                        </Fragment>
                                    ) : (
                                        <div className={cx('single-image')}>
                                            <Link className={cx('image-wrapper')}>
                                                <img src={images.bannerAbout} alt={tour?.tourName} />
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            )}
                            <div className={cx('white-bg', 'tour-main-content')}>
                                <div id={cx('tour-schedule')} className={cx('tour-block')}>
                                    <div className={cx('tour-schedule-title')}>Chương trình Tour</div>
                                    {tour?.tourProgram ? (
                                        <div
                                            className={cx('rte')}
                                            dangerouslySetInnerHTML={createMarkup(tour?.tourProgram)}
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
                                    {tour?.tourPolicy ? (
                                        <div
                                            className={cx('rte')}
                                            dangerouslySetInnerHTML={createMarkup(tour?.tourPolicy)}
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

                                    {tour?.termsConditions ? (
                                        <div
                                            className={cx('rte')}
                                            dangerouslySetInnerHTML={createMarkup(tour?.termsConditions)}
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
                            <BookingTour
                                tour={tour}
                                guestPrice={guestPrice}
                                total={total}
                                date={date}
                                handleQuantityChange={handleQuantityChange}
                                handleAddBooking={handleAddBooking}
                                setDate={setDate}
                            />
                        </div>
                        <div className={cx('col-12 col-lg-4 z-0', 'details-wrap')}>
                            <div className={cx('sticky-top')}>
                                <div className={cx('white-bg')}>
                                    <div className={cx('title-detail')}>
                                        <h1 className={cx('title-head')}>{tour?.tourName}</h1>
                                    </div>
                                    <div className={cx('price-box')}>
                                        {tour?.sale ? (
                                            <Fragment>
                                                <span className={cx('old-price')}>
                                                    <del className={cx('product-price-old')}>
                                                        {formatPrice(tour?.suggestedPrice)}
                                                    </del>
                                                </span>
                                                <span className={cx('special-price')}>
                                                    Giá mới:&nbsp;{formatPrice(tour?.price)}
                                                </span>
                                                <span className={cx('save-price')}>
                                                    Tiết kiệm
                                                    <span className={cx('save-price-value')}>{tour?.sale}%</span>
                                                </span>
                                            </Fragment>
                                        ) : (
                                            <span className={cx('special-price')}>
                                                Giá mới:&nbsp;{formatPrice(tour?.price)}
                                            </span>
                                        )}
                                    </div>
                                    <Link
                                        to={`/in-tour/${tour?.id}`}
                                        target="_blank"
                                        title=""
                                        className={cx('btn-print', 'round-btn')}
                                    >
                                        <FontAwesomeIcon icon={faPrint} />
                                        In chương trình tour
                                    </Link>
                                    {tour?.trip && (
                                        <div className={cx('journey')}>
                                            <span>Hành trình:</span>&nbsp; {tour?.trip}
                                        </div>
                                    )}
                                    <VehiclesList tour={tour} />
                                    <div className={cx('product-summary')}>
                                        {tour?.tourSummary ? (
                                            <div
                                                className={cx('content-summary')}
                                                dangerouslySetInnerHTML={createMarkup(tour?.tourSummary)}
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

            <ExtendedTour
                label="Các Tour tương tự"
                tours={listTourClassification.similarTours}
                settingTourSlider={settingTourSlider}
            />

            <ExtendedTour
                label="Tour giờ chót giá tốt"
                tours={listTourClassification.promotionalTours}
                settingTourSlider={settingTourSlider}
            />
        </Fragment>
    );
}

export default TourDetail;
