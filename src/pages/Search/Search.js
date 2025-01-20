import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import styles from './Search.module.scss';
import BannerPage from '~/components/BannerPage';
import ItemTour from '~/components/ItemTour';
import Paginate from '~/components/Paginate';
import { TourService } from '~/services';
import { toNonAccentVietnamese } from '~/store';
import SortCate from '~/components/SortCate/SortCate';

const cx = classNames.bind(styles);
function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const destination = searchParams.get('destination');
    const departuredate = searchParams.get('departuredate');
    const departurepoint = searchParams.get('departurepoint');

    const [listTours, setListTours] = useState([]);
    const [resSearch, setResSearch] = useState([]);
    const [valueSearch, setValueSearch] = useState('');
    useEffect(() => {
        TourService.getTour().then((res) => {
            setListTours(res);
        });
    }, []);

    useEffect(() => {
        let dataFilter = [];
        if (destination || departurepoint || departuredate) dataFilter = listTours;
        if (destination) {
            dataFilter = dataFilter.filter((tour) => tour.slug.includes(toNonAccentVietnamese(destination)));
        }
        if (departurepoint) {
            dataFilter = dataFilter.filter((tour) => {
                const { trip } = tour;
                if (trip) {
                    return toNonAccentVietnamese(trip.split('-')[0]).includes(toNonAccentVietnamese(departurepoint));
                }
                return false; // Ensure the filter function returns a boolean
            });
        }
        if (departuredate) {
            let day = new Date(departuredate).getDay();
            day += 1;
            // eslint-disable-next-line no-const-assign
            if (day === 1) day = 'Chủ nhật';
            dataFilter = dataFilter.filter((tour) => {
                const { departure_schedule } = tour;
                if (departure_schedule) {
                    return departure_schedule.includes(day);
                }
                return false;
            });
        }
        setResSearch(dataFilter);
    }, [listTours, destination, departurepoint, departuredate]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchParams({ destination: valueSearch });
    };

    return (
        <Fragment>
            <BannerPage title="Tìm kiếm" />
            <div className={cx('page-content', 'grey-bg')}>
                <div className={cx('container')}>
                    {resSearch.length ? (
                        <div className={cx('row')}>
                            <SortCate data={resSearch}>
                                {(resData) =>
                                    resData.length ? (
                                        <Paginate data={resData} itemsPerPage={12}>
                                            {(data) =>
                                                data.map((tour, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className={cx('col-12 col-sm-6 col-md-4 col-lg-3')}
                                                        >
                                                            <ItemTour data={tour} />
                                                        </div>
                                                    );
                                                })
                                            }
                                        </Paginate>
                                    ) : (
                                        <Paginate data={resSearch} itemsPerPage={12}>
                                            {(data) =>
                                                data.map((tour, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className={cx('col-12 col-sm-6 col-md-4 col-lg-3')}
                                                        >
                                                            <ItemTour data={tour} />
                                                        </div>
                                                    );
                                                })
                                            }
                                        </Paginate>
                                    )
                                }
                            </SortCate>
                        </div>
                    ) : (
                        <div className={cx('row justify-content-md-center')}>
                            <div className={cx('col-lg-12 col-md-12 col-sm-12')}>
                                <h1 className={cx('title-header')}>Nhập từ khóa để tìm kiếm</h1>
                            </div>
                            <div className={cx('col-md-7 col-sm-12 col-lg-7')}>
                                <form className={cx('search-form')} onClick={handleSearch}>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="query"
                                            className="form-control"
                                            placeholder="Điểm đến của bạn là gì?"
                                            autoComplete="off"
                                            onChange={(e) => {
                                                setValueSearch(e.target.value);
                                            }}
                                        />

                                        <span className="input-group-append">
                                            <button className="btn" type="submit" aria-label="Tìm kiếm">
                                                Tìm kiếm
                                            </button>
                                        </span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
}

export default Search;
