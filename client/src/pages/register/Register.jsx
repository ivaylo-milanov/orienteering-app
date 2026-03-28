import { useState } from "react";
import { useNavigate } from "react-router";

import { useRegister } from "../../api/authApi";
import { useUserContext } from "../../contexts/UserContext";
import { HttpError } from "../../utils/request";
import { useClubs } from "../../api/clubsApi";
import { useAgeGroups } from "../../api/ageGroupsApi";

import styles from "./Register.module.css";

const Register = () => {
    const navigate = useNavigate();
    const { register } = useRegister();
    const { userLoginHandler } = useUserContext();
    const { ageGroups } = useAgeGroups();
    const { clubs } = useClubs();
    const [error, setError] = useState("");

    const registerHandler = async (formData) => {
        setError("");
        const { confirmPassword, ...data } = Object.fromEntries(formData);

        if (data.password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        let authData;
        try {
            authData = await register(data);
        } catch (err) {
            setError(
                err instanceof HttpError
                    ? err.message
                    : "Something went wrong. Please try again."
            );
            return;
        }

        if (!authData?.accessToken) {
            setError(
                typeof authData?.message === "string"
                    ? authData.message
                    : "Registration failed. Please check your details."
            );
            return;
        }

        userLoginHandler(authData);
        navigate("/");
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.heading}>Register</h2>
                {error ? (
                    <p className={styles.errorMessage} role="alert">
                        {error}
                    </p>
                ) : null}
                <form className={styles.form} action={registerHandler}>
                    <div className={styles.mb4}>
                        <label htmlFor="name" className={styles.label}>
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            minLength={2}
                            maxLength={50}
                            className={styles.input}
                        />
                    </div>
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
                                <option key={club._id} value={club._id}>
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
