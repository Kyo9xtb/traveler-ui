import React, { Fragment, useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Tour.module.scss';
import BannerPage from '~/components/BannerPage';
import images from '~/assets/images';
import SortCate from '~/components/SortCate/SortCate';
import ItemTour from '~/components/ItemTour';
import PaginatedItems from '~/components/Paginate';
import * as tourServices from '~/services/tourService';
import CustomDatePicker from '~/components/CustomDatePicker';

const cx = classNames.bind(styles);

// const listProducts = [
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
// ];

function Tour() {
    const [listTours, setListTours] = useState([]);
    useEffect(() => {
        tourServices.get().then((res) => {
            setListTours(res);
        });
    }, []);
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
                                                    <CustomDatePicker />
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
                                        <div className={cx('col-lg-2 col-md-2 col-sm-2 col-12 fix-ipad', 'btn-search')}>
                                            <button className={cx('round-btn')}>Tìm</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className={cx('product-view')}>
                    <SortCate data={listTours}>
                        {(data) =>
                            data.length ? (
                                <PaginatedItems data={data} itemsPerPage={12}>
                                    {(item, index) => (
                                        <div key={index} className={cx('col-12 col-sm-6 col-md-4 col-lg-3')}>
                                            <ItemTour data={item} />
                                        </div>
                                    )}
                                </PaginatedItems>
                            ) : (
                                <PaginatedItems data={listTours} itemsPerPage={12}>
                                    {(item, index) => (
                                        <div key={index} className={cx('col-12 col-sm-6 col-md-4 col-lg-3')}>
                                            <ItemTour data={item} />
                                        </div>
                                    )}
                                </PaginatedItems>
                            )
                        }
                    </SortCate>
                </div>
            </div>
        </Fragment>
    );
}

export default Tour;
