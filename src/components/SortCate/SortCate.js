import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import lodash from 'lodash';
import styles from './SortCate.module.scss';
import { useCallback, useEffect, useMemo, useState } from 'react';

const cx = classNames.bind(styles);

function SortCate({ data, resData }) {
    let { pathname } = useLocation();
    const [prevPath, setPrevPath] = useState('');
    const [activeIndex, setActiveIndex] = useState(null);

    useEffect(() => {
        if (pathname !== prevPath) {
            setPrevPath(pathname);
            if (typeof resData === 'function') {
                resData(data);
            }
            setActiveIndex(null);
        }
    }, [pathname, prevPath, data, resData]);

    const handleSortData = useCallback(
        (e, comparator, index) => {
            e.preventDefault();
            if (typeof comparator === 'function') {
                const sorted = comparator([...data]);
                if (typeof resData === 'function') {
                    resData(sorted);
                }
                setActiveIndex(index);
            }
        },
        [data, resData],
    );

    const sortHandlers = useMemo(() => {
        return [
            {
                label: 'Tên A - Z',
                comparator: (data) => lodash.sortBy(data, (item) => item.tourName.toLowerCase()),
            },
            {
                label: 'Tên Z - A',
                comparator: (data) => lodash.reverse(lodash.sortBy(data, (item) => item.tourName.toLowerCase())),
            },
            {
                label: 'Giá tăng dần',
                comparator: (data) => lodash.sortBy(data, (item) => item.price),
            },
            {
                label: 'Giá giảm dần',
                comparator: (data) => lodash.reverse(lodash.sortBy(data, (item) => item.price)),
            },
            {
                label: 'Mới nhất',
                comparator: (data) => lodash.reverse(lodash.sortBy(data, (item) => item.createAt)),
            },
        ];
    }, []);

    return (
        <div className={cx('sort-cate')}>
            <div className={cx('sort-cate-left')}>
                <h3>Xếp theo:</h3>
                <ul>
                    {sortHandlers.map((handler, index) => (
                        <li key={index} className={cx({ active: activeIndex === index })}>
                            <Link onClick={(e) => handleSortData(e, handler.comparator, index)}>
                                <i></i>
                                {handler.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SortCate;
