import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './ItemNews.module.scss';
import config from '~/config';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function ItemNews({ data }) {
    const { thumbnailUrl, title, description, id } = data;
    const linkAction = `${config.routes.news}/${id}`;
    return (
        <article className={cx('news-item')}>
            <div className={cx('news-content')}>
                <Link to={linkAction} title={title} className={cx('entry-header')}>
                     <img
                        src={thumbnailUrl || images.logoFooter}
                        alt={title}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = images.logoFooter;
                        }}
                    />
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
