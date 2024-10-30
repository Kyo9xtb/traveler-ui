import classNames from 'classnames/bind';

import styles from './BannerPage.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);
function BannerPage({ image, title }) {
    return (
        <div className={cx('inner-banner-wrap')}>
            <div
                className={cx('inner-banner-container')}
                style={
                    image ? { backgroundImage: `url(${image})` } : { backgroundImage: `url(${images.defaultBanner})` }
                }
            >
                <div className={cx('container')}>
                    <div className={cx('inner-banner-content')}>
                        <h1 className={cx('page-title')}>{title}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BannerPage;
