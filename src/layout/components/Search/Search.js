import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './Search.module.scss';
import { actions, toNonAccentVietnamese, useStore } from '~/store';
import { TourService } from '~/services';
import config from '~/config';

const cx = classNames.bind(styles);
function Search() {
    const navigate = useNavigate();
    const [store, dispatch] = useStore();
    const { setShowSearch } = store;
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const inputRef = useRef();

    useEffect(() => {
        setSearchValue('');
        setSearchResult([]);
    }, [setShowSearch]);
    useEffect(() => {
        TourService.getTour().then((res) => {
            if (searchValue) {
                const dataFilter = res.filter((tour) => tour.slug.includes(toNonAccentVietnamese(searchValue)));
                setSearchResult(dataFilter);
            }
        });
    }, [searchValue]);
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
                    <div className={cx('search-content')}>
                        {searchResult &&
                            searchResult.map((tour) => {
                                return (
                                    <div key={tour.tour_id} className={cx('tour-item')}>
                                        <div className={cx('tour-img')}>
                                            <Link to={`${config.routes.tour}/${tour.slug}`}>
                                                <img src={tour.thumbnail_url} alt={tour.tour_name} />
                                            </Link>
                                        </div>
                                        <div className={cx('tour-content')}>
                                            <h4 className={cx('tour-name')}>
                                                <Link to={`${config.routes.tour}/${tour.slug}`}>{tour.tour_name}</Link>
                                            </h4>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
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
