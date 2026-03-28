import { useEffect } from "react";
import { useContext } from "react";
import request from "../utils/request";
import { UserContext } from "../contexts/UserContext";
import { apiBaseUrl } from "../config/apiBaseUrl";

const baseUrl = `${apiBaseUrl}/api/auth`;

export const useLogin = () => {
    const login = async (email, password) =>
        request.post(`${baseUrl}/login`, { email, password });

    return {
        login,
    };
};

export const useRegister = () => {
    const register = (data) => request.post(`${baseUrl}/register`, data);

    return {
        register,
    };
};

export const useLogout = () => {
    const { accessToken, userLogoutHandler } = useContext(UserContext);

    useEffect(() => {
        if (!accessToken) {
            return;
        }
        userLogoutHandler();
    }, [accessToken, userLogoutHandler]);

    return {
        isLoggedOut: !accessToken,
    };
};
