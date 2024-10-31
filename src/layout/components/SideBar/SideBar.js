import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './SideBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import config from '~/config';

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
        path: '/',
        title: 'Tour du lịch',
        children: [
            {
                path: '#',
                title: 'Tour trong nước',
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
        path: '#',
        title: 'Tour khuyến mãi',
    },
    {
        path: '#',
        title: 'Tin tức',
    },
    {
        path: '#',
        title: 'Kinh nghiệm du lịch',
    },
    {
        path: '#',
        title: 'FAQ',
    },
    {
        path: config.routes.contact,
        title: 'Liên hệ',
    },
];
function ItemBlog() {
    return (
        <article className={cx('item')}>
            <Link to="#" className={cx('thumb')}>
                <img
                    src="https://bizweb.dktcdn.net/thumb/medium/100/372/532/articles/da-nang-su-thay-doi-ngoan-muc-cua-lang-chai-nam-xua-2.jpg?v=1575897433350"
                    alt=""
                />
            </Link>
            <div className={cx('info')}>
                <h4 className={cx('title')}>
                    <Link to="#">Cẩm nang du lịch Đà Nẵng một ngày cho hội bạn vui chơi “sập” Đà thành</Link>
                </h4>
            </div>
        </article>
    );
}
function SideBar() {
    const handleMenuChildren = (e) => {
        let parentElement = '';
        switch (e.target.nodeName) {
            case 'path':
                parentElement = e.target.parentNode.parentNode.parentNode;
                break;
            default:
                parentElement = e.target.parentNode.parentNode;
        }
        parentElement.classList.toggle(`${cx('active')}`);
    };
    return (
        <div className={cx('sidebar-wrap')}>
            <aside className={cx('aside-item', 'collection-category')}>
                <div className={cx('aside-title')}>
                    <h3 className={cx('title-head')}>Danh mục</h3>
                </div>
                <div className={cx('aside-content')}>
                    <ul className={cx('nav-category')}>
                        {MENU.map((menu, index) => {
                            return menu.children !== undefined && menu.children.length > 0 ? (
                                <li key={index} className={cx('nav-item')}>
                                    <Link to="#" className={cx('nav-link')}>
                                        {menu.title}
                                        <FontAwesomeIcon
                                            icon={faChevronDown}
                                            exact="true"
                                            onClick={handleMenuChildren}
                                        />
                                    </Link>
                                    <ul className={cx('dropdown-menu', 'level1')}>
                                        {menu.children.map((menuItem, index) => {
                                            return menuItem.children !== undefined && menuItem.children.length > 0 ? (
                                                <li key={index} className={cx('nav-item')}>
                                                    <Link to="#" className={cx('nav-link')}>
                                                        {menuItem.title}
                                                        <FontAwesomeIcon
                                                            icon={faChevronDown}
                                                            exact="true"
                                                            onClick={handleMenuChildren}
                                                        />
                                                    </Link>
                                                    <ul className={cx('dropdown-menu', 'level2')}>
                                                        {menuItem.children.map((child, index) => {
                                                            return child.children !== undefined &&
                                                                child.children.length > 0 ? (
                                                                <li key={index} className={cx('nav-item', 'drop-submenu')}>
                                                                    <Link to="#" className={cx('nav-link')}>
                                                                        {child.title}
                                                                        <FontAwesomeIcon
                                                                            icon={faChevronDown}
                                                                            exact="true"
                                                                            onClick={handleMenuChildren}
                                                                        />
                                                                    </Link>
                                                                    <ul className={cx('dropdown-menu', 'level3')}>
                                                                        {child.children.map((grandChild, index) => {
                                                                            return (
                                                                                <li
                                                                                    key={index}
                                                                                    className={cx('nav-item')}
                                                                                >
                                                                                    <Link
                                                                                        to="#"
                                                                                        className={cx('nav-link')}
                                                                                    >
                                                                                        {grandChild.title}
                                                                                    </Link>
                                                                                </li>
                                                                            );
                                                                        })}
                                                                    </ul>
                                                                </li>
                                                            ) : (
                                                                <li key={index} className={cx('nav-item')}>
                                                                    <Link to="#" className={cx('nav-link')}>
                                                                        {child.title}
                                                                    </Link>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </li>
                                            ) : (
                                                <li key={index} className={cx('nav-item')}>
                                                    <Link to="#" className={cx('nav-link')}>
                                                        {menuItem.title}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </li>
                            ) : (
                                <li key={index} className={cx('nav-item')}>
                                    <Link to="#" className={cx('nav-link')}>
                                        {menu.title}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </aside>
            <aside className={cx('aside-item', 'top-news')}>
                <div className={cx('aside-title')}>
                    <h3 className={cx('title-head')}>
                        <Link to="#">Bài viết được yêu thích</Link>
                    </h3>
                </div>
                <ItemBlog />
            </aside>
            <aside className={cx('aside-item', 'blog-banner')}>
                <Link to="#" className={cx('thumb')}>
                    <img
                        src="https://bizweb.dktcdn.net/100/372/532/themes/744930/assets/blog_banner.jpg?1721978544764"
                        alt=""
                    />
                </Link>
            </aside>
        </div>
    );
}

export default SideBar;
