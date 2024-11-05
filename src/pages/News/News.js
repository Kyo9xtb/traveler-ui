import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './News.module.scss';
import ItemNews from '~/components/ItemNews';
import PaginatedItems from '~/components/Paginate';

const cx = classNames.bind(styles);

const listProducts = [
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
];
function News() {
    return (
        <div className={cx('list-blog-wapper')}>
            <h1 className={cx('title-head', 'd-none')}>Tất cả tin tức</h1>
            <section className={cx('list-blogs', 'blog-main')}>
                <div className={cx('row', 'news-list')}>
                    <div className={cx('col-lg-8 col-md-7 col-sm-7')}>
                        <div className={cx('later-news-big')}>
                            <div className={cx('tempvideo')}>
                                <Link to="#" title="#">
                                    <img
                                        src="https://bizweb.dktcdn.net/100/372/532/articles/da-nang-su-thay-doi-ngoan-muc-cua-lang-chai-nam-xua-2.jpg?v=1575897433350"
                                        alt=""
                                    />
                                </Link>
                            </div>
                            <h3>
                                <Link to="#" title="#">
                                    Cẩm nang du lịch Đà N��ng một ngày cho hội bạn vui chơi “sập” Đà thành
                                </Link>
                            </h3>
                            <figure>
                                Đà Nẵng có cả núi, đồng bằng và biển, chỉ nằm cách Hội An 30 km. Bao quanh bởi hàng loạt
                                điểm tham quan du lịch cũng như danh lam thắng c...
                            </figure>
                        </div>
                    </div>
                    <div className={cx('col-lg-4 col-md-5 col-sm-5')}>
                        <ul className={cx('col-later-news')}>
                            <li className={cx('list-small')}>
                                <div className={cx('tempvideo')}>
                                    <Link to="#" title="#">
                                        <img
                                            src="https://bizweb.dktcdn.net/100/372/532/articles/da-nang-su-thay-doi-ngoan-muc-cua-lang-chai-nam-xua-2.jpg?v=1575897433350"
                                            alt=""
                                        />
                                    </Link>
                                </div>
                                <h3>
                                    <Link to="#" title="#">
                                        Cẩm nang du lịch Đà N��ng một ngày cho hội bạn vui chơi “sập” Đà thành
                                    </Link>
                                </h3>
                            </li>
                            <li className={cx('list-small')}>
                                <div className={cx('tempvideo')}>
                                    <Link to="#" title="#">
                                        <img
                                            src="https://bizweb.dktcdn.net/100/372/532/articles/da-nang-su-thay-doi-ngoan-muc-cua-lang-chai-nam-xua-2.jpg?v=1575897433350"
                                            alt=""
                                        />
                                    </Link>
                                </div>
                                <h3>
                                    <Link to="#" title="#">
                                        Cẩm nang du lịch Đà N��ng một ngày cho hội bạn vui chơi “sập” Đà thành
                                    </Link>
                                </h3>
                            </li>
                            <li className={cx('list-small')}>
                                <div className={cx('tempvideo')}>
                                    <Link to="#" title="#">
                                        <img
                                            src="https://bizweb.dktcdn.net/100/372/532/articles/da-nang-su-thay-doi-ngoan-muc-cua-lang-chai-nam-xua-2.jpg?v=1575897433350"
                                            alt=""
                                        />
                                    </Link>
                                </div>
                                <h3>
                                    <Link to="#" title="#">
                                        Cẩm nang du lịch Đà N��ng một ngày cho hội bạn vui chơi “sập” Đà thành
                                    </Link>
                                </h3>
                            </li>
                            <li className={cx('list-small')}>
                                <div className={cx('tempvideo')}>
                                    <Link to="#" title="#">
                                        <img
                                            src="https://bizweb.dktcdn.net/100/372/532/articles/da-nang-su-thay-doi-ngoan-muc-cua-lang-chai-nam-xua-2.jpg?v=1575897433350"
                                            alt=""
                                        />
                                    </Link>
                                </div>
                                <h3>
                                    <Link to="#" title="#">
                                        Cẩm nang du lịch Đà N��ng một ngày cho hội bạn vui chơi “sập” Đà thành
                                    </Link>
                                </h3>
                            </li>
                        </ul>
                    </div>
                </div>
                <PaginatedItems data={listProducts} itemsPerPage={9}>
                    {(item, index) => (
                        <div key={index} className={cx('col-md-4 col-sm-6 col-12', 'fix-blog-col-small')}>
                            <ItemNews data={item} />
                        </div>
                    )}
                </PaginatedItems>
            </section>
        </div>
    );
}

export default News;
