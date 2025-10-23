import { faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop({ children }) {
    const { pathname } = useLocation();
    const [visible, setVisible] = useState(false);

    useLayoutEffect(() => {
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [pathname]);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 200);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });

    const handleGoToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {children}
            {visible && (
                <button className={'btn-go-to-top'} onClick={handleGoToTop} title="Lên đầu trang">
                    <FontAwesomeIcon icon={faCircleArrowUp} />
                </button>
            )}
        </>
    );
}

export default ScrollToTop;
