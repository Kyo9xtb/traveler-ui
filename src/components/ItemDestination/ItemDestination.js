import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './ItemDestination.module.scss';
import config from '~/config';
import images from '~/assets/images';
import { useMemo } from 'react';
import { ListGroup } from '~/data';

const cx = classNames.bind(styles);
function ItemDestination({ data }) {
    const { placeName, slug, description, area, thumbnailUrl, tourGroup } = data;
    const linkAction = config.routes.destination;

    const renderArea = useMemo(() => {
        const areas = ListGroup.find((item) => item.value === tourGroup)?.children || [];
        return areas.find((item) => item.value === area)?.label || '';
    }, [area, tourGroup]);

    return (
        <article
            className={cx('destination-item')}
            style={{
                backgroundImage: `url(${thumbnailUrl ?? images.logoFooter})`,
            }}
        >
            <div className={cx('destination-wrapper')}>
                <div className={cx('destination-content')}>
                    <div className={cx('rating-start-wrap')}>
                        <div className={cx('rating-start')}>
                            <span style={{ width: '100%' }}></span>
                        </div>
                    </div>
                    {
                        <span className={cx('cat-link')}>
                            <Link to="#">{renderArea}</Link>
                        </span>
                    }
                    <h3>
                        <Link to={linkAction}>{placeName}</Link>
                    </h3>
                    {description && <p className={cx('description')}>{description}</p>}
                </div>
            </div>
        </article>
    );
}

export default ItemDestination;
