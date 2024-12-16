const routes = {
    //Tour
    tour: '/tour-du-lich',
    tourDetail: `/tour-du-lich/:slug`,
    promotionalTours: '/tour-khuyen-mai',
    domesticTour: '/tour-trong-nuoc',
    internationalTour: '/tour-quoc-te',
    printTour: '/in-tour/:slug',

    //News
    news: '/tin-tuc',
    newsDetail: '/tin-tuc/:slug',

    //Account
    login: '/tai-khoan/dang-nhap',
    register: '/tai-khoan/dang-ky',

    //Destination
    destination: '/dia-diem-du-lich',
    destinationDetail: '/dia-diem-du-lich/:slug',

    // Other
    home: '/',
    about: '/gioi-thieu',
    contact: '/lien-he',
    travelExperience: '/kinh-nghiem-du-lich',
    faq: '/faq',
    search: '/tim-kiem',
    cart: '/gio-hang',

    checkout: '/checkout',
    errorPage: '/*',
};

export default routes;
