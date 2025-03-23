import { Link } from "react-router";

const eventsData = [
    {
        id: 1,
        name: "Spring Marathon",
        startDate: "2025-04-01",
        endDate: "2025-04-03",
        registrationDeadline: "2025-03-15",
        club: "Running Club A",
        registrationCount: 150,
        stages: [
            { name: "5K Fun Run", date: "2025-04-01" },
            { name: "Half Marathon", date: "2025-04-02" },
            { name: "Full Marathon", date: "2025-04-03" },
        ],
    },
    {
        id: 2,
        name: "Summer Triathlon",
        startDate: "2025-06-10",
        endDate: "2025-06-12",
        registrationDeadline: "2025-05-25",
        club: "Triathlon Club B",
        registrationCount: 200,
        stages: [
            { name: "Swimming", date: "2025-06-10" },
            { name: "Cycling", date: "2025-06-11" },
            { name: "Running", date: "2025-06-12" },
        ],
    },
];

const EventDetails = () => {
    const event = eventsData.find((event) => event.id === 1);

    if (!event) {
        return <div>Event not found</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                {/* Event Header */}
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4">
                    Купа "Петрѝч кале"
                </h1>

                {/* Organizers and Club */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div className="text-gray-700">
                        <h3 className="font-semibold text-lg">Организатори</h3>
                        <p>Бегун, БФО</p>
                    </div>
                </div>

                {/* Event Stages */}
                <div className="mb-6">
                    <h3 className="font-semibold text-lg text-gray-700 mb-4">Етапи</h3>
                    <ul className="list-disc pl-5 text-gray-600 space-y-2">
                        {event.stages.map((stage, index) => (
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
                        <p>М12, М14, М35, М40, М45, М50, М55, М60, М65, М70, М75, М80</p>
                        <p>Ж12, Ж14, Ж35, Ж40, Ж45, Ж50, Ж55, Ж60, Ж65, Ж70, Ж75, Ж80</p>
                        <p>Отворен</p>
                    </div>
                </div>

                {/* Registration Deadline */}
                <div className="mb-6">
                    <h3 className="font-semibold text-lg text-gray-700 mb-4">Срокове за заявка</h3>
                    <p className="text-gray-600">14.04.2025 23:59:59 - краен срок</p>
                </div>

                {/* Call to Action Buttons */}
                <div className="flex justify-center gap-6">
                    <Link
                        to="/competitors"
                        className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
                    >
                        Competitors
                    </Link>
                    <Link
                        to="/register-event"
                        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Register Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
