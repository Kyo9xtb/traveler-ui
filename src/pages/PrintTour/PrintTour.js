import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './PrintTour.module.scss';
import * as tourServices from '~/services/tourService';
import ErrorPage from '../Error';

const cx = classNames.bind(styles);
function PrintTour() {
    const [tour, setTour] = useState();
    let { slug } = useParams();
    useEffect(() => {
        tourServices
            .getTour(slug)
            .then((res) => {
                setTour(res);
            })
            .catch((err) => {
                console.error('Error fetching tour:', err);
            });
    }, [slug]);
    useEffect(() => {
        if (tour) {
            window.print(); // Print the page when the component mounts
        }
    }, [tour]);

    if (!tour) {
        return <ErrorPage />;
    }
    return (
        <Fragment>
            <div className={cx('image-header')}>
                <img src={tour.thumbnail_url} alt={tour.tour_name} />
                <h1 className={cx('tour-title')}>{tour.tour_name}</h1>
                <div className={cx('tour-description')}>
                    <p>
                        Lịch khởi hành: <strong>{tour.departure_schedule}</strong>
                    </p>
                    <p>
                        Di chuyển: <strong>Di chuyển bằng máy bay</strong>
                    </p>
                    <p>
                        Di chuyển: <strong>Di chuyển bằng Ô tô</strong>
                    </p>
                    <p>
                        Thời gian: <strong>{tour.time}</strong>
                    </p>
                </div>
            </div>
            <div className={cx('tour-content')}>
                <p>
                    <strong>NGÀY 1: TP. HỒ CHÍ MINH - ĐÀ LẠT (Ăn trưa, chiều)</strong>
                    <br />
                    Buổi sáng, Quý khách tập trung tại Cổng D4 - Ga đi trong nước, sân bay VP Saigontourist. Khởi hành
                    đi Đà Lạt (
                    <strong>
                        <em>chuyến bay VJ362 lúc 09:55</em>
                    </strong>
                    ). Đáp xuống sân bay Liên Khương, di chuyển vào TP.Đà Lạt. Đến Đà Lạt quý khách nhận phòng. Buổi
                    chiều viếng
                    <strong>
                        <em>&nbsp;Thiền viện Trúc Lâm</em>
                    </strong>
                    &nbsp;- nơi ngắm được toàn cảnh&nbsp;
                    <strong>
                        <em>hồ Tuyền Lâm</em>
                    </strong>
                    ;&nbsp;
                    <strong>
                        <em>thác Datanla</em>
                    </strong>
                    &nbsp;(tự túc chi phí tham gia trò chơi máng trượt). Nghỉ đêm tại Đà Lạt.
                </p>
                <p>
                    <img
                        data-thumb="original"
                        original-height="800"
                        original-width="1200"
                        src="//bizweb.dktcdn.net/100/299/077/files/da-lat.jpg?v=1529556404491"
                        alt=""
                    />
                </p>
                <p>
                    <strong>NGÀY 2: THAM QUAN ĐÀ LẠT (Ăn sáng, trưa, chiều)</strong>
                    <br />
                    Buổi sáng, di chuyển đến với&nbsp;
                    <strong>
                        <em>khu du lịch Langbian&nbsp;</em>
                    </strong>
                    - tham quan
                    <em>
                        <strong>&nbsp;đồi Mimosa, thung lũng Trăm Năm</strong>
                    </em>
                    , chinh phục
                    <em>
                        <strong>&nbsp;núi Langbian</strong>
                    </em>
                    &nbsp;(tự túc phí xe Jeep). Tiếp tục tham quan&nbsp;
                    <strong>
                        <em>Phòng trưng bày hoa sấy nghệ thuật và Vườn hoa thành phố</em>
                    </strong>
                    . Buổi chiều, xe đưa đoàn đến tham quan&nbsp;
                    <em>
                        <strong>Khu Du Lịch Trang Trại Rau và Hoa</strong>
                    </em>
                    , trải rộng cả thung lũng với bốn bề là rau và hoa đẹp tuyệt vời. Tìm hiểu về mô hình sản xuất nông
                    nghiệp công nghệ cao cũng như các sản phẩm nông nghiệp hiện đại như: Lavender, Nữ Hoàng xanh, Ngọc
                    Thảo,Hồng Môn, Bí khổng lồ, Cà chua đen, Ớt chuông, Dâu Nhật &amp; New Zealand… tham quan&nbsp;
                    <em>
                        <strong>Đường hầm điêu khắc đất đỏ&nbsp;</strong>
                    </em>
                    (Đà Lạt Star) - tái hiện lịch sử Đà Lạt qua hơn 120 năm. Buổi tối tự do dạo phố. Nghỉ đêm tại Đà
                    Lạt.
                </p>
                <p>
                    <strong>NGÀY 3: ĐÀ LẠT - TP.HCM&nbsp;(Ăn sáng, trưa)</strong>
                    <br />
                    Buổi sáng, mua sắm đặc sản tại chợ Đà Lạt, tham quan&nbsp;
                    <em>
                        <strong>Quảng trường Lâm Viên&nbsp;</strong>
                    </em>
                    - đầy ấn tượng với không gian rộng lớn, thoáng mát hướng ra hồ Xuân Hương cùng công trình nghệ thuật
                    khối bông hoa dã quỳ và khối nụ hoa Atiso khổng lồ được thiết kế bằng kính màu rất đẹp mắt; tham
                    quan&nbsp;
                    <strong>
                        <em>nhà ga xe lửa Đà Lạt&nbsp;</em>
                    </strong>
                    - nhà ga cổ kính nhất Việt Nam và Đông Dương. Trả phòng rồi di chuyển ra sân bay Liên Khương. Về TP.
                    HCM (
                    <em>
                        <strong>chuyến bay VJ363 lúc 16:35</strong>
                    </em>
                    ). Kết thúc chương trình. (Quý khách tự túc phương tiện từ sân bay về lại nhà).
                </p>
                <h6>Chính sách</h6>
                <p>
                    <strong>* Vé trẻ em</strong>
                    <br />
                    - Trẻ em dưới 2 tuổi: thu 300.000đ/ trẻ. Gia đình tự lo cho bé ăn ngủ
                    <br />
                    - Trẻ em từ 2 đến dưới 6 tuổi: mua 100% VMB người lớn. Gia đình tự lo cho bé ăn ngủ và tự trả phí
                    tham quan (nếu có).
                    <br />
                    - Hai người lớn chỉ được kèm một trẻ em dưới 6 tuổi. Từ trẻ thứ 2 trở lên, mỗi em phải chịu mức giá
                    tương đương trẻ em từ 6 đến 11 tuổi
                    <br />
                    - Trẻ em từ 6 đến 11 tuổi: tiêu chuẩn gồm VMB, ăn uống và tham quan theo chương trình, ngủ chung
                    giường với phụ huynh
                    <br />- Trẻ em trên 11 tuổi: áp dụng giá và các tiêu chuẩn dịch vụ như người lớn
                </p>
                <p>
                    <strong>* Giá tour bao gồm:&nbsp;&nbsp;</strong>
                    <br />
                    - Chi phí xe máy lạnh phục vụ theo chương trình.
                    <br />
                    - Vé máy bay khứ hồi
                    <br />
                    - Chi phí khách sạn theo tiêu chuẩn (2 khách/phòng)
                    <br />
                    - Chi phí ăn -&nbsp;uống theo chương trình.
                    <br />
                    - Chi phí tham quan và tàu thuyền.
                    <br />
                    - Chi phí Hướng dẫn viên tiếng Việt.
                    <br />- Quà tặng: Nón, nước suối, khăn lạnh, viết.
                </p>
                <p>
                    <strong>* Giá tour không bao gồm:&nbsp;&nbsp;</strong>
                    <br />- Chi phí tham quan - ăn uống ngoài chương trình, giặt ủi, điện thoại và các chi phí cá nhân
                    khác
                </p>
            </div>
        </Fragment>
    );
}

export default PrintTour;
