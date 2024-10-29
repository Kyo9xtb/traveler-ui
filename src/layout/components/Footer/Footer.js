import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTiktok, faTwitter } from '@fortawesome/free-brands-svg-icons';

import styles from './Footer.module.scss';
import images from '~/assets/images';
import { faCircleArrowUp, faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Fragment, useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const listSocial = [
    {
        path: '',
        icon: <FontAwesomeIcon icon={faFacebookF} />,
        title: 'SaoViet Travler',
    },
    {
        path: '',
        icon: <FontAwesomeIcon icon={faTiktok} />,
        title: 'SaoViet Travler',
    },
    {
        path: '',
        icon: <FontAwesomeIcon icon={faInstagram} />,
        title: 'SaoViet Travler',
    },
    {
        path: '',
        icon: <FontAwesomeIcon icon={faTwitter} />,
        title: 'SaoViet Travler',
    },
];

const listMenuFooter = [
    {
        path: '/',
        title: 'SaoViet Travler',
        children: [
            {
                path: '#',
                title: 'Trang chủ',
            },

            {
                path: '#',
                title: 'Giới thiệu',
            },
            {
                path: '#',
                title: 'Tour du lịch',
            },
            {
                path: '#',
                title: 'Tour khuyến mại',
            },
            {
                path: '#',
                title: 'Tin tức',
            },
            {
                path: '#',
                title: 'Liên hệ',
            },
        ],
    },
    {
        path: '#',
        title: 'Góc khách hàng',
        children: [
            {
                path: '#',
                title: 'Điều kiện & điều khoản',
            },
            {
                path: '#',
                title: 'Quyền riêng tư',
            },
            {
                path: '#',
                title: 'Chính sách bảo mật và thông tin',
            },

            {
                path: '#',
                title: 'Chính sách bảo mật và thông tin',
            },

            {
                path: '#',
                title: 'Chính sách bảo mật và thông tin',
            },

            {
                path: '#',
                title: 'Chính sách bảo mật và thông tin',
            },
        ],
    },
    {
        path: '/san-pham',
        title: 'Sản phẩm',
        children: [],
    },
    {
        path: '/dich-vu',
        title: 'Dịch vụ',
        children: [],
    },
];
function Footer() {
    const [showGoToTop, setShowGoToTop] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setShowGoToTop(window.scrollY >= 200);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <Fragment>
            <footer className={cx('footer')}>
                <div className={cx('top-footer')}>
                    <div className={cx('container')}>
                        <div className={cx('row align-items-center')}>
                            <div className={cx('col-lg-3 col-md-12')}>
                                <ul className={cx('social')}>
                                    {listSocial.map((social, index) => {
                                        return (
                                            <li key={index}>
                                                <Link to={social.path} title={social.title}>
                                                    {social.icon}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                            <div className={cx('col-lg-4 col-md-12')}>
                                <div className={cx('subscribe-content')}>
                                    <h2>Đăng ký nhận tin</h2>
                                    <p>Các chương trình khuyến mại được gửi đến bạn</p>
                                </div>
                            </div>
                            <div className={cx('col-lg-5 col-md-12')}>
                                <div className={cx('subscribe-form')}>
                                    <form className={cx('newsletter-form')}>
                                        <div className={cx('input-group', 'input-group ')}>
                                            <input
                                                className={cx('form-control')}
                                                type="email"
                                                name="email-newsletter"
                                                placeholder="Nhập email của bạn"
                                                required
                                                autoComplete="off"
                                            />
                                            <span className={cx('input-group-append')}>
                                                <button type="submit" name="subscribe">
                                                    Đăng ký
                                                </button>
                                            </span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('bottom-footer')}>
                    <div className={cx('container')}>
                        <div className={cx('row')}>
                            <div className={cx('col-lg-3 col-md-12', 'gray-footer')}>
                                <Link to="#" className={cx('logo-wrapper')}>
                                    <img src={images.logoFooter} alt="SaoViet Travel" />
                                </Link>
                                <ul className={cx('footer-contact-info')}>
                                    <li>
                                        <span>
                                            <FontAwesomeIcon icon={faLocationDot} />
                                        </span>
                                        Số 143, Đường Trần Thái Tông, TP Thái Bình
                                    </li>
                                    <li>
                                        <span>
                                            <FontAwesomeIcon icon={faPhone} />
                                        </span>
                                        0902.146.186
                                    </li>
                                    <li>
                                        <span>
                                            <FontAwesomeIcon icon={faEnvelope} />
                                        </span>
                                        dulichsaoviet.tb@gmail.com
                                    </li>
                                </ul>
                                <div className={cx('footer-payment')}>
                                    <img src={images.visa} alt="Visa" />
                                    <img src={images.masterCard} alt="Master Card" />
                                    <img src={images.cash} alt="Tiền mặt" />
                                    <img src={images.smartBanking} alt="Internet Banking" />
                                </div>
                            </div>
                            <div className={cx('col-lg-9 col-md-12', 'not-gray-footer')}>
                                <div className={cx('row')}>
                                    {listMenuFooter.map((menu, index) => {
                                        return (
                                            <div key={index} className={cx('col-lg-3 col-md-3 col-sm-6 col-6')}>
                                                <div className={cx('single-footer-widget')}>
                                                    <h3>{menu.title}</h3>
                                                    <ul className={cx('footer-quick-links')}>
                                                        {menu.children.map((child, index) => {
                                                            return (
                                                                <li key={index}>
                                                                    <Link to={child.path} title={child.title}>
                                                                        {child.title}
                                                                    </Link>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div className={cx('col-lg-12 col-md-12 col-sm-12 col-12')}>
                                        <div className={cx('copyright', 'text-center')}>
                                            <span>
                                                © Bản quyền thuộc về &nbsp;
                                                <b>SaoViet Travel</b>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            {showGoToTop ? (
                <button
                    className={cx('btn-go-to-top')}
                    onClick={() => {
                        document.documentElement.scrollTop = 0;
                    }}
                    title="Lên đầu trang"
                >
                    <FontAwesomeIcon icon={faCircleArrowUp} />
                </button>
            ) : (
                <Fragment />
            )}
        </Fragment>
    );
}

export default Footer;
