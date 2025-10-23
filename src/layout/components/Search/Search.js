import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './Search.module.scss';
import { actions, useStore } from '~/store';
import config from '~/config';
import { getCategorizedToursData } from '~/data';
import { toNonAccentVietnamese } from '~/utils';
import images from '~/assets/images';

const cx = classNames.bind(styles);
function Search() {
    const navigate = useNavigate();
    const [store, dispatch] = useStore();
    const { setShowSearch } = store;
    const [searchValue, setSearchValue] = useState('');
    const [tours, setTours] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const inputRef = useRef();

    useEffect(() => {
        setSearchValue('');
        setSearchResult([]);
    }, [setShowSearch]);

    useEffect(() => {
        if (!searchValue?.trim()) {
            setSearchResult([]);
            return;
        }

        const handler = setTimeout(() => {
            const normalizedSearch = toNonAccentVietnamese(searchValue).toLowerCase();

            const dataFilter = tours.filter((tour) =>
                toNonAccentVietnamese(tour.tourName).toLowerCase().includes(normalizedSearch),
            );

            setSearchResult(dataFilter);
        }, 300);

        return () => clearTimeout(handler);
    }, [searchValue, tours]);

    useEffect(() => {
        (async () => {
            const { listTours } = await getCategorizedToursData();
            setTours(listTours);
        })();
    }, []);

    const handleSearchClose = (e) => {
        e.preventDefault();
        dispatch(actions.setShowSearch(false));
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
            setSearchResult([]);
        }
    };
    const handleClearSearch = (e) => {
        e.preventDefault();
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };
    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(actions.setShowSearch(false));
        navigate(`${config.routes.search}?destination=${searchValue}`);
    };

    const renderResSearch = (data = []) => {
        if (!Array.isArray(data) || data.length === 0) {
            if (searchValue) {
                return (
                    <div className={cx('search-content', 'empty', 'text-center', 'fst-italic', 'fw-bolder')}>
                        <p>Không tìm thấy tour phù hợp.</p>
                    </div>
                );
            }
            return null;
        }

        return (
            <div className={cx('search-content')}>
                {data.map((tour) => {
                    const { tourCode, slug, thumbnailUrl, tourName } = tour;
                    const tourLink = config.routes.tour.replace(':slug', slug);

                    return (
                        <div key={tourCode} className={cx('tour-item')}>
                            <div className={cx('tour-img')}>
                                <Link to={tourLink}>
                                    <img
                                        src={thumbnailUrl || images.logoFooter}
                                        alt={tourName}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = images.logoFooter;
                                        }}
                                    />
                                </Link>
                            </div>

                            <div className={cx('tour-content')}>
                                <h4 className={cx('tour-name')}>
                                    <Link to={tourLink}>{tourName || 'Chưa có tên tour'}</Link>
                                </h4>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className={setShowSearch ? cx('search-container', 'search-show') : cx('search-container')}>
            <div className={cx('search-inner')}>
                <div className={cx('search-box')}>
                    <div className="input-group">
                        <input
                            ref={inputRef}
                            className={cx('search-input', 'form-control')}
                            type="text"
                            name="query"
                            placeholder="Bạn muốn đi đâu ?"
                            autoComplete="off"
                            value={searchValue}
                            onChange={handleChange}
                        />
                        <span className="input-group-append">
                            {searchValue && (
                                <button
                                    onClick={handleClearSearch}
                                    className={cx('search-btn', 'clear-btn')}
                                    type="submit"
                                >
                                    <i>
                                        <FontAwesomeIcon icon={faXmark} />
                                    </i>
                                </button>
                            )}
                            <button className={cx('search-btn')} type="submit" onClick={handleSearch}>
                                <i>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </i>
                            </button>
                        </span>
                    </div>
                    {renderResSearch(searchResult)}
                </div>
                <Link className={cx('search-close')} onClick={handleSearchClose}>
                    <i>
                        <FontAwesomeIcon icon={faXmark} />
                    </i>
                </Link>
            </div>
            <div className={cx('overlay')} onClick={handleSearchClose}></div>
        </div>
    );
}

export default Search;
