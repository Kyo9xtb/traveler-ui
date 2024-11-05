import classNames from 'classnames/bind';
import { Fragment, useState } from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Paginate.module.scss';

const cx = classNames.bind(styles);
function PaginatedItems({ data, itemsPerPage, children }) {
    const [itemOffset, setItemOffset] = useState(0);
    console.log(data);
    
    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + Number(itemsPerPage);
    const currentItems = data.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(data.length / itemsPerPage);
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };
    return (
        <Fragment>
            <div className={cx('row')}>{currentItems.map((item, index) => children(item, index))}</div>
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

export default PaginatedItems;
