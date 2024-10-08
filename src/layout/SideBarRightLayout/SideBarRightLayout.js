import { Fragment } from 'react';
import classNames from 'classnames/bind';

import styles from './SideBarRightLayout.module.scss';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SideBar from '../components/SideBar';
import BannerPage from '~/components/BannerPage';

const cx = classNames.bind(styles);
function SideBarRightLayout({ title, children }) {
    return (
        <Fragment>
            <Header />
            <BannerPage title={title} />
            <div className={cx('container')}>
                <div className={cx('row')}>
                    <div className={cx('col-12 col-lg-9')}>{children}</div>
                    <div className={cx('col-12 col-lg-3')}>
                        <SideBar />
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
}

export default SideBarRightLayout;
