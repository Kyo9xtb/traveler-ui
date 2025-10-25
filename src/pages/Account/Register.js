import { Fragment, useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGooglePlusG } from '@fortawesome/free-brands-svg-icons';

import styles from './Account.module.scss';
import BannerPage from '~/components/BannerPage';
import config from '~/config';
import { AuthorService } from '~/services';
import { keysToSnakeCase, toCamelCase } from '~/utils';
import { useStore } from '~/store';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { use } from 'react';

const cx = classNames.bind(styles);

function Register() {
    const navigate = useNavigate();
    const [store] = useStore();
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const [fields, setFields] = useState({
        fullName: '',
        phone: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        if (store?.user?.id) {
            navigate(config.routes.home);
        }
    }, []);

    const setFieldValue = useCallback(({ target: { name, value } }) => {
        setFields((prev) => ({
            ...prev,
            [toCamelCase(name)]: value,
        }));
    }, []);

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            setLoading(true);
            setErrorMessage('');
            try {
                const { status, error_code } = await AuthorService.register(keysToSnakeCase(fields));
                if (status === 'success' && error_code === 0) {
                    setFields({
                        fullName: '',
                        phone: '',
                        email: '',
                        password: '',
                    });
                    navigate(config.routes.login);
                    return;
                }
                const errorMessages = {
                    409: 'Email đã được sử dụng.',
                    400: 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.',
                    500: 'Lỗi hệ thống. Vui lòng thử lại sau.',
                };

                setErrorMessage(errorMessages[error_code] || 'Đăng ký thành viên thất bại.');
            } catch (error) {
                console.error('Register error:', error);
                setErrorMessage('Đăng ký thành viên thất bại');
            } finally {
                setLoading(false);
            }
        },
        [fields, navigate],
    );

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
                                                        name="full-name"
                                                        value={fields.fullName}
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
                                                        name="email"
                                                        value={fields.email}
                                                        required
                                                        onChange={setFieldValue}
                                                        title="Vui lòng nhập địa chỉ email hợp lệ. Ví dụ: tenban@example.com"
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
                                                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                                                        name="password"
                                                        value={fields.password}
                                                        required
                                                        onChange={setFieldValue}
                                                        title="Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường và số"
                                                    />
                                                </fieldset>
                                                {errorMessage && <p className={cx('text-danger')}>{errorMessage}</p>}
                                                <div className={cx('btn-submit', 'text-center')}>
                                                    <button type="submit" className={cx('round-btn', 'loading')}>
                                                        {loading ? (
                                                            <>
                                                                <FontAwesomeIcon icon={faSpinner} /> &nbsp; Đang đăng ký
                                                            </>
                                                        ) : (
                                                            'Tạo tài khoản'
                                                        )}
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
