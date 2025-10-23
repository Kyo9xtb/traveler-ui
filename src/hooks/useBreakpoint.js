import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

/**
 * Hook theo dõi kích thước màn hình và xác định breakpoint (giống Bootstrap)
 * Có debounce để tránh render liên tục khi resize.
 */
export const useBreakpoint = (delay = 150) => {
    const getCurrentBreakpoint = () => {
        const width = window.innerWidth;
        return {
            width,
            xs: width < 576,
            sm: width >= 576 && width < 768,
            md: width >= 768 && width < 992,
            lg: width >= 992 && width < 1200,
            xl: width >= 1200,
        };
    };

    const [breakpoint, setBreakpoint] = useState(getCurrentBreakpoint);

    useEffect(() => {
        // Sử dụng lodash.debounce để giảm số lần setState khi resize
        const handleResize = debounce(() => {
            setBreakpoint(getCurrentBreakpoint());
        }, delay);

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            handleResize.cancel();
        };
    }, [delay]);

    return breakpoint;
};
