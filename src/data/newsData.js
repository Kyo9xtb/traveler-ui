import { keysToCamelCase } from '~/utils';
import { NewsService } from '~/services';

let newsCache = [];

export const getNewsData = async (forceRefresh = false) => {
    if (!forceRefresh && newsCache.length > 0) {
        return newsCache;
    }

    try {
        const { status, error_code, data } = await NewsService.getNews();
        if (status === 'success' && error_code === 0) {
            newsCache = keysToCamelCase(data);
            return newsCache;
        }
        return [];
    } catch (error) {
        return [];
    }
};
