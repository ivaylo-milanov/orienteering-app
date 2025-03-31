import { useEffect, useState } from "react";
import { useCreateEvent, useEditEvent, useEvent } from "../../api/eventsApi";
import { useNavigate, useParams } from "react-router";

import ClubField from "../inputs/club-field/ClubField";
import AgeGroupsField from "../inputs/age-groups-field/AgeGroupsField";
import StagesField from "../inputs/stages-field/StagesField";
import Label from "../label/Label";

export default function AddEditEvent() {
    const { eventId } = useParams();
    const { event } = useEvent(eventId);
    const { create } = useCreateEvent();
    const { edit } = useEditEvent();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        eventName: "",
        eventDate: "",
        registrationDeadline: "",
        clubId: "",
        stages: [{ name: "", date: "" }],
        ageGroups: []
    });

    useEffect(() => {
        if (event) {
            setFormData({
                eventName: event.eventName || "",
                eventDate: event.eventDate || "",
                registrationDeadline: event.registrationDeadline || "",
                clubId: event.clubId || "",
                stages: event.stages || [{ name: "", date: "" }],
                ageGroups: event.ageGroups || []
            });
        }
    }, [event]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const isValid = () => {
        if (formData.registrationDeadline >= formData.eventDate) {
            console.log("The registration deadline must be before the event date");
            return false;
        }
        return true;
    };

    const createHandler = async () => {
        if (isValid()) {
            create(formData);
            navigate("/events");
        }
    };

    const updateHandler = async () => {
        if (isValid()) {
            edit(formData, eventId);
            navigate(`/events/${eventId}/details`);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-4xl p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-700">
                    {eventId ? "Edit Event" : "Create Event"}
                </h2>
                <form
                    action={eventId ? updateHandler : createHandler}
                    className="mt-6 space-y-4"
                >
                    <div className="form-group">
                        <Label title="Event Name" />
                        <input
                            name="eventName"
                            type="text"
                            value={formData.eventName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Event Name"
                        />
                    </div>
                    <div className="form-group">
                        <Label title="Event Date" />
                        <input
                            name="eventDate"
                            type="date"
                            value={formData.eventDate}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="form-group">
                        <Label title="Registration Deadline" />
                        <input
                            name="registrationDeadline"
                            type="date"
                            value={formData.registrationDeadline}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="form-group">
                        <Label title="Club" />
                        <ClubField
                            club={formData.clubId}
                            onChange={handleChange}
                            classes="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <Label title="Select Age Groups" />
                        <div className="flex flex-wrap mt-4">
                            <AgeGroupsField
                                selectedAgeGroups={formData.ageGroups}
                                setFormData={setFormData}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <Label title="Stages" />
                        <div className="mt-4 space-y-4">
                            <StagesField
                                stages={formData.stages}
                                setFormData={setFormData}
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
                        >
                            {eventId ? "Update Event" : "Create Event"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
