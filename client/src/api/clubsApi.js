import { useEffect, useState } from "react";
import request from "../utils/request";

const baseUrl = 'http://localhost:3030/jsonstore/clubs';

export const useClubs = () => {
    const [clubs, setClubs] = useState([]);

    useEffect(() => {
        request.get(baseUrl)
            .then((result) => setClubs(Object.values(result)))
    }, []);

    return { clubs };
}

export const useClub = (id) => {
    const [club, setClub] = useState({});

    useEffect(() => {
        if (id) {
            request.get(`${baseUrl}/${id}`)
                .then(setClub)
        }
    }, [id]);

    return { club }
}