import { Navigate } from "react-router";
import { useLogout } from "../../api/authApi";

const Logout = () => {
    const { isLoggedOut } = useLogout();

    return isLoggedOut
        ? <Navigate to="/" />
        : null; // spinner is better
}

export default Logout