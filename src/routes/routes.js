import config from '~/config';
import PrintLayout from '~/layout/PrintLayout/PrintLayout';
import SideBarRightLayout from '~/layout/SideBarRightLayout';
import About from '~/pages/About';
import { Login, Register } from '~/pages/Account';
import Contact from '~/pages/Contact';
import Destination from '~/pages/Destination';
import ErrorPage from '~/pages/Error';
import FAQ from '~/pages/FAQ/Faq';
import Home from '~/pages/Home';
import News from '~/pages/News';
import PrintTour from '~/pages/PrintTour';
import Tour from '~/pages/Tour';
import TourDeatil from '~/pages/TourDeatil';
import TravelExperience from '~/pages/TravelExperience';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.about, component: About },
    { path: config.routes.contact, component: Contact },
    { path: config.routes.news, component: News, layout: SideBarRightLayout },
    { path: config.routes.tourDeatil, component: TourDeatil },
    { path: config.routes.login, component: Login },
    { path: config.routes.register, component: Register },
    { path: config.routes.tour, component: Tour },
    { path: config.routes.promotionalTours, component: Tour },
    { path: config.routes.destination, component: Destination },
    { path: config.routes.errorPage, component: ErrorPage },
    { path: config.routes.printTour, component: PrintTour, layout: PrintLayout },
    { path: config.routes.travelExperience, component: TravelExperience, layout: SideBarRightLayout },
    { path: config.routes.faq, component: FAQ },
];

export { publicRoutes };
