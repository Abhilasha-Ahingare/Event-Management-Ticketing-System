import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { UserAuth } from "../context/Authcontext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = UserAuth();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Common Links by role
  const linksByRole = {
    user: [
      { to: "/", label: "Home" },
      { to: "/event", label: "Events" },
      { to: "/tickets", label: "Tickets" },
      { to: "/about", label: "About" },
      { to: "/profile", label: <FaUserCircle size={24} /> },
    ],
    organizer: [
      { to: "/dashboard", label: "Dashboard" },
      { to: "/profile", label: <FaUserCircle size={24} /> },
    ],
    admin: [
      { to: "/get_admin", label: "Admin Panel" },
      { to: "/profile", label: <FaUserCircle size={24} /> },
    ],
  };

  const role = user?.role;
  const roleLinks = role ? linksByRole[role] : [];

  return (
    <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-gray-800 to-green-900 text-white font-semibold py-3 shadow">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo192.png"
            alt="Logo"
            className="h-10 w-10 rounded-full shadow-md"
          />
          <span className="text-2xl font-bold">EventCo</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          {!user ? (
            <Link
              to="/login"
              className="bg-green-800 hover:bg-green-900 px-4 py-2 rounded-lg transition"
            >
              Login
            </Link>
          ) : (
            roleLinks.map(({ to, label }, i) => (
              <Link
                key={i}
                to={to}
                className="hover:text-yellow-300 transition"
              >
                {label}
              </Link>
            ))
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu}>
            <FaBars size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 text-white flex flex-col gap-4 px-6 py-4">
          {!user ? (
            <Link
              to="/login"
              onClick={toggleMenu}
              className="bg-green-800 text-white px-4 py-2 rounded-md text-center hover:bg-green-900 transition"
            >
              Login
            </Link>
          ) : (
            roleLinks.map(({ to, label }, i) => (
              <Link
                key={i}
                to={to}
                onClick={toggleMenu}
                className="hover:text-yellow-300 transition"
              >
                {typeof label === "string" ? label : <span className="flex items-center gap-2">{label}<span>Profile</span></span>}
              </Link>
            ))
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
