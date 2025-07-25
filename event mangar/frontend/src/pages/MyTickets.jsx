import { useNavigate, useParams } from "react-router-dom";
import { UserAuth } from "../context/Authcontext";
import { useEffect, useState } from "react";
import api from "../context/utils/api";

const MyTickets = () => {
  const navigate = useNavigate();
  const { ticket, isLoading } = UserAuth();
  const { id } = useParams();
  const [singleEvent, setSingleEvent] = useState([]);
  useEffect(() => {
    const fetchSingleEvent = async () => {
      try {
        const response = await api.get(`/event/event-detail/${id}`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setSingleEvent(response.data.singleEvent);
          isLoading(false);
        }
      } catch (error) {
        console.log("error fetching single event", error);
      }
    };
    fetchSingleEvent();
  }, [id]);

  return (
    <section className="py-10 px-4 md:px-8 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">
          🎟 My Tickets
        </h2>

        {!ticket || ticket.length === 0 ? (
          <p className="text-center text-gray-600 text-base md:text-lg">
            No tickets booked yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {singleEvent &&
              ticket.map((ticket, event) => (
                <div
                  key={ticket._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 flex flex-col"
                >
                  {/* Ticket Image */}
                  <div className="w-full h-48 sm:h-56 bg-gray-200">
                    <img
                      src={event.imgae || "/default-event.jpg"}
                      alt={event.title || "Event Image"}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Ticket Content */}
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                      {event.title || "Unknown Event"}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      📍 {event.location || "Location not available"}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      📅{" "}
                      {new Date(
                        ticket.eventId?.createdAt
                      ).toLocaleDateString() || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      🎫 Tickets: {ticket.quantity}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      💵 Price: {ticket.totalPrice}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      💬 Payment status : {ticket.paymentStatus}
                    </p>

                    <div className="mt-2 text-gray-600 text-sm flex items-center">
                      🗳️ Scanner{" "}
                      <span
                        className={`ml-3 h-3 w-3 rounded-full ring-1 ring-gray-500 ${
                          ticket.scanned ? "bg-green-800" : "bg-red-800"
                        }`}
                      ></span>
                    </div>

                    <div className="w-full sm:w-40 h-40 mt-4 mx-auto border border-gray-100 shadow-xl p-2 rounded-lg">
                      <img
                        src={ticket.qrCode}
                        alt={event.title || "QR Code"}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    <p className="text-center text-gray-500 mt-3 text-sm font-bold break-words">
                      Payment ID: {ticket.paymentId}
                    </p>

                    <button
                      className="bg-gradient-to-r from-gray-800 to-sky-600 text-white font-semibold py-3 px-6 rounded-xl shadow hover:scale-105 transition-transform duration-200 mt-4 focus:outline-none focus:ring-2 focus:ring-green-700 w-full"
                      onClick={() => navigate(`/event-detail/${id}`)}
                    >
                      View Event
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyTickets;
