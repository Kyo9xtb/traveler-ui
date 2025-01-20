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
function Login() {
    const navigate = useNavigate();
    const [fields, setFields] = useState({
        email: 'phamvanthien307@gmail.com',
        password: 'Thien@1234',
    });
    const [, dispatch] = useStore();
    const [errorMessage, setErrorMessage] = useState();

    const setFieldValue = ({ target: { name, value } }) => {
        setFields((prev) => ({
            ...prev,
            [`${SnakeCaseVariable(name)}`]: value,
        }));
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        AuthorService.postLogin(fields)
            .then((res) => {
                dispatch(actions.setInfoUser(res));
                navigate(config.routes.home);
            })
            .catch((err) => {
                const { status } = err;
                if (status === 401) {
                    setErrorMessage('Email hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại !');
                } else {
                    setErrorMessage('Đã xảy ra lỗi, vui lòng thử lại sau.');
                }
            });
    };

    return (
        <Fragment>
            <BannerPage title="Đăng nhập" />
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
                                        <li className={cx('active')}>
                                            <Link to={config.routes.login} title="Đăng nhập">
                                                Đăng nhập
                                            </Link>
                                        </li>
                                        <li>
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
                                                        name="Password"
                                                        value={fields.password}
                                                        required
                                                        onChange={setFieldValue}
                                                    />
                                                </fieldset>
                                                {errorMessage && <p className={cx('text-danger')}>{errorMessage}</p>}
                                                <p className={cx('text-end')}>
                                                    <Link title="Quên mật khẩu">Quên mật khẩu</Link>
                                                </p>
                                                <div className={cx('btn-submit', 'text-center')}>
                                                    <button type="submit" className={cx('round-btn')}>
                                                        Đăng nhập
                                                    </button>
                                                </div>
                                                <p className={cx('login--notes')}>
                                                    SaoViet Travler cam kết bảo mật và sẽ không bao giờ đăng hay chia sẻ
                                                    thông tin mà chưa có được sự đồng ý của bạn.
                                                </p>
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
                                    <div id={cx('recover-password')} style={{ display: 'none' }}>
                                        <p className={cx('fix-sblock')}>
                                            Bạn quên mật khẩu? Nhập địa chỉ email để lấy lại mật khẩu qua email.
                                        </p>
                                        <form id={cx('recover-customer-password')}>
                                            <div className={cx('form-signup')}>
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

                                                <p className={cx('text-end')}>
                                                    <Link title="Quên mật khẩu">Quên mật khẩu</Link>
                                                </p>
                                                <div className={cx('btn-submit', 'text-center')}>
                                                    <button className={cx('round-btn')}>Lấy lại mật khẩu</button>
                                                </div>
                                            </div>
                                        </form>
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

export default Login;
