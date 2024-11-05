import { Fragment } from 'react';
import classNames from 'classnames/bind';

import styles from './Destination.module.scss';
import BannerPage from '~/components/BannerPage';
import ItemDestination from '~/components/ItemDestination';
import PaginatedItems from '~/components/Paginate';

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

function Destination() {
    return (
        <Fragment>
            <BannerPage title="Điểm đến yêu thích" />
            <div className={cx('container')}>
                <div className={cx('destination-warp')}>
                    <PaginatedItems data={listProducts} itemsPerPage={9}>
                        {(item, index) => (
                            <div key={index} className={cx('col-lg-4 col-md-6')}>
                                <ItemDestination data={item} />
                            </div>
                        )}
                    </PaginatedItems>
                </div>
            </div>
        </Fragment>
    );
}

export default Destination;
