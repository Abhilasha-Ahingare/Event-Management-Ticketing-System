import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EventDetail from "./pages/EventDetails";
import MyTickets from "./pages/MyTickets";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import OrganizerDashBoard from "./pages/OrganizerDashBoard";
import Login from "./pages/Login";
import ProtectRoutes from "./ProtectRoutes";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Protect home page, only logged-in users can access */}
        <Route
          path="/"
          element={
            <ProtectRoutes role={["user", "organizer", "admin"]}>
              <Home />
            </ProtectRoutes>
          }
        />
        {/* Login page is public */}
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Register />} />

        {/* Event details can be public or protected as needed */}
        <Route path="/event/:id" element={<EventDetail />} />
        {/* User tickets, only for users */}
        <Route
          path="/tickets"
          element={
            <ProtectRoutes role="user">
              <MyTickets />
            </ProtectRoutes>
          }
        />
        {/* Organizer dashboard, only for organizers */}
        <Route
          path="/organizer"
          element={
            <ProtectRoutes role="organizer">
              <OrganizerDashBoard />
            </ProtectRoutes>
          }
        />
        {/* Not found route */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
