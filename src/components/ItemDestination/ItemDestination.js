import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import styles from './ItemDestination.module.scss'

const cx = classNames.bind(styles)

function ItemDestination() {
    return (
        <article className={cx('destination-item')}
            style={{backgroundImage:'url(https://bizweb.dktcdn.net/thumb/large/100/372/532/products/vistas-canal-venecia.jpg?v=1575555979307)'}}
        >
            <div className={cx('destination-content')}>
                <div className={cx('rating-start-wrap')}>
                    <div className={cx('rating-start')}>
                        <span style={{ width: '20%' }}>
                        </span>
                    </div>
                </div>
                <span className={cx('cat-link')}>
                    <Link to="">
                        Dubai
                    </Link>
                </span>
                <h3>
                    <Link to="">
                        BURJ KHALIFA
                    </Link>
                </h3>
                <p>
                    Fusce hic augue velit wisi ips quibusdam pariatur, iusto.
                </p>
            </div>
        </article>
    );
}

export default ItemDestination;