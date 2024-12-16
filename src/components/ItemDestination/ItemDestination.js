import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './ItemDestination.module.scss';
import config from '~/config';

const cx = classNames.bind(styles);

function ItemDestination({ data }) {
    const { location_name, slug, description, area, thumbnail_url } = data;
    return (
        <article
            className={cx('destination-item')}
            style={{
                backgroundImage: `url(${thumbnail_url})`,
            }}
        >
            <div className={cx('destination-content')}>
                <div className={cx('rating-start-wrap')}>
                    <div className={cx('rating-start')}>
                        <span style={{ width: '100%' }}></span>
                    </div>
                </div> 
                {area && (
                    <span className={cx('cat-link')}>
                        <Link to="#">{area}</Link>
                    </span>
                )}
                <h3>
                    <Link to={`${config.routes.destination}/${slug}`}>{location_name}</Link>
                </h3>
                {description && <p className={cx('description')}>{description}</p>}
            </div>
        </article>
    );
}

export default ItemDestination;
