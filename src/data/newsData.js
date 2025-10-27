import { keysToCamelCase, loadFromSession, saveToSession, STORAGE_KEYS } from '~/utils';
import { NewsService } from '~/services';

let newsCache = [];
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export const getNewsData = async (forceRefresh = false) => {
    if (!forceRefresh && newsCache?.data?.length > 0 && Date.now() - newsCache.exp < CACHE_TTL) {
        return newsCache.data;
    }

    const cached = loadFromSession(STORAGE_KEYS.NEWS);

    if (
        !forceRefresh &&
        Array.isArray(cached?.data) &&
        cached?.data?.length > 0 &&
        Date.now() - cached.exp < CACHE_TTL
    ) {
        newsCache = cached;
        return cached.data;
    }

    try {
        const { status, error_code, data } = await NewsService.getNews();
        if (status === 'success' && error_code === 0) {
            const news = keysToCamelCase(data || []);
            newsCache = { data: news, exp: Date.now() };
            saveToSession(STORAGE_KEYS.NEWS, newsCache);
            return news;
        }
        return [];
    } catch (error) {
        return [];
    }
};