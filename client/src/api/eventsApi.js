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
        const url = buildUrl(baseUrl, searchParams);

        request.get(url)
            .then((result) => {
                setEvents(result);
            })
    }, [searchParams]);

    const searchParamsHandler = (data) => {
        Object.keys(data).forEach((key) => {
            if (data[key] !== "") {
                searchParams.set(key, data[key]);
            } else {
                searchParams.delete(key);
            }
        });

        setSearchParams(searchParams);
    }

    return { events, searchParamsHandler, searchParams: searchParams };
};

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