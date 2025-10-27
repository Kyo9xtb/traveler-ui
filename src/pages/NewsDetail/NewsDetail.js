import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './NewsDetail.module.scss';
import { NewsService } from '~/services';
import { createMarkup, keysToCamelCase } from '~/utils';
import { getNewsData } from '~/data';

const cx = classNames.bind(styles);

function NewsDetail() {
    const [listNews, setListNews] = useState([]);
    const [news, setNews] = useState([]);
    let { slug } = useParams();

    useEffect(() => {
        (async () => {
            const news = await getNewsData();
            setListNews(news);
        })();
    }, []);

    useEffect(() => {
        if (!slug || listNews.length === 0) return;

        const findNews = listNews.find((item) => item.slug === slug);
        if (findNews) {
            setNews(findNews);
            return;
        }

        (async () => {
            try {
                const { status, error_code, data } = await NewsService.getNewsDetail(slug);
                if (status === 'success' && error_code === 0) {
                    setNews(keysToCamelCase(data));
                }
            } catch (error) {
                setNews({});
            }
        })();
    }, [slug, listNews]);

    console.log(news);

    useEffect(() => {
        if (!news?.metaTitle) return;

        const originalTitle = document.title;
        document.title = `${news.metaTitle} | ${originalTitle}`;
        return () => {
            document.title = originalTitle;
        };
    }, [news?.metaTitle]);
    return (
        <div className={cx('list-blog-warper', 'mb-4')}>
            <h1 className={cx('title-head')}>{news.title}</h1>
            {news.content && (
                <div className={cx('article-details')} dangerouslySetInnerHTML={createMarkup(news.content)}></div>
            )}
        </div>
    );
}

export default NewsDetail;
