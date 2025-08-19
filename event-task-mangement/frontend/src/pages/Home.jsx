import React from "react";
import { UserAuth } from "../context/Authcontext";
import HeroSection from "./Hero-section";
import EventsCard from "../components/EventsCard";
import { motion } from "framer-motion";

const Home = () => {
  const { isLoading } = UserAuth();
  // UserAuth()

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
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-5xl mx-auto text-center space-y-10"
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
          Welcome to <span className="text-sky-800">EventCo</span>
        </h2>

        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
          <span className="font-semibold text-gray-900">EventCo</span> is your go-to platform for discovering incredible
          events around you. From live concerts and thrilling sports to inspiring
          conferences and theatrical magic — we bring the world of entertainment
          right to your fingertips.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
          With our intuitive platform and trusted event partners, we make booking
          tickets simple, secure, and stress-free. Whether you're planning your
          next weekend outing or a grand celebration, <span className="text-gray-900 font-medium">EventCo</span> is here to make every moment
          unforgettable.
        </p>

        <p className="text-base text-gray-500 italic max-w-2xl mx-auto">
          “Creating memories, one event at a time.”
        </p>
      </motion.div>
    </section>
      <EventsCard />
    </div>
  );
};

export default Home;
