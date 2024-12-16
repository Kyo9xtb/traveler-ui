import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './NewsDetail.module.scss';
import { NewsService } from '~/services';

const cx = classNames.bind(styles);

function NewsDetail() {
    const [news, setNews] = useState([]);
    let { slug } = useParams();
    useEffect(() => {
        NewsService.getNewsDetail(slug)
            .then((res) => {
                setNews(res);
            })
            .catch((err) => {
                console.error('Error fetching tour:', err);
                setNews([]);
            });
    }, [slug]);
    console.log(news);
    function createMarkup(data) {
        return { __html: `${data}` };
    }

    useEffect(() => {
        const originalTitle = document.title;
        document.title = `${news.meta_title} | ${originalTitle}`;
        return () => {
            document.title = originalTitle;
        };
    }, [news]);
    return (
        <div className={cx('list-blog-warper','mb-4')}>
            <h1 className={cx('title-head')}>{news.title}</h1>
            {/* {news.description && (
                <div className={cx('article-summary')} dangerouslySetInnerHTML={createMarkup(news.description)}></div>
            )} */}
            {news.content && (
                <div className={cx('article-details')} dangerouslySetInnerHTML={createMarkup(news.content)}></div>
            )}
        </div>
    );
}

export default NewsDetail;
