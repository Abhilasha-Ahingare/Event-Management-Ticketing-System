import React from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { UserAuth } from "../../context/Authcontext";
import api from "../../context/utils/api";
import { useNavigate } from "react-router-dom";

const MyEvents = () => {
  const { events, ticket, user } = UserAuth();
  const navigate = useNavigate();

  const EventDeleted = async (eventId) => {

    try {
      const response = await api.delete(`/event/delete-event/${eventId}`);
      if (response.status === 200) {
        alert("Event deleted successfully");
      }
    } catch (error) {
      console.error("Delete event error", error);
      alert("Failed to delete the event");
    }
  };

  const EventEdit = (eventId) => {
    if (user.role === "organizer") {
      navigate(`/update-event/${eventId}`);
    } else {
      alert("user not organizer");
    }
  };

  return (
    <section className="w-full h-auto px-4 py-6 mt-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Events</h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-[800px] w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Tickets Sold</th>
              <th className="py-3 px-4">Revenue (₹)</th>
              <th className="py-3 px-4">Payment Status</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {ticket &&
              events.map((events) => (
                <tr
                  className="border-b hover:bg-gray-50 transition"
                  key={events._id}
                >
                  <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap">
                    {events.title}
                  </td>
                  <td className="py-4 px-4">{events.date}</td>
                  <td className="py-4 px-4">{events.maxTickets}</td>
                  <td className="py-4 px-4">₹ {events.price}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-block bg-blue-900 text-gray-200 px-3 py-1 text-xs rounded-full font-semibold text-center ${
                        ticket.paymentStatus === "paid"
                          ? "bg-red-500 text-black"
                          : "bg-blue-950 text-black"
                      }`}
                    >
                      {ticket.paymentStatus === "paid" ? (
                        <p>unpaid</p>
                      ) : (
                        <p>paid</p>
                      )}
                    </span>
                  </td>
                  <td className="py-4 px-4 flex items-center justify-center gap-4 text-xl text-gray-600">
                    <button
                      type="button"
                      onClick={() => EventEdit(events._id)}
                      title="Edit"
                      className="hover:text-blue-600 transition"
                    >
                      <FiEdit />
                    </button>
                    <button
                      type="button"
                      onClick={() => EventDeleted(events._id)}
                      title="Delete"
                      className="hover:text-red-600 transition"
                    >
                      <RiDeleteBinLine />
                    </button>
                  </td>
                </tr>
              ))}
            {/* Add more rows dynamically if needed */}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MyEvents;
