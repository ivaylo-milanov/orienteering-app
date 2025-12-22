import { useEffect, useState } from "react";
import request from "../utils/request";

const baseUrl = 'http://localhost:5001/api/agegroups';

export const useAgeGroups = () => {
    const [ageGroups, setAgeGroups] = useState([]);

    useEffect(() => {
        request.get(baseUrl)
            .then((result) => setAgeGroups(Object.values(result)))
    }, []);

    return { ageGroups };
};