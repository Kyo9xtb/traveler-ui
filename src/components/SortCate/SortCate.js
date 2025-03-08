import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import lodash from 'lodash';
import styles from './SortCate.module.scss';
import { Fragment, useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function SortCate({ data, children }) {
    let location = useLocation();
    const [changePath, setChangePath] = useState('');
    const [resData, setResData] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null); // Track active index

    if (location.pathname !== changePath) {
        setChangePath(location.pathname);
    }
    useEffect(() => {
        setResData(data);
        setActiveIndex(null); // Reset active index
    }, [data, changePath]);

    const sortData = (e, comparator, index) => {
        e.preventDefault();
        const res = comparator(data);
        setResData(res);
        setActiveIndex(index); // Update active state
    };

    const sortHandlers = [
        {
            label: 'Tên A - Z',
            comparator: (data) => lodash.sortBy(data, (item) => item.slug.toLowerCase()),
        },
        {
            label: 'Tên Z - A',
            comparator: (data) => lodash.reverse(lodash.sortBy(data, (item) => item.slug.toLowerCase())),
        },
        {
            label: 'Giá tăng dần',
            comparator: (data) => lodash.sortBy(data, (item) => item.promotion_price),
        },
        {
            label: 'Giá giảm dần',
            comparator: (data) => lodash.reverse(lodash.sortBy(data, (item) => item.promotion_price)),
        },
        {
            label: 'Mới nhất',
            comparator: (data) => lodash.reverse(lodash.sortBy(data, (item) => item.create_at)),
        },
    ];

    return (
        <Fragment>
            <div className={cx('sort-cate')}>
                <div className={cx('sort-cate-left')}>
                    <h3>Xếp theo:</h3>
                    <ul>
                        {sortHandlers.map((handler, index) => (
                            <li key={index} className={cx({ active: activeIndex === index })}>
                                <Link onClick={(e) => sortData(e, handler.comparator, index)}>
                                    <i></i>
                                    {handler.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {children(resData)}
        </Fragment>
    );
}

export default SortCate;
