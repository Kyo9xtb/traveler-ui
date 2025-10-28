import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './PrintTour.module.scss';
import { TourService } from '~/services';
import { createMarkup, keysToCamelCase } from '~/utils';
import AlterDismissible from '~/components/CustomAlert';

const cx = classNames.bind(styles);

function PrintTour() {
    const [tour, setTour] = useState();
    const [loading, setLoading] = useState(false);
    let { slug } = useParams();

    useEffect(() => {
        if (!slug) return;
        (async () => {
            try {
                const { status, error_code, data } = await TourService.getTourDetail(slug);
                if (status === 'success' && error_code === 0) {
                    setTour(keysToCamelCase(data));
                    setTimeout(() => {
                        window.print();
                    }, 2000);
                }
                setLoading(true);
            } catch (error) {
                console.error('Error fetching tour', error);
            }
        })();
    }, [slug]);

    if (!tour && loading) {
        return (
            <AlterDismissible className={'alert-danger'}>
                <h4>Lỗi in tour du lịch</h4>
                <p>Lỗi khi in Tour. Quý khách vui lòng chọn đúng Tour du lịch để in nội dung.</p>
            </AlterDismissible>
        );
    }

    return (
        <Fragment>
            <div className={cx('content-wrapper')}>
                <div className={cx('image-header')}>
                    <img src={tour?.thumbnailUrl} alt={tour?.tourName} />
                    <h1 className={cx('tour-title')}>{tour?.tourName}</h1>
                    <div className={cx('tour-description')}>
                        <p>
                            Lịch khởi hành: <strong>{tour?.departureSchedule}</strong>
                        </p>

                        {tour?.vehicle &&
                            tour?.vehicle.map((item, index) => {
                                switch (item.toLowerCase()) {
                                    case 'car':
                                        return (
                                            <p key={index}>
                                                Di chuyển:&nbsp;
                                                <strong className={cx('tag-color')}>Di chuyển bằng ô tô</strong>
                                            </p>
                                        );
                                    case 'plane':
                                        return (
                                            <p key={index}>
                                                Di chuyển:&nbsp;
                                                <strong className={cx('tag-color')}>Di chuyển bằng máy bay</strong>
                                            </p>
                                        );
                                    case 'ship':
                                        return (
                                            <p key={index}>
                                                Di chuyển:&nbsp;
                                                <strong className={cx('tag-color')}>Di chuyển bằng tàu thủy</strong>
                                            </p>
                                        );
                                    case 'train':
                                        return (
                                            <p key={index}>
                                                Di chuyển:&nbsp;
                                                <strong className={cx('tag-color')}>Di chuyển bằng tàu hỏa</strong>
                                            </p>
                                        );
                                    default:
                                        return <></>;
                                }
                            })}
                        <p>
                            Thời gian: <strong>{tour?.time}</strong>
                        </p>
                    </div>
                </div>
                {tour?.tourProgram && (
                    <Fragment>
                        <div className={cx('tour-content')}>
                            <h4 className={cx('fst-italic', 'fw-bold')}>Chương trình tour</h4>
                            <div dangerouslySetInnerHTML={createMarkup(tour?.tourProgram)} />
                        </div>
                    </Fragment>
                )}

                {tour?.tourPolicy && (
                    <Fragment>
                        <div className={cx('tour-content')}>
                            <h4 className={cx('fst-italic', 'fw-bold')}>Chính sách tour</h4>
                            <div dangerouslySetInnerHTML={createMarkup(tour?.tourPolicy)} />
                        </div>
                    </Fragment>
                )}

                {tour?.termsConditions && (
                    <Fragment>
                        <div className={cx('tour-content')}>
                            <h4 className={cx('fst-italic', 'fw-bold')}>Điều khoản && Quy định</h4>
                            <div dangerouslySetInnerHTML={createMarkup(tour?.termsConditions)} />
                        </div>
                    </Fragment>
                )}
            </div>
        </Fragment>
    );
}

export default PrintTour;
