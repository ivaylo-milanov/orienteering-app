import React, { useState } from "react";

const competitorsData = [
    { id: 1, name: "John Doe", ageGroup: "M21", club: "Orienteering Club A", chipNumber: "123456", stages: ["Stage 1", "Stage 2", "Stage 4"] },
    { id: 2, name: "Jane Smith", ageGroup: "W18", club: "Orienteering Club B", chipNumber: "654321", stages: ["Stage 1", "Stage 3"] },
    { id: 3, name: "Alice Brown", ageGroup: "W40", club: "Orienteering Club C", chipNumber: "789123", stages: ["Stage 2", "Stage 4"] },
];

const uniqueValues = (key) => [...new Set(competitorsData.flatMap(comp => (Array.isArray(comp[key]) ? comp[key] : [comp[key]])))];

export default function Competitors() {
    const [filters, setFilters] = useState({
        name: "",
        ageGroup: "",
        club: "",
        chipNumber: "",
        stage: "",
    });

    const [filteredCompetitors, setFilteredCompetitors] = useState(competitorsData);

    // Handle input changes
    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    // Apply Filters on Button Click
    const applyFilters = () => {
        setFilteredCompetitors(competitorsData.filter(competitor =>
            competitor.name.toLowerCase().includes(filters.name.toLowerCase()) &&
            (filters.ageGroup === "" || competitor.ageGroup === filters.ageGroup) &&
            (filters.club === "" || competitor.club === filters.club) &&
            competitor.chipNumber.includes(filters.chipNumber) &&
            (filters.stage === "" || competitor.stages.includes(filters.stage))
        ));
    };

    return (
        <div className="max-w-7xl mx-auto p-8 min-h-[85vh]">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Competitors</h1>

            {/* Filters - Inline Layout */}
            <div className="mb-6 flex flex-wrap items-center gap-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Filter by Name"
                    value={filters.name}
                    onChange={handleFilterChange}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                />
                <select
                    name="ageGroup"
                    value={filters.ageGroup}
                    onChange={handleFilterChange}
                    className="p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-400"
                >
                    <option value="">All Age Groups</option>
                    {uniqueValues("ageGroup").map((age) => (
                        <option key={age} value={age}>{age}</option>
                    ))}
                </select>
                <select
                    name="club"
                    value={filters.club}
                    onChange={handleFilterChange}
                    className="p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-400"
                >
                    <option value="">All Clubs</option>
                    {uniqueValues("club").map((club) => (
                        <option key={club} value={club}>{club}</option>
                    ))}
                </select>
                <input
                    type="text"
                    name="chipNumber"
                    placeholder="Filter by Chip Number"
                    value={filters.chipNumber}
                    onChange={handleFilterChange}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                />
                <select
                    name="stage"
                    value={filters.stage}
                    onChange={handleFilterChange}
                    className="p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-400"
                >
                    <option value="">All Stages</option>
                    {uniqueValues("stages").map((stage) => (
                        <option key={stage} value={stage}>{stage}</option>
                    ))}
                </select>
                {/* Inline Filter Button */}
                <button
                    onClick={applyFilters}
                    className="bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600 transition"
                >
                    Apply Filters
                </button>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-lg shadow-lg">
                <table className="w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-blue-600 text-white text-left">
                            <th className="px-6 py-4 font-semibold">Name</th>
                            <th className="px-6 py-4 font-semibold">Age Group</th>
                            <th className="px-6 py-4 font-semibold">Club</th>
                            <th className="px-6 py-4 font-semibold">Chip Number</th>
                            <th className="px-6 py-4 font-semibold">Stages</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCompetitors.map((comp) => (
                            <tr key={comp.id} className="border-b border-gray-300 hover:bg-gray-100">
                                <td className="px-6 py-4">{comp.name}</td>
                                <td className="px-6 py-4">{comp.ageGroup}</td>
                                <td className="px-6 py-4">{comp.club}</td>
                                <td className="px-6 py-4">{comp.chipNumber}</td>
                                <td className="px-6 py-4">{comp.stages.join(", ")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
