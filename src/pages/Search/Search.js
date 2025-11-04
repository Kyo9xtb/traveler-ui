import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import styles from './Search.module.scss';
import BannerPage from '~/components/BannerPage';
import ItemTour from '~/components/ItemTour';
import Paginate from '~/components/Paginate';
import { toNonAccentVietnamese } from '~/store';
import SortCate from '~/components/SortCate/SortCate';
import { getCategorizedToursData } from '~/data';

const cx = classNames.bind(styles);

function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const destination = searchParams.get('destination');
    const departureDate = searchParams.get('departure-date');
    const departurePoint = searchParams.get('departure-point');

    const [tours, setTours] = useState([]);
    const [resSearch, setResSearch] = useState([]);
    const [paginationData, setPaginationData] = useState([]);
    const [sortData, setSortData] = useState([]);
    const [valueSearch, setValueSearch] = useState('');
    const [searched, setSearched] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const { listTours } = await getCategorizedToursData();
                setTours(listTours);
            } catch (error) {
                console.error('Error fetching tours data:', error);
            }
        })();
    }, []);

    useEffect(() => {
        if (!tours.length) return;
        const hasFilter = [destination, departureDate, departurePoint].some((v) => v && v.toString().trim() !== '');

        if (!hasFilter) {
            setResSearch([]);
            setSearched(false);
            return;
        }

        let filteredTours = [...tours];
        setSearched(true);

        const normalizedDestination = toNonAccentVietnamese(destination || '');
        const normalizedDeparturePoint = toNonAccentVietnamese(departurePoint || '');

        if (destination) {
            filteredTours = filteredTours.filter((tour) =>
                toNonAccentVietnamese(tour.tourName).includes(normalizedDestination),
            );
        }

        if (departurePoint) {
            filteredTours = filteredTours.filter(({ trip }) =>
                trip ? toNonAccentVietnamese(trip.split('-')[0]).includes(normalizedDeparturePoint) : false,
            );
        }

        if (departureDate) {
            const date = new Date(departureDate);
            let day = date.getDay() + 1;
            const dayName = day === 1 ? 'Chủ nhật' : day.toString();

            filteredTours = filteredTours.filter(
                ({ departure_schedule }) => departure_schedule && departure_schedule.includes(dayName),
            );
        }

        setResSearch(filteredTours);
    }, [tours, destination, departurePoint, departureDate]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchParams({ destination: valueSearch });
    };

    return (
        <Fragment>
            <BannerPage title="Tìm kiếm" />
            <div className={cx('page-content', 'grey-bg')}>
                <div className={cx('container')}>
                    {!searched && (
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
                    {searched && resSearch.length > 0 && (
                        <>
                            <div className={cx('row')}>
                                <SortCate data={resSearch} resData={setSortData} />
                                {paginationData?.map((tour, index) => (
                                    <div key={index} className={cx('col-12 col-sm-6 col-md-4 col-lg-3')}>
                                        <ItemTour data={tour} />
                                    </div>
                                ))}
                            </div>
                            <Paginate data={sortData} itemsPerPage={12} resData={setPaginationData} />
                        </>
                    )}
                    {searched && resSearch.length === 0 && (
                        <div className={cx('text-center py-5')}>
                            <h2>Không tìm thấy tour nào phù hợp</h2>
                            <p>Vui lòng thử lại với từ khóa khác.</p>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
}

export default Search;
