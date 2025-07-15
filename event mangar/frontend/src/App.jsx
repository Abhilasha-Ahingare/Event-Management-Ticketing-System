import { Routes, Route } from "react-router-dom";
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
import { UserAuth } from "./context/Authcontext";

function App() {
  // const { user , setUser } = UserAuth();
  // console.log( setUser)
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectRoutes role={["user", "organizer", "admin"]}>
              <Home />
            </ProtectRoutes>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Register />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route
          path="/tickets"
          element={
            <ProtectRoutes role="user">
              <MyTickets />
            </ProtectRoutes>
          }
        />
        <Route
          path="/organizer"
          element={
            <ProtectRoutes role="organizer">
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
