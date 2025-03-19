import { useState } from "react";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [ageGroup, setAgeGroup] = useState("");
    const [club, setClub] = useState("");
    const [chipNumber, setChipNumber] = useState("");

    const ageGroups = [
        "М12", "М14", "М35", "М40", "М45", "М50", "М55", "М60", "М65", "М70", "М75", "М80",
        "Ж12", "Ж14", "Ж35", "Ж40", "Ж45", "Ж50", "Ж55", "Ж60", "Ж65", "Ж70", "Ж75", "Ж80",
        "Отворен"
    ];

    const clubs = [
        "Club A", "Club B", "Club C"
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can send form data to the server for registration
        console.log({ email, password, confirmPassword, ageGroup, club, chipNumber });
    };

    return (
        <div className="min-h-[90vh] flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Age Group */}
                    <div className="mb-4">
                        <label htmlFor="ageGroup" className="block text-gray-700">
                            Age Group
                        </label>
                        <select
                            id="ageGroup"
                            name="ageGroup"
                            value={ageGroup}
                            onChange={(e) => setAgeGroup(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option value="">Select Age Group</option>
                            {ageGroups.map((group, index) => (
                                <option key={index} value={group}>
                                    {group}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Club */}
                    <div className="mb-4">
                        <label htmlFor="club" className="block text-gray-700">
                            Club
                        </label>
                        <select
                            id="club"
                            name="club"
                            value={club}
                            onChange={(e) => setClub(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option value="">Select Club</option>
                            {clubs.map((clubOption, index) => (
                                <option key={index} value={clubOption}>
                                    {clubOption}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Chip Number */}
                    <div className="mb-4">
                        <label htmlFor="chipNumber" className="block text-gray-700">
                            Chip Number
                        </label>
                        <input
                            type="text"
                            id="chipNumber"
                            name="chipNumber"
                            value={chipNumber}
                            onChange={(e) => setChipNumber(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-6">
                    Already have an account?{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                        Log In
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;
