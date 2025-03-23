import { useEffect, useState } from "react";
import request from "../utils/request";

const baseUrl = 'http://localhost:3030/jsonstore';

export const useAgeGroups = () => {
    const [ageGroups, setAgeGroups] = useState([]);

    useEffect(() => {
        request.get(`${baseUrl}/age-groups`)
            .then(result => {
                setAgeGroups(Object.values(result))
            })
    }, []);

    return { ageGroups };
};

export const useClubs = () => {
    const [clubs, setClubs] = useState([]);

    useEffect(() => {
        request.get(`${baseUrl}/clubs`)
            .then(result => {
                setClubs(Object.values(result))
            })
    }, []);

    return { clubs };
}