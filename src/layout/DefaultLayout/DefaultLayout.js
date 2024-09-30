import { Fragment } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function DefaultLayout({ children }) {
    return (
        <Fragment>
            <Header />
            {children}
            <Footer />
        </Fragment>
    );
}

export default DefaultLayout;
