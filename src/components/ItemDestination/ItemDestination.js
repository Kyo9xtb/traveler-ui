import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './ItemDestination.module.scss';
import config from '~/config';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function renderArea(data) {
    switch (data) {
        case 'Southeast Asia':
            return 'Đông Nam Á';

        case 'Northeast Asia':
            return 'Đông Bắc Á';

        case 'India - South Asia':
            return 'Ấn Độ - Nam Á';

        case 'Europe':
            return 'Châu Âu ';

        case 'Australia':
            return 'Châu Úc';

        case 'African':
            return 'Châu Phi';

        case 'Americas':
            return 'Châu Mỹ';

        case 'North Vietnam':
            return 'Miền Bắc';

        case 'Central Vietnam':
            return 'Miền Trung';

        case 'South Vietnam':
            return 'Miền Nam';

        case 'Team Building North Vietnam':
            return 'Team Building Miền Bắc';

        case 'Team Building Central Vietnam':
            return 'Team Building Miền Trung';

        case 'Team Building South Vietnam':
            return 'Team Building Miền Nam';
        default:
            return 'Khác';
    }
}
function ItemDestination({ data }) {
    const { placeName, slug, description, area, thumbnailUrl } = data;
    const linkAction = `${config.routes.destination}/${slug}`;
    return (
        <article
            className={cx('destination-item')}
            style={{
                backgroundImage: `url(${thumbnailUrl?? images.logoFooter})`,
            }}
        >
            <div className={cx('destination-wrapper')}>
                <div className={cx('destination-content')}>
                    <div className={cx('rating-start-wrap')}>
                        <div className={cx('rating-start')}>
                            <span style={{ width: '100%' }}></span>
                        </div>
                    </div>
                    {area && (
                        <span className={cx('cat-link')}>
                            <Link to="#">{renderArea(area)}</Link>
                        </span>
                    )}
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
