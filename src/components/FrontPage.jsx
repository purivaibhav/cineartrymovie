import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import bgImage1 from "../assets/8.jpg";
import bgImage2 from "../assets/9.jpg";
import bgImage3 from "../assets/7.jpg";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
      duration: 1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const HomePage = () => {
  const backgroundImages = [bgImage1, bgImage2, bgImage3];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000); // change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white font-sans">
      {/* Background Image Slideshow */}
      {backgroundImages.map((img, index) => (
        <motion.img
          key={index}
          src={img}
          alt={`CineArtery background ${index + 1}`}
          className="absolute inset-0 w-full h-full object-cover z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: currentIndex === index ? 0.8 : 0 }}
          transition={{ duration: 1 }}
        />
      ))}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center px-4 pt-24"
      >
        <motion.h1
          variants={itemVariants}
          className="text-[6vw] font-extrabold leading-tight text-gray-300 drop-shadow-lg whitespace-nowrap"
          style={{
            fontFamily: "'Cinzel', serif",
            textShadow: "0 0 20px #d1d5db",
          }}
        >
          Welcome to CineArtery 🎬
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl mt-6 max-w-2xl text-gray-300"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Discover a cinematic universe with stories, visuals, and emotions that move you.
        </motion.p>

        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mt-12 px-8 py-4 text-lg font-bold rounded-full bg-gray-300 text-black hover:bg-gray-200 transition-all shadow-md"
        >
          Explore Now
        </motion.button>
      </motion.div>

      {/* Scroll Arrow */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </div>
  );
};

export default HomePage;
