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

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <button
        {...props}
        className={'slick-prev slick-arrow' + (currentSlide === 0 ? ' slick-disabled' : '')}
        aria-disabled={currentSlide === 0 ? true : false}
        type="button"
    >
        <FontAwesomeIcon icon={faAngleLeft} />
    </button>
);
const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <button
        {...props}
        className={'slick-next slick-arrow' + (currentSlide === slideCount - 1 ? ' slick-disabled' : '')}
        aria-disabled={currentSlide === slideCount - 1 ? true : false}
        type="button"
    >
        <FontAwesomeIcon icon={faAngleRight} />
    </button>
);
function SimpleSliderBanner({ setting, children }) {
    const settingsBanner = {
        dots: true,
        autoplay: true,
        // arrows: false,
        autoplaySpeed: 10000,
        className: 'wapper-slide wapper-slide-banner',
        prevArrow: <SlickArrowLeft />,
        nextArrow: <SlickArrowRight />,
        ...setting,
    };
    return <Slider {...settingsBanner}>{children}</Slider>;
}
function MultipleItems({ setting, children }) {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        className: 'wapper-slide wapper-slide-item',
        slidesToShow: 4,
        slidesToScroll: 4,
        prevArrow: <SlickArrowLeft />,
        nextArrow: <SlickArrowRight />,
        ...setting,
    };
    return <Slider {...settings}>{children}</Slider>;
}
export default SimpleSliderBanner;
export { MultipleItems };
