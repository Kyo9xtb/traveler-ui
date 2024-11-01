import React, { Fragment, useState } from 'react';
import classNames from 'classnames/bind';
// import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import getYear from 'date-fns/getYear';
import getMonth from 'date-fns/getYear';
import range from 'lodash/range';

import styles from './Tour.module.scss';
import BannerPage from '~/components/BannerPage';
import images from '~/assets/images';
import SortCate from '~/components/SortCate/SortCate';
import ItemTour from '~/components/ItemTour';
import PaginatedItems from '../../components/Paginate';

const cx = classNames.bind(styles);

const listProducts = [
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
];

function Tour() {
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
            <BannerPage title="Tour du lịch" />
            <div className={cx('container')}>
                <section className={cx('home-trip-search')}>
                    <div className={cx('container')}>
                        <div className={cx('row')}>
                            <div className={cx('col-12')}>
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
                                                                    onChange={({ target: { value } }) =>
                                                                        changeYear(value)
                                                                    }
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
                                        <div className={cx('col-lg-3 col-md-3 col-sm-5 col-12 fix-ipad2')}>
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
                                        <div className={cx('col-lg-2 col-md-2 col-sm-2 col-12 fix-ipad')}>
                                            <button className={cx('round-btn')}>Tìm</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className={cx('product-view')}>
                    <SortCate />
                    {/* <div className={cx('row')}>
                        {listProducts.map((product, index) => {
                            return (
                                <div key={index} className={cx('col-12 col-sm-6 col-md-4 col-lg-3')}>
                                    <ItemTour data={product} />
                                </div>
                            );
                        })}
                    </div> */}
                    <PaginatedItems data={listProducts} itemsPerPage={12}>
                        {(item, index) => (
                            <div key={index} className={cx('col-12 col-sm-6 col-md-4 col-lg-3')}>
                                <ItemTour data={item} />
                            </div>
                        )}
                    </PaginatedItems>
                </div>
            </div>
        </Fragment>
    );
}

export default Tour;
