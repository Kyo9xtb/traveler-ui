import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './SideBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import config from '~/config';
import { useEffect, useState } from 'react';
import { NewsService } from '~/services';

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
                children: [
                    {
                        path: config.routes.domesticTour,
                        title: 'Miền Bắc',
                    },
                    {
                        path: config.routes.domesticTour,
                        title: 'Miền Trung',
                    },
                    {
                        path: config.routes.domesticTour,
                        title: 'Miền Nam',
                    },
                ],
            },
            {
                path: config.routes.internationalTour,
                title: 'Tour quốc tế',
                children: [
                    {
                        path: config.routes.internationalTour,
                        title: 'Đông Nam Á',
                    },
                    {
                        path: config.routes.internationalTour,
                        title: 'Đông Bắc Á',
                    },
                    {
                        path: config.routes.internationalTour,
                        title: 'Ấn Độ - Nam Á',
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
function ItemBlog({ data }) {
    const { news_id, title, thumbnail_url, id } = data;
    const linkAction = `${config.routes.news}/${id}`;
    return (
        <article key={news_id ? news_id : id} className={cx('item')}>
            <Link to={linkAction} className={cx('thumb')}>
                <img src={thumbnail_url} alt={title} />
            </Link>
            <div className={cx('info')}>
                <h4 className={cx('title')}>
                    <Link to={linkAction}>{title}</Link>
                </h4>
            </div>
        </article>
    );
}
function SideBar() {
    const [listNews, setListNews] = useState([]);
    useEffect(() => {
        NewsService.getNews().then((res) => {
            setListNews(res);
        });
    }, []);

    const handleMenuChildren = (e) => {
        e.preventDefault();
        e.stopPropagation();
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
                                    <Link to={menu.path} className={cx('nav-link')}>
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
                                                                <li
                                                                    key={index}
                                                                    className={cx('nav-item', 'drop-submenu')}
                                                                >
                                                                    <Link to={child.path} className={cx('nav-link')}>
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
                                                                                        to={grandChild.path}
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
                                    <Link to={menu.path} className={cx('nav-link')}>
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
                {listNews.length &&
                    listNews.slice(0, 4).map((item) => {
                        return <ItemBlog key={item.news_id ? item.news_id : item.id} data={item} />;
                    })}
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
