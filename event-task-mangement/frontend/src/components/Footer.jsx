import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-8">
        {/* Brand Section */}
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-white mb-4">EventCo</h2>
          <p className="text-sm">
            Your trusted platform for managing events, booking tickets, and
            seamless payments.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-blue-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/events" className="hover:text-blue-400 transition">
                Events
              </Link>
            </li>
            <li>
              <Link to="/tickets" className="hover:text-blue-400 transition">
                My Tickets
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-400 transition">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>
              Email:{" "}
              <a
                href="mailto:support@eventco.com"
                className="hover:text-blue-400 transition"
              >
                support@eventco.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a
                href="tel:+1234567890"
                className="hover:text-blue-400 transition"
              >
                +1 234 567 890
              </a>
            </li>
            <li>Location: New York, USA</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-blue-400 transition"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-blue-400 transition"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-blue-400 transition"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-blue-400 transition"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 py-4 text-center text-sm">
        &copy; {new Date().getFullYear()} EventCo. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
