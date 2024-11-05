import { Fragment } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Error.module.scss';
import BannerPage from '~/components/BannerPage';
import images from '~/assets/images';
import config from '~/config';

const cx = classNames.bind(styles);

function ErrorPage() {
    return (
        <Fragment>
            <BannerPage></BannerPage>
            <div className={cx('container')}>
                <div className={cx('row')}>
                    <div className={cx('col-12')}>
                        <div className={cx('page-404', 'text-center')}>
                            <div className={cx('image-404')}>
                                <img src={images.errorPage} alt="404 Error" />
                            </div>
                            <h1>Lỗi không tìm thấy trang</h1>
                            <p className={cx('land')}>
                                Có vẻ như các trang mà bạn đang cố gắng tiếp cận không tồn tại nữa hoặc có thể nó vừa di
                                chuyển.
                            </p>
                            <div className={cx('mt-5')}>
                                <Link to={config.routes.home} className={cx('round-btn')} title="Về trang chủ">
                                    Về trang chủ
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ErrorPage;
