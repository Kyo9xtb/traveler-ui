import config from '~/config';
import About from '~/pages/About';
import Home from '~/pages/Home';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.about, component: About },
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
    { path: '#', component: '' },
];

export { publicRoutes };
