import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './PrintTour.module.scss';
import * as tourServices from '~/services/tourService';
import ErrorPage from '../Error';
import { createMarkup } from '~/store';

const cx = classNames.bind(styles);
function PrintTour() {
    const [tour, setTour] = useState();
    let { slug } = useParams();
    useEffect(() => {
        tourServices
            .getTourDetail(slug)
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
    console.log(tour);

    return (
        <Fragment>
            <div className={cx('content-wrapper')}>
                <div className={cx('image-header')}>
                    <img src={tour.thumbnail_url} alt={tour.tour_name} />
                    <h1 className={cx('tour-title')}>{tour.tour_name}</h1>
                    <div className={cx('tour-description')}>
                        <p>
                            Lịch khởi hành: <strong>{tour.departure_schedule}</strong>
                        </p>

                        {tour.vehicle &&
                            tour.vehicle.map((item, index) => {
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
                            Thời gian: <strong>{tour.time}</strong>
                        </p>
                    </div>
                </div>
                {tour.tour_program && (
                    <Fragment>
                        <div
                            className={cx('tour-content')}
                            dangerouslySetInnerHTML={createMarkup(tour.tour_program)}
                        ></div>
                    </Fragment>
                )}

                {tour.tour_policy && (
                    <Fragment>
                        <div
                            className={cx('tour-content')}
                            dangerouslySetInnerHTML={createMarkup(tour.tour_policy)}
                        ></div>
                    </Fragment>
                )}
            </div>
        </Fragment>
    );
}

export default PrintTour;
