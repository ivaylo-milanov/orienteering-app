import { useState } from "react";

import ClubField from "../../inputs/club-field/ClubField";

const CatalogFilter = ({ searchParams, changeSearchParams }) => { 
    const [club, setClub] = useState("");
    const [sort, setSort] = useState("");

    const filterHandler = (formData) => {
        changeSearchParams(Object.fromEntries(formData));
    };

    const changeClubHandler = (e) => {
        setClub(e.target.value);
    };

    const sortHandler = (e) => {
        const value = e.target.value;
        setSort(value);

        const [field, dir] = value.split('_');

        changeSearchParams({
            sort: { dir: dir, field: field },
        });
    };

    return (
        <div className="w-full bg-white p-8 rounded-2xl shadow-xl mt-10">
            <h2 className="text-3xl font-medium text-gray-900 mb-8 text-center">Event Filters</h2>
            <form action={filterHandler} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700">Club</label>
                        <ClubField
                            changeClubHandler={changeClubHandler}
                            club={club}
                            className="mt-2 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-150 ease-in-out"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700">Event Year</label>
                        <input
                            defaultValue={searchParams.get("eventDate") || ""}
                            type="text"
                            name="eventDate"
                            placeholder="Enter year"
                            className="mt-2 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-150 ease-in-out"
                        />
                    </div>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-700">Search Events</label>
                    <input
                        defaultValue={searchParams.get("eventName") || ""}
                        name="eventName"
                        type="text"
                        placeholder="Search events"
                        className="mt-2 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-150 ease-in-out"
                    />
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <label className="text-sm font-medium text-gray-600">Sort</label>
                        <select onChange={sortHandler} value={sort} className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 transition duration-200 ease-in-out">
                            <option value="eventDate_asc">Event Date - Ascending</option>
                            <option value="eventDate_desc">Event Date - Descending</option>
                            <option value="eventName_asc">Event Name - Ascending</option>
                            <option value="eventName_desc">Event Name - Descending</option>
                        </select>
                    </div>

                    <input
                        type="submit"
                        value="Apply Filters"
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
                    />
                </div>
            </form>
        </div>
    );
};

export default CatalogFilter;
