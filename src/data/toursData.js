import { keysToCamelCase, loadFromSession, saveToSession, STORAGE_KEYS } from '~/utils';
import { TourService } from '~/services';

let toursCache = [];
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export const getToursData = async (forceRefresh = false) => {
    if (!forceRefresh && toursCache?.data?.length > 0 && Date.now() - toursCache.exp < CACHE_TTL) {
        return toursCache.data;
    }

    const cached = loadFromSession(STORAGE_KEYS.TOURS);

    if (
        !forceRefresh &&
        Array.isArray(cached?.data) &&
        cached?.data?.length > 0 &&
        Date.now() - cached.exp < CACHE_TTL
    ) {
        toursCache = cached;
        return cached.data;
    }

    try {
        const { status, error_code, data } = await TourService.getTour();
        if (status === 'success' && error_code === 0) {
            const tours = keysToCamelCase(data || []);
            toursCache = { data: tours, exp: Date.now() };
            saveToSession(STORAGE_KEYS.TOURS, toursCache);
            return tours;
        }
        return [];
    } catch (error) {
        return [];
    }
};

export const getCategorizedToursData = async (forceRefresh = false) => {
    const tours = await getToursData(forceRefresh);
    if (!Array.isArray(tours) || tours.length === 0) {
        return {
            listTours: [],
            domesticTours: [],
            internationalTours: [],
            teamBuildingTours: [],
            otherTours: [],
            promotionalTours: [],
        };
    }

    const categories = {
        listTours: tours,
        domesticTours: [],
        internationalTours: [],
        teamBuildingTours: [],
        otherTours: [],
        promotionalTours: [],
    };

    for (const tour of tours) {
        if (tour.sale > 0) categories.promotionalTours.push(tour);
        switch (tour.tourGroup) {
            case 1:
                categories.domesticTours.push(tour);
                break;
            case 2:
                categories.internationalTours.push(tour);
                break;
            case 3:
                categories.teamBuildingTours.push(tour);
                break;
            case 4:
                categories.otherTours.push(tour);
                break;
            default:
                break;
        }
    }

    return categories;
};
