import { useState } from "react";
import { useClubs } from "../../api/clubsApi";
import { useCreateEvent } from "../../api/eventsApi";
import { useNavigate } from "react-router";
import { useAgeGroups } from "../../api/ageGroupsApi";

export default function AddEditEvent() {
    const [stages, setStages] = useState([{ name: "", date: "" }]);
    const [selectedAgeGroups, setSelectedAgeGroups] = useState([]);
    const [allIsClicked, setAllIsClicked] = useState(false);
    const { ageGroups } = useAgeGroups();
    const { clubs } = useClubs();
    const { create } = useCreateEvent();
    const navigate = useNavigate();

    const addStage = () => {
        setStages([...stages, { name: "", date: "" }]);
    };

    const removeStage = (index) => {
        const updatedStages = stages.filter((_, i) => i !== index);
        setStages(updatedStages);
    };

    const toggleAgeGroupSelection = (ageGroup) => {
        setSelectedAgeGroups((prev) => {
            if (prev.includes(ageGroup.name)) {
                if (allIsClicked) {
                    setAllIsClicked(false);
                }

                return prev.filter((item) => item !== ageGroup.name);
            } else {
                return [...prev, ageGroup.name];
            }
        });
    };

    const setAllAgeGroups = () => {
        setAllIsClicked(prevState => {
            const newState = !prevState; 
            setSelectedAgeGroups(prev => {
                if (newState) {
                    return [...prev, ...ageGroups.map(f => f.name)];
                } else {
                    return [];
                }
            });
            return newState;
        });
    }

    const onChangeStagesHandler = (e, index) => {
        const updatedStages = [...stages];

        updatedStages[index][e.target.name] = e.target.value;
        setStages(updatedStages);
    };

    const createHandler = async (formData) => {
        const {name, date, ...entries} = Object.fromEntries(formData);

        if (entries.registrationDeadline >= entries.eventDate) {
            console.log("The registration deadline is bigger than the event date");
            return;
        }

        const data = {
            ...entries,
            stages: stages,
            ageGroups: selectedAgeGroups,
        };

        create(data);

        navigate("/events");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-4xl p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-700">
                    Create Event
                </h2>
                <form action={createHandler} className="mt-6 space-y-4">
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
                            htmlFor="clubId"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Club
                        </label>
                        <select
                            id="clubId"
                            name="clubId"
                            required
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Club</option>
                            {clubs.map((club) => (
                                <option key={club._id} value={club._id}>
                                    {club.name}
                                </option>
                            ))}
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
                                    key={ageGroup._id}
                                    type="button"
                                    onClick={() =>
                                        toggleAgeGroupSelection(ageGroup)
                                    }
                                    className={`px-4 py-2 m-2 text-sm font-semibold rounded-md 
                                    ${
                                        selectedAgeGroups.includes(
                                            ageGroup.name
                                        )
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-200 text-gray-800"
                                    } 
                                    hover:bg-blue-600 hover:text-white cursor-pointer`}
                                >
                                    {ageGroup.name}
                                </button>
                            ))}
                            <button
                                type="button"
                                onClick={setAllAgeGroups}
                                className={`px-4 py-2 m-2 text-sm font-semibold rounded-md 
                                    ${
                                        allIsClicked || selectedAgeGroups.length === ageGroups.length
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-200 text-gray-800"
                                    } 
                                    hover:bg-blue-600 hover:text-white cursor-pointer`}
                            >
                                all
                            </button>
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
                                                htmlFor={`name`}
                                                className="block text-sm font-medium text-gray-600"
                                            >
                                                Stage Name
                                            </label>
                                            <input
                                                type="text"
                                                id={`name`}
                                                name={`name`}
                                                value={stage.name}
                                                onChange={(e) =>
                                                    onChangeStagesHandler(
                                                        e,
                                                        index
                                                    )
                                                }
                                                required
                                                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label
                                                htmlFor={`date`}
                                                className="block text-sm font-medium text-gray-600"
                                            >
                                                Stage Date
                                            </label>
                                            <input
                                                type="date"
                                                id={`date`}
                                                name={`date`}
                                                value={stage.date}
                                                onChange={(e) =>
                                                    onChangeStagesHandler(
                                                        e,
                                                        index
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
}
