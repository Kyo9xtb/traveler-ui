import { Fragment, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './CustomAlert.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function AlertDismissible({ children, className }) {
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

function BoxError({ title = 'Thất bại', children, onDelete, onClose }) {
    const [showBox, setShowBox] = useState(true);
    const handlerRemove = (e) => {
        setShowBox(!showBox);
    };
    return (
        showBox && (
            <div className={cx('box-alter')}>
                <div className={cx('box-wrapper')}>
                    <div className={cx('box-content')}>
                        <div className={cx('box-header')}>
                            <div className={cx('icon-box', 'error')}>
                                <FontAwesomeIcon icon={faXmark} />
                            </div>
                            <h4 className={cx('title-box', 'mt-4')}>{title}</h4>
                            <button type="button" className="btn btn-light" onClick={onClose ? onClose : handlerRemove}>
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        </div>
                        <div className={cx('box-body')}>{children}</div>
                    </div>
                </div>
                <div className={cx('overplay')} onClick={onClose ? onClose : handlerRemove}></div>
            </div>
        )
    );
}
function BoxWarning({ title = 'Cảnh báo', children, onDelete, onClose }) {
    const [showBox, setShowBox] = useState(true);
    const handlerRemove = (e) => {
        setShowBox(!showBox);
    };
    return (
        showBox && (
            <div className={cx('box-alter')}>
                <div className={cx('box-wrapper')}>
                    <div className={cx('box-content')}>
                        <div className={cx('box-header')}>
                            <div className={cx('icon-box', 'warning')}>
                                <FontAwesomeIcon icon={faExclamation} />
                            </div>
                            <h4 className={cx('title-box', 'mt-4')}>{title}</h4>
                            <button type="button" className="btn btn-light" onClick={onClose ? onClose : handlerRemove}>
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        </div>
                        <div className={cx('box-body')}>{children}</div>
                        <div className={cx('box-footer')}>
                            <button type="button" className={cx('btn btn-danger')} onClick={onDelete}>
                                Xóa
                            </button>
                            <button
                                type="button"
                                className={cx('btn btn-secondary')}
                                onClick={onClose ? onClose : handlerRemove}
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
                <div className={cx('overplay')} onClick={onClose ? onClose : handlerRemove}></div>
            </div>
        )
    );
}
function BoxSuccess({ title = 'Thành công', children, onClose }) {
    const [showBox, setShowBox] = useState(true);
    const handlerRemove = (e) => {
        setShowBox(!showBox);
    };
    return (
        showBox && (
            <div className={cx('box-alter')}>
                <div className={cx('box-wrapper')}>
                    <div className={cx('box-content')}>
                        <div className={cx('box-header')}>
                            <div className={cx('icon-box', 'success')}>
                                <FontAwesomeIcon icon={faCheck} />
                            </div>
                            <h4 className={cx('title-box', 'mt-4')}>{title}</h4>
                            <button type="button" className="btn btn-light" onClick={onClose ? onClose : handlerRemove}>
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        </div>
                        <div className={cx('box-body')}>{children}</div>
                    </div>
                </div>
                <div className={cx('overplay')} onClick={onClose ? onClose : handlerRemove}></div>
            </div>
        )
    );
}
export default AlertDismissible;
export { BoxError, BoxSuccess, BoxWarning };
