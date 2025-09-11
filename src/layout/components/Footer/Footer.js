import { Fragment } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTiktok, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';

import styles from './Footer.module.scss';
import images from '~/assets/images';
import config from '~/config';
import { companyInfo } from '~/data';

const cx = classNames.bind(styles);

const listSocial = [
    {
        path: companyInfo.social.facebook,
        icon: <FontAwesomeIcon icon={faFacebookF} />,
        title: companyInfo.name.default,
    },
    {
        path: companyInfo.social.tiktok,
        icon: <FontAwesomeIcon icon={faTiktok} />,
        title: companyInfo.name.default,
    },
    {
        path: companyInfo.social.instagram,
        icon: <FontAwesomeIcon icon={faInstagram} />,
        title: companyInfo.name.default,
    },
    {
        path: companyInfo.social.twitter,
        icon: <FontAwesomeIcon icon={faTwitter} />,
        title: companyInfo.name.default,
    },
];

const listMenuFooter = [
    {
        path: config.routes.home,
        title: 'SaoViet Travler',
        children: [
            {
                path: config.routes.home,
                title: 'Trang chủ',
            },

            {
                path: config.routes.about,
                title: 'Giới thiệu',
            },
            {
                path: config.routes.tour,
                title: 'Tour du lịch',
            },
            {
                path: config.routes.promotionalTours,
                title: 'Tour khuyến mại',
            },
            {
                path: config.routes.news,
                title: 'Tin tức',
            },
            {
                path: config.routes.contact,
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
                title: 'Điều khoản chung',
            },
            {
                path: '#',
                title: 'Hướng dẫn đặt tour online',
            },
            {
                path: '#',
                title: 'Quy định thanh toán',
            },

            {
                path: '#',
                title: 'Chính sách giao nhận',
            },

            {
                path: '#',
                title: 'Chính sách hủy phạt',
            },

            {
                path: '#',
                title: 'Chính sách bảo mật',
            },
            {
                path: '#',
                title: 'Chính sách chất lượng',
            },
        ],
    },
    {
        path: '/san-pham',
        title: 'Sản phẩm',
        children: [
            {
                path: config.routes.domesticTour,
                title: 'Tour trong nước',
            },
            {
                path: config.routes.internationalTour,
                title: 'Tour quốc tế',
            },
            {
                path: config.routes.tour,
                title: 'Team building',
            },
            {
                path: config.routes.tour,
                title: 'Tour Free and Easy',
            },
            {
                path: config.routes.destination,
                title: 'Điểm đến hàng đầu',
            },
        ],
    },
    {
        path: '',
        title: 'Chăm sóc khách hàng',
        children: [
            {
                path: '#',
                title: 'Ý kiến khách hàng',
            },
            {
                path: '#',
                title: 'Bảo hiểm du lịch',
            },
            {
                path: '#',
                title: 'Travel Voucher',
            },
            {
                path: '#',
                title: 'Giải quyết khiếu nại',
            },
        ],
    },
];
function Footer() {
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
                                        {companyInfo.contact.address}
                                    </li>
                                    <li>
                                        <span>
                                            <FontAwesomeIcon icon={faPhone} />
                                        </span>
                                        {companyInfo.contact.phone}
                                    </li>
                                    <li>
                                        <span>
                                            <FontAwesomeIcon icon={faEnvelope} />
                                        </span>
                                        {companyInfo.contact.email}
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
                                                <b>{companyInfo.name.default}</b>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </Fragment>
    );
}

export default Footer;
