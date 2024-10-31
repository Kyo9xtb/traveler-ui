import classNames from 'classnames/bind';

import styles from './About.module.scss';
import { Fragment } from 'react';
import BannerPage from '~/components/BannerPage';
import images from '~/assets/images';

const cx = classNames.bind(styles);
function About() {
    return (
        <Fragment>
            <BannerPage image={images.aboutBanner} title="Giới thiệu" />
            <div className={cx('main-content')}>
                <div className={cx('container')}>
                    <div className={cx('logo')}>
                        <img src={images.logoFooter} alt="logo" />
                    </div>
                    <div>
                        <p>
                            Với hoạt động kinh doanh ban đầu là tổ chức các chương trình du lịch cho du khách nước ngoài
                            vào tham quan&nbsp;<strong>Việt Nam. </strong>
                            <strong>Công Ty TNHH Du Lịch &amp; Sự Kiện Sao Việt </strong>bắt đầu cung cấp dịch vụ từ năm
                            2011 đến nay trải qua những năm xây dựng và phát triển, chúng tôi không ngừng cải tiến và
                            nâng cấp dịch vụ ngày một hoàn thiện hơn và trở thành một trong những công ty được khách
                            hàng và đối tác lựa chọn và tin cậy trong ngành du lịch nước nhà. Lĩnh vực kinh doanh ngày
                            càng được mở rộng: kinh doanh du lịch trong và ngoài nước, cung cấp vé máy bay, dịch vụ
                            khách sạn trong và ngoài nước đặc biệt. Cung cấp dịch vụ Land tour , Combo tour du lịch –
                            săn tour giá rẻ thương hiệu mới của du lịch SAO VIỆT ,và tổ chức tour du lịch cho du khách
                            quốc tế và trong nước, Chuyên cho thuê xe du lịch , vận chuyển hành khách , cho thuê xe
                            limousine cao cấp đi du lịch các loại <b>.</b> Công ty cũng đã xây dựng được một hệ thống
                            liên kết&nbsp; giữa đối tác trong và ngoài nước một cách hiệu quả.
                        </p>
                    </div>
                    <div className={cx('about-wrap')}>
                        <h2>GIỚI THIỆU CÔNG TY TNHH DU LỊCH VÀ SỰ KIỆN SAO VIỆT</h2>
                        <ul>
                            <li>
                                <strong>Tên công ty:</strong> Công Ty TNHH Du Lịch &amp; Sự Kiện Sao Việt
                            </li>
                            <li>
                                <strong>Tên giao dịch:</strong> Du Lịch Sao Việt
                            </li>
                            <li>
                                <strong>Trụ sở chính:</strong> Số 143, đường Trần Thái Tông, Phường Trần Hưng Đạo, Thành
                                Phố Thái Bình, Tỉnh Thái Bình, Việt Nam
                            </li>
                            <li>
                                <strong>Loại Doanh Nghiệp:</strong> Lữ Hành Quốc Tế
                            </li>
                            <li>
                                <strong>GPKD:</strong> 34-011/2022/TCDL-GT LHQT
                            </li>
                            <li>
                                <strong>E-mail:</strong> dieuhanh@dulichsaoviet.com.vn
                            </li>
                        </ul>
                    </div>
                    <div className={cx('service-wrap')}>
                        <h2>DỊCH VỤ CUNG CẤP</h2>
                        <p>
                            Với mục tiêu tiết kiệm tối đa chi phí và thời gian cho khách hàng để lên kế hoạch và đặt
                            dịch vụ cho một chuyến đi,&nbsp;<strong>Du lịch Sao Việt </strong>cung cấp đa dạng các dịch
                            vụ du lịch, được kết hợp thông minh và tối ưu:
                        </p>
                        <ul>
                            <li className="icon-service-bpt">
                                <strong>Combo du lịch nghỉ dưỡng tại resort kết di chuyển bằng xe Limousine</strong> :
                                Là một trong những Công ty du lịch tại Việt Nam cung cấp dịch vụ combo du lịch nghỉ
                                dưỡng tại Resort kết hợp di chuyển bằng xe Limousine đến các điễm du lịch như Thái Bình
                                – Hà Nội – Ninh Bình – Vịnh Hạ Long bằng dòng xe Limousine
                            </li>
                            <li className="icon-service-bpt">
                                <b>
                                    <strong>Combo du lịch nghỉ dưỡng tại resort kết di chuyển bằng máy bay</strong>
                                    &nbsp;:&nbsp;
                                </b>
                                Cung cấp đa dạng các tour du dịch ghép khách lẻ theo nhóm hoặc thiết kế theo yêu cầu cho
                                khách đoàn trên các tuyến điểm tại Việt Nam.
                            </li>
                            <li className="icon-service-bpt">
                                <b>
                                    <strong>Combo du lịch nghỉ dưỡng trên du thuyền kết hợp xe Limousine</strong>:&nbsp;
                                </b>
                                Hài lòng khách hàng với dịch vụ đặt phòng trực tuyến tại tất cả các điểm đến ở Việt Nam,
                                Lào, Campuchia,Thái Lan và Myanmar với lựa chọn đa dạng và chất lượng đảm bảo.
                            </li>
                            <li className="icon-service-bpt">
                                <strong>Du lịch du thuyền :&nbsp;</strong>Cung cấp các dịch vụ đặt tour du thuyền giá
                                tốt nhất từ ngắn ngày đi tham quan tại Việt Nam, Lào, Campuchia, Thái Lan và Myanmar.
                            </li>
                            <li className="icon-service-bpt">
                                <strong>Visa, vé tàu, xe du lịch :</strong>Đáp ứng các dịch vụ Visa, vé tàu và thuê xe
                                du lịch nhanh chóng và tin cậy.&nbsp;<strong>dulichsaoviet.com.vn </strong>cam kết hỗ
                                trợ khách hàng trong mọi thời điểm.
                            </li>
                            <li className="icon-service-bpt">
                                <b>Đặt vé máy bay :</b>Tiện ích với dịch vụ đặt chỗ &amp; thanh toán trực tuyến cho vé
                                máy bay của các hãng hàng không nội địa (Vietnam Airlines, Jetstar Pacific, Vietjet Air)
                                và quốc tế (Thai Airways, Air Asia, Singapore Airline, Qatar Airways, Emirates..), những
                                chuyến đi sẽ trở nên thật dễ dàng, nhanh chóng, cùng dịch vụ chăm sóc chuyên nghiệp.
                            </li>
                            <li>
                                <strong>Tổ chức tour du lịch trọn gói trong nước và quốc tế.</strong>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('')}>
                        <h2>GIÁ TRỊ TẠO LÊN SỰ THÀNH CÔNG CỦA TỪNG CHUYẾN ĐI</h2>
                        <p>
                            Chúng tôi hiểu rằng mỗi kỳ nghỉ là phần thưởng cho những ngày làm việc vất vả và căng thẳng
                            của Khách hàng. Do vậy chúng tôi thiết lập chương trình du lịch luôn luôn là sự kết hợp giữa
                            những yếu tố nghỉ ngơi, vui chơi, thư giãn và tìm hiểu lịch sử văn hóa của từng điểm đến
                            được nêu rõ trong các chương trình du lịch. Để phù hợp với sự lựa chọn khách hàng, danh sách
                            và thứ hạng của tour mà chúng tôi đưa ra để khách hàng tham khảo đều được phân theo từng
                            loại hình cụ thể từ ngắn đến dài, từ khó đến dễ và từ trung bình tới sang trọng. Tất cả tạo
                            ra sự phong phú của sản phẩm cũng như sự thoải mái và yên tâm của du khách khi chọn chúng
                            tôi là đối tác cung cấp dịch vụ dù là nhóm nhỏ, đoàn lớn, cá nhân hay tổ chức.
                        </p>
                    </div>
                    <div className={cx('')}>
                        <h2>CHẤT LƯỢNG DỊCH VỤ</h2>
                        <p>
                            <strong>Du Lịch Sao Việt</strong>&nbsp;khẳng định cung cấp dịch vụ tốt nhất có thể trên mọi
                            phương diện của sản phẩm mà bạn lựa chọn. Với sự khắt khe về chất lượng dịch vụ mà công ty
                            đưa ra là áp dụng chất lượng dịch vụ tiêu chuẩn quốc tế cho người Việt. Chúng tôi cam kết sẽ
                            thực hiện đúng, đủ và tốt hơn những gì được nêu trong bản hợp đồng giữa khách hàng và công
                            ty. Xuyên suốt chặng đường kinh doanh, công ty chúng tôi luôn là đối tác tin cậy và quan
                            trọng của hệ thống ngân hàng lớn ở Việt Nam, do vậy thông tin cá nhân cũng như thông tin tài
                            chính của bạn sẽ được bảo mật cao, thủ tục thanh toán và thanh lý hợp đồng rất thuận tiện và
                            nhanh gọn. Không chỉ vậy chúng tôi đối xử và chia sẻ cùng với du khách như những người bạn
                            đồng hành để tránh tất cả những rủi ro do tác động ngoại cảnh làm ảnh hưởng cho cho chuyến
                            đi. Tất cả những gì nêu trên sẽ tạo ra những kỳ nghỉ thú vị và bổ ích với sự trải nghiệm khó
                            quên thật xứng đáng với giá trị tài chính mà bạn đưa ra cho chuyến đi.
                        </p>
                    </div>
                    <div className={cx('')}>
                        <h2>THIẾT KẾ CHƯƠNG TRÌNH DU LỊCH THEO YÊU CẦU</h2>
                        <p>
                            Cảm hứng nghề nghiệp của chúng tôi là được tạo ra từ nụ cười mãn nguyện qua những chuyến đi
                            đầy cảm xúc, đó là động lực khiến tất cả các thành viên công ty làm việc tận tâm và nhiệt
                            huyết. Không chỉ tổ chức các chương trình du lịch trọn gói, những địa điểm đã được ấn định
                            mà chúng tôi còn thiết kế chuyến đi riêng theo yêu cầu khách hàng, tạo ra chương trình độc
                            đáo và riêng biệt không theo một khuôn mẫu cụ thể và phù hợp cho mọi đối tượng. Chúng tôi
                            luôn lắng nghe và hành động vì khách hàng. Hãy gửi thư điện tử hoặc gọi điện cho chúng tôi
                            để đạt được những gì bạn mong đợi về một kì nghỉ mơ ước.
                        </p>
                    </div>
                    <div className={cx('')}>
                        <h2>ĐỘI NGŨ NHÂN VIÊN CHUYÊN NGHIỆP</h2>
                        <p>
                            <strong>Công Ty Du Lịch Sao&nbsp; Việt </strong>tự hào tạo ra một văn hóa doanh nghiệp tốt
                            là môi trường làm việc thân thiện, các thành viên làm việc gắn kết, giúp đỡ và hỗ trợ nhau
                            khi cần. Đó là lý do du lịch <strong>Sao Việt&nbsp;</strong>là môi trường làm việc chuyên
                            nghiệp từ nhân viên văn phòng đến hướng dẫn viên du lịch, luôn đưa ra lời tư vấn và thông
                            tin du lịch chính xác cho khách hàng.
                        </p>
                    </div>
                    <div className={cx('')}>
                        <h2>ĐỐI TÁC CỦA CÔNG TY DU LỊCH SAO VIỆT</h2>
                        <ul>
                            <li>Hơn 2.000 đối tác khách sạn, Resort, Home Stay trong nước và quốc tế</li>
                            <li>
                                Hợp tác với nhiều hãng hàng không khác nhay trong nước và quốc tế:&nbsp;Vietnam Airline,
                                Vietjet Air, Jetstar , Bamboo Airways, Singapore Airline, Thai Airways,&nbsp;Emirates,
                                China Southern Airlines,&nbsp; Korean Air, Lào Airlines. Eva Air,&nbsp; Lion Air,
                                Aeroflote,&nbsp; Lufthansa, Philippine Airlines, qantas….. Và còn rất nhiều hãng hàng
                                không khác theo yêu cầu.
                            </li>
                            <li>Đối tác chiến lược của hơn 100 thương hiệu du lịch hàng đầu tại Việt Nam và quốc tế</li>
                            <li>Hơn 4.000 xe du lịch các loại từ 4 chỗ đến 45 chỗ</li>
                            <li>Các hãng xe Limousine thương hiệu cao cấp</li>
                        </ul>
                    </div>
                    <div className={cx('')}>
                        <h2>THÔNG TIN LIÊN HỆ</h2>
                        <ul>
                            <li>
                                <strong>Công Ty TNHH Du Lịch &amp; Sự Kiện Sao Việt</strong>
                            </li>
                            <li>
                                <strong>Trụ sở chính:</strong> Số 143, đường Trần Thái Tông, Phường Trần Hưng Đạo, Thành
                                Phố Thái Bình, Tỉnh Thái Bình, Việt Nam
                            </li>
                            <li>
                                <strong>Điện thoại</strong>: 0902.146.186
                            </li>
                            <li>
                                <strong>E-mail:</strong> dieuhanh@dulichsaoviet.com.vn
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default About;
