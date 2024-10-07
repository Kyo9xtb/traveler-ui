import classNames from 'classnames/bind'
import { Link } from 'react-router-dom';

import styles from './ItemNews.module.scss';

const cx = classNames.bind(styles);
function ItemNews() {
    return (
        <article className={cx('news-item')}>
            <div className={cx('news-content')}>
                <Link to="" title='' className={cx('entry-header')}>
                    <img src='https://bizweb.dktcdn.net/thumb/grande/100/372/532/articles/cong-o-tori.png?v=1574837888193' alt='' />
                </Link>
                <h3 className={cx('entry-title')}>
                    <Link to="" title='' >
                        Cẩm nang du lịch Đà Nẵng một ngày cho hội bạn vui chơi “sập” Đà thành
                    </Link>
                </h3>
                <p>
                    Đà Nẵng có cả núi, đồng bằng và biển, chỉ nằm cách Hội An 30 km. Bao quanh bởi hàng loạt điểm tham quan du ...
                </p>
            </div>
        </article>
    );
}

export default ItemNews;