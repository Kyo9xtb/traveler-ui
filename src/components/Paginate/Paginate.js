import { Fragment, useState } from 'react';
import classNames from 'classnames/bind';
import ReactPaginate from 'react-paginate';

import styles from './Paginate.module.scss';

const cx = classNames.bind(styles);
function Paginate({ data, itemsPerPage, children }) {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + Number(itemsPerPage);
    const currentItems = data.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(data.length / itemsPerPage);
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };
    return (
        <Fragment>
            {children(currentItems)}
            <nav className={cx('text-center')}>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">>>"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="<<<"
                    renderOnZeroPageCount={null}
                    className={cx('pagination')}
                    pageClassName={cx('page-item')}
                    pageLinkClassName={cx('page-link')}
                    breakClassName={cx('page-item')}
                    breakLinkClassName={cx('page-link')}
                    activeClassName={cx('active')}
                    previousClassName={cx('btn-prev')}
                    nextClassName={cx('btn-next')}
                    previousLinkClassName={cx('page-link')}
                    nextLinkClassName={cx('page-link')}
                    disabledClassName={cx('disabled')}
                />
            </nav>
        </Fragment>
    );
}

export default Paginate;
