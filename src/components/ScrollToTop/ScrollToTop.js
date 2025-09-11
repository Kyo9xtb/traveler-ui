import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop({ children }) {
    const { pathname } = useLocation();

    // Cuộn về đầu trang khi thay đổi route
    useLayoutEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [pathname]);

    // Cuộn về đầu trang khi tải lại trang
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    return children;
}

export default ScrollToTop;
