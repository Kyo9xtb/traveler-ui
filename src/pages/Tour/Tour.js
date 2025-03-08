import React, { Fragment, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './Tour.module.scss';
import BannerPage from '~/components/BannerPage';
import images from '~/assets/images';
import SortCate from '~/components/SortCate/SortCate';
import ItemTour from '~/components/ItemTour';
import CustomDatePicker from '~/components/CustomDatePicker';
import Paginate from '~/components/Paginate';
import config from '~/config';
import AlterDismissible from '~/components/CustomAlert';
import { useStore } from '~/store';

const cx = classNames.bind(styles);

function Tour() {
    let location = useLocation();
    const navigate = useNavigate();
    const [store] = useStore();
    const [changePath, setChangePath] = useState('');
    const [listTours, setListTours] = useState([]);
    const [titlePage, setTitlePage] = useState('');
    // Get data
    if (location.pathname !== changePath) {
        setChangePath(location.pathname);
    }

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const res = store.listData.listTours ? store.listData.listTours : [];
                switch (location.pathname) {
                    case config.routes.tour:
                        setListTours(res);
                        setTitlePage('Tour du lịch');
                        break;
                    case config.routes.promotionalTours:
                        const tourPromotional = res.filter((item) => item.sale > 0);
                        setListTours(tourPromotional);
                        setTitlePage('Tour khuyến mãi');
                        break;
                    case config.routes.domesticTour:
                        const tourDomestic = res.filter((tour) => tour.tour_group === 'Domestic');
                        setListTours(tourDomestic);
                        setTitlePage('Tour trong nước');
                        break;
                    case config.routes.internationalTour:
                        const tourInternational = res.filter((tour) => tour.tour_group === 'International');
                        setListTours(tourInternational);
                        setTitlePage('Tour quốc tế');
                        break;
                    default:
                        setListTours([]);
                }
            } catch (err) {
                console.error(err); // Log the error for debugging
                setListTours([]);
            }
        };
        fetchTours();
    }, [location.pathname, store]);

    //Change title
    useEffect(() => {
        const originalTitle = document.title;
        document.title = `${titlePage} | ${originalTitle}`;
        return () => {
            document.title = originalTitle;
        };
    }, [titlePage]);

    //Search
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
        setFields((prev) => ({
            ...prev,
            departureDate,
        }));
    }, [departureDate]);

    const handleSearch = () => {
        navigate(
            `${config.routes.search}?destination=${fields.Destination}&departuredate=${fields.departureDate}&departurepoint=${fields.DeparturePoint}`,
        );
    };

    return (
        <Fragment>
            <BannerPage title={titlePage} />
            <div className={cx('page-content', 'grey-bg')}>
                <div className={cx('container')}>
                    <section className={cx('home-trip-search')}>
                        <div className={cx('main-search')}>
                            <div className={cx('row')}>
                                <div className={cx('col-lg-4 col-md-4 col-sm-12 col-12')}>
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
                                <div className={cx('col-lg-3 col-md-3 col-sm-5 col-12 fix-ipad1')}>
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
                                <div className={cx('col-lg-3 col-md-3 col-sm-5 col-12 fix-ipad2')}>
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
                                <div className={cx('col-lg-2 col-md-2 col-sm-2 col-12 fix-ipad', 'btn-search')}>
                                    <button className={cx('round-btn')} onClick={handleSearch}>
                                        Tìm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                    {!listTours.length ? (
                        <AlterDismissible className={'alert-success'}>
                            Hiện không có tour có chương trình khuyễn mãi
                        </AlterDismissible>
                    ) : (
                        <div className={cx('product-view')}>
                            <div className={cx('row')}>
                                <SortCate data={listTours}>
                                    {(data) =>
                                        data.length ? (
                                            <Paginate data={data} itemsPerPage={12}>
                                                {(data) => {
                                                    return data.map((tour) => {
                                                        return (
                                                            <div
                                                                key={tour.tour_id ? tour.tour_id : tour.id}
                                                                className={cx('col-12 col-sm-6 col-md-4 col-lg-3')}
                                                            >
                                                                <ItemTour data={tour} />
                                                            </div>
                                                        );
                                                    });
                                                }}
                                            </Paginate>
                                        ) : (
                                            <Paginate data={listTours} itemsPerPage={12}>
                                                {(data) => {
                                                    return data.map((tour) => {
                                                        return (
                                                            <div
                                                                key={tour.tour_id ? tour.tour_id : tour.id}
                                                                className={cx('col-12 col-sm-6 col-md-4 col-lg-3')}
                                                            >
                                                                <ItemTour data={tour} />
                                                            </div>
                                                        );
                                                    });
                                                }}
                                            </Paginate>
                                        )
                                    }
                                </SortCate>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
}

export default Tour;
