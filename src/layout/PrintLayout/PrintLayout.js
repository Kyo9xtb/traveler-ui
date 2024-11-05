import classNames from 'classnames/bind';

import styles from './PrintLayout.module.scss';

const cx = classNames.bind(styles);
function PrintLayout({ children }) {
    return <div className={cx('container')}>{children}</div>;
}

export default PrintLayout;