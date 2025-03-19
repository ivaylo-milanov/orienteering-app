import { Route, Routes } from "react-router";

import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Catalog from "./components/Catalog/Catalog";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import AddEditEvent from "./components/AddEditEvent/AddEditEvent";
import EventDetails from "./components/EventDetails/EventDetails";
import Footer from "./components/Footer/Footer";
import Competitors from "./components/Competitors/Competitors";
import RegisterEvent from "./components/RegisterEvent/RegisterEvent";

export default function App() {
    return (
        <>
            <Header />

            <main id="main-content">
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/events" element={<Catalog />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/create-event" element={<AddEditEvent />} />
                    <Route path="/details" element={<EventDetails />} />
                    <Route path="/competitors" element={<Competitors />} />
                    <Route path="/register-event" element={<RegisterEvent />} />
                </Routes>
            </main>

            <Footer />
        </>
    );
}
