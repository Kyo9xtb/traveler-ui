import { keysToCamelCase } from '~/utils';
import { TourService } from '~/services';

let toursCache = [];

export const getToursData = async (forceRefresh = false) => {
    if (!forceRefresh && toursCache.length > 0) {
        return toursCache;
    }

    try {
        const { status, error_code, data } = await TourService.getTour();
        if (status === 'success' && error_code === 0) {
            toursCache = keysToCamelCase(data);
            return toursCache;
        }
        return [];
    } catch (error) {
        return [];
    }
};

export const getCategorizedToursData = async () => {
    const tours = await getToursData();

    const categories = {
        listTours: tours,
        domesticTours: tours.filter((t) => t.tourGroup === 1),
        internationalTours: tours.filter((t) => t.tourGroup === 2),
        teamBuildingTours: tours.filter((t) => t.tourGroup === 3),
        otherTours: tours.filter((t) => t.tourGroup === 4),
        promotionalTours: tours.filter((t) => t.sale > 0),
    };

    return categories;
};
