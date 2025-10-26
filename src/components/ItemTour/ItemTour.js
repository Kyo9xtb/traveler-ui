import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './ItemTour.module.scss';
import images from '~/assets/images';
import config from '~/config';
import { listVehicle } from '~/data';
import { formatPrice } from '~/utils';

const cx = classNames.bind(styles);

function ItemTour({ data }) {
    let { tourName, thumbnailUrl, price, sale, suggestedPrice, time, departureSchedule, vehicles, slug } = data;
    const linkAction = config.routes.tourDetail.replace(':slug', slug);

    const renderVehicle = () => {
        if (!Array.isArray(vehicles) || vehicles.length === 0) return null;

        return (
            <ul className={cx('vehicle')}>
                {vehicles.map((item) => {
                    const vehicle = listVehicle?.find((v) => v.value === item.codeVehicle);
                    if (!vehicle) return null;

                    return (
                        <li key={vehicle.value}>
                            <img src={vehicle.image} alt={vehicle.label} loading="lazy" />
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <div className={cx('tour-item')}>
            <div className={cx('img-tour')}>
                <Link to={linkAction} title={tourName}>
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
            <div className={cx('info-tour')}>
                <h3>
                    <Link to={linkAction} title={tourName}>
                        {tourName}
                    </Link>
                </h3>
                <div className={cx('vote-box')}>
                    <div className={cx('meta-box')}>{renderVehicle()}</div>
                    <div className={cx('sale-off')}>{sale > 0 ? formatPrice(suggestedPrice) : ' '}</div>
                </div>
                <div className={cx('date-go')}>
                    <ul className={cx('schedule')}>
                        <li>
                            <img src={images.tagDateTime} alt="" />
                            Lịch khởi hành: &nbsp;
                            <span>{departureSchedule}</span>
                        </li>
                        <li>
                            <img src={images.tagDate} alt="" />
                            Thời gian: &nbsp;
                            <span>{time}</span>
                        </li>
                    </ul>
                </div>
                <div className={cx('action-box')}>
                    <div className={cx('price-box')}>{formatPrice(price)}</div>
                    <div className={cx('booking-box')}>
                        <Link className={cx('round-btn')} to={linkAction} title={tourName}>
                            Đặt tour
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemTour;
