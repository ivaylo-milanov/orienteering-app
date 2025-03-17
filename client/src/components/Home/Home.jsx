import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <div>
                {/* Hero Section */}
                <header
                    className="relative w-full h-screen bg-cover bg-center"
                    style={{ backgroundImage: "url(./orienteering.jpg)" }}
                >
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-white">
                        <h1 className="text-4xl font-bold">
                            Embark on Your Orienteering Journey
                        </h1>
                        <p className="mt-4 text-lg">
                            Explore events, connect with clubs, and navigate new
                            terrains.
                        </p>
                        <Link
                            to="/events"
                            className="mt-6 px-8 py-3 bg-blue-500 text-white rounded-full text-lg"
                        >
                            Find an Event
                        </Link>
                    </div>
                </header>

                {/* Introduction */}
                <section className="py-16 bg-gray-100 text-center">
                    <h2 className="text-3xl font-semibold">
                        What is Orienteering?
                    </h2>
                    <p className="mt-4 text-lg max-w-3xl mx-auto">
                        Orienteering is a competitive sport that combines racing
                        with navigation. Using a map and compass, participants
                        navigate from point to point in diverse and usually
                        unfamiliar terrain, while moving at speed.
                    </p>
                </section>

                {/* Upcoming Events */}
                <section id="events" className="py-16">
                    <h2 className="text-3xl font-semibold text-center">
                        Upcoming Events
                    </h2>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Event Card */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold">
                                Spring Orienteering Challenge
                            </h3>
                            <p className="mt-2 text-gray-600">
                                April 10, 2025 - Central Park, NY
                            </p>
                            <a
                                href="/register"
                                className="mt-4 inline-block px-6 py-2 bg-green-500 text-white rounded-full"
                            >
                                Register
                            </a>
                        </div>
                        {/* Additional Event Cards */}
                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-16">
                    <h2 className="text-3xl font-semibold text-center">
                        What Our Community Says
                    </h2>
                    <div className="mt-8 flex flex-wrap justify-center gap-8">
                        {/* Testimonial */}
                        <div className="w-full md:w-1/3 text-center">
                            <p className="text-lg italic">
                                "Orienteering has transformed the way I explore
                                the outdoors. The community is welcoming, and
                                every event is an adventure!"
                            </p>
                            <p className="mt-4 font-semibold">Jane Doe</p>
                        </div>
                        {/* Additional Testimonials */}
                    </div>
                </section>
            </div>
        </>
    );
};

export default Home;
