import { Fragment, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faMagnifyingGlass, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';

import styles from './Header.module.scss';
import images from '~/assets/images';
import config from '~/config';

const cx = classNames.bind(styles);
function Header() {
    const MENU = [
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
            children: [
                {
                    path: '#',
                    title: 'Tour trong nước',
                    banner: images.domestic,
                    children: [
                        {
                            path: '#',
                            title: 'Miền Bắc',
                            children: [
                                {
                                    path: '#',
                                    title: 'Sapa',
                                    children: [],
                                },
                                {
                                    path: '#',
                                    title: 'Hà Giang',
                                    children: [],
                                },
                                {
                                    path: '#',
                                    title: 'Cao Bằng - Bắc Kạn',
                                    children: [],
                                },
                                {
                                    path: '#',
                                    title: 'Mai Châu - Mộc Châu',
                                    children: [],
                                },

                                {
                                    path: '#',
                                    title: 'Yên Bái',
                                    children: [],
                                },
                                {
                                    path: '#',
                                    title: 'Ninh Bình',
                                    children: [],
                                },
                                {
                                    path: '#',
                                    title: 'Hạ Long',
                                    children: [],
                                },
                                {
                                    path: '#',
                                    title: 'Cát Bà',
                                    children: [],
                                },
                            ],
                        },
                        {
                            path: '#',
                            title: 'Miền Trung',
                            children: [
                                {
                                    path: '#',
                                    title: 'Cửa Lò',
                                    children: [],
                                },
                                {
                                    path: '#',
                                    title: 'Sầm Sơn',
                                    children: [],
                                },
                                {
                                    path: '#',
                                    title: 'Nghệ An',
                                    children: [],
                                },
                                {
                                    path: '#',
                                    title: 'Thiên Cầm',
                                    children: [],
                                },

                                {
                                    path: '#',
                                    title: 'Quảng Bình',
                                    children: [],
                                },
                                {
                                    path: '#',
                                    title: 'Huế',
                                    children: [],
                                },
                                {
                                    path: '#',
                                    title: 'Đà Nẵng',
                                    children: [],
                                },
                                {
                                    path: '#',
                                    title: 'Hội An',
                                    children: [],
                                },

                                {
                                    path: '#',
                                    title: 'Nha Trang',
                                    children: [],
                                },
                                {
                                    path: '#',
                                    title: 'Phú Yên',
                                    children: [],
                                },

                                {
                                    path: '#',
                                    title: 'Quy Nhơn',
                                    children: [],
                                },
                                {
                                    path: '#',
                                    title: 'Đà Lạt',
                                    children: [],
                                },
                                {
                                    path: '#',
                                    title: 'Tây Nguyên',
                                    children: [],
                                },
                                {
                                    path: '#',
                                    title: 'Phan Thiết - Mũi Né',
                                    children: [],
                                },
                            ],
                        },
                        {
                            path: '#',
                            title: 'Miền Nam',
                            children: [
                                {
                                    path: '#',
                                    title: 'Phú Quốc',
                                    children: [],
                                },
                                {
                                    path: '#',
                                    title: 'Côn Đảo',
                                    children: [],
                                },
                                {
                                    path: '#',
                                    title: 'Bến Tre',
                                    children: [],
                                },
                                {
                                    path: '#',
                                    title: 'Cần Thơ',
                                    children: [],
                                },

                                {
                                    path: '#',
                                    title: 'Cà Mau',
                                    children: [],
                                },
                                {
                                    path: '#',
                                    title: 'Hà Tiên',
                                    children: [],
                                },
                                {
                                    path: '#',
                                    title: 'Kiên Giang',
                                    children: [],
                                },
                                {
                                    path: '#',
                                    title: 'Nam Du',
                                    children: [],
                                },
                            ],
                        },
                    ],
                },
                {
                    path: '#',
                    title: 'Tour quốc tế',
                    children: [],
                },
                {
                    path: '#',
                    title: 'Team Building',
                },
                {
                    path: '#',
                    title: 'Tour Free and Easy',
                },
                {
                    path: '#',
                    title: 'Điểm đến hàng đầu',
                },
            ],
        },
        {
            path: config.routes.promotionalTours,
            title: 'Tour khuyến mãi',
        },
        {
            path: config.routes.news,
            title: 'Tin tức',
        },
        {
            path: config.routes.travelExperience,
            title: 'Kinh nghiệm du lịch',
        },
        {
            path: config.routes.faq,
            title: 'FAQ',
        },
        {
            path: config.routes.contact,
            title: 'Liên hệ',
        },
    ];
    useEffect(() => {
        const navElement = document.querySelector(`.${cx('nav-level1')}`);
        $(`.${cx('menu-item-has-children')}`).hover(function () {
            $(navElement).addClass(`${cx('active')}`);
        });
        $(`.${cx('nav-level1')}`).hover(
            function () {
                $(this).addClass(`${cx('active')}`);
            },
            function () {
                $(this).removeClass(`${cx('active')}`);
            },
        );
    }, []);
    useEffect(() => {
        const handleScroll = () => {
            const headerElement = document.querySelector(`.${cx('header')}`);
            if (window.scrollY >= 200) {
                headerElement.classList.add(`${cx('fix-header')}`);
            } else {
                headerElement.classList.remove(`${cx('fix-header')}`);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    useEffect(() => {
        const listElementPath = document.querySelectorAll('path');
        listElementPath.forEach((path) => {
            path.style.pointerEvents = 'none';
        });
    }, []);
    const handleMenuMobile = (e) => {
        const parentElement = e.target.parentNode.parentNode;
        parentElement.classList.toggle(`${cx('active')}`);
    };
    const handleMenuChildrenMobile = (e) => {
        let parentElement = e.target.parentNode.parentNode;
        parentElement.classList.toggle(`${cx('active')}`);
    };
    return (
        <header className={cx('header')}>
            <div className={cx('top-header')}>
                <div className="container">
                    <div className={cx('top-header-inner')}>
                        <div className={cx('header-contact', 'text-start')}>
                            <Link to="#">
                                <i>
                                    <FontAwesomeIcon icon={faPhoneVolume} />
                                </i>
                                <div className={cx('header-contact-details', 'd-none d-sm-block')}>
                                    <span className={cx('contact-label')}>Hotline</span>
                                    <h5>0902.146.186</h5>
                                </div>
                            </Link>
                        </div>
                        <div className={cx('site-logo', 'text-center')}>
                            <h1 className={cx('site-title')}>
                                <Link to="/">
                                    <img src={images.logo} alt="Traveler" />
                                </Link>
                            </h1>
                        </div>
                        <div className={cx('header-icon', 'text-end')}>
                            <div className={cx('header-search-icon', 'd-inline-block')}>
                                <Link to="#">
                                    <i>
                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                    </i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('bottom-header', 'd-none d-lg-block')}>
                <div className="container">
                    <div className={cx('bottom-header-inner')}>
                        <ul className={cx('nav')}>
                            {MENU.map((menu, index) => {
                                return menu.children !== undefined && menu.children.length > 0 ? (
                                    <li key={index} className={cx('menu-item-has-children')}>
                                        <Link to={menu.path} title={menu.title}>
                                            {menu.title}
                                        </Link>
                                        <div className={cx('mega-content')}>
                                            <div className={cx('col-lg-3 no-padding')}>
                                                <ul className={cx('nav-level0')}>
                                                    {menu.children.map((menuItem, index) => {
                                                        return menuItem.children !== undefined &&
                                                            menuItem.children.length > 0 ? (
                                                            <li key={index} className={cx('nav-level1')}>
                                                                <Link to={menuItem.path} title={menuItem.title}>
                                                                    {menuItem.title}
                                                                </Link>
                                                                <div className={cx('sub-cate-1')}>
                                                                    <div className={cx('row', 'fix-padding')}>
                                                                        <div className="col-lg-9">
                                                                            <ul
                                                                                className={cx(
                                                                                    'nav-level1',
                                                                                    'row',
                                                                                    'active',
                                                                                )}
                                                                            >
                                                                                {menuItem.children.map(
                                                                                    (child, index) => {
                                                                                        return child.children !==
                                                                                            undefined &&
                                                                                            child.children.length >
                                                                                                0 ? (
                                                                                            <li
                                                                                                key={index}
                                                                                                className={cx(
                                                                                                    'level2',
                                                                                                    'col-lg-4',
                                                                                                )}
                                                                                            >
                                                                                                <Link
                                                                                                    to={child.path}
                                                                                                    title={child.title}
                                                                                                >
                                                                                                    {child.title}
                                                                                                </Link>
                                                                                                <ul
                                                                                                    className={cx(
                                                                                                        'level3',
                                                                                                    )}
                                                                                                >
                                                                                                    {child.children.map(
                                                                                                        (
                                                                                                            grandChild,
                                                                                                            index,
                                                                                                        ) => {
                                                                                                            return (
                                                                                                                <li
                                                                                                                    key={
                                                                                                                        index
                                                                                                                    }
                                                                                                                >
                                                                                                                    <Link
                                                                                                                        to={
                                                                                                                            grandChild.path
                                                                                                                        }
                                                                                                                        title={
                                                                                                                            grandChild.title
                                                                                                                        }
                                                                                                                    >
                                                                                                                        {
                                                                                                                            grandChild.title
                                                                                                                        }
                                                                                                                    </Link>
                                                                                                                </li>
                                                                                                            );
                                                                                                        },
                                                                                                    )}
                                                                                                </ul>
                                                                                            </li>
                                                                                        ) : (
                                                                                            <li
                                                                                                key={index}
                                                                                                className={cx(
                                                                                                    'level2',
                                                                                                    'col-lg-4',
                                                                                                )}
                                                                                            >
                                                                                                <Link
                                                                                                    to={child.path}
                                                                                                    title={child.title}
                                                                                                >
                                                                                                    {child.title}
                                                                                                </Link>
                                                                                            </li>
                                                                                        );
                                                                                    },
                                                                                )}
                                                                            </ul>
                                                                        </div>
                                                                        {menuItem.banner !== undefined ? (
                                                                            <div className="col-lg-3">
                                                                                <Link to="#" title="">
                                                                                    <img
                                                                                        src={menuItem.banner}
                                                                                        alt={menuItem.title}
                                                                                    />
                                                                                </Link>
                                                                            </div>
                                                                        ) : (
                                                                            <Fragment />
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ) : (
                                                            <li key={index} className={cx('nav-level1')}>
                                                                <Link to={menuItem.path} title={menuItem.title}>
                                                                    {menuItem.title}
                                                                </Link>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                ) : (
                                    <li key={index}>
                                        <Link to={menu.path} title={menu.title}>
                                            {menu.title}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <div className={cx('mobile-menu-container')}>
                <div className={cx('slicknav_menu')}>
                    <Link className={cx('slicknav_btn')} onClick={handleMenuMobile}>
                        Menu
                    </Link>
                </div>
                <nav className={cx('slicknav_nav')}>
                    <ul className={cx('nav-list-menu')}>
                        {MENU.map((menu, index) => {
                            return menu.children !== undefined && menu.children.length > 0 ? (
                                <li key={index} className={cx('ng-scope', 'ng-has-child1')}>
                                    <Link to={menu.path}>
                                        {menu.title}
                                        <FontAwesomeIcon
                                            icon={faChevronUp}
                                            exact="true"
                                            onClick={handleMenuChildrenMobile}
                                        />
                                    </Link>
                                    <ul className={cx('ul-has-child1')}>
                                        {menu.children.map((child, index) => {
                                            return child.children !== undefined && child.children.length > 0 ? (
                                                <li key={index} className={cx('ng-scope', 'ng-has-child2')}>
                                                    <Link to={child.path}>
                                                        {child.title}
                                                        <FontAwesomeIcon
                                                            icon={faChevronUp}
                                                            exact="true"
                                                            onClick={handleMenuChildrenMobile}
                                                        />
                                                    </Link>
                                                    <ul className={cx('ul-has-child2')}>
                                                        {child.children.map((child, index) => {
                                                            return (
                                                                <li key={index} className={cx('ng-scope')}>
                                                                    <Link to={child.path}>{child.title}</Link>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </li>
                                            ) : (
                                                <li key={index} className={cx('ng-scope')}>
                                                    <Link to={child.path}>{child.title}</Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </li>
                            ) : (
                                <li key={index} className={cx('ng-scope')}>
                                    <Link to={menu.path}>{menu.title}</Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
