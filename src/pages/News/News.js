import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './News.module.scss';
import ItemNews from '~/components/ItemNews';
import Paginate from '~/components/Paginate';
import config from '~/config';
import { useStore } from '~/store';
import { getNewsData } from '~/data';
import { keysToCamelCase } from '~/utils';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function News() {
    const [listNews, setListNews] = useState([]);
    const [paginationData, setPaginationData] = useState([]);

    useEffect(() => {
        (async () => {
            const news = await getNewsData();
            setListNews(news);
        })();
    }, []);

    const renderPath = useCallback((slug) => {
        return config.routes.newsDetail.replace(':slug', slug);
    }, []);
    
    const renderImage = useCallback((srcImage, alt = '') => {
        return (
            <img
                src={srcImage || images.logoFooter}
                alt={alt}
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = images.logoFooter;
                }}
            />
        );
    }, []);

    return (
        <div className={cx('list-blog-wrapper')}>
            <section className={cx('list-blogs', 'blog-main')}>
                <div className={cx('row mb-4', 'news-list')}>
                    {paginationData.slice(0, 1).map((news) => {
                        return (
                            <div key={news.id} className={cx('col-lg-8 col-md-7 col-sm-7')}>
                                <div className={cx('later-news-big')}>
                                    <div className={cx('tempfile')}>
                                        <Link to={renderPath(news.slug)} title={news.title}>
                                            {renderImage(news.thumbnailUrl, news.title)}
                                        </Link>
                                    </div>
                                    <h3>
                                        <Link to={renderPath(news.slug)} title={news.title}>
                                            {news.title}
                                        </Link>
                                    </h3>
                                    <p>{news.description}</p>
                                </div>
                            </div>
                        );
                    })}
                    <div className={cx('col-lg-4 col-md-5 col-sm-5')}>
                        <ul className={cx('col-later-news')}>
                            {paginationData.slice(1, 5).map((news) => {
                                return (
                                    <li key={news.news_id ? news.news_id : news.id} className={cx('list-small')}>
                                        <div className={cx('tempfile')}>
                                            <Link to={renderPath(news.slug)} title={news.title}>
                                                {renderImage(news.thumbnailUrl, news.title)}
                                            </Link>
                                        </div>
                                        <h3>
                                            <Link to={renderPath(news.slug)} title={news.title}>
                                                {news.title}
                                            </Link>
                                        </h3>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
                <div className={cx('row')}>
                    {paginationData.slice(5).map((news) => {
                        return (
                            <div
                                key={news.news_id ? news.news_id : news.id}
                                className={cx('col-md-4 col-sm-6 col-12', 'fix-blog-col-small')}
                            >
                                <ItemNews data={news} />
                            </div>
                        );
                    })}
                </div>
            </section>
            <Paginate data={listNews} itemsPerPage={14} resData={setPaginationData} />
        </div>
    );
}

export default News;
