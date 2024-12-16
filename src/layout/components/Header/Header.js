import { Fragment, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignRight, faChevronUp, faMagnifyingGlass, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';

import styles from './Header.module.scss';
import images from '~/assets/images';
import config from '~/config';
import { actions, useStore } from '~/store';

const cx = classNames.bind(styles);

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
                path: config.routes.domesticTour,
                title: 'Tour trong nước',
                banner: images.domestic,
                children: [
                    {
                        path: config.routes.domesticTour,
                        title: 'Miền Bắc',
                        children: [
                            {
                                path: config.routes.domesticTour,
                                title: 'Sapa',
                            },
                            {
                                path: config.routes.domesticTour,
                                title: 'Hà Giang',
                            },
                            {
                                path: config.routes.domesticTour,
                                title: 'Cao Bằng - Bắc Kạn',
                            },
                            {
                                path: config.routes.domesticTour,
                                title: 'Mai Châu - Mộc Châu',
                            },

                            {
                                path: config.routes.domesticTour,
                                title: 'Yên Bái',
                            },
                            {
                                path: config.routes.domesticTour,
                                title: 'Ninh Bình',
                            },
                            {
                                path: config.routes.domesticTour,
                                title: 'Hạ Long',
                            },
                            {
                                path: config.routes.domesticTour,
                                title: 'Cát Bà',
                            },
                        ],
                    },
                    {
                        path: config.routes.domesticTour,
                        title: 'Miền Trung',
                        children: [
                            {
                                path: config.routes.domesticTour,
                                title: 'Cửa Lò',
                            },
                            {
                                path: config.routes.domesticTour,
                                title: 'Sầm Sơn',
                            },
                            {
                                path: config.routes.domesticTour,
                                title: 'Nghệ An',
                            },
                            {
                                path: config.routes.domesticTour,
                                title: 'Thiên Cầm',
                            },

                            {
                                path: config.routes.domesticTour,
                                title: 'Quảng Bình',
                            },
                            {
                                path: config.routes.domesticTour,
                                title: 'Huế',
                            },
                            {
                                path: config.routes.domesticTour,
                                title: 'Đà Nẵng',
                            },
                            {
                                path: config.routes.domesticTour,
                                title: 'Hội An',
                            },

                            {
                                path: config.routes.domesticTour,
                                title: 'Nha Trang',
                            },
                            {
                                path: config.routes.domesticTour,
                                title: 'Phú Yên',
                            },

                            {
                                path: config.routes.domesticTour,
                                title: 'Quy Nhơn',
                            },
                            {
                                path: config.routes.domesticTour,
                                title: 'Đà Lạt',
                            },
                            {
                                path: config.routes.domesticTour,
                                title: 'Tây Nguyên',
                            },
                            {
                                path: config.routes.domesticTour,
                                title: 'Phan Thiết - Mũi Né',
                            },
                        ],
                    },
                    {
                        path: config.routes.domesticTour,
                        title: 'Miền Nam',
                        children: [
                            {
                                path: config.routes.domesticTour,
                                title: 'Phú Quốc',
                            },
                            {
                                path: config.routes.domesticTour,
                                title: 'Côn Đảo',
                            },
                            {
                                path: config.routes.domesticTour,
                                title: 'Bến Tre',
                            },
                            {
                                path: config.routes.domesticTour,
                                title: 'Cần Thơ',
                            },

                            {
                                path: config.routes.domesticTour,
                                title: 'Cà Mau',
                            },
                            {
                                path: config.routes.domesticTour,
                                title: 'Hà Tiên',
                            },
                            {
                                path: config.routes.domesticTour,
                                title: 'Kiên Giang',
                            },
                            {
                                path: config.routes.domesticTour,
                                title: 'Nam Du',
                            },
                        ],
                    },
                ],
            },
            {
                path: config.routes.internationalTour,
                title: 'Tour quốc tế',
                banner: images.international,
                children: [
                    {
                        path: config.routes.internationalTour,
                        title: 'Đông Nam Á',
                        children: [
                            {
                                path: config.routes.internationalTour,
                                title: 'Singapore',
                            },
                            {
                                path: config.routes.internationalTour,
                                title: 'Malaysia',
                            },
                            {
                                path: config.routes.internationalTour,
                                title: 'Thái Lan',
                            },
                            {
                                path: config.routes.internationalTour,
                                title: 'Campuchia',
                            },

                            {
                                path: config.routes.internationalTour,
                                title: 'Lào',
                            },
                            {
                                path: config.routes.internationalTour,
                                title: 'Indonesia',
                            },
                            {
                                path: config.routes.internationalTour,
                                title: 'Philipines',
                            },
                        ],
                    },
                    {
                        path: config.routes.internationalTour,
                        title: 'Đông Bắc Á',
                        children: [
                            {
                                path: config.routes.internationalTour,
                                title: 'Hàn Quốc',
                            },
                            {
                                path: config.routes.internationalTour,
                                title: 'Đài Loan',
                            },
                            {
                                path: config.routes.internationalTour,
                                title: 'Hông Kông',
                            },
                            {
                                path: config.routes.internationalTour,
                                title: 'Nhật Bản',
                            },

                            {
                                path: config.routes.internationalTour,
                                title: 'Trung Quốc',
                            },
                        ],
                    },
                    {
                        path: config.routes.internationalTour,
                        title: 'Ấn Độ - Nam Á',
                        children: [
                            {
                                path: config.routes.internationalTour,
                                title: 'Ấn Độ',
                            },
                            {
                                path: config.routes.internationalTour,
                                title: 'Maldives',
                            },
                            {
                                path: config.routes.internationalTour,
                                title: 'Tây Tạng',
                            },
                        ],
                    },
                    {
                        path: config.routes.internationalTour,
                        title: 'Châu Âu',
                    },
                    {
                        path: config.routes.internationalTour,
                        title: 'Châu Úc',
                    },
                    {
                        path: config.routes.internationalTour,
                        title: 'Châu Phi',
                    },
                    {
                        path: config.routes.internationalTour,
                        title: 'Châu Mỹ',
                    },
                ],
            },
            {
                path: '#',
                title: 'Team Building',
                banner: images.domestic,
            },
            {
                path: '#',
                title: 'Tour Free and Easy',
                banner: images.domestic,
            },
            {
                path: '#',
                title: 'Điểm đến hàng đầu',
                banner: images.domestic,
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
function Header() {
    const [, dispatch] = useStore();
    let location = useLocation();

    const [changePath, setChangePath] = useState();
    if (location.pathname !== changePath) {
        setChangePath(location.pathname);
    }
    useEffect(() => {
        setShowMenuMobile(false);
    }, [changePath]);
    const [showMenuMobile, setShowMenuMobile] = useState(false);
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

    const handleMenuMobile = (e) => {
        e.preventDefault();
        setShowMenuMobile(!showMenuMobile);
    };

    const handleMenuChildrenMobile = (e) => {
        e.stopPropagation();
        let parentElement = e.target.closest('li');
        parentElement.classList.toggle(`${cx('active')}`);
    };

    const handleOffcanvasMenu = (e) => {
        e.preventDefault();
        dispatch(actions.setOffCanvasMenu(true));
    };

    const handleShowSearch = (e) => {
        e.preventDefault();
        dispatch(actions.setShowSearch(true));
    };

    const activeMenu = (path) => {
        if (location.pathname === path) {
            return true;
        }
        return false;
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
                                <Link to={config.routes.home}>
                                    <img src={images.logo} alt="Traveler" />
                                </Link>
                            </h1>
                        </div>
                        <div className={cx('header-icon', 'text-end')}>
                            <div className={cx('header-search-icon', 'd-inline-block')}>
                                <Link onClick={handleShowSearch}>
                                    <i>
                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                    </i>
                                </Link>
                            </div>
                            <div className={cx('offcanvas-menu', 'd-inline-block')}>
                                <Link onClick={handleOffcanvasMenu}>
                                    <i>
                                        <FontAwesomeIcon icon={faAlignRight} />
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
                                    <li
                                        key={index}
                                        className={
                                            activeMenu(menu.path)
                                                ? cx('menu-item-has-children', 'menu-active')
                                                : cx('menu-item-has-children')
                                        }
                                    >
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
                                    <li key={index} className={activeMenu(menu.path) ? cx('menu-active') : cx('')}>
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
            <div className={showMenuMobile ? cx('mobile-menu-container', 'active') : cx('mobile-menu-container')}>
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
