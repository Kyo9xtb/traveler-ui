import { useEffect, useState } from 'react';

import { NewsService, TouristPlaceService, TourService } from '~/services';
import StaticData from '~/data/data.json';
import { actions, useStore } from '~/store';

function GetData({ children }) {
    const [, dispatch] = useStore();
    const [listTours, setListTours] = useState([]);
    const [listNews, setListNews] = useState([]);
    const [listDestinations, setListDestinations] = useState([]);
    const { tour: tourStaticData, 'tourist-place': touristPlaceStaticData, news: newsStaticData } = StaticData;

    useEffect(() => {
        const fetchAllData = async () => {
            const fetchTours = async () => {
                try {
                    const res = await TourService.getTour();
                    res.length ? setListTours(res) : setListTours([]);
                } catch (err) {
                    // console.error('==> Failed to fetch tours:', err);
                    setListTours(tourStaticData);
                }
            };

            const fetchDestinations = async () => {
                try {
                    const res = await TouristPlaceService.getTouristPlace();
                    res.length ? setListDestinations(res) : setListDestinations([]);
                } catch (err) {
                    // console.error('==> Failed to fetch destinations:', err);
                    setListDestinations(touristPlaceStaticData);
                }
            };
            const fetchNews = async () => {
                try {
                    const res = await NewsService.getNews();
                    res.length ? setListNews(res) : setListNews([]);
                } catch (err) {
                    // console.error('==> Failed to fetch news:', err);
                    setListNews(newsStaticData);
                }
            };

            await Promise.all([fetchTours(), fetchDestinations(), fetchNews()]);
        };
        fetchAllData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(actions.addData({ listTours, listNews, listDestinations }));
    }, [listTours, listNews, listDestinations, dispatch]);
    return children;
}

export default GetData;
