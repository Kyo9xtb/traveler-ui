//Library import
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
//File import
import './Slider.scss';
// import ItemProduct from '../ItemProduct';

const SlickArrowLeft = ({ currentSlide, ...props }) => (
    <button
        {...props}
        className={`slick-prev slick-arrow ${currentSlide === 0 ? 'slick-disabled' : ''}`}
        aria-disabled={currentSlide === 0}
        type="button"
    >
        <FontAwesomeIcon icon={faAngleLeft} />
    </button>
);
const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <button
        {...props}
        className={`slick-next slick-arrow ${currentSlide === slideCount - 1 ? ' slick-disabled' : ''}`}
        aria-disabled={currentSlide === slideCount - 1}
        type="button"
    >
        <FontAwesomeIcon icon={faAngleRight} />
    </button>
);
export function SimpleSliderBanner({ setting = {}, children }) {
    
    const defaultSettings = {
        dots: true,
        autoplay: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 10000,
        arrows: true,
        pauseOnHover: true,
        adaptiveHeight: true,
        prevArrow: <SlickArrowLeft />,
        nextArrow: <SlickArrowRight />,
        className: 'wrapper-slide wrapper-slide-banner',
    };

    const settingsBanner = { ...defaultSettings, ...setting };

    return <Slider {...settingsBanner}>{children}</Slider>;
}

export function MultipleItems({ setting = {}, children }) {
    const totalItems = React.Children.count(children);

    const slidesToShow = Math.min(4, totalItems);
    const slidesToScroll = Math.min(4, totalItems);
    const isInfinite = totalItems > slidesToShow;

    const defaultSettings = {
        dots: false,
        infinite: isInfinite,
        speed: 500,
        slidesToShow,
        slidesToScroll,
        prevArrow: <SlickArrowLeft />,
        nextArrow: <SlickArrowRight />,
        className: 'wrapper-slide wrapper-slide-item',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: Math.min(3, totalItems),
                    slidesToScroll: Math.min(3, totalItems),
                    infinite: totalItems > 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: Math.min(2, totalItems),
                    slidesToScroll: Math.min(2, totalItems),
                    infinite: totalItems > 2,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: Math.min(1.5, totalItems),
                    slidesToScroll: 1,
                    infinite: totalItems > 1,
                },
            },
        ],
    };

    const settings = { ...defaultSettings, ...setting };

    // 🚫 Không dùng infinite khi không đủ phần tử để cuộn
    if (totalItems <= slidesToShow) {
        settings.infinite = false;
        settings.arrows = totalItems > 1; // Chỉ hiển thị arrow nếu có nhiều hơn 1 phần tử
    }

    return (
        <Slider {...settings}>
            {children}
        </Slider>
    );
}
