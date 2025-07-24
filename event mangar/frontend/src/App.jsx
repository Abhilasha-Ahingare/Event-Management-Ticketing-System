import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import EventDetail from "./pages/EventDetails";
import EventsCard from "./components/EventsCard";
import PaymentSuccess from "./pages/PaymentSuccess";
import MyTickets from "./pages/MyTickets";

import OrganizerDashBoard from "./pages/OrganizerDashBoard";
import CreateEvent from "./Dashboard/organizer/CreateEvent";

import AdminDashborad from "./pages/AdminDashborad";
import EventList from "./Dashboard/admin/EventList";
import UserList from "./Dashboard/admin/UserList";
import TicketsList from "./Dashboard/admin/TicketsList";

import ProtectRoutes from "./ProtectRoutes";
import NotFound from "./pages/NotFound";
import { UserAuth } from "./context/Authcontext";

function App() {
  const { user, isLogIn } = UserAuth();

  // ✅ Redirect based on role after login
  const roleBasedRedirect = () => {
    if (!user || !isLogIn) return <Navigate to="/login" />;
    if (user.role === "admin") return <Navigate to="/get_admin" />;
    if (user.role === "organizer") return <Navigate to="/dashboard" />;
    return <Navigate to="/home" />;
  };

  return (
    <>
      <Navbar />

      <Routes>
        {/* <Route path="/" element={<Navigate to="/login" />} />  */}
        <Route path="/" element={roleBasedRedirect()} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Register />} />

        {/* User Routes */}
        <Route
          path="/home"
          element={
            <ProtectRoutes role={["user"]}>
              <Home />
            </ProtectRoutes>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectRoutes role={["user"]}>
              <Profile />
            </ProtectRoutes>
          }
        />
        <Route
          path="/event-detail/:id"
          element={
            <ProtectRoutes role={["user"]}>
              <EventDetail />
            </ProtectRoutes>
          }
        />
        <Route
          path="/tickets"
          element={
            <ProtectRoutes role={["user"]}>
              <MyTickets />
            </ProtectRoutes>
          }
        />

        {/* Organizer Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectRoutes role={["organizer"]}>
              <OrganizerDashBoard />
            </ProtectRoutes>
          }
        />
        <Route
          path="/create-Event"
          element={
            <ProtectRoutes role={["organizer"]}>
              <CreateEvent />
            </ProtectRoutes>
          }
        />
        <Route
          path="/update-event/:id"
          element={
            <ProtectRoutes role={["organizer"]}>
              <CreateEvent />
            </ProtectRoutes>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/get_admin"
          element={
            <ProtectRoutes role={["admin"]}>
              <AdminDashborad />
            </ProtectRoutes>
          }
        />
        <Route
          path="/Event-list"
          element={
            <ProtectRoutes role={["admin"]}>
              <EventList />
            </ProtectRoutes>
          }
        />
        <Route
          path="/get-all-user"
          element={
            <ProtectRoutes role={["admin"]}>
              <UserList />
            </ProtectRoutes>
          }
        />
        <Route
          path="/tickets-list"
          element={
            <ProtectRoutes role={["admin"]}>
              <TicketsList />
            </ProtectRoutes>
          }
        />

        {/* Common Routes */}
        <Route path="/event" element={<EventsCard />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
