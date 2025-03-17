const eventsData = [
    {
      id: 1,
      name: 'Spring Marathon',
      startDate: '2025-04-01',
      endDate: '2025-04-03',
      registrationDeadline: '2025-03-15',
      club: 'Running Club A',
      registrationCount: 150,
      stages: [
        { name: '5K Fun Run', date: '2025-04-01' },
        { name: 'Half Marathon', date: '2025-04-02' },
        { name: 'Full Marathon', date: '2025-04-03' },
      ],
    },
    {
      id: 2,
      name: 'Summer Triathlon',
      startDate: '2025-06-10',
      endDate: '2025-06-12',
      registrationDeadline: '2025-05-25',
      club: 'Triathlon Club B',
      registrationCount: 200,
      stages: [
        { name: 'Swimming', date: '2025-06-10' },
        { name: 'Cycling', date: '2025-06-11' },
        { name: 'Running', date: '2025-06-12' },
      ],
    },
  ];
  
  const EventDetails = () => {
    const event = eventsData.find((event) => event.id === 1);
  
    if (!event) {
      return <div>Event not found</div>;
    }
  
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        <div className="mt-6 lg:mt-0 lg:ml-8">
          <h2 className="text-3xl font-semibold text-gray-800">Spring Marathon 2025</h2>
          <p className="mt-2 text-lg text-gray-600">
            <strong>Date:</strong> April 1-3, 2025
          </p>
          <p className="mt-2 text-lg text-gray-600">
            <strong>Location:</strong> Sofia, Bulgaria
          </p>
          <p className="mt-4 text-gray-700">
            Join us for the annual Spring Marathon featuring a 5K Fun Run, Half Marathon, and Full Marathon.
            Experience the vibrant streets of Sofia while challenging yourself in this exciting event.
          </p>
          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-gray-800">Event Schedule</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full">
                  1
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">5K Fun Run</h4>
                  <p className="text-gray-600">April 1, 2025 - 8:00 AM</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-500 text-white flex items-center justify-center rounded-full">
                  2
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Half Marathon</h4>
                  <p className="text-gray-600">April 2, 2025 - 7:00 AM</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-500 text-white flex items-center justify-center rounded-full">
                  3
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Full Marathon</h4>
                  <p className="text-gray-600">April 3, 2025 - 6:00 AM</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <a
              href="#"
              className="inline-block px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700"
            >
              Register Now
            </a>
          </div>
        </div>
      </div>
    </div>
    );
  };
  
  export default EventDetails;