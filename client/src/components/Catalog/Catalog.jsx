import { useEvents } from "../../api/eventsApi";
import CatalogEvent from "./catalog-event/CatalogEvent";
import CatalogFilter from "./catalog-filter/CatalogFilter";

const Catalog = () => {
    const { events, searchParams, searchParamsHandler } = useEvents();

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
            <div className="w-full max-w-6xl p-8 bg-white rounded-lg shadow-lg space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                        Explore Events
                    </h2>
                    <p className="text-lg text-gray-600">
                        Browse through various events happening in different clubs.
                    </p>
                </div>

                <CatalogFilter searchParams={searchParams} changeSearchParams={searchParamsHandler}/>

                <div className="space-y-6 mt-6">
                    {events.length > 0 ? (
                        events.map((event) => (
                            <CatalogEvent key={event._id} {...event} />
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No events found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Catalog;
