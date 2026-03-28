import { useMemo } from "react";

import { UserContext } from "../contexts/UserContext";
import usePersistedState from "../hooks/usePersistedState";

function normalizeAuthShape(data) {
    if (!data || typeof data !== "object") {
        return {};
    }
    const { token, accessToken, ...rest } = data;
    const resolved = accessToken ?? token ?? "";
    return { ...rest, accessToken: resolved };
}

export default function UserProvider({
    children,
}) {
    const [authData, setAuthData] = usePersistedState('auth', {});

    const contextAuth = useMemo(() => normalizeAuthShape(authData), [authData]);

    const userLoginHandler = (resultData) => {
        const { token, accessToken, ...rest } = resultData;
        const resolved = accessToken ?? token;
        if (resolved) {
            setAuthData({ ...rest, accessToken: resolved });
        } else {
            setAuthData(resultData);
        }
    };

    const userLogoutHandler = () => {
        setAuthData({});
    };

    return (
        <UserContext.Provider value={{ ...contextAuth, userLoginHandler, userLogoutHandler }}>
            {children}
        </UserContext.Provider>
    );
}