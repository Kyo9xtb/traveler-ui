import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Account.module.scss';
import BannerPage from '~/components/BannerPage';
import config from '~/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGooglePlusG } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);
function Register() {
    return (
        <>
            <BannerPage title="Đăng ký" />
            <div className={cx('container', 'margin-bottom-20')}>
                <div className={cx('row justify-content-md-center')}>
                    <div className={cx('col-lg-8 col-md-12')}>
                        <div className={cx('page-login', 'account-box-shadow')}>
                            <div className={cx('row')}>
                                <div
                                    className={cx(
                                        'col-lg-6 col-md-6 order-lg-first order-md-first order-sm-last order-last',
                                        'account-banner',
                                    )}
                                >
                                    <div className={cx('account_policy_title')}>Quyền lợi thành viên</div>
                                    <div className={cx('account_policy_content')}>
                                        <p>Tour chọn lọc chất lượng nhất</p>
                                        <p>Đội ngũ tư vấn chi tiết và tận tình</p>
                                        <p>Nhận nhiều chương trình ưu đãi hấp dẫn từ chúng tôi</p>
                                    </div>
                                </div>
                                <div
                                    className={cx(
                                        'col-lg-6 col-md-6 order-lg-last order-md-last order-sm-first order-first',
                                        'account-content',
                                    )}
                                >
                                    <ul className={cx('auth-block__menu-list')}>
                                        <li>
                                            <Link to={config.routes.login} title="Đăng nhập">
                                                Đăng nhập
                                            </Link>
                                        </li>
                                        <li className={cx('active')}>
                                            <Link to={config.routes.register} title="Đăng ký">
                                                Đăng ký
                                            </Link>
                                        </li>
                                    </ul>
                                    <div className={cx('sv-login')}>
                                        <form id={cx('customer-login')}>
                                            <div className={cx('form-signup')}>
                                                <fieldset className={cx('form-group')}>
                                                    <label>
                                                        Họ
                                                        <span className={cx('required')}>*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Nhập họ"
                                                        autoComplete="off"
                                                    />
                                                </fieldset>
                                                <fieldset className={cx('form-group')}>
                                                    <label>
                                                        Tên
                                                        <span className={cx('required')}>*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Nhập tên"
                                                        autoComplete="off"
                                                    />
                                                </fieldset>
                                                <fieldset className={cx('form-group')}>
                                                    <label>
                                                        Số điện thoại
                                                        <span className={cx('required')}>*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Nhập số điện thoại"
                                                        autoComplete="off"
                                                        pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                                                    />
                                                </fieldset>
                                                <fieldset className={cx('form-group')}>
                                                    <label>
                                                        Email
                                                        <span className={cx('required')}>*</span>
                                                    </label>
                                                    <input
                                                        type="email"
                                                        placeholder="Nhập email"
                                                        autoComplete="off"
                                                        pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                                                    />
                                                </fieldset>
                                                <fieldset className={cx('form-group')}>
                                                    <label>
                                                        Mật khẩu
                                                        <span className={cx('required')}>*</span>
                                                    </label>
                                                    <input
                                                        type="password"
                                                        placeholder="Nhập mật khẩu"
                                                        autoComplete="off"
                                                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                                    />
                                                </fieldset>
                                                <div className={cx('btn-submit', 'text-center')}>
                                                    <button className={cx('round-btn')}>Tạo tài khoản</button>
                                                </div>
                                            </div>
                                        </form>
                                        <div className={cx('line-break')}>
                                            <span>hoặc đăng nhập qua</span>
                                        </div>
                                        <div className={cx('socail-login', 'text-center')}>
                                            <Link>
                                                <div className={cx('socail-wapper', 'socail-fb')}>
                                                    <FontAwesomeIcon icon={faFacebookF} />
                                                    <span>Facebook</span>
                                                </div>
                                            </Link>
                                            <Link>
                                                <div className={cx('socail-wapper', 'socail-gl')}>
                                                    <FontAwesomeIcon icon={faGooglePlusG} />
                                                    <span>Google</span>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
