import { useEffect, useState } from "react";
import request from "../utils/request";

const baseUrl = "http://localhost:5001/api/clubs";

export const useClubs = () => {
    const [clubs, setClubs] = useState([]);

    useEffect(() => {
        request.get(baseUrl).then((result) => setClubs(Object.values(result)));
    }, []);

    return { clubs };
};
