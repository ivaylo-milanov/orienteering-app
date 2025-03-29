import { Route, Routes } from "react-router";

import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Catalog from "./components/catalog/Catalog";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import AddEditEvent from "./components/add-edit-event/AddEditEvent";
import EventDetails from "./components/event-details/EventDetails";
import Footer from "./components/footer/Footer";
import UserProvider from "./providers/UserProvider";
import Logout from "./components/Logout/Logout";

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
                        <Route path="/events/:eventId/details" element={<EventDetails />} />
                        <Route path="/logout" element={<Logout />}/>
                    </Routes>
                </main>

                <Footer />
            </UserProvider>
        </>
    );
}
