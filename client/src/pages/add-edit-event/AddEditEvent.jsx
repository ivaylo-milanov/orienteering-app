import { useEffect, useState } from "react";
import { useCreateEvent, useEditEvent, useEvent } from "../../api/eventsApi";
import { useAgeGroups } from "../../api/ageGroupsApi";
import { useNavigate, useParams } from "react-router";

import ClubField from "../../components/inputs/club-field/ClubField";
import AgeGroupsField from "../../components/inputs/age-groups-field/AgeGroupsField";
import StagesField from "../../components/inputs/stages-field/StagesField";
import Label from "../../components/label/Label";

function toDateInputValue(value) {
    if (!value) return "";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "";
    return d.toISOString().slice(0, 10);
}

function clubIdFromEvent(event) {
    if (!event?.club) return "";
    const c = event.club;
    return typeof c === "object" && c !== null
        ? String(c._id ?? "")
        : String(c);
}

export default function AddEditEvent() {
    const { eventId } = useParams();
    const { event } = useEvent(eventId);
    const { ageGroups: allAgeGroups } = useAgeGroups();
    const { create } = useCreateEvent();
    const { edit } = useEditEvent();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        date: "",
        registrationDeadline: "",
        club: "",
        stages: [{ name: "", date: "" }],
        ageGroups: []
    });

    useEffect(() => {
        if (event) {
            setFormData({
                name: event.name || "",
                date: toDateInputValue(event.date),
                registrationDeadline: toDateInputValue(event.registrationDeadline),
                club: clubIdFromEvent(event),
                stages:
                    event.stages?.length > 0
                        ? event.stages.map((s) => ({
                              name: s.name || "",
                              date: toDateInputValue(s.date)
                          }))
                        : [{ name: "", date: "" }],
                ageGroups: (event.ageGroups || []).map((ag) =>
                    typeof ag === "object" && ag !== null ? ag.name : ag
                )
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

    const buildApiPayload = () => {
        const ageGroupIds = formData.ageGroups
            .map((name) => allAgeGroups.find((a) => a.name === name)?._id)
            .filter(Boolean);

        return {
            name: formData.name,
            date: formData.date,
            registrationDeadline: formData.registrationDeadline,
            club: formData.club,
            stages: formData.stages.map((s) => ({
                name: s.name,
                date: s.date
            })),
            ageGroups: ageGroupIds
        };
    };

    const isValid = () => {
        if (formData.registrationDeadline >= formData.date) {
            console.log("The registration deadline must be before the event date");
            return false;
        }
        return true;
    };

    const createHandler = async () => {
        if (isValid()) {
            create(buildApiPayload());
            navigate("/events");
        }
    };

    const updateHandler = async () => {
        if (isValid()) {
            edit(buildApiPayload(), eventId);
            navigate(`/events/details/${eventId}`);
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
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Event Name"
                        />
                    </div>
                    <div className="form-group">
                        <Label title="Event Date" />
                        <input
                            name="date"
                            type="date"
                            value={formData.date}
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
                            club={formData.club}
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
