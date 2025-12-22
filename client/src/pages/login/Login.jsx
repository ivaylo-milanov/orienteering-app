import { useNavigate } from "react-router";
import { useLogin } from "../../api/authApi";
import { useUserContext } from "../../contexts/UserContext";

import styles from "./Login.module.css";

const Login = () => {
    const navigate = useNavigate();
    const { userLoginHandler } = useUserContext();
    const { login } = useLogin();

    const loginHandler = async (formData) => {
        const values = Object.fromEntries(formData);

        const authData = await login(values.email, values.password);

        userLoginHandler(authData);

        navigate('/events');
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.header}>Login</h2>
                <form action={loginHandler}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.inputLabel}>
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className={styles.inputField}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.inputLabel}>
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            className={styles.inputField}
                        />
                    </div>
                    <button
                        type="submit"
                        className={styles.submitButton}
                    >
                        Sign In
                    </button>
                </form>
                <p className={styles.signupLink}>
                    Don't have an account?{' '}
                    <a href="/register" className={styles.signupLink}>
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
