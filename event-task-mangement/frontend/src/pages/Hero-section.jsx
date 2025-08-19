import { Button } from "../components/ui/button";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[800px] md:min-h-[950px] flex items-center justify-center text-center overflow-hidden">
      {/* Background image */}
      <img
        src="https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?cs=srgb&dl=pexels-wolfgang-1002140-2747449.jpg&fm=jpg"
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Gradient overlay (optional) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/10 to-black/80" />

      {/* Glassmorphic content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-3xl px-6 md:px-12 py-12 space-y-8 text-white bg-white/5 backdrop-blur-md border border-white/30 rounded-xl shadow-lg"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight drop-shadow-xl">
          Discover <span className="text-sky-300">Amazing Events</span>
        </h1>
        <p className="text-lg md:text-2xl font-light opacity-95 max-w-2xl mx-auto">
          From electrifying concerts to inspiring workshops, find your next
          experience with us.
        </p>
        <Button
          size="lg"
          className="bg-sky-800 text-gray-200 hover:bg-sky-900 px-10 py-4 rounded-full shadow-xl text-lg font-bold transition-transform duration-300 hover:scale-105"
        >
          Explore Events
        </Button>
      </motion.div>
    </section>
  );
}
