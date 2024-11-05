import { Fragment } from 'react';
import classNames from 'classnames/bind';

import styles from './TravelExperience.module.scss';
import BannerPage from '~/components/BannerPage';

const cx = classNames.bind(styles);
function TravelExperience() {
    return (
        <Fragment>
            <BannerPage title="Kinh nghiệm du lịch" />
        </Fragment>
    );
}

export default TravelExperience;
