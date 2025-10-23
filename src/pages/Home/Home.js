import React, { Fragment, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import lodash from 'lodash';

import styles from './Home.module.scss';
import images from '~/assets/images';
import ItemTour from '~/components/ItemTour';
import ItemDestination from '~/components/ItemDestination';
import ItemNews from '~/components/ItemNews';
import { SimpleSliderBanner, MultipleItems } from '~/components/Slider';
import CustomDatePicker from '~/components/CustomDatePicker';

// Service
import config from '~/config';
import { useStore } from '~/store';
import { getCategorizedToursData, getNewsData, getTouristPlacesData } from '~/data';
import { useSlidesToShow } from '~/hooks';

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

const BaseSection = ({
    title = '',
    subTitle = '',
    path,
    classNameSection,
    children,
    showMore = false,
    showMoreTitle = 'Xem thêm',
}) => {
    return (
        <section className={cx(classNameSection)}>
            <div className={cx('container')}>
                <div className={cx('section-heading', 'text-center')}>
                    <h2 className={cx('section-title')}>
                        <Link to={path}>{title}</Link>
                    </h2>
                    {subTitle && <p>{subTitle}</p>}
                </div>
                {children}
                {showMore && (
                    <div className={cx('text-center')}>
                        <Link to={path} className={cx('round-btn')}>
                            {showMoreTitle}
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

const itemComponents = {
    tour: ItemTour,
    news: ItemNews,
    destination: ItemDestination,
};

const ContentSection = ({
    title,
    type = 'tour',
    subTitle,
    path,
    classNameSection,
    showMore = false,
    options = [],
    showMoreTitle = 'Xem thêm tour',
}) => {
    const hasTours = Array.isArray(options) && options.length > 0;
    const { shouldUseSlider } = useSlidesToShow(options.length);

    const ItemComponent = itemComponents[type] || ItemTour;

    return (
        <BaseSection
            title={title}
            subTitle={subTitle}
            path={path}
            classNameSection={classNameSection}
            showMore={showMore}
            showMoreTitle={showMoreTitle}
        >
            {hasTours ? (
                shouldUseSlider ? (
                    <MultipleItems setting={settingTourSlider}>
                        {options.map((option) => {
                            return <ItemComponent key={option.id} data={option} />;
                        })}
                    </MultipleItems>
                ) : (
                    <div className={cx('row', { 'sv-scroll': type === 'destination' })}>
                        {options.map((option) => {
                            return (
                                <div
                                    key={option.id}
                                    className={cx(
                                        'col-12 col-sm-6 col-md-4',
                                        type === 'news' ? 'col-lg-4' : 'col-lg-3',
                                    )}
                                >
                                    <ItemComponent data={option} />
                                </div>
                            );
                        })}
                    </div>
                )
            ) : (
                <div className={cx('no-data', 'text-center')}>
                    <p>Hiện chưa có tour nào trong danh mục này.</p>
                </div>
            )}
        </BaseSection>
    );
};

function Home() {
    const navigate = useNavigate();
    const [tour, setTour] = useState({
        domesticTours: [],
        internationalTours: [],
        promotionalTours: [],
        mostPromotionalTours: [],
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

    useEffect(() => {
        (async () => {
            const { domesticTours, internationalTours, promotionalTours } = await getCategorizedToursData();
            const news = await getNewsData();
            const touristPlaces = await getTouristPlacesData();

            const limitTours = (list) => list.slice(0, 4);
            const mostPromotionalTours = lodash
                .reverse(lodash.sortBy(promotionalTours, (item) => item.sale))
                ?.slice(0, 5);
            setTour({
                domesticTours: limitTours(domesticTours),
                internationalTours: limitTours(internationalTours),
                promotionalTours: limitTours(promotionalTours),
                mostPromotionalTours,
                news: news.slice(0, 6),
                touristPlaces: touristPlaces.slice(0, 6),
            });
        })();
    }, []);

    useEffect(() => {
        setFields((prev) => ({
            ...prev,
            departureDate,
        }));
    }, [departureDate]);

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(
            `${config.routes.search}?destination=${fields.Destination}&departuredate=${fields.departureDate}&departurepoint=${fields.DeparturePoint}`,
        );
    };

    return (
        <Fragment>
            {/* home-banner-section */}
            <section className={cx('home-banner-section')}>
                {tour.mostPromotionalTours.length > 0 && (
                    <SimpleSliderBanner>
                        {tour.mostPromotionalTours?.map((tour, index) => {
                            return (
                                <div key={index}>
                                    <div
                                        className={cx('home-banner', 'd-flex align-items-center')}
                                        style={{
                                            backgroundImage: `url(${tour.thumbnailUrl})`,
                                        }}
                                    >
                                        <div className="overlay"></div>
                                        <div className={cx('container')}>
                                            <div className={cx('banner-content', 'text-center')}>
                                                <div className={cx('row')}>
                                                    <div className={cx('col-lg-8 offset-lg-2')}>
                                                        {/* <h4 className={cx('banner-sub-title')}>Du Lịch Dubai</h4> */}
                                                        <h2 className={cx('banner-title')}>{tour.tourName}</h2>
                                                        <Link
                                                            to={`${config.routes.tourDetail.replace(
                                                                ':slug',
                                                                tour.slug,
                                                            )}`}
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
            <ContentSection
                title={`Tour giờ chót giá tốt`}
                subTitle={
                    'Cùng SaoViet Travler điểm qua một vài địa điểm du lịch trong nước thu hút du khách nhất nhé!'
                }
                path={config.routes.promotionalTours}
                classNameSection={'home-promotional-tour-section'}
                options={tour.promotionalTours}
            />
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
            <ContentSection
                title={`Tour trong nước`}
                subTitle={'Tour du lịch Trong nước tại SaoViet Travler. Hành hương đầu xuân - Tận hưởng bản sắc Việt.'}
                path={config.routes.domesticTour}
                classNameSection={'domestic-tour'}
                options={tour.promotionalTours}
                showMore
            />
            {/* overseas-tour */}
            <ContentSection
                title={`Tour nước ngoài`}
                subTitle={'Tour du lịch Nước ngoài tại SaoViet Travler. Du lịch 5 châu - Trải nghiệm sắc xuân thế giới'}
                path={config.routes.internationalTour}
                classNameSection={'overseas-tour'}
                options={tour.internationalTours}
                showMore
            />
            {/* home-destination */}
            <ContentSection
                title={'Điểm đến yêu thích'}
                type="destination"
                subTitle={'Các điểm đến du lịch trong nước và nước ngoài'}
                path={config.routes.destination}
                classNameSection={'home-destination'}
                options={tour.touristPlaces}
            />
            {/* travel-inspiration */}
            <ContentSection
                title={'Cảm hứng du lịch'}
                type="news"
                subTitle={
                    'Thông tin về du lịch, văn hóa, ẩm thực, các sự kiện và lễ hội tại các điểm đến Việt nam, Đông Nam Á và Thế Giới'
                }
                path={config.routes.news}
                classNameSection={'travel-inspiration'}
                options={tour.news}
                showMore
                showMoreTitle="Xem tất cả tin tức"
            />
        </Fragment>
    );
}

export default Home;
