import React, { Fragment, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import lodash from 'lodash';

import styles from './Home.module.scss';
import images from '~/assets/images';
import ItemTour from '~/components/ItemTour';
import ItemDestination from '~/components/ItemDestination';
import ItemNews from '~/components/ItemNews';
import SimpleSliderBanner, { MultipleItems } from '~/components/Slider';
import CustomDatePicker from '~/components/CustomDatePicker';
// Service
import config from '~/config';
import { NewsService, TouristPlaceService, TourService } from '~/services';

const cx = classNames.bind(styles);

const policy = [
    {
        icon: images.feature1,
        title: 'Đảm bảo giá tốt nhất',
        description:
            'Chúng tôi đảm bảo khách hàng sẽ đặt được dịch vụ với giá tốt nhất, những chương trình khuyến mãi hấp dẫn nhất',
    },
    {
        icon: images.feature2,
        title: 'Dịch vụ tin cậy - Giá trị đích thực',
        description:
            'Đặt lợi ích khách hàng lên trên hết, chúng tôi hỗ trợ khách hàng nhanh và chính xác nhất với dịch vụ tin cậy, giá trị đích thực.',
    },
    {
        icon: images.feature3,
        title: 'Đảm bảo chất lượng',
        description:
            'Chúng tôi liên kết chặt chẽ với các đối tác, khảo sát định kỳ để đảm bảo chất lượng tốt nhất của dịch vụ',
    },
];

function Home() {
    const navigate = useNavigate();
    const [listTours, setListTours] = useState([]);
    const [listNews, setListNews] = useState([]);
    const [listDestinations, setListDestinations] = useState([]);
    const [listTourClassification, setListTourClassification] = useState({
        TourDomestic: [],
        TourInternational: [],
        TourPromotional: [],
        MostPromotionalTour: [],
    });
    const [departureDate, setDepartureDate] = useState('');
    const [fields, setFields] = useState({
        Destination: '',
        departureDate,
        DeparturePoint: '',
    });

    const setFieldValue = ({ target: { name, value } }) => {
        setFields((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    // [GET data]
    useEffect(() => {
        //Tour
        TourService.getTour()
            .then((res) => {
                setListTours(res);
            })
            .catch((err) => {
                setListTours([]);
            });
        //News
        NewsService.getNews()
            .then((res) => {
                setListNews(res);
            })
            .catch((err) => {
                setListNews([]);
            });

        //Place
        TouristPlaceService.getTouristPlace()
            .then((res) => {
                setListDestinations(res);
            })
            .catch((err) => {
                setListDestinations([]);
            });
    }, []);

    useEffect(() => {
        setFields((prev) => ({
            ...prev,
            departureDate,
        }));
    }, [departureDate]);
    // [Classify data tour]
    useEffect(() => {
        const tourDomestic = listTours.filter((tour) => tour.tour_group === 'Domestic');
        setListTourClassification((prev) => {
            return { ...prev, TourDomestic: tourDomestic };
        });
        const tourInternational = listTours.filter((tour) => tour.tour_group === 'International');
        setListTourClassification((prev) => {
            return { ...prev, TourInternational: tourInternational };
        });
        const tourPromotional = listTours.filter((tour) => tour.sale > 0);
        setListTourClassification((prev) => {
            return { ...prev, TourPromotional: tourPromotional };
        });
        let mostPromotionalTour = lodash.sortBy(tourPromotional, (item) => {
            if (item.sale) {
                return item.sale;
            }
        });
        mostPromotionalTour = lodash.reverse(mostPromotionalTour);
        setListTourClassification((prev) => {
            return { ...prev, MostPromotionalTour: mostPromotionalTour };
        });
    }, [listTours]);

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(
            `${config.routes.search}?destination=${fields.Destination}&departuredate=${fields.departureDate}&departurepoint=${fields.DeparturePoint}`,
        );
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
            {/* home-banner-section */}
            <section className={cx('home-banner-section')}>
                {listTourClassification.MostPromotionalTour.length > 0 && (
                    <SimpleSliderBanner>
                        {listTourClassification.MostPromotionalTour.slice(0, 6).map((tour, index) => {
                            return (
                                <div key={index}>
                                    <div
                                        className={cx('home-banner', 'd-flex align-items-center')}
                                        style={{
                                            backgroundImage: `url(${tour.thumbnail_url})`,
                                        }}
                                    >
                                        <div className="overlay"></div>
                                        <div className={cx('container')}>
                                            <div className={cx('banner-content', 'text-center')}>
                                                <div className={cx('row')}>
                                                    <div className={cx('col-lg-8 offset-lg-2')}>
                                                        {/* <h4 className={cx('banner-sub-title')}>Du Lịch Dubai</h4> */}
                                                        <h2 className={cx('banner-title')}>{tour.tour_name}</h2>
                                                        <Link
                                                            to={`${config.routes.tour}/${tour.slug}`}
                                                            className={cx('round-btn')}
                                                        >
                                                            Xem thêm
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </SimpleSliderBanner>
                )}
            </section>
            {/* home-trip-search */}
            <section className={cx('home-trip-search', 'primary-bg')}>
                <div className={cx('container')}>
                    <div className={cx('row')}>
                        <div className={cx('col-12', 'home-search-title')}>
                            <h2>Đặt Tour du lịch!</h2>
                            <p>Hơn 300 tours du lịch ở Việt Nam và Quốc tế</p>
                        </div>
                    </div>
                    <div className={cx('row')}>
                        <div className={cx('col-12')}>
                            <div className={cx('main-search')}>
                                <div className={cx('row')}>
                                    <div className={cx('col-12')}>
                                        <div className={cx('input-group', 'group_a')}>
                                            <img src={images.local} alt="local" />
                                            <input
                                                className={cx('form-control form-control-lg')}
                                                type="text"
                                                placeholder="Bạn muốn đi đâu?"
                                                autoComplete="off"
                                                name="Destination"
                                                onChange={setFieldValue}
                                            />
                                        </div>
                                    </div>
                                    <div className={cx('col-12 col-sm-5')}>
                                        <div className={cx('group-search')}>
                                            <div className={cx('group-search-icon')}>
                                                <img src={images.date} alt="date" />
                                            </div>
                                            <div className={cx('group-search-content')}>
                                                <p>Ngày khởi hành</p>
                                                <CustomDatePicker setDate={setDepartureDate} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('col-12 col-sm-5')}>
                                        <div className={cx('group-search')}>
                                            <div className={cx('group-search-icon')}>
                                                <img src={images.plane} alt="plane" />
                                            </div>
                                            <div className={cx('group-search-content')}>
                                                <p>Khởi hành từ</p>
                                                <input
                                                    type="text"
                                                    placeholder="Địa điểm khởi hành"
                                                    name="DeparturePoint"
                                                    autoComplete="off"
                                                    onChange={setFieldValue}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('col-12 col-sm-2', 'btn-sreach')}>
                                        <button onClick={handleSearch} className={cx('round-btn')}>
                                            Tìm
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* home-policy-section */}
            <section className={cx('home-policy-section')}>
                <div className={cx('home-policy-wrap')}>
                    <div className={cx('container')}>
                        <div className={cx('row')}>
                            {policy.map((policy, index) => {
                                return (
                                    <div key={index} className={cx('col-lg-4 col-md-4 col-12', 'policy-item')}>
                                        <div className={cx('policy-wrap')}>
                                            <div className={cx('policy-content')}>
                                                <div className={cx('icon')}>
                                                    <img src={policy.icon} alt={policy.title} />
                                                </div>
                                                <div className={cx('caption')}>
                                                    <h3>{policy.title}</h3>
                                                    <p>{policy.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
            {/* home-promotional-tour-section */}
            <section className={cx('home-promotional-tour-section', 'home-index-tour')}>
                <div className={cx('container')}>
                    <div className={cx('section-heading', 'text-center')}>
                        <h2 className={cx('section-title')}>
                            <Link to={config.routes.promotionalTours}>
                                <span>Tour giờ chót</span>
                                &nbsp; giá tốt
                            </Link>
                        </h2>
                        <p>
                            Cùng SaoViet Travler điểm qua một vài địa điểm du lịch trong nước thu hút du khách nhất nhé!
                        </p>
                    </div>
                    <div className={cx('row')}>
                        {listTourClassification.TourPromotional.length > 0 && (
                            <MultipleItems setting={settingTourSlider}>
                                {listTourClassification.TourPromotional.slice(0, 4).map((item, index) => {
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
            </section>
            {/* banner-section */}
            <section className={cx('banner-section')}>
                <div className={cx('container')}>
                    <div className={cx('row')}>
                        <div className={cx('col-lg-6 col-md-6 col-sm-6 col-12', 'banner-wrap')}>
                            <Link to="#">
                                <img src={images.featureMenu1} alt="home_banner_left" />
                            </Link>
                        </div>
                        <div className={cx('col-lg-6 col-md-6 col-sm-6 col-12', 'banner-wrap')}>
                            <Link to="#">
                                <img src={images.featureMenu2} alt="home_banner_left" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            {/* domestic-tour */}
            <section className={cx('domestic-tour', 'home-index-tour')}>
                <div className={cx('container')}>
                    <div className={cx('section-heading', 'text-center')}>
                        <h2 className={cx('section-title')}>
                            <Link to={config.routes.domesticTour}>Tour trong nước</Link>
                        </h2>
                        <p>
                            Tour du lịch Trong nước tại SaoViet Travler. Hành hương đầu xuân - Tận hưởng bản sắc Việt.
                        </p>
                    </div>
                    <div className={cx('row')}>
                        {listTourClassification.TourDomestic.length > 0 && (
                            <MultipleItems setting={settingTourSlider}>
                                {listTourClassification.TourDomestic.slice(0, 4).map((item, index) => {
                                    return (
                                        <div key={index} className={cx('col-12 col-sm-6 col-md-4 col-lg-3')}>
                                            <ItemTour data={item} />
                                        </div>
                                    );
                                })}
                            </MultipleItems>
                        )}
                    </div>
                    <div className={cx('text-center')}>
                        <Link to={config.routes.domesticTour} className={cx('round-btn')}>
                            Xem thêm tour
                        </Link>
                    </div>
                </div>
            </section>
            {/* overseas-tour */}
            <section className={cx('overseas-tour', 'home-index-tour')}>
                <div className={cx('container')}>
                    <div className={cx('section-heading', 'text-center')}>
                        <h2 className={cx('section-title')}>
                            <Link to={config.routes.internationalTour}>Tour nước ngoài</Link>
                        </h2>
                        <p>
                            Tour du lịch Nước ngoài tại SaoViet Travler. Du lịch 5 châu - Trải nghiệm sắc xuân thế giới
                        </p>
                    </div>
                    <div className={cx('row')}>
                        {listTourClassification.TourInternational.length > 0 && (
                            <MultipleItems setting={settingTourSlider}>
                                {listTourClassification.TourInternational.slice(0, 4).map((item, index) => {
                                    return (
                                        <div key={index} className={cx('col-12 col-sm-6 col-md-4 col-lg-3')}>
                                            <ItemTour data={item} />
                                        </div>
                                    );
                                })}
                            </MultipleItems>
                        )}
                    </div>
                    <div className={cx('text-center')}>
                        <Link to={config.routes.internationalTour} className={cx('round-btn')}>
                            Xem thêm tour
                        </Link>
                    </div>
                </div>
            </section>
            {/* home-destination */}
            <section className={cx('home-destination')}>
                <div className={cx('container')}>
                    <div className={cx('section-heading', 'text-center')}>
                        <h2 className={cx('section-title')}>
                            <Link to={config.routes.destination}>Điểm đến yêu thích</Link>
                        </h2>
                        <p>Các điểm đến du lịch trong nước và nước ngoài</p>
                    </div>
                    <div className={cx('row', 'sv-scroll')}>
                        {listDestinations.length > 0 && (
                            <MultipleItems setting={settingTourSlider}>
                                {listDestinations.slice(0, 4).map((destination) => (
                                    <div
                                        key={destination.location_id}
                                        className={cx('col-12 col-sm-6 col-md-6 col-lg-3')}
                                    >
                                        <ItemDestination data={destination} />
                                    </div>
                                ))}
                            </MultipleItems>
                        )}
                    </div>
                </div>
            </section>
            {/* travel-inspiration */}
            <section className={cx('travel-inspiration', 'home-index-tour')}>
                <div className={cx('container')}>
                    <div className={cx('section-heading', 'text-center')}>
                        <h2 className={cx('section-title')}>
                            <Link to={config.routes.news}>Cảm hứng du lịch</Link>
                        </h2>
                        <p>
                            Thông tin về du lịch, văn hóa, ẩm thực, các sự kiện và lễ hội tại các điểm đến Việt nam,
                            Đông Nam Á và Thế Giới
                        </p>
                    </div>
                    <div className={cx('row')}>
                        {listNews.length > 0 && (
                            <MultipleItems setting={settingTourSlider}>
                                {listNews.slice(0, 6).map((news) => {
                                    return (
                                        <div key={news.news_id} className={cx('col-12 col-sm-6 col-md-4 col-lg-4')}>
                                            <ItemNews data={news} />
                                        </div>
                                    );
                                })}
                            </MultipleItems>
                        )}
                    </div>
                    <div className={cx('text-center', 'more-btn')}>
                        <Link to={config.routes.news} className={cx('outline-btn outline-btn-white')}>
                            Xem tất cả tin tức
                        </Link>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}

export default Home;
