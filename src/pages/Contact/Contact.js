import classNames from 'classnames/bind';
import { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

// import 'ckeditor5/ckeditor5.css';
// import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

import styles from './Contact.module.scss';
import BannerPage from '~/components/BannerPage';
import images from '~/assets/images';
import { ContactService } from '~/services';
import { SnakeCaseVariable } from '~/store';
import { companyInfo } from '~/data';
import { keysToSnakeCase, toCamelCase } from '~/utils';

const cx = classNames.bind(styles);

function Contact() {
    const initContact = {
        fullName: '',
        phone: '',
        email: '',
        title: '',
        contactContent: '',
    };

    const [fields, setFields] = useState(initContact);
    const setFieldValue = ({ target: { name, value } }) => {
        console.log(toCamelCase(name));

        setFields((prev) => ({
            ...prev,
            [toCamelCase(name)]: value,
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('fields', keysToSnakeCase(fields));
        (async () => {
            const { status, error_code, message } = await ContactService.postContact(keysToSnakeCase(fields));
            const isSuccess = status === 'success' && error_code === 0;
            if (isSuccess) {
                alert('Cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi sẽ phản hồi sớm nhất có thể.');
                setFields(initContact);
                return;
            }
            alert(message);
        })();
    };
    return (
        <Fragment>
            <BannerPage image={images.contactBanner} title="Liên hệ" />
            <div className={cx('inner-contact-wrap', 'mt-5')}>
                <div className={cx('container')}>
                    <div className={cx('row', 'contact-padding')}>
                        <div className={cx('col-12')}>
                            <div className={cx('leave-your-message')}>
                                <h3>Hỗ trợ dịch vụ Tour</h3>
                                <div className={cx('row')}>
                                    <div className={cx('col-lg-4 col-md-4 col-12')}>
                                        <div className={cx('contact-box')}>
                                            <div className={cx('icon')}>
                                                <FontAwesomeIcon icon={faLocationDot} />
                                            </div>
                                            <div className={cx('content')}>
                                                <p>{companyInfo.contact.address}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('col-lg-4 col-md-4 col-12')}>
                                        <div className={cx('contact-box')}>
                                            <div className={cx('icon')}>
                                                <FontAwesomeIcon icon={faPhoneVolume} />
                                            </div>
                                            <div className={cx('content')}>
                                                <Link to="">{companyInfo.contact.phone}</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('col-lg-4 col-md-4 col-12')}>
                                        <div className={cx('contact-box')}>
                                            <div className={cx('icon')}>
                                                <FontAwesomeIcon icon={faEnvelope} />
                                            </div>
                                            <div className={cx('content')}>
                                                <Link to="#">{companyInfo.contact.email}</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-lg-4 col-md-12')}>
                            <div className={cx('leave-your-message')}>
                                <p>
                                    SaoViet Travel được các du khách trong nước và quốc tế biết đến là một Công ty tin
                                    cậy về chất lượng cũng như dịch vụ hoàn hảo. Chúng tôi chuyên tổ chức các tour du
                                    lịch quốc tế, nội địa, cũng như tổ chức cho các cơ quan đoàn thể đi tham quan, học
                                    tập, nghiên cứu, khảo sát thị trường, hội nghị, hội thảo trong nước và ngoài nước.
                                </p>
                            </div>
                        </div>
                        <div className={cx('col-lg-8 col-md-12')}>
                            <form className={cx('form-contact')} onSubmit={handleSubmit}>
                                <div className={cx('row')}>
                                    <div className={cx('col-sm-4 col-xs-12')}>
                                        <fieldset className={cx('form-group')}>
                                            <label>
                                                Họ và tên<span className="required">*</span>
                                            </label>
                                            <input
                                                name="full-name"
                                                className={cx('form-control form-control-lg')}
                                                type="text"
                                                placeholder="Họ và tên"
                                                required
                                                value={fields.fullName}
                                                onChange={setFieldValue}
                                            />
                                        </fieldset>
                                    </div>
                                    <div className={cx('col-sm-4 col-xs-12')}>
                                        <fieldset className={cx('form-group')}>
                                            <label>
                                                Email<span className="required">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="Nhập email"
                                                autoComplete="off"
                                                pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                                                name="email"
                                                value={fields.email}
                                                required
                                                onChange={setFieldValue}
                                                title="Vui lòng nhập địa chỉ email hợp lệ. Ví dụ: tenban@example.com"
                                            />
                                        </fieldset>
                                    </div>
                                    <div className={cx('col-sm-4 col-xs-12')}>
                                        <fieldset className={cx('form-group')}>
                                            <label>
                                                Số điện thoại<span className="required">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                placeholder="Nhập số điện thoại"
                                                autoComplete="off"
                                                pattern="(84|0(3|5|7|8|9))[0-9]{8}"
                                                name="phone"
                                                value={fields.phone}
                                                required
                                                onChange={setFieldValue}
                                                title="Vui lòng nhập số điện thoại hợp lệ (VD: 0987654321 hoặc 84987654321)"
                                            />
                                        </fieldset>
                                    </div>
                                    <div className={cx('col-sm-12 col-xs-12')}>
                                        <fieldset className={cx('form-group')}>
                                            <label>
                                                Tiêu đề:<span className="required">*</span>
                                            </label>
                                            <input
                                                name="Title"
                                                className={cx('form-control form-control-lg')}
                                                type="text"
                                                placeholder="Tiêu đề"
                                                required
                                                value={fields.title}
                                                onChange={setFieldValue}
                                            />
                                        </fieldset>
                                    </div>
                                    <div className={cx('col-sm-12 col-xs-12')}>
                                        <fieldset className={cx('form-group')}>
                                            <label>
                                                Nội dung:<span className="required">*</span>
                                            </label>
                                            <textarea
                                                name="contact-content"
                                                className={cx('form-control form-control-lg')}
                                                placeholder="Nội dung liên hệ"
                                                required
                                                rows="5"
                                                value={fields.contactContent}
                                                onChange={setFieldValue}
                                            />
                                        </fieldset>
                                        <div className={cx('btn-submit')}>
                                            <button type="submit" className={cx('round-btn')}>
                                                Gửi tin nhắn
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* Map */}
                    <div className={cx('row')}>
                        <div className={cx('col-12', 'sv-map')}>
                            <iframe
                                title="map"
                                src={companyInfo.contact.googleMap}
                                width="600"
                                height="450"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Contact;
