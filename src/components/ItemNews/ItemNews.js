import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './ItemNews.module.scss';
import config from '~/config';

const cx = classNames.bind(styles);

function ItemNews({ data }) {
    const { thumbnail_url, title, description, slug } = data;
    const linkAction = `${config.routes.news}/${slug}`;
    return (
        <article className={cx('news-item')}>
            <div className={cx('news-content')}>
                <Link to={linkAction} title={title} className={cx('entry-header')}>
                    <img src={thumbnail_url} alt={title} />
                </Link>
                <h3 className={cx('entry-title')}>
                    <Link to={linkAction} title={title}>
                        {title}
                    </Link>
                </h3>
                {description && <p>{description}</p>}
            </div>
        </article>
    );
}

export default ItemNews;
