import React, { Fragment, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import getYear from 'date-fns/getYear';
import getMonth from 'date-fns/getYear';
import range from 'lodash/range';

import styles from './Home.module.scss';
import images from '~/assets/images';
import ItemTour from '~/components/ItemTour';
import ItemDestination from '~/components/ItemDestination';
import ItemNews from '~/components/ItemNews';
import SimpleSliderBanner from '~/components/Slider';
const cx = classNames.bind(styles);

const listSlides = [
    {
        image_url: '',
        title: 'slider_1',
    },
    {
        image_url: '',
        title: 'slider_2',
    },
    {
        image_url: '',
        title: 'slider_3',
    },
    {
        image_url: '',
        title: 'slider_4',
    },
    {
        image_url: '',
        title: 'slider_5',
    },
];
const policys = [
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
function Home() {
    const [startDate, setStartDate] = useState(new Date());

    // eslint-disable-next-line no-undef
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

    return (
        <Fragment>
            {/* home-banner-section */}
            <section className={cx('home-banner-section')}>
                <SimpleSliderBanner>
                    {listSlides.map((data, index) => {
                        return (
                            <div key={index}>
                                <div
                                    className={cx('home-banner', 'd-flex align-items-center')}
                                    style={{
                                        backgroundImage:
                                            'url(https://demo.stairthemes.com/html/traveler/assets/images/banner-img1.jpg)',
                                    }}
                                >
                                    <div className="overlay"></div>
                                    <div className={cx('container')}>
                                        <div className={cx('banner-content', 'text-center')}>
                                            <div className={cx('row')}>
                                                <div className={cx('col-lg-8 offset-lg-2')}>
                                                    <h4 className={cx('banner-sub-title')}>Du Lịch Dubai</h4>
                                                    <h2 className={cx('banner-title')}>Burj Khalifa - Café Băng</h2>
                                                    <Link to="#" className={cx('round-btn')}>
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
                                                                onChange={({ target: { value } }) => changeYear(value)}
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
                                    <div className={cx('col-12 col-sm-5')}>
                                        <div className={cx('group-search')}>
                                            <div className={cx('group-search-icon')}>
                                                <img src={images.plane} alt="plane" />
                                            </div>
                                            <div className={cx('group-search-content')}>
                                                <p>Khởi hành từ</p>
                                                <input type="text" placeholder="Địa điểm khởi hành" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('col-12 col-sm-2')}>
                                        <button className={cx('round-btn')}>Tìm</button>
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
                            {policys.map((policy, index) => {
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
                            <Link to="#">
                                <span>Tour giờ chót</span>
                                &nbsp; giá tốt
                            </Link>
                        </h2>
                        <p>Cùng Evo Tour điểm qua một vài địa điểm du lịch trong nước thu hút du khách nhất nhé!</p>
                    </div>
                    <div className={cx('row', 'sv-scroll')}>
                        <div className={cx('col-12 col-sm-6 col-md-4 col-lg-3')}>
                            <ItemTour />
                        </div>
                        {listTest.map((item, index) => {
                            return (
                                <div key={index} className={cx('col-12 col-sm-6 col-md-4 col-lg-3')}>
                                    <ItemTour />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
            {/* banner-section */}
            <section className={cx('banner-section')}>
                <div className={cx('container')}>
                    <div className={cx('row')}>
                        <div className={cx('col-lg-6 col-md-6 col-sm-6 col-12', 'banner-wrap')}>
                            <Link to="">
                                <img src={images.featureMenu1} alt="home_banner_left" />
                            </Link>
                        </div>
                        <div className={cx('col-lg-6 col-md-6 col-sm-6 col-12', 'banner-wrap')}>
                            <Link to="">
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
                            <Link to="#">Tour trong nước</Link>
                        </h2>
                        <p>Cùng Evo Tour điểm qua một vài địa điểm du lịch trong nước thu hút du khách nhất nhé!</p>
                    </div>
                    <div className={cx('row', 'sv-scroll')}>
                        <div className={cx('col-12 col-sm-6 col-md-4 col-lg-3')}>
                            <ItemTour />
                        </div>
                    </div>
                    <div className={cx('text-center')}>
                        <Link to="#" className={cx('round-btn')}>
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
                            <Link to="#">Tour nước ngoài</Link>
                        </h2>
                        <p>Cùng Evo Tour điểm qua một vài địa điểm du lịch trong nước thu hút du khách nhất nhé!</p>
                    </div>
                    <div className={cx('row', 'sv-scroll')}>
                        <div className={cx('col-12 col-sm-6 col-md-4 col-lg-3')}>
                            <ItemTour />
                        </div>
                    </div>
                    <div className={cx('text-center')}>
                        <Link to="#" className={cx('round-btn')}>
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
                            <Link to="#">Điểm đến yêu thích</Link>
                        </h2>
                        <p>Cùng Evo Tour điểm qua một vài địa điểm du lịch trong nước thu hút du khách nhất nhé!</p>
                    </div>
                    <div className={cx('row', 'sv-scroll')}>
                        <div className={cx('col-12 col-sm-6 col-md-6 col-lg-4')}>
                            <ItemDestination />
                        </div>
                    </div>
                </div>
            </section>
            {/* travel-inspiration */}
            <section className={cx('travel-inspiration', 'home-index-tour')}>
                <div className={cx('container')}>
                    <div className={cx('section-heading', 'text-center')}>
                        <h2 className={cx('section-title')}>
                            <Link to="#">Cảm hứng du lịch</Link>
                        </h2>
                        <p>Cùng Evo Tour điểm qua một vài địa điểm du lịch trong nước thu hút du khách nhất nhé!</p>
                    </div>
                    <div className={cx('row', 'sv-scroll')}>
                        <div className={cx('col-12 col-sm-6 col-md-4 col-lg-4')}>
                            <ItemNews />
                        </div>
                    </div>
                    <div className={cx('text-center', 'more-btn')}>
                        <Link to="#" className={cx('outline-btn outline-btn-white')}>
                            Xem tất cả tin tức
                        </Link>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}

export default Home;
