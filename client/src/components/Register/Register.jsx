import { useNavigate } from "react-router";

import { useRegister } from "../../api/authApi";
import { useUserContext } from "../../contexts/UserContext";
import { useClubs } from "../../api/clubsApi";
import { useAgeGroups } from "../../api/ageGroupsApi";

import styles from "./Register.module.css";

const Register = () => {
    const navigate = useNavigate();
    const { register } = useRegister();
    const { userLoginHandler } = useUserContext();
    const { ageGroups } = useAgeGroups();
    const { clubs } = useClubs();

    const registerHandler = async (formData) => {
        const { confirmPassword, ...data } = Object.fromEntries(formData);

        debugger;

        if (data.password !== confirmPassword) {
            console.log("Password missmatch");

            return;
        }

        const authData = await register(data);

        userLoginHandler(authData);

        navigate("/");
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.heading}>Register</h2>
                <form className={styles.form} action={registerHandler}>
                    <div className={styles.mb4}>
                        <label htmlFor="email" className={styles.label}>
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.mb4}>
                        <label htmlFor="password" className={styles.label}>
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.mb6}>
                        <label
                            htmlFor="confirmPassword"
                            className={styles.label}
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            required
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.mb4}>
                        <label htmlFor="ageGroup" className={styles.label}>
                            Age Group
                        </label>
                        <select
                            id="ageGroup"
                            name="ageGroup"
                            required
                            className={styles.select}
                        >
                            <option value="">Select Age Group</option>
                            {ageGroups.map((group) => (
                                <option key={group._id} value={group._id}>
                                    {group.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.mb4}>
                        <label htmlFor="club" className={styles.label}>
                            Club
                        </label>
                        <select
                            id="club"
                            name="club"
                            required
                            className={styles.select}
                        >
                            <option value="">Select Club</option>
                            {clubs.map((club) => (
                                <option key={club._id} value={club.name}>
                                    {club.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.mb4}>
                        <label htmlFor="chipNumber" className={styles.label}>
                            Chip Number
                        </label>
                        <input
                            type="text"
                            id="chipNumber"
                            name="chipNumber"
                            required
                            className={styles.input}
                        />
                    </div>
                    <button type="submit" className={styles.button}>
                        Sign Up
                    </button>
                </form>
                <p
                    className={`${styles.textCenter} ${styles.textGray} ${styles.mt6}`}
                >
                    Already have an account?{" "}
                    <a href="/login" className={styles.textBlue}>
                        Log In
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;
