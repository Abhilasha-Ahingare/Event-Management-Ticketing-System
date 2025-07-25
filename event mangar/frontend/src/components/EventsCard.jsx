import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { UserAuth } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";

const EventsCard = () => {
  const { events } = UserAuth();

  const navigate = useNavigate();

  const buttonhandle = (id) => {
    navigate(`/event-detail/${id}`);
  };

  return (
    <section
      id="events"
      className="py-16 px-4 md:px-8 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 text-center mb-12">
          Upcoming{" "}
          <span className="text-primary" style={{ color: "#6366F1" }}>
            Events
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {events.map((event) => (
            <Card
              key={event._id}
              className="flex flex-col rounded-2xl shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-200"
            >
              <div className="relative w-full h-56 bg-gray-100 flex items-center justify-center">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  width={300}
                  height={200}
                  className="w-full h-full object-cover"
                  style={{
                    borderTopLeftRadius: "1rem",
                    borderTopRightRadius: "1rem",
                  }}
                  onError={(e) => {
                    e.target.src = "/placeholder.svg";
                  }}
                />
              </div>
              <CardHeader className="p-6 pb-2">
                <CardTitle className="text-2xl font-bold text-gray-800 mb-1">
                  {event.title}
                </CardTitle>
                <CardDescription className="text-sm text-gray-500 mb-2">
                  {event.date} &bull; {event.location}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow px-6 pb-4">
                <p className="text-base text-gray-700 leading-relaxed">
                  {event.description}
                </p>
              </CardContent>
              <CardFooter className="px-6 pb-6">
                <Button
                  className="bg-gradient-to-r from-gray-800 to-sky-600 text-white font-semibold py-3 px-6 rounded-xl shadow hover:scale-105 transition-transform duration-200 mt-4 focus:outline-none focus:ring-2 focus:ring-green-700 w-full"
                  onClick={() => buttonhandle(event._id)}
                >
                  Get Events
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsCard;
