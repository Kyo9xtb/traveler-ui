import { useState, useCallback } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { vi } from 'date-fns/locale/vi';
import { parseISO, getDay, isAfter, startOfDay } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import classNames from 'classnames/bind';
import styles from './CustomDatePicker.module.scss';

registerLocale('vi', vi);

const cx = classNames.bind(styles);

/**
 * @param {Array<number>} departDays - Mảng các thứ trong tuần cho phép (VD: [3,6] => Thứ 4 & Thứ 7)
 * @param {Array<string>} departDates - Danh sách ngày cụ thể được phép (VD: ["2025-11-05", "2025-11-08"])
 */
function CustomDatePicker({ departDays = [], departDates = [], setDate }) {
    const [startDate, setStartDate] = useState(null);

    const validDepartDates = departDates.map((d) => parseISO(d)).filter((d) => d instanceof Date && !isNaN(d));

    const filterDate = useCallback(
        (date) => {
            const isFuture = isAfter(startOfDay(date), startOfDay(new Date()));

            const inSpecificDates = validDepartDates.some(
                (d) => startOfDay(d).getTime() === startOfDay(date).getTime(),
            );

            const inWeeklyDays = departDays.includes(getDay(date));

            return isFuture && (inSpecificDates || inWeeklyDays);
        },
        [departDays, validDepartDates],
    );

    return (
        <DatePicker
            locale="vi"
            dateFormat="dd/MM/yyyy"
            selected={startDate}
            onChange={(date) => {
                setStartDate(date);
                setDate?.(date);
            }}
            filterDate={filterDate}
            placeholderText="Chọn ngày khởi hành"
            minDate={new Date()}
        />
    );
}

export default CustomDatePicker;
