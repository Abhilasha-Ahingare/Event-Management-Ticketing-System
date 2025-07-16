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

const EventsCard = () => {
  // const events = [
  //   {
  //     id: 1,
  //     title: "Summer Music Festival",
  //     date: "August 15, 2025",
  //     location: "Central Park, NYC",
  //     description:
  //       "An annual festival featuring top artists across various genres.",
  //     image: "/placeholder.svg?height=200&width=300",
  //   },
  //   {
  //     id: 2,
  //     title: "Tech Innovators Summit",
  //     date: "September 10, 2025",
  //     location: "Convention Center, SF",
  //     description: "Explore the future of technology with industry leaders.",
  //     image: "/placeholder.svg?height=200&width=300",
  //   },
  //   {
  //     id: 3,
  //     title: "City Marathon 2025",
  //     date: "October 5, 2025",
  //     location: "Downtown, LA",
  //     description: "Join thousands of runners in this iconic annual marathon.",
  //     image: "/placeholder.svg?height=200&width=300",
  //   },
  //   {
  //     id: 4,
  //     title: "Art & Design Expo",
  //     date: "November 20, 2025",
  //     location: "Exhibition Hall, Chicago",
  //     description: "Showcasing contemporary art and innovative design.",
  //     image: "/placeholder.svg?height=200&width=300",
  //   },
  //   {
  //     id: 5,
  //     title: "Culinary Delights Fair",
  //     date: "December 1, 2025",
  //     location: "Food Market, Seattle",
  //     description:
  //       "A gastronomic journey with local and international cuisines.",
  //     image: "/placeholder.svg?height=200&width=300",
  //   },
  //   {
  //     id: 6,
  //     title: "Winter Sports Gala",
  //     date: "January 18, 2026",
  //     location: "Mountain Resort, Denver",
  //     description: "Celebrate winter sports with athletes and enthusiasts.",
  //     image: "/placeholder.svg?height=200&width=300",
  //   },
  // ];
  const { events } = UserAuth();

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
              key={event.id}
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
                <Button className="w-full bg-gradient-to-r from-primary to-purple-600 text-white font-semibold py-3 rounded-xl shadow hover:scale-105 transition-transform duration-200 hover:bg-primary/90">
                  Get Tickets
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
