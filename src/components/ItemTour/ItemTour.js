import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './ItemTour.module.scss';
import images from '~/assets/images';
import config from '~/config';
import { FormatPrice } from '~/store';

const cx = classNames.bind(styles);
function ItemTour({ data }) {
    let { tour_name, slug, thumbnail_url, price, sale, promotion_price, time, departure_schedule, vehicle } = data;
    const linkAction = `${config.routes.tour}/${slug}`;
    return (
        <div className={cx('tour-item')}>
            <div className={cx('img-tour')}>
                <Link to={linkAction} title={tour_name}>
                    <img src={thumbnail_url} alt={tour_name} />
                </Link>
            </div>
            <div className={cx('info-tour')}>
                <h3>
                    <Link to={linkAction} title={tour_name}>
                        {tour_name}
                    </Link>
                </h3>
                <div className={cx('vote-box')}>
                    <div className={cx('meta-box')}>
                        <ul className={cx('vehicle')}>
                            {Array.isArray(vehicle) &&
                                // eslint-disable-next-line array-callback-return
                                vehicle.map((item, index) => {
                                    switch (item.toLowerCase()) {
                                        case 'car':
                                            return (
                                                <li key={index}>
                                                    <img src={images.tagCar} alt="Ô tô" />
                                                </li>
                                            );
                                        case 'plane':
                                            return (
                                                <li key={index}>
                                                    <img src={images.tagPlane} alt="Máy bay" />
                                                </li>
                                            );
                                        case 'ship':
                                            return (
                                                <li key={index}>
                                                    <img src={images.tagShip} alt="Tàu thủy" />
                                                </li>
                                            );
                                        case 'train':
                                            return (
                                                <li key={index}>
                                                    <img src={images.tagTrain} alt="Tàu hỏa" />
                                                </li>
                                            );
                                        default:
                                            break;
                                    }
                                })}
                        </ul>
                    </div>
                    {sale && <div className={cx('sale-off')}>{FormatPrice(price)}</div>}
                </div>
                <div className={cx('date-go')}>
                    <ul className={cx('schedule')}>
                        <li>
                            <img src={images.tagDateTime} alt="" />
                            Lịch khởi hành: &nbsp;
                            <span>{departure_schedule}</span>
                        </li>
                        <li>
                            <img src={images.tagDate} alt="" />
                            Thời gian: &nbsp;
                            <span>{time}</span>
                        </li>
                    </ul>
                </div>
                <div className={cx('action-box')}>
                    <div className={cx('price-box')}>{FormatPrice(promotion_price)}</div>
                    <div className={cx('booking-box')}>
                        <Link className={cx('round-btn')} to={`${config.routes.tour}/${slug}`} title={tour_name}>
                            Đặt tour
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemTour;
