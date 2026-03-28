import { useEffect, useState } from "react";
import request from "../utils/request";
import { apiBaseUrl } from "../config/apiBaseUrl";

const baseUrl = `${apiBaseUrl}/api/agegroups`;

export const useAgeGroups = () => {
    const [ageGroups, setAgeGroups] = useState([]);

    useEffect(() => {
        request.get(baseUrl)
            .then((result) => setAgeGroups(Object.values(result)))
    }, []);

    return { ageGroups };
};