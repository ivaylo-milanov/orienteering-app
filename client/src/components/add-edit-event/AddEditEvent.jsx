import { useEffect, useState } from "react";

import { useCreateEvent, useEditEvent, useEvent } from "../../api/eventsApi";
import { useNavigate, useParams } from "react-router";
import { useAgeGroups } from "../../api/ageGroupsApi"

import ClubField from "../inputs/club-field/ClubField";
import AgeGroupsField from "../inputs/age-groups-field/AgeGroupsField";
import StagesField from "../inputs/stages-field/StagesField";
import Label from "../label/Label";

export default function AddEditEvent() {
    const { ageGroups } = useAgeGroups();
    const { eventId } = useParams();
    const { event } = useEvent(eventId);
    const [club, setClub] = useState("");
    const [stages, setStages] = useState([{ name: "", date: "" }]);
    const [selectedAgeGroups, setSelectedAgeGroups] = useState([]);
    const { create } = useCreateEvent();
    const { edit } = useEditEvent();
    const navigate = useNavigate();

    useEffect(() => {
        if (event) {
            setClub(event.clubId);
            setStages(event.stages);
            setSelectedAgeGroups(event.ageGroups);
        }
    }, [event]);

    const addStage = () =>
        setStages((prev) => [...prev, { name: "", date: "" }]);
    const removeStage = (index) =>
        setStages((prev) => prev.filter((_, i) => i !== index));

    const toggleAgeGroupSelection = (ageGroup) => {
        setSelectedAgeGroups((prev) =>
            prev.includes(ageGroup.name)
                ? prev.filter((item) => item !== ageGroup.name)
                : [...prev, ageGroup.name]
        );
    };

    const setAllAgeGroups = () => {
        setSelectedAgeGroups(
            selectedAgeGroups.length === ageGroups.length
                ? []
                : ageGroups.map((f) => f.name)
        );
    };

    const onChangeStagesHandler = (e, index) => {
        const updatedStages = [...stages];
        updatedStages[index][e.target.name] = e.target.value;
        setStages(updatedStages);
    };

    const validateData = (formData) => {
        const data = Object.fromEntries(formData);
        if (data.registrationDeadline >= data.eventDate) {
            console.log(
                "The registration deadline must be before the event date"
            );
            return null;
        }
        return { ...data, stages, ageGroups: selectedAgeGroups };
    };

    const changeClubHandler = (e) => {
        setClub(e.target.value);
    };

    const createHandler = async (formData) => {
        const data = validateData(formData);
        if (data) {
            create(data);
            navigate("/events");
        }
    };

    const updateHandler = async (formData) => {
        const data = validateData(formData);

        if (data) {
            edit(data, eventId);
            navigate(`/events/${eventId}/details`);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-4xl p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-700">
                    Create Event
                </h2>
                <form
                    action={eventId ? updateHandler : createHandler}
                    className="mt-6 space-y-4"
                >
                    <div className="form-group">
                        <Label title="Event Name" />
                        <input
                            name="eventName"
                            type="eventName"
                            defaultValue={event?.eventName}
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
                            defaultValue={event?.eventDate}
                            required
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="form-group">
                        <Label title="Registration Deadline" />
                        <input
                            name="registrationDeadline"
                            type="date"
                            defaultValue={event?.registrationDeadline}
                            required
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="form-group">
                        <Label title="Club" />
                        <ClubField
                            club={club}
                            changeClubHandler={changeClubHandler}
                            classes="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <Label title="Select Age Groups" />
                        <div className="flex flex-wrap mt-4">
                            <AgeGroupsField
                                selectedAgeGroups={selectedAgeGroups}
                                toggleAgeGroupSelection={
                                    toggleAgeGroupSelection
                                }
                                setAllAgeGroups={setAllAgeGroups}
                                ageGroups={ageGroups}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <Label title="Stages" />
                        <div className="mt-4 space-y-4">
                            <StagesField
                                stages={stages}
                                onChangeStagesHandler={onChangeStagesHandler}
                                removeStage={removeStage}
                                addStage={addStage}
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
