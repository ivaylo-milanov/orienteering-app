import { Link, useParams } from "react-router";
import { useEvent } from "../../api/eventsApi";
import { useClub } from "../../api/clubsApi";

const EventDetails = () => {
    const { eventId } = useParams();
    const { event } = useEvent(eventId);
    const { club } = useClub(event.clubId);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                {/* Event Header */}
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4">
                    {event?.eventName}
                </h1>

                {/* Organizers and Club */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div className="text-gray-700">
                        <h3 className="font-semibold text-lg">Organiser</h3>
                        <p>{club?.name}</p>
                    </div>
                </div>

                {/* Event Stages */}
                <div className="mb-6">
                    <h3 className="font-semibold text-lg text-gray-700 mb-4">Етапи</h3>
                    <ul className="list-disc pl-5 text-gray-600 space-y-2">
                        {event?.stages?.map((stage, index) => (
                            <li key={index}>
                                {stage.date} - {stage.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Age Groups */}
                <div className="mb-6">
                    <h3 className="font-semibold text-lg text-gray-700 mb-4">Възрастови групи</h3>
                    <div className="space-y-2 text-gray-600">
                        {event?.ageGroups?.join(', ')}
                    </div>
                </div>

                {/* Registration Deadline */}
                <div className="mb-6">
                    <h3 className="font-semibold text-lg text-gray-700 mb-4">Срокове за заявка</h3>
                    <p className="text-gray-600">{event?.registrationDeadline} - краен срок</p>
                </div>

                {/* Call to Action Buttons */}
                <div className="flex justify-center gap-6">
                    <Link
                        to={`/event/${event?._id}/edit`}
                        className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
                    >
                        Edit
                    </Link>
                    <Link
                        to={`/event/${event?._id}/delete`}
                        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Delete
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
