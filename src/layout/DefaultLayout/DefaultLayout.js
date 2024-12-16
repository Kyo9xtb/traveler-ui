import { Fragment } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OffcanvasMenu from '../components/OffcanvasMenu';
import Search from '../components/Search';

function DefaultLayout({ children }) {
    return (
        <Fragment>
            <Header />
            {children}
            <Footer />
            <OffcanvasMenu />
            <Search/>
        </Fragment>
    );
}

export default DefaultLayout;
