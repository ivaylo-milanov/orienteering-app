import { Link } from "react-router";
import { useClub } from "../../../api/clubsApi";

const CatalogEvent = ({
    _id,
    eventName,
    eventDate,
    registrationDeadline,
    clubId,
    stages,
}) => {
    const { club } = useClub(clubId);

    return (
        <div
            key={_id}
            className="bg-white p-6 rounded-2xl shadow-md border border-gray-300"
        >
            <h3 className="text-2xl font-semibold text-gray-900">
                {eventName}
            </h3>

            {/* Event Info Row */}
            <div className="mt-4 flex items-center justify-between text-gray-700">
                <div className="grid grid-cols-3 gap-2">
                    <p className="border-l-4 border-blue-500 pl-3">
                        <span className="font-medium">Event Date:</span>{" "}
                        {eventDate}
                    </p>
                    <p className="border-l-4 border-red-500 pl-3">
                        <span className="font-medium">Deadline:</span>{" "}
                        {registrationDeadline}
                    </p>
                    <p className="border-l-4 border-green-500 pl-3">
                        <span className="font-medium">Club:</span> {club.name}
                    </p>
                </div>
                <div>
                    <Link
                        to={`/events/${_id}/details`}
                        className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all"
                    >
                        View Details
                    </Link>
                </div>
            </div>

            {/* Stages Section */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-sm">
                <div className="mt-2 flex flex-row gap-5 text-gray-800">
                    {stages.map((stage, index) => (
                        <span key={index}>
                            <strong>{stage.name}</strong>: {stage.date}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CatalogEvent;
