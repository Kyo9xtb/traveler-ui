import config from '~/config';
import SideBarRightLayout from '~/layout/SideBarRightLayout';
import About from '~/pages/About';
import Contact from '~/pages/Contact';
import Home from '~/pages/Home';
import News from '~/pages/News';
import TourDeatil from '~/pages/TourDeatil';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.about, component: About },
    { path: config.routes.contact, component: Contact },
    { path: config.routes.news, component: News, layout: SideBarRightLayout },
    { path: config.routes.tourDeatil, component: TourDeatil },
    { path: '#', component: '' },
    { path: '#', component: '' },
    { path: '#', component: '' },
    { path: '#', component: '' },
    { path: '#', component: '' },
    { path: '#', component: '' },
    { path: '#', component: '' },
    { path: '#', component: '' },
    { path: '#', component: '' },
    { path: '#', component: '' },
];

export { publicRoutes };
