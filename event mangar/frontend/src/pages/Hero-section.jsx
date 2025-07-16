import { Button } from "../components/ui/button";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[500px] md:min-h-[650px] flex items-center justify-center text-center bg-gradient-to-br from-primary to-purple-600 overflow-hidden">
      {/* background image */}
      <img
        src="/your-hero-image.jpg"
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-3xl px-4 md:px-8 py-12 space-y-8 text-white backdrop-blur-sm rounded-xl"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight drop-shadow-xl">
          Discover <span className="text-yellow-400">Amazing Events</span>
        </h1>
        <p className="text-xl md:text-2xl font-light opacity-90 max-w-2xl mx-auto">
          From electrifying concerts to inspiring workshops, find your next
          experience with us.
        </p>
        <Button
          size="lg"
          className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 px-10 py-4 rounded-full shadow-xl text-lg font-bold transition-transform duration-300 hover:scale-105"
        >
          Explore Events
        </Button>
      </motion.div>
    </section>
  );
}
