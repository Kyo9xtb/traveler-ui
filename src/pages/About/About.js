import classNames from "classnames/bind";

import styles from "./About.module.scss";
import { Fragment } from "react";
import BannerPage from "~/components/BannerPage";
import images from "~/assets/images";

const cx = classNames.bind(styles);
function About() {
    return (
        <Fragment>
            <BannerPage image={images.bannerAbout} title='Giới thiệu' />
            <p>Với hoạt động kinh doanh ban đầu là tổ chức các chương trình du lịch cho du khách nước ngoài vào tham quan&nbsp;<strong>Việt Nam. </strong><strong>Công Ty TNHH Du Lịch &amp; Sự Kiện Sao Việt </strong>bắt đầu cung cấp dịch vụ từ năm 2011 đến nay trải qua những năm xây dựng và phát triển, chúng tôi không ngừng cải tiến và nâng cấp dịch vụ ngày một hoàn thiện hơn và trở thành một trong những công ty được khách hàng và đối tác lựa chọn và tin cậy trong ngành du lịch nước nhà. Lĩnh vực kinh doanh ngày càng được mở rộng: kinh doanh du lịch trong và ngoài nước, cung cấp vé máy bay, dịch vụ khách sạn trong và ngoài nước đặc biệt. Cung cấp dịch vụ Land tour , Combo tour du lịch – săn tour giá rẻ thương hiệu mới của du lịch SAO VIỆT ,và tổ chức tour du lịch cho du khách quốc tế và trong nước, Chuyên cho thuê xe du lịch , vận chuyển hành khách ,cho thuê xe limousine cao cấp đi du lịch các loại <b>.</b> Công ty cũng đã xây dựng được một hệ thống liên kết&nbsp; giữa đối tác trong và ngoài nước một cách hiệu quả.</p>
        </Fragment>
    );
}

export default About;