import config from '~/config';
import About from '~/pages/About';
import Contact from '~/pages/Contact';
import Home from '~/pages/Home';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.about, component: About },
    { path: config.routes.contact, component: Contact },
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
    { path: '#', component: '' },
];

export { publicRoutes };
