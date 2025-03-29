import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import request from "../utils/request";
import { useSearchParams } from "react-router";
import buildUrl from "../utils/urlBuilder";

const baseUrl = 'http://localhost:3030/data/events';

export const useEvents = () => {
    const [events, setEvents] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const url = buildUrl(baseUrl, Object.fromEntries(searchParams));

        request.get(url)
            .then(setEvents)
    }, [searchParams]);

    const searchParamsHandler = (data) => {
        Object.keys(data).forEach((key) => {
            if (key === 'sort') {
                const sort = data[key];

                if (sort.dir !== null) {
                    searchParams.set('sortField', sort.field);
                    searchParams.set('sortDir', sort.dir);
                } else {
                    searchParams.delete('sortField');
                    searchParams.delete('sortDir');
                }
            } else if (data[key] !== "") {
                searchParams.set(key, data[key]);
            } else {
                searchParams.delete(key);
            }
        });

        setSearchParams(searchParams);
    }

    return { events, searchParamsHandler, searchParams };
};

export const useLatestEvents = () => {
    const [latestEvents, setLatestEvents] = useState([]);

    useEffect(() => {
        const url = buildUrl(baseUrl, {
            sortField: 'eventDate',
            sortDir: 'asc',
            pageSize: 2,
            properties: ["_id", "eventName", "eventDate"]
        });

        request.get(url)
            .then(setLatestEvents)
    }, []);

    return { latestEvents };
}

export const useCreateEvent = () => {
    const { request } = useAuth();

    const create = (eventData) =>
        request.post(baseUrl, eventData);

    return {
        create,
    }
};

export const useEvent = (eventId) => {
    const [event, setEvent] = useState({});

    useEffect(() => {
        request.get(`http://localhost:3030/data/events/${eventId}`)
            .then(setEvent)
    }, [eventId]);

    return { event }
}