import classNames from 'classnames/bind';
import { Fragment } from 'react';
import BannerPage from '~/components/BannerPage';

import styles from './Faq.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function FAQ() {
    const handlerActive = (e) => {
        const parent = e.target.closest(`.${cx('panel-item')}`);
        parent.classList.toggle(`${cx('active')}`);
    };
    return (
        <Fragment>
            <BannerPage title="FAQ" />
            <div className={cx('container')}>
                <div className={cx('content-page')}>
                    <h3 className={cx('faq-title')}>CÁC ĐIỀU KIỆN & ĐIỀU KHOẢN</h3>
                    <div className={cx('panel-wrapper')}>
                        <div className={cx('panel-item')}>
                            <div className={cx('panel-heading')}>
                                <h4 className={cx('panel-title')}>
                                    <Link onClick={handlerActive}>Khi nào thì đơn hàng của tôi được chuyển đi?</Link>
                                </h4>
                            </div>
                            <div className={cx('panel-content')}>
                                <div className={cx('panel-body')}>
                                    <div className={cx('text')}>
                                        <p>
                                            Với đơn hàng của Quý khách, sau 24h kể từ khi đặt hàng (không tính ngày thứ
                                            7, chủ nhật và các ngày lễ), Evo Tour sẽ liên hệ để xác nhận và gửi sản phẩm
                                            đến Quý khách
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('panel-item')}>
                            <div className={cx('panel-heading')}>
                                <h4 className={cx('panel-title')}>
                                    <Link onClick={handlerActive}>Khi nào thì đơn hàng của tôi được chuyển đi?</Link>
                                </h4>
                            </div>
                            <div className={cx('panel-content')}>
                                <div className={cx('panel-body')}>
                                    <div className={cx('text')}>
                                        <p>
                                            Với đơn hàng của Quý khách, sau 24h kể từ khi đặt hàng (không tính ngày thứ
                                            7, chủ nhật và các ngày lễ), Evo Tour sẽ liên hệ để xác nhận và gửi sản phẩm
                                            đến Quý khách
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('panel-item')}>
                            <div className={cx('panel-heading')}>
                                <h4 className={cx('panel-title')}>
                                    <Link onClick={handlerActive}>Khi nào thì đơn hàng của tôi được chuyển đi?</Link>
                                </h4>
                            </div>
                            <div className={cx('panel-content')}>
                                <div className={cx('panel-body')}>
                                    <div className={cx('text')}>
                                        <p>
                                            Với đơn hàng của Quý khách, sau 24h kể từ khi đặt hàng (không tính ngày thứ
                                            7, chủ nhật và các ngày lễ), Evo Tour sẽ liên hệ để xác nhận và gửi sản phẩm
                                            đến Quý khách
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    ); 
}

export default FAQ;
