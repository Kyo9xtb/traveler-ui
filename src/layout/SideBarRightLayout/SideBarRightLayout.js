import { Fragment } from 'react';
import classNames from 'classnames/bind';

import styles from './SideBarRightLayout.module.scss';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SideBar from '../components/SideBar';
import BannerPage from '~/components/BannerPage';
import OffcanvasMenu from '../components/OffcanvasMenu';
import Search from '../components/Search';

const cx = classNames.bind(styles);
function SideBarRightLayout({ title, children }) {
    return (
        <Fragment>
            <Header />
            <BannerPage title={title} />
            <div className={cx('container')}>
                <div className={cx('row mt-4 mb-4')}>
                    <div className={cx('col-12 col-lg-9')}>{children}</div>
                    <div className={cx('col-12 col-lg-3')}>
                        <SideBar />
                    </div>
                </div>
            </div>
            <Footer />
            <OffcanvasMenu />
            <Search />
        </Fragment>
    );
}

export default SideBarRightLayout;
