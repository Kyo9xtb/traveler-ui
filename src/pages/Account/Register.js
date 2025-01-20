import { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGooglePlusG } from '@fortawesome/free-brands-svg-icons';

import styles from './Account.module.scss';
import BannerPage from '~/components/BannerPage';
import config from '~/config';
import { AuthorService } from '~/services';
import { actions, SnakeCaseVariable, useStore } from '~/store';

const cx = classNames.bind(styles);
function Register() {
    const navigate = useNavigate();
    const [, dispatch] = useStore();
    const [isEmail, setIsEmail] = useState(false);
    const [fields, setFields] = useState({
        full_name: '',
        phone_number: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        AuthorService.getLogin()
            .then((res) => {
                dispatch(actions.setInfoUser(res));
                navigate(config.routes.home);
            })
            .catch((err) => {
                // console.log("error", err);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setFieldValue = ({ target: { name, value } }) => {
        setFields((prev) => ({
            ...prev,
            [`${SnakeCaseVariable(name)}`]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        AuthorService.postAuthor(fields)
            .then((res) => {
                if (res.status) {
                    setFields({
                        FullName: '',
                        PhoneNumber: '',
                        Email: '',
                        Password: '',
                    });
                    navigate(config.routes.login);
                } else {
                    alert('Đăng ký thành viên thất bại');
                }
            })
            .catch((err) => {
                alert(err);
            });
    };

    const handleCheckEmail = (e) => {
        const { value } = e.target;
        const data = { email: value };
        AuthorService.postCheckEmail(data)
            .then((res) => {
                setIsEmail(res);
            })
            .catch((err) => {
                console.error('Error checking email:', err);
                setIsEmail(false);
            });
    };
    return (
        <Fragment>
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
                                        <form id={cx('customer-login')} onSubmit={handleSubmit}>
                                            <div className={cx('form-signup')}>
                                                <fieldset className={cx('form-group')}>
                                                    <label>
                                                        Họ và tên
                                                        <span className={cx('required')}>*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Nhập họ và tên"
                                                        autoComplete="off"
                                                        name="FullName"
                                                        value={fields.full_name}
                                                        required
                                                        onChange={setFieldValue}
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
                                                        pattern="/(84|0[3|5|7|8|9])+([0-9]{8})\b/g"
                                                        name="PhoneNumber"
                                                        value={fields.phone_number}
                                                        required
                                                        onChange={setFieldValue}
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
                                                        name="Email"
                                                        value={fields.email}
                                                        required
                                                        onChange={setFieldValue}
                                                        onBlur={handleCheckEmail}
                                                    />
                                                    {isEmail && (
                                                        <p className={cx('text-danger', 'mb-0')}>
                                                            Email đã tồn tại. Vui lòng đăng nhập hoặc đăng ký với email
                                                            khác.
                                                        </p>
                                                    )}
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
                                                        name="Password"
                                                        value={fields.password}
                                                        required
                                                        onChange={setFieldValue}
                                                    />
                                                </fieldset>
                                                <div className={cx('btn-submit', 'text-center')}>
                                                    <button type="submit" className={cx('round-btn')}>
                                                        Tạo tài khoản
                                                    </button>
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
        </Fragment>
    );
}

export default Register;
