import { Fragment } from 'react';
import classNames from 'classnames/bind';

import styles from './TravelExperience.module.scss';
import AlterDismissible from '~/components/CustomAlert';

const cx = classNames.bind(styles);
function TravelExperience() {
    return (
        <Fragment>
            <AlterDismissible className={cx('alert-warning')}>
                Danh mục <strong> Kinh nghiệm du lịch</strong> đang được cập nhật. Vui lòng quay lại sau.
            </AlterDismissible>
        </Fragment>
    );
}

export default TravelExperience;
