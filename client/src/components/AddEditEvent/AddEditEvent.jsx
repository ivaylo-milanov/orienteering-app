import { useState } from "react";

export default function AddEditEvent() {
    const [stages, setStages] = useState([
        { name: "", description: "", date: "" },
    ]);
    const [selectedAgeGroups, setSelectedAgeGroups] = useState([]);
    const [formData, setFormData] = useState({
        eventName: "",
        eventDate: "",
        registrationDeadline: "",
        club: "",
        ageGroups: [],
    });

    const ageGroups = [
        "M12", "W12", "M18", "W18", "M25", "W25", "M35", "W35", "M45", "W45", "M55", "W55", "M65", "W65", "M75", "W75", "Open",
    ];

    const handleStageChange = (index, field, value) => {
        const updatedStages = [...stages];
        updatedStages[index][field] = value;
        setStages(updatedStages);
    };

    const addStage = () => {
        setStages([...stages, { name: "", description: "", date: "" }]);
    };

    const removeStage = (index) => {
        const updatedStages = stages.filter((_, i) => i !== index);
        setStages(updatedStages);
    };

    const toggleAgeGroupSelection = (ageGroup) => {
        setSelectedAgeGroups((prev) => {
            if (prev.includes(ageGroup)) {
                return prev.filter((item) => item !== ageGroup);
            } else {
                return [...prev, ageGroup];
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Set the selected age groups into the form data
        setFormData((prev) => ({
            ...prev,
            ageGroups: selectedAgeGroups,
        }));
        // You can submit form data here, e.g., send it to the server
        console.log("Form Data Submitted: ", formData);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-4xl p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-700">
                    Create Event
                </h2>
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label
                            htmlFor="eventName"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Event Name
                        </label>
                        <input
                            type="text"
                            id="eventName"
                            name="eventName"
                            required
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="eventDate"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Event Date
                        </label>
                        <input
                            type="date"
                            id="eventDate"
                            name="eventDate"
                            required
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="registrationDeadline"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Registration Deadline
                        </label>
                        <input
                            type="date"
                            id="registrationDeadline"
                            name="registrationDeadline"
                            required
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="club"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Club
                        </label>
                        <select
                            id="club"
                            name="club"
                            required
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Club</option>
                            <option value="clubA">Club A</option>
                            <option value="clubB">Club B</option>
                            <option value="clubC">Club C</option>
                            {/* Add more clubs as needed */}
                        </select>
                    </div>

                    {/* Age Groups Buttons */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600">
                            Select Age Groups
                        </label>
                        <div className="flex flex-wrap mt-4">
                            {ageGroups.map((ageGroup) => (
                                <button
                                key={ageGroup}
                                type="button"
                                onClick={() => toggleAgeGroupSelection(ageGroup)}
                                className={`px-4 py-2 m-2 text-sm font-semibold rounded-md 
                                    ${selectedAgeGroups.includes(ageGroup) 
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-gray-800"} 
                                    hover:bg-blue-600 hover:text-white 
                                    cursor-pointer`}
                            >
                                {ageGroup}
                            </button>
                            ))}
                        </div>
                    </div>

                    {/* Stages Section */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600">
                            Stages
                        </label>
                        <div className="mt-4 space-y-4">
                            {stages.map((stage, index) => (
                                <div key={index}>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-1">
                                            <label
                                                htmlFor={`stageName-${index}`}
                                                className="block text-sm font-medium text-gray-600"
                                            >
                                                Stage Name
                                            </label>
                                            <input
                                                type="text"
                                                id={`stageName-${index}`}
                                                name={`stageName-${index}`}
                                                value={stage.name}
                                                onChange={(e) =>
                                                    handleStageChange(
                                                        index,
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label
                                                htmlFor={`stageDate-${index}`}
                                                className="block text-sm font-medium text-gray-600"
                                            >
                                                Stage Date
                                            </label>
                                            <input
                                                type="date"
                                                id={`stageDate-${index}`}
                                                name={`stageDate-${index}`}
                                                value={stage.date}
                                                onChange={(e) =>
                                                    handleStageChange(
                                                        index,
                                                        "date",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                    {index < stages.length - 1 && (
                                        <div className="my-4 border-t border-gray-300"></div>
                                    )}
                                    <div className="flex justify-between items-center mt-4">
                                        {stages.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeStage(index)
                                                }
                                                className="text-sm text-red-500 hover:underline"
                                            >
                                                Remove Stage
                                            </button>
                                        )}
                                        {stages.length - 1 === index && (
                                            <button
                                                type="button"
                                                onClick={addStage}
                                                className="text-sm text-blue-500 hover:underline"
                                            >
                                                Add Stage
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Create Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
