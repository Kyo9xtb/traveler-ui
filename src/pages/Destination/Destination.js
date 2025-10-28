import { Fragment, useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Destination.module.scss';
import BannerPage from '~/components/BannerPage';
import ItemDestination from '~/components/ItemDestination';
import Paginate from '~/components/Paginate';
import { TouristPlaceService } from '~/services';
import { getTouristPlacesData } from '~/data';

const cx = classNames.bind(styles);

function Destination() {
    const [listTouristPlaces, setListTouristPlaces] = useState([]);
    const [paginationData, setPaginationData] = useState([]);
    useEffect(() => {
        (async () => {
            (async () => {
                const places = await getTouristPlacesData();
                setListTouristPlaces(places);
            })();
        })();
    }, []);

    return (
        <Fragment>
            <BannerPage title="Điểm đến yêu thích" />
            <div className={cx('container')}>
                <div className={cx('destination-warp')}>
                    {
                        <div className={cx('row')}>
                            {paginationData?.map((item) => {
                                return (
                                    <div key={item.id} className={cx('col-lg-4 col-md-6')}>
                                        <ItemDestination data={item} />
                                    </div>
                                );
                            })}
                        </div>
                    }
                    <Paginate data={listTouristPlaces} itemsPerPage={9} resData={setPaginationData} />
                </div>
            </div>
        </Fragment>
    );
}

export default Destination;
