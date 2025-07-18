import React from "react";
import { UserAuth } from "../context/Authcontext";
import HeroSection from "./Hero-section";
import EventsCard from "../components/EventsCard";

const Home = () => {
  const { isLoading } = UserAuth();
  UserAuth()

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-xl font-semibold animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <HeroSection />

      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
            About <span className="text-primary">EventCo</span>
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            EventCo is your premier destination for discovering and booking
            tickets to a wide array of events. From thrilling concerts and
            captivating theater performances to exhilarating sports matches and
            insightful conferences, we connect you with experiences that matter.
            Our mission is to make event discovery seamless and ticket
            purchasing effortless, ensuring you never miss out on the moments
            that create lasting memories.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            We partner with top venues and organizers to bring you the best
            selection of events, backed by a secure and user-friendly platform.
            Join the EventCo community and start exploring your next adventure
            today! We're committed to providing a smooth and enjoyable
            experience from browsing to attending your chosen event.
          </p>
        </div>
      </section>

      <EventsCard />
    </div>
  );
};

export default Home;
