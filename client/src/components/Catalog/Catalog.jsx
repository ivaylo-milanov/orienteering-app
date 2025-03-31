import { useState } from "react";
import { useCount, useEvents } from "../../api/eventsApi";
import Pagination from "../pagination/Pagination";
import CatalogEvent from "./catalog-event/CatalogEvent";
import CatalogFilter from "./catalog-filter/CatalogFilter";

const Catalog = () => {
    const { count } = useCount();
    const { events, searchParams, searchParamsHandler } = useEvents();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;

    const handlePageChange = (page) => {
        if (page >= 1 && page <= Math.ceil(count / itemsPerPage)) {
            setCurrentPage(() => {
                searchParamsHandler({
                    offset: (page - 1) * itemsPerPage,
                    pageSize: itemsPerPage
                })

                return page;
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
            <div className="w-full max-w-6xl p-8 bg-white rounded-lg shadow-lg space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                        Explore Events
                    </h2>
                    <p className="text-lg text-gray-600">
                        Browse through various events happening in different
                        clubs.
                    </p>
                </div>

                <CatalogFilter
                    searchParams={searchParams}
                    changeSearchParams={searchParamsHandler}
                />

                <div className="space-y-6 mt-6">
                    {events.length > 0 ? (
                        events.map((event) => (
                            <CatalogEvent key={event._id} {...event} />
                        ))
                    ) : (
                        <p className="text-center text-gray-500">
                            No events found
                        </p>
                    )}
                </div>

                <Pagination
                    totalItems={count}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default Catalog;
