import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import request from "../utils/request";
import buildUrl from "../utils/urlBuilder";
import useAuth from "../hooks/useAuth";

const baseUrl = "http://localhost:5001/api/events";

export const useEvents = () => {
    const [data, setData] = useState({
        events: [],
        totalCount: 0,
        currentPage: 1
    });
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (!searchParams.has('page') || !searchParams.has('limit')) {
            setSearchParams(prev => {
                if (!prev.has('page')) prev.set('page', '1');
                if (!prev.has('limit')) prev.set('limit', '2');
                return prev;
            }, { replace: true });
        }
    }, [searchParams, setSearchParams]);

    useEffect(() => {
        const queryObj = Object.fromEntries(searchParams);
        const url = buildUrl(baseUrl, queryObj);

        setIsLoading(true);
        request.get(url)
            .then((res) => {
                setData({
                    events: res.events || [],
                    totalCount: res.count || 0,
                    currentPage: Number(res.page) || 1
                });
            })
            .catch(err => console.error("Fetch error:", err))
            .finally(() => setIsLoading(false));
    }, [searchParams]);

    const searchParamsHandler = useCallback((updates) => {
        setSearchParams(prevParams => {
            const nextParams = new URLSearchParams(prevParams);

            Object.entries(updates).forEach(([key, value]) => {
                if (key === "sort" && typeof value === 'object') {
                    if (value?.field && value?.dir) {
                        const sortString = `${value.dir === 'desc' ? '-' : ''}${value.field}`;
                        nextParams.set("sort", sortString);
                    } else {
                        nextParams.delete("sort");
                    }
                } 
                else if (value === '' || value === null || value === undefined) {
                    nextParams.delete(key);
                } else {
                    nextParams.set(key, value);
                }
            });

            if (!updates.page && Object.keys(updates).length > 0) {
                nextParams.set('page', '1');
            }

            return nextParams;
        });
    }, [setSearchParams]);

    return { 
        ...data,
        isLoading,
        searchParamsHandler, 
        searchParams 
    };
};

export const useLatestEvents = () => {
    const [latestEvents, setLatestEvents] = useState([]);

    useEffect(() => {
        const url = buildUrl(baseUrl, {
            sort: "-date",
            limit: 2,
            fields: "name,date,_id"
        });

        request.get(url)
            .then((data) => {
                setLatestEvents(data.events || []);
            })
            .catch(err => console.error(err));
    }, []);

    return { latestEvents };
};

export const useCreateEvent = () => {
    const { request: authRequest } = useAuth();

    const create = (eventData) => authRequest.post(baseUrl, eventData);

    return { create };
};

export const useEvent = (eventId) => {
    const [event, setEvent] = useState(null);

    useEffect(() => {
        if (eventId) {
            request.get(`${baseUrl}/${eventId}`)
                .then(setEvent)
                .catch(err => console.error(err));
        }
    }, [eventId]);

    return { event };
};

export const useEditEvent = () => {
    const { request: authRequest } = useAuth();

    const edit = (eventData, eventId) =>
        authRequest.put(`${baseUrl}/${eventId}`, eventData);

    return { edit };
};

export const useDeleteEvent = () => {
    const { request: authRequest } = useAuth();

    const del = (eventId) => 
        authRequest.delete(`${baseUrl}/${eventId}`);

    return { del };
}