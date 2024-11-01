import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './ItemTour.module.scss';
import images from '~/assets/images';

function FormatPrice(price) {
    return Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}
const cx = classNames.bind(styles);
function ItemTour() {
    return (
        <div className={cx('tour-item')}>
            <div className={cx('img-tour')}>
                <Link to="" title="">
                    <img
                        src="https://bizweb.dktcdn.net/thumb/large/100/372/532/products/vistas-canal-venecia.jpg?v=1575555979307"
                        alt=""
                    />
                </Link>
            </div>
            <div className={cx('info-tour')}>
                <h3>
                    <Link to="" title="">
                        Du lịch Ý [Rome - Pisa - Florence - Venice - Milan]
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
                    <div className={cx('sale-off')}>{FormatPrice(10000)}</div>
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
                    <div className={cx('price-box')}>{FormatPrice(10000)}</div>
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
