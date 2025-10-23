import { faBaby, faChild, faPerson } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ListCustomer = [
    {
        value: 1,
        label: 'Người lớn',
        textEn: 'Adult',
        description: 'Từ 12 tuổi trở lên',
        descriptionEn: 'From 12 years old',
        ticketRate: 1.0, // 100% giá vé
        icon: <FontAwesomeIcon icon={faPerson} />,
    },
    {
        value: 2,
        label: 'Trẻ em',
        textEn: 'Child',
        description: 'Từ 2 đến 12 tuổi',
        descriptionEn: 'From 2 to 12 years old',
        ticketRate: 0.75, // 75% giá vé
        icon: <FontAwesomeIcon icon={faChild} />,
    },
    {
        value: 3,
        label: 'Em bé',
        textEn: 'baby',
        description: 'Dưới 2 tuổi',
        descriptionEn: 'Under 6 years old',
        ticketRate: 0.3, // 30% giá vé
        icon: <FontAwesomeIcon icon={faBaby} />,
    },
];
