import { useState } from "react";
import { Link } from "react-router-dom";

const RegisterEvent = () => {
    const [selectedStages, setSelectedStages] = useState([]);
    const [name, setName] = useState("");
    const [ageGroup, setAgeGroup] = useState("");
    const [club, setClub] = useState("");
    const [chipNumber, setChipNumber] = useState("");

    const stages = [
        { name: "5K Fun Run", date: "2025-04-01" },
        { name: "Half Marathon", date: "2025-04-02" },
        { name: "Full Marathon", date: "2025-04-03" },
    ];

    const ageGroups = [
        "М12", "М14", "М35", "М40", "М45", "М50", "М55", "М60", "М65", "М70", "М75", "М80",
        "Ж12", "Ж14", "Ж35", "Ж40", "Ж45", "Ж50", "Ж55", "Ж60", "Ж65", "Ж70", "Ж75", "Ж80",
        "Отворен"
    ];

    const handleStageToggle = (stage) => {
        setSelectedStages((prevSelectedStages) =>
            prevSelectedStages.includes(stage)
                ? prevSelectedStages.filter((item) => item !== stage)
                : [...prevSelectedStages, stage]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here, you would typically send the form data to the server
        console.log({ name, ageGroup, club, chipNumber, selectedStages });
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                    Регистрация за състезанието
                </h1>
                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                            Име
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Age Group */}
                    <div className="mb-6">
                        <label htmlFor="ageGroup" className="block text-sm font-medium text-gray-600">
                            Възрастова група
                        </label>
                        <select
                            id="ageGroup"
                            value={ageGroup}
                            onChange={(e) => setAgeGroup(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Изберете възрастова група</option>
                            {ageGroups.map((group, index) => (
                                <option key={index} value={group}>
                                    {group}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Club */}
                    <div className="mb-6">
                        <label htmlFor="club" className="block text-sm font-medium text-gray-600">
                            Клуб
                        </label>
                        <select
                            id="club"
                            value={club}
                            onChange={(e) => setClub(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Изберете клуб</option>
                            <option value="clubA">Клуб А</option>
                            <option value="clubB">Клуб Б</option>
                            <option value="clubC">Клуб В</option>
                        </select>
                    </div>

                    {/* Chip Number */}
                    <div className="mb-6">
                        <label htmlFor="chipNumber" className="block text-sm font-medium text-gray-600">
                            Chip Number
                        </label>
                        <input
                            type="text"
                            id="chipNumber"
                            value={chipNumber}
                            onChange={(e) => setChipNumber(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Select Stages */}
                    <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-600">Изберете етапи за участие</h3>
                        <div className="space-y-3 mt-4">
                            {stages.map((stage, index) => (
                                <div key={index} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`stage-${index}`}
                                        checked={selectedStages.includes(stage.name)}
                                        onChange={() => handleStageToggle(stage.name)}
                                        className="mr-2"
                                    />
                                    <label htmlFor={`stage-${index}`} className="text-gray-700">
                                        {stage.date} - {stage.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                        >
                            Регистрирай се
                        </button>
                    </div>
                </form>
                <div className="mt-6 text-center">
                    <Link to="/" className="text-blue-500 hover:underline">
                        Назад към началната страница
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterEvent;
