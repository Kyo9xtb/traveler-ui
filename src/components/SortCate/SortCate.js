import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './SortCate.module.scss';

const cx = classNames.bind(styles);
function SortCate(data) {
    return (
        <div className={cx('sort-cate')}>
            <div className={cx('sort-cate-left')}>
                <h3>Xếp theo:</h3>
                <ul>
                    <li className={cx('active')}>
                        <Link>
                            <i></i>
                            Tên A - Z
                        </Link>
                    </li>
                    <li>
                        <Link>
                            <i></i>
                            Tên A - Z
                        </Link>
                    </li>
                    <li>
                        <Link>
                            <i></i>
                            Tên A - Z
                        </Link>
                    </li>
                    <li>
                        <Link>
                            <i></i>
                            Tên A - Z
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SortCate;
