import { faCar, faPlane, faShip, faSpinner, faTrain } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import images from '~/assets/images';

let { tagCar, tagPlane, tagShip, tagTrain } = images;
export const listVehicle = [
    {
        value: 0,
        label: 'Phương tiện khác',
        textEn: 'Other means',
        icon: <FontAwesomeIcon icon={faSpinner} />,
        image: '',
    },
    {
        value: 1,
        label: 'Xe ô tô',
        textEn: 'car',
        icon: <FontAwesomeIcon icon={faCar} />,
        image: tagCar,
    },
    {
        value: 2,
        label: 'Máy bay',
        textEn: 'plane',
        icon: <FontAwesomeIcon icon={faPlane} />,
        image: tagPlane,
    },
    {
        value: 3,
        label: 'Tàu hỏa',
        textEn: 'train',
        icon: <FontAwesomeIcon icon={faTrain} />,
        image: tagTrain,
    },
    {
        value: 4,
        label: 'Tàu thủy',
        textEn: 'ship',
        icon: <FontAwesomeIcon icon={faShip} />,
        image: tagShip,
    },
];
