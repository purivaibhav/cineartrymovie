import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import cartoonImg from "../assets/cartoo1.png"; // Replace with your image

const Production = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef });

  // Animate text scale and color
  const textScale = useTransform(scrollYProgress, [0, 1], [0.6, 1.5]);
  const textColor = useTransform(
  scrollYProgress,
  [0, 1],
  ["#3B82F6", "#9CA3AF"] // Blue → Gray
);



  const scaleSpring = useSpring(textScale, { stiffness: 80, damping: 20 });
  const colorSpring = useSpring(textColor, { stiffness: 80, damping: 20 });

  // Floating cursor text (only inside section)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showFloatingText, setShowFloatingText] = useState(false);

  const handleMouseMove = (e) => {
    const section = sectionRef.current;
    const bounds = section.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    // Only show if inside the section
    if (
      x >= bounds.left &&
      x <= bounds.right &&
      y >= bounds.top &&
      y <= bounds.bottom
    ) {
      setCursorPos({ x, y });
      setShowFloatingText(true);
    } else {
      setShowFloatingText(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-[100vh] bg-[#FFF5E1] overflow-hidden"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center z-10">
        {/* Scroll Animated Text */}
        <motion.h1
          style={{ scale: scaleSpring, color: colorSpring }}
          className="absolute text-[10vw]   font-extrabold uppercase pointer-events-none select-none z-0"
        >
          Expertises
        </motion.h1>

        {/* Static Image */}
        <div className="relative z-10">
          <img
            src={cartoonImg}
            alt="Cartoon"
            className="w-full max-w-[800px] mx-auto object-contain"
          />
        </div>
      </div>

      {/* Floating text inside section only */}
      {showFloatingText && (
        <motion.div
          key={`${cursorPos.x}-${cursorPos.y}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed pointer-events-none text-s px-2 py-1 bg-blue-600 text-white rounded shadow"
          style={{
            top: cursorPos.y + 12,
            left: cursorPos.x + 12,
            zIndex: 50,
          }}
        >
          Lights! Camera! Action!
        </motion.div>
      )}
    </div>
  );
};

export default Production;
