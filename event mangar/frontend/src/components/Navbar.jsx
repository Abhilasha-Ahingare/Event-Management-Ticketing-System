import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { useState } from "react";
import { UserAuth } from "../context/Authcontext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = UserAuth();

  return (
    <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-gray-800 to-green-900 text-white font-semibold py-3 px-3  shadow  transition-transform duration-200 hover:bg-green-950 focus:outline-none focus:ring-2 focus:ring-green-700">
      <div className="container mx-auto flex h-12 items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo192.png"
            alt="Logo"
            className="h-10 w-10 rounded-full shadow-md"
          />
          <span className="text-2xl font-bold">EventCo</span>
        </Link>

        {!user ? (
          <Link
            to="/login"
            className="hover:bg-green-900 transition bg-green-800 text-shadow-white p-2 pl-5 pr-5 rounded-lg  text-center cursor-pointer"
          >
            login
          </Link>
        ) : user.role === "user" ? (
          <>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="hover:text-yellow-300 transition">
                Home
              </Link>
              <Link to="/event" className="hover:text-yellow-300 transition">
                Events
              </Link>
              <Link to="/tickets" className="hover:text-yellow-300 transition">
                Tickets
              </Link>
              <Link to="/" className="hover:text-yellow-300 transition">
                About
              </Link>
              {/* Profile icon for desktop */}
              <Link to="/profile" className="hover:text-yellow-300 transition">
                <FaUserCircle size={28} />
              </Link>
            </div>
          </>
        ) : user.role === "organizer" ? (
          <>
            <Link to="/organizer">org</Link>
            <Link to="/profile">
              <FaUserCircle size={24} />
            </Link>
          </>
        ) : null}

        {/* Mobile menu button and profile icon for logged-in users */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <FaBars size={24} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-gradient-to-r from-blue-600 to-purple-600 flex flex-col space-y-4 p-6 transition-all">
          {user.role === "user" ? (
            <>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="hover:text-yellow-300 transition"
              >
                Home
              </Link>
              <Link
                to="/events"
                onClick={() => setMenuOpen(false)}
                className="hover:text-yellow-300 transition"
              >
                Events
              </Link>
              <Link
                to="/tickets"
                onClick={() => setMenuOpen(false)}
                className="hover:text-yellow-300 transition"
              >
                Tickets
              </Link>
              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
                className="hover:text-yellow-300 transition"
              >
                About
              </Link>
              {/* Profile icon for mobile menu */}
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 hover:text-yellow-300 transition"
              >
                <FaUserCircle size={24} />
                <span>Profile</span>
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="hover:text-yellow-300 transition bg-purple-300 text-black px-4 py-2 rounded"
            >
              login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
