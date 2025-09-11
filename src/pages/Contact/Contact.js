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

const cx = classNames.bind(styles);

function Contact() {
    const [fields, setFields] = useState({
        full_name: '',
        phone_number: '',
        email: '',
        content: '',
    });
    const setFieldValue = ({ target: { name, value } }) => {
        setFields((prev) => ({
            ...prev,
            [`${SnakeCaseVariable(name)}`]: value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        ContactService.postContact(fields)
            .then((res) => {
                alert('Cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi sẽ phản hồi sớm nhất có thể.');
                setFields({
                    FullName: '',
                    PhoneNumber: '',
                    Email: '',
                    Content: '',
                });
            })
            .catch((err) => {
                console.log(err);
            });
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
                                    Evo Tour được các du khách trong nước và quốc tế biết đến là một Công ty tin cậy về
                                    chất lượng cũng như dịch vụ hoàn hảo. Chúng tôi chuyên tổ chức các tour du lịch quốc
                                    tế, nội địa, cũng như tổ chức cho các cơ quan đoàn thể đi tham quan, học tập, nghiên
                                    cứu, khảo sát thị trường, hội nghị, hội thảo trong nước và ngoài nước.
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
                                                name="FullName"
                                                className={cx('form-control form-control-lg')}
                                                type="text"
                                                placeholder="Họ và tên"
                                                required
                                                value={fields.FullName}
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
                                                name="Email"
                                                className={cx('form-control form-control-lg')}
                                                type="email"
                                                placeholder="Email của bạn"
                                                required
                                                value={fields.Email}
                                                onChange={setFieldValue}
                                            />
                                        </fieldset>
                                    </div>
                                    <div className={cx('col-sm-4 col-xs-12')}>
                                        <fieldset className={cx('form-group')}>
                                            <label>
                                                Số điện thoại<span className="required">*</span>
                                            </label>
                                            <input
                                                name="PhoneNumber"
                                                className={cx('form-control form-control-lg')}
                                                type="text"
                                                placeholder="Số điện thoại"
                                                required
                                                value={fields.PhoneNumber}
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
                                                name="Content"
                                                className={cx('form-control form-control-lg')}
                                                placeholder="Nội dung liên hệ"
                                                required
                                                rows="5"
                                                value={fields.Content}
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
