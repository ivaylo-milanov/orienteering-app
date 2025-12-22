import { useState } from "react";
import ClubField from "../inputs/club-field/ClubField";

const Filter = ({ searchParams, changeSearchParams }) => {
    const [club, setClub] = useState(searchParams.get("clubId") || "");

    const filterHandler = (formData) => {
        const data = Object.fromEntries(formData);
        
        if (club) data.clubId = club;

        Object.keys(data).forEach(key => {
            if (!data[key]) delete data[key];
        });

        changeSearchParams(data);
    };

    const changeClubHandler = (e) => {
        setClub(e.target.value);
    };

    const sortHandler = (e) => {
        const value = e.target.value;
        changeSearchParams({
            sort: value,
        });
    };

    return (
        <div className="w-full bg-white p-8 rounded-2xl shadow-xl mt-10">
            <h2 className="text-3xl font-medium text-gray-900 mb-8 text-center">
                Event Filters
            </h2>
            <form action={filterHandler} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700">
                            Club
                        </label>
                        <ClubField
                            onChange={changeClubHandler}
                            club={club}
                            name="clubId" 
                            className="mt-2 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition duration-150"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700">
                            Event Year
                        </label>
                        <input
                            defaultValue={searchParams.get("date") || ""}
                            type="text"
                            name="date" 
                            placeholder="e.g. 2025"
                            className="mt-2 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition duration-150"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700">
                            Search Events
                        </label>
                        <input
                            defaultValue={searchParams.get("name") || ""}
                            name="name" 
                            type="text"
                            placeholder="Search events"
                            className="mt-2 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition duration-150"
                        />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center space-x-4">
                        <label className="text-sm font-medium text-gray-600">
                            Sort
                        </label>
                        <select
                            onChange={sortHandler}
                            value={searchParams.get("sort") || ""}
                            className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-600 focus:ring-2 focus:ring-indigo-500 transition duration-200"
                        >
                            <option value="">Newest First (Default)</option>
                            <option value="date">Date: Oldest to Newest</option>
                            <option value="-date">Date: Newest to Oldest</option>
                            <option value="name">Name: A-Z</option>
                            <option value="-name">Name: Z-A</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                    >
                        Apply Filters
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Filter;