import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
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
import { getCategorizedToursData } from '~/data';

const cx = classNames.bind(styles);

function Tour() {
    let location = useLocation();
    const navigate = useNavigate();
    const [changePath, setChangePath] = useState('');
    const [listTours, setListTours] = useState([]);
    const [titlePage, setTitlePage] = useState('');
    const [sortedTours, setSortedTours] = useState([]);
    const [paginatedTours, setPaginatedTours] = useState([]);
    const [departureDate, setDepartureDate] = useState('');
    const [fields, setFields] = useState({
        destination: '',
        departureDate,
        departurePoint: '',
    });
    const [tours, setTours] = useState({
        listTours: [],
        domesticTours: [],
        internationalTours: [],
        teamBuildingTours: [],
        otherTours: [],
        promotionalTours: [],
        mostPromotionalTours: [],
    });

    if (location.pathname !== changePath) {
        setChangePath(location.pathname);
    }

    useEffect(() => {
        (async () => {
            try {
                const data = await getCategorizedToursData();
                setTours(data);
            } catch (error) {
                console.error('Error fetching tours data:', error);
            }
        })();
    }, []);

    useEffect(() => {
        const route = location.pathname;

        const routeConfig = {
            [config.routes.tour]: {
                title: 'Tour du lịch',
                data: tours.listTours,
            },
            [config.routes.domesticTour]: {
                title: 'Tour Trong Nước',
                data: tours.domesticTours,
            },
            [config.routes.internationalTour]: {
                title: 'Tour Quốc Tế',
                data: tours.internationalTours,
            },
            [config.routes.teamBuildingTours]: {
                title: 'Tour Trong Nước',
                data: tours.teamBuildingTours,
            },
            [config.routes.otherTours]: {
                title: 'Tour Trong Nước',
                data: tours.otherTours,
            },
            [config.routes.promotionalTours]: {
                title: 'Tour Khuyến Mãi',
                data: tours.promotionalTours,
            },
        };
        const selected = routeConfig[route] || { title: 'Tour du lịch', data: tours.listTours };
        setTitlePage(selected.title);
        setListTours(selected.data);
    }, [location.pathname, tours]);

    //Change title
    useEffect(() => {
        if (!titlePage) return;
        const originalTitle = document.title;
        document.title = `${titlePage} | ${originalTitle}`;
        return () => {
            document.title = originalTitle;
        };
    }, [titlePage]);

    useEffect(() => {
        setSortedTours(listTours);
    }, [listTours]);

    //Search

    const handleFieldChange = useCallback(({ target: { name, value } }) => {
        setFields((prev) => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    useEffect(() => {
        setFields((prev) => ({
            ...prev,
            departureDate,
        }));
    }, [departureDate]);

    const handleSearch = useCallback(() => {
        const query = new URLSearchParams({
            destination: fields.destination,
            departuredate: fields.departureDate,
            departurepoint: fields.departurePoint,
        }).toString();

        navigate(`${config.routes.search}?${query}`);
    }, [fields, navigate]);

    const SearchBar = useMemo(() => {
        return (
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
                                    onChange={handleFieldChange}
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
                                        onChange={handleFieldChange}
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
        );
    }, [handleFieldChange, handleSearch, setDepartureDate]);
    return (
        <Fragment>
            <BannerPage title={titlePage} />
            <div className={cx('page-content', 'grey-bg')}>
                <div className={cx('container')}>
                    {SearchBar}
                    {!listTours?.length ? (
                        <AlterDismissible className={'alert-success'}>
                            Hiện không có tour có chương trình khuyễn mãi
                        </AlterDismissible>
                    ) : (
                        <>
                            <SortCate data={listTours} resData={setSortedTours} />

                            <div className={cx('product-view')}>
                                <div className={cx('row')}>
                                    {paginatedTours.map((tour) => {
                                        return (
                                            <div
                                                key={tour.tourCode}
                                                className={cx('col-12 col-sm-6 col-md-4 col-lg-3')}
                                            >
                                                <ItemTour data={tour} />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <Paginate data={sortedTours} itemsPerPage={12} resData={setPaginatedTours} />
                        </>
                    )}
                </div>
            </div>
        </Fragment>
    );
}

export default Tour;
