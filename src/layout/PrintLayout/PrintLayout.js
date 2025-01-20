import classNames from 'classnames/bind';

import styles from './PrintLayout.module.scss';

const cx = classNames.bind(styles);
function PrintLayout({ children }) {
    return (
        <div className={cx('page-wrapper')}>
            <div className={cx('container')}>{children}</div>
        </div>
    );
}

export default PrintLayout;
