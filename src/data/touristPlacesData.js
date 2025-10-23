import { keysToCamelCase } from '~/utils';
import { TouristPlaceService } from '~/services';

let touristPlacesCache = [];

export const getTouristPlacesData = async (forceRefresh = false) => {
    if (!forceRefresh && touristPlacesCache.length > 0) {
        return touristPlacesCache;
    }

    try {
        const { status, error_code, data } = await TouristPlaceService.getTouristPlace();
        if (status === 'success' && error_code === 0) {
            touristPlacesCache = keysToCamelCase(data);
            return touristPlacesCache;
        }
        return [];
    } catch (error) {
        return [];
    }
};
