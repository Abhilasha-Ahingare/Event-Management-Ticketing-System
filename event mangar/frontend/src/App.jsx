import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EventDetail from "./pages/EventDetails";
import MyTickets from "./pages/MyTickets";
import OrganizerDashBoard from "./pages/OrganizerDashBoard";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import ProtectRoutes from "./ProtectRoutes";
import EventsCard from "./components/EventsCard";
import PaymentSuccess from "./pages/PaymentSuccess";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
       
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Register />} />
        <Route path="/event" element={<EventsCard />} />
        <Route path="/event-detail/:id" element={<EventDetail />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectRoutes role={["user"]}>
              <Home />
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
        <Route
          path="/dashboard"
          element={
            <ProtectRoutes role={["organizer"]}>
              <OrganizerDashBoard />
            </ProtectRoutes>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
