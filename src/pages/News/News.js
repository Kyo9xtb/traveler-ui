import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './News.module.scss';
import ItemNews from '~/components/ItemNews';
import Paginate from '~/components/Paginate';
import config from '~/config';
import { useStore } from '~/store';

const cx = classNames.bind(styles);

function News() {
    const [store] = useStore();

    const [listNews, setListNews] = useState([]);
    // const { news: newsStaticData } = StaticData;

    // useEffect(() => {
    //     const fetchAllData = async () => {
    //         try {
    //             const res = await NewsService.getNews();
    //             setListNews(res);
    //         } catch (err) {
    //             console.error('Failed to fetch news:', err);
    //             setListNews(newsStaticData);
    //         }
    //     };
    //     fetchAllData();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);
    useEffect(() => {
        const { listData } = store;
        setListNews(listData.listNews);
    }, [store]);
    return (
        <div className={cx('list-blog-wrapper')}>
            <h1 className={cx('title-head', 'd-none')}>Tất cả tin tức</h1>
            <Paginate data={listNews} itemsPerPage={14}>
                {(data) => {
                    return (
                        <section className={cx('list-blogs', 'blog-main')}>
                            <div className={cx('row mb-4', 'news-list')}>
                                {data.slice(0, 1).map((news) => {
                                    return (
                                        <div
                                            key={news.news_id ? news.news_id : news.id}
                                            className={cx('col-lg-8 col-md-7 col-sm-7')}
                                        >
                                            <div className={cx('later-news-big')}>
                                                <div className={cx('tempfile')}>
                                                    <Link to={`${config.routes.news}/${news.id}`} title={news.title}>
                                                        <img src={news.thumbnail_url} alt={news.title} />
                                                    </Link>
                                                </div>
                                                <h3>
                                                    <Link to={`${config.routes.news}/${news.id}`} title={news.title}>
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
                                        {data.slice(1, 5).map((news) => {
                                            return (
                                                <li
                                                    key={news.news_id ? news.news_id : news.id}
                                                    className={cx('list-small')}
                                                >
                                                    <div className={cx('tempfile')}>
                                                        <Link
                                                            to={`${config.routes.news}/${news.id}`}
                                                            title={news.title}
                                                        >
                                                            <img src={news.thumbnail_url} alt={news.title} />
                                                        </Link>
                                                    </div>
                                                    <h3>
                                                        <Link
                                                            to={`${config.routes.news}/${news.id}`}
                                                            title={news.title}
                                                        >
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
                                {data.slice(5).map((news) => {
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
                    );
                }}
            </Paginate>
        </div>
    );
}

export default News;
