import { faGlobe, faMapLocationDot, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ListGroup = [
    {
        value: 1,
        label: 'Nội địa',
        textEn: 'Domestic',
        icon: <FontAwesomeIcon icon={faMapLocationDot} />,
        color: '#007bff',
        children: [
            { value: 101, label: 'Miền Bắc', textEn: 'Northern Vietnam' },
            { value: 102, label: 'Miền Trung', textEn: 'Central Vietnam' },
            { value: 103, label: 'Miền Nam', textEn: 'Southern Vietnam' },
        ],
    },
    {
        value: 2,
        label: 'Quốc tế',
        textEn: 'International',
        icon: <FontAwesomeIcon icon={faGlobe} />,
        color: '#28a745',
        children: [
            { value: 201, label: 'Đông Nam Á', textEn: 'Southeast Asia' },
            { value: 202, label: 'Đông Bắc Á', textEn: 'Northeast Asia' },
            { value: 203, label: 'Ấn Độ - Nam Á', textEn: 'India & South Asia' },
            { value: 204, label: 'Châu Âu', textEn: 'Europe' },
            { value: 205, label: 'Châu Úc', textEn: 'Oceania / Australia' },
            { value: 206, label: 'Châu Phi', textEn: 'Africa' },
            { value: 207, label: 'Châu Mỹ', textEn: 'Americas' },
        ],
    },
    {
        value: 3,
        label: 'Team Building',
        textEn: 'Team Building',
        icon: <FontAwesomeIcon icon={faPeopleGroup} />,
        color: '#ffc107',
        children: [
            { value: 301, label: 'Team Building Kết hợp đào tạo', textEn: 'Team Building with Training' },
            { value: 302, label: 'Team Building Kết hợp nghỉ dưỡng', textEn: 'Team Building with Retreat' },
            { value: 303, label: 'Team Building Kết hợp dã ngoại', textEn: 'Outdoor Team Building' },
        ],
    },
    {
        value: 4,
        label: 'Khác',
        textEn: 'Others',
        icon: <FontAwesomeIcon icon={faPeopleGroup} />,
        color: '#dc3545',
        children: [
            { value: 401, label: 'Du lịch sinh thái', textEn: 'Eco Tourism' },
            { value: 402, label: 'Du lịch tâm linh', textEn: 'Spiritual Tourism' },
            { value: 403, label: 'Du lịch trải nghiệm', textEn: 'Experiential Tourism' },
        ],
    },
];
