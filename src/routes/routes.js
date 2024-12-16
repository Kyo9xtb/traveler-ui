import config from '~/config';
import { BlankLayout, PrintLayout, SideBarRightLayout } from '~/layout';

import About from '~/pages/About';
import { Login, Register } from '~/pages/Account';
import Cart from '~/pages/Cart';
import CheckOut from '~/pages/CheckOut';
import Contact from '~/pages/Contact';
import Destination from '~/pages/Destination';
import ErrorPage from '~/pages/Error';
import FAQ from '~/pages/FAQ/Faq';
import Home from '~/pages/Home';
import News from '~/pages/News';
import NewsDetail from '~/pages/NewsDetail';
import PrintTour from '~/pages/PrintTour';
import Search from '~/pages/Search';
import Tour from '~/pages/Tour';
import TourDetail from '~/pages/TourDetail';
import TravelExperience from '~/pages/TravelExperience';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.about, component: About },
    { path: config.routes.contact, component: Contact },
    //Account routes
    { path: config.routes.login, component: Login },
    { path: config.routes.register, component: Register },
    //Tour routes
    { path: config.routes.tour, component: Tour },
    { path: config.routes.promotionalTours, component: Tour },
    { path: config.routes.domesticTour, component: Tour },
    { path: config.routes.internationalTour, component: Tour },
    // { path: config.routes.promotionalTours, component: Tour },
    { path: config.routes.tourDetail, component: TourDetail },

    //Other routes
    { path: config.routes.destination, component: Destination },
    { path: config.routes.errorPage, component: ErrorPage },
    { path: config.routes.faq, component: FAQ },
    { path: config.routes.search, component: Search },
    { path: config.routes.printTour, component: PrintTour, layout: PrintLayout },
    { path: config.routes.cart, component: Cart },
    { path: config.routes.checkout, component: CheckOut, layout: BlankLayout },

    //News routes
    { path: config.routes.news, component: News, layout: SideBarRightLayout, title: 'Tin tức' },
    { path: config.routes.newsDetail, component: NewsDetail, layout: SideBarRightLayout, title: 'Tin tức' },
    {
        path: config.routes.travelExperience,
        component: TravelExperience,
        layout: SideBarRightLayout,
        title: 'Kinh nghiệm du lịch',
    },
];

export { publicRoutes };
