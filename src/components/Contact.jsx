"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu } from "lucide-react";

const items = [
  { text: "Request Proposal", bg: "bg-black", textColor: "text-white" },
  { text: "Join Our Team", bg: "bg-white", textColor: "text-black" },
  { text: "+91 9307024077", bg: "bg-neutral-200", textColor: "text-black" },
  { text: "contact@yourdomain.com", bg: "bg-white", textColor: "text-black", rotate: true },
  { icon: true, bg: "bg-black", textColor: "text-white" },
  { arrow: true, bg: "bg-white", textColor: "text-black" },
];

// Generate random values
const getRandom = (min, max) => Math.random() * (max - min) + min;

const ContactPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [positions, setPositions] = useState([]);
  const [startMoving, setStartMoving] = useState(false);

  // Initial static show for 2.5s
  useEffect(() => {
    const timer = setTimeout(() => {
      setStartMoving(true);
    }, 2500); // Show initially
    return () => clearTimeout(timer);
  }, []);

  // Generate new positions every 7s (5s move + 2s pause)
  useEffect(() => {
    if (!startMoving) return;

    const generateNewPositions = () => {
      const newPos = items.map(() => ({
        x: getRandom(-180, 180),
        y: getRandom(-130, 130),
        rotate: getRandom(-20, 20),
      }));
      setPositions(newPos);
    };

    generateNewPositions();
    const interval = setInterval(generateNewPositions, 7000);

    return () => clearInterval(interval);
  }, [startMoving]);

  return (
    <div className="relative h-screen w-full bg-[#d8ccb4] overflow-hidden flex items-center justify-center">
      {/* Heading */}
      <h1 className="absolute top-12 text-7xl font-extrabold text-black z-10">
        How can we <span className="text-white">help</span>?
      </h1>

      {/* Animated Items */}
      {items.map((item, index) => {
        const pos = positions[index] || { x: 0, y: 0, rotate: 0 };

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -200 }}
            animate={
              startMoving
                ? {
                    x: pos.x,
                    y: pos.y,
                    rotate: pos.rotate,
                    opacity: 1,
                    transition: {
                      duration: 5,
                      ease: "easeInOut",
                      delay: 0,
                    },
                  }
                : {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 1.5,
                      delay: index * 0.2,
                      ease: "easeOut",
                    },
                  }
            }
            className={`absolute rounded-full ${item.bg} ${item.textColor} shadow-xl cursor-pointer flex items-center justify-center ${
              item.rotate ? "rotate-90 origin-bottom-left" : ""
            }`}
            style={{
              width: item.icon || item.arrow ? 200 : 520,
              height: item.icon || item.arrow ? 200 : 160,
              padding: item.icon || item.arrow ? "1.5rem" : "2.5rem 4rem",
              fontSize: "2.5rem",
              fontWeight: 800,
            }}
            whileHover={{ scale: 1.1 }}
          >
            {item.icon ? (
              <span className="text-7xl">+</span>
            ) : item.arrow ? (
              <ArrowUpRight size={80} />
            ) : (
              item.text
            )}
          </motion.div>
        );
      })}

      {/* Menu Toggle */}
      <motion.button
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed bottom-10 right-10 bg-red-600 px-6 py-3 rounded-full z-50 shadow-xl hover:scale-105 transition-transform flex items-center gap-3"
      >
        <div className="bg-white rounded-full p-3">
          <Menu size={28} className="text-red-600" />
        </div>
        <span className="text-white font-bold text-xl">Menu</span>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-32 right-10 bg-red-600 rounded-3xl text-white w-64 py-8 z-50 flex flex-col items-center gap-5 shadow-2xl"
          >
            {["Get in touch", "Insights", "About us", "Services", "Our work", "Home"].map((label, idx) => (
              <div
                key={idx}
                onClick={() => setActiveItem(label)}
                className={`text-xl font-bold px-6 py-3 rounded-full cursor-pointer transition-colors duration-300 ${
                  activeItem === label
                    ? "bg-white text-red-600"
                    : "text-white hover:bg-white hover:text-red-600"
                }`}
              >
                {label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactPage;
