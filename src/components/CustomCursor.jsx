import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const updateMousePosition = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-blue-500 z-[9999] pointer-events-none"
      style={{
        x: position.x - 16,
        y: position.y - 16,
      }}
      animate={{
        x: position.x - 16,
        y: position.y - 16,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    />
  );
};

export default CustomCursor;
