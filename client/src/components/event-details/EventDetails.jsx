import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import { useEvent, useDeleteEvent } from "../../api/eventsApi";
import { useClub } from "../../api/clubsApi";
import useAuth from "../../hooks/useAuth";
import DeleteConfirmation from "../delete-confirmation/DeleteConfirmation";
import sortAgeGroups from "../../utils/sort";

const EventDetails = () => {
    const { isAuthenticated } = useAuth();
    const { eventId } = useParams();
    const { event } = useEvent(eventId);
    const { club } = useClub(event?.clubId);
    const [open, setOpen] = useState(false);
    const { del } = useDeleteEvent();
    const navigate = useNavigate();

    const deleteHandler = async () => {
        await del(eventId);
        setOpen(false);
        navigate("/events");
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="flex justify-center flex-col max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">{event?.eventName}</h1>

                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Event Date</h3>
                    <p className="text-lg text-gray-600">{event?.eventDate}</p>
                </div>

                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Organiser</h3>
                    <p className="text-lg text-gray-600">{club?.name}</p>
                </div>

                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Stages</h3>
                    <ul className="list-disc pl-5 text-gray-600 space-y-3">
                        {event?.stages?.map((stage, index) => (
                            <li key={index} className="text-lg">{stage.date} - {stage.name}</li>
                        ))}
                    </ul>
                </div>

                <div className="mb-8 max-w-90">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Age Groups</h3>
                    <p className="text-lg text-gray-600">{event?.ageGroups?.sort(sortAgeGroups).join(", ")}</p>
                </div>

                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Registration Deadline</h3>
                    <p className="text-lg text-gray-600">{event?.registrationDeadline}</p>
                </div>

                <div className="flex justify-center gap-6">
                    {isAuthenticated && (
                        <>
                            <Link
                                to={`/events/${event?._id}/edit`}
                                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                Edit
                            </Link>
                            <button 
                                onClick={() => setOpen(true)}
                                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105">
                                Delete
                            </button>
                        </>
                    )}
                </div>
                {open && <DeleteConfirmation open={open} setOpen={setOpen} onDelete={deleteHandler}/>}
            </div>
        </div>
    );
};

export default EventDetails;
