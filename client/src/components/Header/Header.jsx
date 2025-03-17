import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center p-4">
                <Link
                    to="/"
                    className="text-3xl font-bold tracking-wide hover:text-gray-200 transition duration-300"
                >
                    OrienteeringApp
                </Link>
                <nav className="space-x-6">
                    <Link
                        to="/login"
                        className="text-lg font-medium hover:text-gray-200 transition duration-300"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="text-lg font-medium hover:text-gray-200 transition duration-300"
                    >
                        Register
                    </Link>
                    <Link
                        to="/events"
                        className="text-lg font-medium hover:text-gray-200 transition duration-300"
                    >
                        Events
                    </Link>
                    <Link
                        to="/create-event"
                        className="text-lg font-medium hover:text-gray-200 transition duration-300"
                    >
                        Create Event
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
