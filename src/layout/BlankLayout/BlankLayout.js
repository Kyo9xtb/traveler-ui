import classNames from 'classnames/bind';

import styles from './BlankLayout.module.scss';
import { Fragment } from 'react';

const cx = classNames.bind(styles);
function BlankLayout({ children }) {
    return (
        <Fragment>
            <div className={cx('container')}>{children}</div>
        </Fragment>
    );
}

export default BlankLayout;
