import { Link } from "react-router-dom";

const Catalog = () => {
    const events = [
        {
            id: 1,
            name: "Spring Orienteering Challenge",
            eventDate: "2025-04-10",
            registrationDeadline: "2025-04-05",
            club: "Club A",
            stages: [
                { name: "Long", date: "2025-04-10" },
                { name: "Middle", date: "2025-04-11" },
                { name: "Sprint", date: "2025-04-12" },
            ],
            registrationCount: 200,
        },
        {
            id: 2,
            name: "Summer Orienteering Invitational",
            eventDate: "2025-06-15",
            registrationDeadline: "2025-06-10",
            club: "Club B",
            stages: [
                { name: "Stage A", date: "2025-06-15" },
                { name: "Stage B", date: "2025-06-16" },
                { name: "Stage C", date: "2025-06-17" },
            ],
            registrationCount: 200,
        },
        {
            id: 3,
            name: "Autumn Orienteering Race",
            eventDate: "2025-09-25",
            registrationDeadline: "2025-09-20",
            club: "Club C",
            stages: [
                { name: "Stage X", date: "2025-09-25" },
                { name: "Stage Y", date: "2025-09-26" },
                { name: "Stage Z", date: "2025-09-27" },
            ],
            registrationCount: 200,
        },
        // Add more events as needed
    ];

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-7xl p-8 space-y-6 bg-white rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-center text-gray-700">
                        Events
                    </h2>
                    <div className="mb-4 flex justify-between items-center">
                        <div className="flex space-x-4">
                            <select className="p-2 border border-gray-300 rounded-md">
                                <option value="">All Clubs</option>
                                <option value="NY Orienteers">
                                    NY Orienteers
                                </option>
                                <option value="Redwood Runners">
                                    Redwood Runners
                                </option>
                                <option value="Tahoe Trekkers">
                                    Tahoe Trekkers
                                </option>
                                <option value="Denver Navigators">
                                    Denver Navigators
                                </option>
                            </select>
                            <select className="p-2 border border-gray-300 rounded-md">
                                <option value="">All Years</option>
                                <option value="2025">2025</option>
                            </select>
                        </div>
                        <div className="flex space-x-4">
                            <input
                                type="text"
                                placeholder="Search events"
                                className="p-2 border border-gray-300 rounded-md"
                            />
                            <button className="p-2 bg-blue-500 text-white rounded-md">
                                Sort by Date
                            </button>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {events.map((event) => (
                            <div
                                key={event.id}
                                className="bg-white p-6 rounded-2xl shadow-md border border-gray-300"
                            >
                                <h3 className="text-2xl font-semibold text-gray-900">
                                    {event.name}
                                </h3>

                                <div className="mt-4 grid grid-cols-3 gap-2 text-gray-700">
                                    <p className="border-l-4 border-blue-500 pl-3">
                                        <span className="font-medium">
                                            Event Date:
                                        </span>{" "}
                                        {event.eventDate}
                                    </p>
                                    <p className="border-l-4 border-red-500 pl-3">
                                        <span className="font-medium">
                                            Deadline:
                                        </span>{" "}
                                        {event.registrationDeadline}
                                    </p>
                                    <p className="border-l-4 border-green-500 pl-3">
                                        <span className="font-medium">
                                            Club:
                                        </span>{" "}
                                        {event.club}
                                    </p>
                                </div>

                                <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-sm">
                                    <div className="mt-2 flex flex-row gap-5 text-gray-800">
                                        {event.stages.map((stage, index) => (
                                            <span key={index}>
                                                <strong>{stage.name}</strong>:{" "}
                                                {stage.date}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-6 flex gap-3">
                                    <Link
                                        to={`/details`}
                                        className="flex-1 text-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all"
                                    >
                                        View Details
                                    </Link>
                                    <Link
                                        to={`/register/${event.id}`}
                                        className="flex-1 text-center px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-all"
                                    >
                                        Register
                                    </Link>
                                    <button className="flex-1 text-center px-4 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition-all">
                                        Competitors ({event.registrationCount})
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Catalog;
