import classNames from "classnames/bind";

import styles from "./BannerPage.module.scss";

const cx = classNames.bind(styles);
function BannerPage({image, title}) {
    return (
        <div className={cx('inner-banner-wrap')}>
            <div className={cx('inner-banner-container')}
                style={{ backgroundImage: `url(${image})` }}
            >
                <div className={cx('container')}>
                    <div className={cx('inner-banner-content')}>
                        <h1 className={cx('page-title')}>
                            {title}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BannerPage;