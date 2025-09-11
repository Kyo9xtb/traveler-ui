import { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { publicRoutes } from './routes';
// import DefaultLayout from './layout';
import { DefaultLayout } from './layout';
import ScrollToTop from './components/ScrollToTop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';

function App() {
    const [showGoToTop, setShowGoToTop] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setShowGoToTop(window.scrollY >= 200);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <Router>
            <ScrollToTop>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = DefaultLayout;
                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout title={route.title}>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                    {showGoToTop ? (
                        <button
                            className={'btn-go-to-top'}
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            title="Lên đầu trang"
                        >
                            <FontAwesomeIcon icon={faCircleArrowUp} />
                        </button>
                    ) : (
                        <Fragment />
                    )}
                </div>
            </ScrollToTop>
        </Router>
    );
}

export default App;
