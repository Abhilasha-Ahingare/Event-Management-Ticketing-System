import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../context/utils/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();

  // const buttonhandle = () => {
  //   navigate("/tickets")
  // };

  useEffect(() => {
    const fetchSingleEvent = async () => {
      try {
        const response = await api.get(`/event/event-detail/${id}`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setEvent(response.data.singleEvent);
          setLoading(false);
        }
      } catch (error) {
        console.log("error fetching single event", error);
      }
    };
    fetchSingleEvent();
  }, [id]);

  if (loading)
    return <p className="text-center mt-20">Loading event details...</p>;

  if (!event) return <p className="text-center mt-20">No event found.</p>;

  return (
    <section
      id="events"
      className="py-16 px-4 md:px-8 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen"
    >
      <div className="max-w-5xl mx-auto border border-gray-200 rounded-2xl shadow-xl bg-white">
        <Card className="flex flex-col rounded-2xl overflow-hidden border-none">
          {/* IMAGE */}
          <div className="w-full h-[400px] bg-gray-200">
            <img
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                e.target.src = "/placeholder.svg";
              }}
            />
          </div>

          {/* HEADER */}
          <CardHeader className="px-8 pt-8 pb-4">
            <CardTitle className="text-4xl font-bold text-gray-900 mb-2">
              {event.title}
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              {event.description}
            </CardDescription>
          </CardHeader>

          {/* CONTENT */}
          <CardContent className="px-8 pb-6 pt-2">
            <div className="grid md:grid-cols-2 gap-x-10 gap-y-6 mb-6 text-gray-800 text-[16px]">
              <div>
                <p className="text-sm text-gray-500 mb-1">Date</p>
                <p className="font-medium">{event.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Time</p>
                <p className="font-medium">{event.time || "N/A"}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Location</p>
                <p className="font-medium">{event.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Organizer</p>
                <p className="font-medium">
                  {event.organizer?.Username || event.organizer}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Price</p>
                <p className="font-medium">₹{event.price}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Max Tickets</p>
                <p className="font-medium">{event.maxTickets}</p>
              </div>

              <div className="md:col-span-2">
                <p className="text-sm text-gray-500 mb-1">Category</p>
                <p className="font-medium">{event.category}</p>
              </div>
            </div>

            {/* DETAILS TEXT */}
            {event.details && (
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  About this event
                </h3>
                <p className="text-gray-700 leading-relaxed text-base">
                  {event.details}
                </p>
              </div>
            )}
          </CardContent>

          {/* CTA */}
          <CardFooter className="px-8 pb-8 pt-4 flex justify-end">
            <Button className="bg-gradient-to-r from-gray-800 to-green-900 text-white font-semibold py-3 px-8 rounded-xl shadow hover:scale-105 transition-transform duration-200 hover:bg-green-950 focus:outline-none focus:ring-2 focus:ring-green-700">
              Get Tickets
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default EventDetails;
