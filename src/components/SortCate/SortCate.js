import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import lodash from 'lodash';

import styles from './SortCate.module.scss';
import { Fragment, useEffect, useState } from 'react';

const cx = classNames.bind(styles);
function SortCate({ data, children }) {
    const [resData, setResData] = useState([]);

    useEffect(() => {
        const listItems = document.querySelectorAll(`.${cx('sort-cate-left')} li`);
        listItems.forEach((item) => {
            item.classList.remove(`${cx('active')}`);
        });
        setResData(data);
    }, [data]);

    const handlerSortNameIncrease = (e) => {
        e.preventDefault();
        const res = lodash.sortBy(data, (item) => {
            return item.slug.toLowerCase();
        });
        setResData(res);
        handelActive(e);
    };
    const handlerSortNameDecrease = (e) => {
        e.preventDefault();
        const res = lodash.sortBy(data, (item) => {
            return item.slug.toLowerCase();
        });
        setResData(lodash.reverse(res));
        handelActive(e);
    };
    const handlerSortPriceIncrease = (e) => {
        e.preventDefault();
        const res = lodash.sortBy(data, (item) => {
            return item.promotion_price;
        });
        setResData(res);
        handelActive(e);
    };
    const handlerSortPriceDecrease = (e) => {
        e.preventDefault();
        const res = lodash.sortBy(data, (item) => {
            return item.promotion_price;
        });
        setResData(lodash.reverse(res));
        handelActive(e);
    };

    const handlerTourLatest = (e) => {
        e.preventDefault();
        const res = lodash.sortBy(data, (item) => {
            return item.create_at;
        });
        setResData(lodash.reverse(res));
        handelActive(e);
    };

    const handelActive = (e) => {
        const listItems = document.querySelectorAll(`.${cx('sort-cate-left')} li`);
        listItems.forEach((item) => {
            item.classList.remove(`${cx('active')}`);
        });
        const parent = e.target.closest(`li`);
        if (parent) {
            parent.classList.add(`${cx('active')}`);
        }
    };
    return (
        <Fragment>
            <div className={cx('sort-cate')}>
                <div className={cx('sort-cate-left')}>
                    <h3>Xếp theo:</h3>
                    <ul>
                        <li>
                            <Link onClick={handlerSortNameIncrease}>
                                <i></i>
                                Tên A - Z
                            </Link>
                        </li>
                        <li>
                            <Link onClick={handlerSortNameDecrease}>
                                <i></i>
                                Tên Z - A
                            </Link>
                        </li>
                        <li>
                            <Link onClick={handlerSortPriceIncrease}>
                                <i></i>
                                Giá tăng dần
                            </Link>
                        </li>
                        <li>
                            <Link onClick={handlerSortPriceDecrease}>
                                <i></i>
                                Giá giảm dần
                            </Link>
                        </li>
                        <li>
                            <Link onClick={handlerTourLatest}>
                                <i></i>
                                Mới nhất
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            {children(resData)}
        </Fragment>
    );
}

export default SortCate;
