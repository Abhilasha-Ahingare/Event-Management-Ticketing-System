import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { IoMdAdd } from "react-icons/io";
import { TiHomeOutline } from "react-icons/ti";
import { IoTicketOutline } from "react-icons/io5";
import { BiDollar } from "react-icons/bi";
import Example from "../Dashboard/organizer/SalesChart";
import EventChart from "../Dashboard/organizer/EventChart";
import MyEvents from "../Dashboard/organizer/MyEvents";
import api from "../context/utils/api";

const OrganizerDashBoard = () => {
  // UserAuth();
  const navigate = useNavigate();

  const [organizer, setOrganizer] = useState(null);

  useEffect(() => {
    const OrganizerDashBoard = async () => {
      try {
        const response = await api.get(`/organizer/dashboard`);
        if (response.status === 200) {
          // console.log(response.data.data);
          setOrganizer(response.data.data);
        }
      } catch (error) {
        console.log("organizer error", error);
      }
    };
    OrganizerDashBoard();
  }, []);

  const EventCreateHandle = () => navigate("/create-event");

  return (
    <section className="w-full mt-10 px-4 py-6 flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
        <h1 className="text-3xl font-extrabold text-gray-800">
          Organizer Dashboard
        </h1>
        <Button
          onClick={EventCreateHandle}
          className="bg-gradient-to-r from-gray-700 to-blue-500 text-white font-semibold py-3 px-5 rounded-xl shadow hover:scale-105 transition-transform duration-300 flex items-center gap-2"
        >
          <IoMdAdd className="text-2xl" /> New Event
        </Button>
      </div>

      {/* Stats Section */}
      {organizer && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 animate-fadeIn">
            <h3 className="flex items-center justify-between font-semibold text-gray-700 text-lg mb-2">
              Total Events Created{" "}
              <TiHomeOutline className="text-xl text-green-700" />
            </h3>
            <span className="text-2xl font-bold text-gray-900">
              {/* {organizer.totalEvents} 25 */}
              125
            </span>
            <p className="text-sm text-gray-500 mt-2">
              You’ve actively organized 125 events so far.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 animate-fadeIn">
            <h3 className="flex items-center justify-between font-semibold text-gray-700 text-lg mb-2">
              Total Tickets Sold{" "}
              <IoTicketOutline className="text-xl text-yellow-700" />
            </h3>
            <span className="text-2xl font-bold text-gray-900">
              {organizer.totalTicketSold}
            </span>
            <p className="text-sm text-gray-500 mt-2">
              Tickets sold across all events combined.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 animate-fadeIn">
            <h3 className="flex items-center justify-between font-semibold text-gray-700 text-lg mb-2">
              Total Revenue <BiDollar className="text-xl text-blue-700" />
            </h3>
            <span className="text-2xl font-bold text-gray-900">
              ₹ {organizer.totalRevenue}
            </span>
            <p className="text-sm text-gray-500 mt-2">
              Revenue generated from ticket sales.
            </p>
          </div>
        </div>
      )}

      {/* Charts Section */}
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        <div className="w-full lg:w-1/2 bg-white p-4 rounded-lg shadow-md animate-slideInLeft">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Events Distribution
          </h3>
          <EventChart />
        </div>
        <div className="w-full lg:w-1/2 bg-white p-4 rounded-lg shadow-md animate-slideInRight">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Ticket Sales Overview
          </h3>
          <Example />
        </div>
      </div>

      {/* Events Table */}
      <div className="mt-6">
        <MyEvents />
      </div>
    </section>
  );
};

export default OrganizerDashBoard;
