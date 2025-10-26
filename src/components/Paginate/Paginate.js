import classNames from 'classnames/bind';
import { Fragment, useEffect, useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Paginate.module.scss';

const cx = classNames.bind(styles);

function Pagination({ data = [], itemsPerPage = 10, resData }) {
    const [itemOffset, setItemOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const pageCount = useMemo(() => {
        return Math.ceil(data.length / itemsPerPage);
    }, [data.length, itemsPerPage]);

    const currentItems = useMemo(() => {
        const endOffset = itemOffset + itemsPerPage;
        return data.slice(itemOffset, endOffset);
    }, [itemOffset, itemsPerPage, data]);

    const handlePageClick = ({ selected }) => {
        const newOffset = (selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
        setCurrentPage(selected);
    };

    useEffect(() => {
        setItemOffset(0);
        setCurrentPage(0);
    }, [data, itemsPerPage]);

    const paginateClasses = {
        containerClassName: cx('pagination'),
        pageClassName: cx('page-item'),
        pageLinkClassName: cx('page-link'),
        breakClassName: cx('page-item'),
        breakLinkClassName: cx('page-link'),
        activeClassName: cx('active'),
        previousClassName: cx('btn-prev'),
        nextClassName: cx('btn-next'),
        previousLinkClassName: cx('page-link'),
        nextLinkClassName: cx('page-link'),
        disabledClassName: cx('disabled'),
    };
    useEffect(() => {
        resData(currentItems);
    }, [currentItems]);

    return (
        <Fragment>
            {pageCount > 0 && (
                <nav className={cx('text-center')}>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">>>"
                        previousLabel="<<<"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        forcePage={Math.min(currentPage, Math.max(pageCount - 1, 0))}
                        renderOnZeroPageCount={null}
                        {...paginateClasses}
                    />
                </nav>
            )}
        </Fragment>
    );
}

export default Pagination;
