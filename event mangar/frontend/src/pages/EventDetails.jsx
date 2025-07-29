"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
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
  const [quantity, setQuantity] = useState(1);

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
        setLoading(false);
      }
    };
    fetchSingleEvent();
  }, [id]);

  const handleByTicket = async () => {
    try {
      const response = await api.post(`/payment/checkout`, {
        eventId: event._id,
        quantity,
      });
      window.location.href = response.data.url;
    } catch (error) {
      console.error("checkout error", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700 animate-pulse">
            Loading event details...
          </p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20.5a7.962 7.962 0 01-5-1.709M15 3.5a7.966 7.966 0 00-6 0M12 3.5a7.966 7.966 0 016 0"
              />
            </svg>
          </div>
          <p className="text-xl font-semibold text-gray-700">No event found.</p>
          <p className="text-gray-500 mt-2">
            The event you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-8 px-4 md:px-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="overflow-hidden border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          {/* Hero Image Section */}
          <div className="relative w-full h-[500px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
            <img
              src={
                event.image ||
                "/placeholder.svg?height=500&width=1200&query=event"
              }
              alt={event.title}
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                e.target.src = "/placeholder.svg?height=500&width=1200";
              }}
            />
            {/* Floating Event Badge */}
            <div className="absolute top-6 right-6 z-20">
              <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                <span className="text-sm font-semibold text-gray-800">
                  ₹{event.price}
                </span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="relative">
            {/* Header */}
            <CardHeader className="px-8 pt-8 pb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <CardTitle className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  {event.title}
                </CardTitle>
                <CardDescription className="text-xl text-gray-600 leading-relaxed">
                  {event.description}
                </CardDescription>
              </motion.div>
            </CardHeader>

            {/* Event Info Grid */}
            <CardContent className="px-8 pb-8">
              <motion.div
                className="grid md:grid-cols-3 gap-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {/* Date & Time */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-800">Date & Time</h3>
                  </div>
                  <p className="text-gray-700 font-medium">{event.date}</p>
                  <p className="text-gray-600 text-sm">
                    {event.time || "Time TBA"}
                  </p>
                </div>

                {/* Location */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-800">Location</h3>
                  </div>
                  <p className="text-gray-700 font-medium">{event.location}</p>
                </div>

                {/* Organizer */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-800">Organizer</h3>
                  </div>
                  <p className="text-gray-700 font-medium">
                    {event.organizerName}
                  </p>
                </div>
              </motion.div>

              {/* Additional Info */}
              <motion.div
                className="grid md:grid-cols-2 gap-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="bg-gray-50 p-4 rounded-xl border">
                  <p className="text-sm text-gray-500 mb-1">Category</p>
                  <p className="font-semibold text-gray-800">
                    {event.category}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border">
                  <p className="text-sm text-gray-500 mb-1">
                    Available Tickets
                  </p>
                  <p className="font-semibold text-gray-800">
                    {event.maxTickets}
                  </p>
                </div>
              </motion.div>

              {/* Event Details */}
              {event.details && (
                <motion.div
                  className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl border"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center mr-3">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    About this event
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {event.details}
                  </p>
                </motion.div>
              )}
            </CardContent>

            {/* Ticket Purchase Section */}
            <CardFooter className="px-8 pb-8 pt-4">
              <motion.div
                className="w-full bg-gradient-to-r from-neutral-900 to-blue-950 p-6 rounded-2xl shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-1">Get Your Tickets</h3>
                    <p className="text-indigo-100">
                      Secure your spot at this amazing event
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="quantity"
                        className="font-medium text-white text-sm"
                      >
                        Quantity:
                      </label>
                      <select
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="border-0 rounded-lg px-3 py-2 bg-white/20 backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option
                            key={num}
                            value={num}
                            className="text-gray-800"
                          >
                            {num}
                          </option>
                        ))}
                      </select>
                    </div>

                    <Button
                      className="bg-white text-gray-600 font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-gray-50 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!quantity}
                      onClick={handleByTicket}
                    >
                      Buy Tickets - ₹{event.price * quantity}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </CardFooter>
          </div>
        </Card>
      </motion.div>
    </section>
  );
};

export default EventDetails;
