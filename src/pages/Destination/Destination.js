import { Fragment, useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Destination.module.scss';
import BannerPage from '~/components/BannerPage';
import ItemDestination from '~/components/ItemDestination';
import Paginate from '~/components/Paginate';
import { TouristPlaceService } from '~/services';

const cx = classNames.bind(styles);

function Destination() {
    const [listTouristPlaces, setListTouristPlaces] = useState([]);
    useEffect(() => {
        TouristPlaceService
            .getTouristPlace()
            .then((res) => {
                setListTouristPlaces(res);
            })
            .catch((err) => {
                throw new Error(err);
            });
    }, []);
    console.log(listTouristPlaces);

    return (
        <Fragment>
            <BannerPage title="Điểm đến yêu thích" />
            <div className={cx('container')}>
                <div className={cx('destination-warp')}>
                    <Paginate data={listTouristPlaces} itemsPerPage={9}>
                        {(resData) => (
                            <div className={cx('row')}>
                                {resData.map((item, index) => {
                                    return (
                                        <div key={index} className={cx('col-lg-4 col-md-6')}>
                                            <ItemDestination data={item} />
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </Paginate>
                </div>
            </div>
        </Fragment>
    );
}

export default Destination;
