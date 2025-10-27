import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { publicRoutes } from './routes';
import { DefaultLayout } from './layout';
import ScrollToTop from './components/ScrollToTop';
import { actions, useStore } from './store';
import { AuthorService } from './services';
import { keysToCamelCase, removeFromStorage, STORAGE_KEYS } from './utils';

function App() {
    const [, dispatch] = useStore();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { status, error_code, data } = await AuthorService.getAuth();

                if (status === 'success' && error_code === 0) {
                    dispatch(actions.setInfoUser(keysToCamelCase(data)));
                    return;
                }
                removeFromStorage(STORAGE_KEYS.TOKEN);
                removeFromStorage(STORAGE_KEYS.USER);
                dispatch(actions.setInfoUser({}));
            } catch (error) {
                removeFromStorage(STORAGE_KEYS.TOKEN);
                removeFromStorage(STORAGE_KEYS.USER);
                dispatch(actions.setInfoUser({}));
            }
        };
        fetchUser();
    }, []);

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
