import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './ItemTour.module.scss';
import images from '~/assets/images';
import config from '~/config';

function FormatPrice(price) {
    return Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}
const cx = classNames.bind(styles);
function ItemTour({ data }) {
    let { tour_name, slug, thumbnail_url, price, sale, promotion_price } = data;
    return (
        <div className={cx('tour-item')}>
            <div className={cx('img-tour')}>
                <Link to={`/tour/${slug}`} title={tour_name}>
                    <img src={thumbnail_url} alt={tour_name} />
                </Link>
            </div>
            <div className={cx('info-tour')}>
                <h3>
                    <Link to={`/tour/${slug}`} title={tour_name}>
                        {tour_name}
                    </Link>
                </h3>
                <div className={cx('vote-box')}>
                    <div className={cx('meta-box')}>
                        <ul className={cx('vehicle')}>
                            <li>
                                <img src={images.tagCar} alt="" />
                            </li>
                            <li>
                                <img src={images.tagCar} alt="" />
                            </li>
                        </ul>
                    </div>
                    {sale ? <div className={cx('sale-off')}>{FormatPrice(price)}</div> : ''}
                </div>
                <div className={cx('date-go')}>
                    <ul className={cx('schedule')}>
                        <li>
                            <img src={images.tagDateTime} alt="" />
                            Lịch khởi hành: &nbsp;
                            <span>Thứ 2 hằng tuần</span>
                        </li>
                        <li>
                            <img src={images.tagDate} alt="" />
                            Thời gian: &nbsp;
                            <span>5 ngày 4 đêm</span>
                        </li>
                    </ul>
                </div>
                <div className={cx('action-box')}>
                    <div className={cx('price-box')}>{FormatPrice(promotion_price)}</div>
                    <div className={cx('booking-box')}>
                        <Link className={cx('round-btn')} to="">
                            Đặt tour
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemTour;
