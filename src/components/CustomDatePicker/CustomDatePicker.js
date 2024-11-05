import { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import getDay from 'date-fns/getDay';
import getMonth from 'date-fns/getMonth';
import getYear from 'date-fns/getYear';
import range from 'lodash/range';
import { vi } from 'date-fns/locale/vi';
import 'react-datepicker/dist/react-datepicker.css';
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import classNames from 'classnames/bind';

import styles from './CustomDatePicker.module.scss';
registerLocale('vi', vi);

const cx = classNames.bind(styles);
function CustomDatePicker({ Depart }) {
    const [startDate, setStartDate] = useState(new Date());
    const years = range(getYear(new Date()), getYear(new Date()) + 2, 1);
    const months = [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
    ];

    const isWeekday = (date) => {
        const day = getDay(date);
        return day;
        // return day === 3 ;
    };
    return (
        <DatePicker
            filterDate={Depart ? isWeekday : ''}
            className="datepicker"
            locale="vi"
            renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
            }) => (
                <div className={cx('datepicker-header')}>
                    <button
                        className={cx('datepicker-prew', 'datepicker-btn')}
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                    >
                        {'<'}
                    </button>
                    <div className={cx('datepicker-title')}>
                        <select
                            className={cx('datepicker-month')}
                            value={months[getMonth(date)]}
                            onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
                        >
                            {months.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>

                        <select
                            className={cx('datepicker-year')}
                            value={getYear(date)}
                            onChange={({ target: { value } }) => changeYear(value)}
                        >
                            {years.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        className={cx('datepicker-next', 'datepicker-btn')}
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                    >
                        {'>'}
                    </button>
                </div>
            )}
            dateFormat="dd/MM/yyyy"
            selected={startDate}
            onChange={(date) => {
                date < new Date() ? setStartDate(new Date()) : setStartDate(date);
            }}
            minDate={new Date()}
        />
    );
}

export default CustomDatePicker;
