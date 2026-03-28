import { useEffect, useState } from "react";
import request from "../utils/request";
import { apiBaseUrl } from "../config/apiBaseUrl";

const baseUrl = `${apiBaseUrl}/api/clubs`;

export const useClubs = () => {
    const [clubs, setClubs] = useState([]);

    useEffect(() => {
        request.get(baseUrl).then((result) => setClubs(Object.values(result)));
    }, []);

    return { clubs };
};
