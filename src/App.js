import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { publicRoutes } from './routes';
import { DefaultLayout } from './layout';
import ScrollToTop from './components/ScrollToTop';
import { useAuthInit } from './hooks';

function App() {
    useAuthInit();

    return (
        <Router>
            <ScrollToTop>
                <div className="App">
                    <Routes>
                        {publicRoutes.map(({ component: Page, path, title, layout: CustomLayout }) => {
                            const Layout = CustomLayout === null ? Fragment : CustomLayout || DefaultLayout;
                            return (
                                <Route
                                    key={path}
                                    path={path}
                                    element={
                                        <Layout title={title}>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
            </ScrollToTop>
        </Router>
    );
}

export default App;
