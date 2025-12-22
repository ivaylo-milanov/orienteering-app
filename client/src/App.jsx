import { Route, Routes } from "react-router";

import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Catalog from "./pages/catalog/Catalog";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import AddEditEvent from "./pages/add-edit-event/AddEditEvent";
import EventDetails from "./pages/event-details/EventDetails";
import Footer from "./components/footer/Footer";
import UserProvider from "./providers/UserProvider";
import Logout from "./components/Logout/Logout";
import NotFound from "./pages/not-found/NotFound";

export default function App() {
    return (
        <>
            <UserProvider>
                <Header />

                <main id="main-content">
                    <Routes>
                        <Route index element={<Home />} />
                        <Route path="/events" element={<Catalog />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/create-event"
                            element={<AddEditEvent />}
                        />
                        <Route path="/events/details/:eventId" element={<EventDetails />} />
                        <Route path="/logout" element={<Logout />}/>
                        <Route path="/events/:eventId/edit" element={<AddEditEvent />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>

                <Footer />
            </UserProvider>
        </>
    );
}
