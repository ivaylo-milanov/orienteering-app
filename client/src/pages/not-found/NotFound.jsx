import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                {/* Brand Accent / Status */}
                <p className="text-base font-semibold text-indigo-600 uppercase tracking-wide">
                    Error 404
                </p>
                
                {/* Main Heading */}
                <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    You've Lost the Trail
                </h1>
                
                {/* Description */}
                <p className="mt-6 text-lg leading-7 text-gray-600 max-w-lg mx-auto">
                    Sorry, we couldn’t find the page you’re looking for. It seems like 
                    you've navigated into uncharted territory.
                </p>

                {/* Decorative Map Icon (Orienteering Theme) */}
                <div className="mt-10 flex justify-center opacity-10">
                    <svg className="h-24 w-24 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                </div>

                {/* Actions: Reusing your Indigo Color and Rounded-Full design */}
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link
                        to="/"
                        className="rounded-full bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200"
                    >
                        Go back home
                    </Link>
                    
                    <button
                        onClick={() => navigate(-1)}
                        className="text-sm font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
                    >
                        Previous Page <span aria-hidden="true">&rarr;</span>
                    </button>
                </div>
            </div>

            {/* Bottom Support Section - Matches your Home page's clean section style */}
            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl">
                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                    <h3 className="font-bold text-gray-900">Check the Catalog</h3>
                    <p className="mt-2 text-sm text-gray-600">Find all upcoming orienteering events and races.</p>
                    <Link to="/events" className="mt-3 inline-block text-sm font-medium text-indigo-600">Browse Events</Link>
                </div>
                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                    <h3 className="font-bold text-gray-900">Contact Us</h3>
                    <p className="mt-2 text-sm text-gray-600">Need help finding something specific? Let us know.</p>
                    <Link to="/contact" className="mt-3 inline-block text-sm font-medium text-indigo-600">Support</Link>
                </div>
                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                    <h3 className="font-bold text-gray-900">Community</h3>
                    <p className="mt-2 text-sm text-gray-600">Connect with local clubs and other navigators.</p>
                    <Link to="/clubs" className="mt-3 inline-block text-sm font-medium text-indigo-600">View Clubs</Link>
                </div>
            </div>
        </main>
    );
};

export default NotFound;