import { Fragment } from 'react';
import classNames from 'classnames/bind';

import styles from './CustomAlert.module.scss';

const cx = classNames.bind(styles);
function AlterDismissible({ children, className }) {
    const classes = cx('alert alert-dismissible', 'custom-alter', {
        [className]: className,
    });

    const handleRemove = (event) => {
        event.target.parentNode.remove();
    };
    return (
        <div className={classes} role="alert">
            {children ? (
                <Fragment>
                    <button className={cx('btn-close')} onClick={handleRemove}></button>
                    {children}
                </Fragment>
            ) : null}
        </div>
    );
}

export default AlterDismissible;
