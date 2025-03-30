import { useState } from "react";
import { useClubs } from "../../../api/clubsApi";

const CatalogFilter = ({
    searchParams,
    changeSearchParams
}) => {
    const { clubs } = useClubs();
    const [_, setSortDir] = useState(null);
    const [club, setClub] = useState(""); 

    const filterHandler = (formData) => {
        changeSearchParams(Object.fromEntries(formData));
    };

    const changeClubHandler = (e) => {
        setClub(e.target.value);
    }

    const sortHandler = () => {
        setSortDir((prevDir) => {
            const newDir = prevDir === null ? "asc" : prevDir === "asc" ? "desc" : null;
            changeSearchParams({
                sort: { dir: newDir, field: "eventDate" }
            });
            return newDir;
        });
    };

    return (
        <div className="bg-gray-50 p-6 rounded-md shadow-md">
            <form action={(filterHandler)} className="space-y-6">
                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium text-gray-600">
                            Club
                        </label>
                        <select
                            value={club}
                            onChange={changeClubHandler}
                            name="clubId"
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="">All Clubs</option>
                            {clubs.map((club) => (
                                <option key={club._id} value={club._id}>
                                    {club.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium text-gray-600">
                            Event Year
                        </label>
                        <input
                            defaultValue={searchParams.get("eventDate") || ""}
                            type="text"
                            name="eventDate"
                            placeholder="Enter year"
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium text-gray-600">
                            Search Events
                        </label>
                        <input
                            defaultValue={searchParams.get("eventName") || ""}
                            name="eventName"
                            type="text"
                            placeholder="Search events"
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div className="flex items-end">
                        <button
                            onClick={sortHandler}
                            className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Sort by Date
                        </button>
                    </div>
                </div>

                <div className="flex justify-center">
                    <input
                        type="submit"
                        value="Filter"
                        className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
            </form>
        </div>
    );
};

export default CatalogFilter;
