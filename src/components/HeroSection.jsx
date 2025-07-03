import React, { useEffect, useState } from "react";
import img1 from "../assets/img1.webp";
import img2 from "../assets/img2.webp";
import img3 from "../assets/img3.webp";
import img4 from "../assets/img4.webp";
import img5 from "../assets/img5.webp";

const HeroImages = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // How far images will move
  const distance = Math.min(scrollY, 200); // max 200px for smoothness

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Image Container */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        {/* Center all initially, spread later */}
        <img
          src={img1}
          alt="img1"
          className="absolute w-44 sm:w-56 rounded-xl transition-transform duration-300"
          style={{
            transform: `translate(${distance}px, -${distance}px)`,
          }}
        />
        <img
          src={img2}
          alt="img2"
          className="absolute w-44 sm:w-56 rounded-xl transition-transform duration-300"
          style={{
            transform: `translate(-${distance}px, -${distance}px)`,
          }}
        />
        <img
          src={img3}
          alt="img3"
          className="absolute w-44 sm:w-56 rounded-xl transition-transform duration-300"
          style={{
            transform: `translate(-${distance}px, ${distance}px)`,
          }}
        />
        <img
          src={img4}
          alt="img4"
          className="absolute w-44 sm:w-56 rounded-xl transition-transform duration-300"
          style={{
            transform: `translate(${distance}px, ${distance}px)`,
          }}
        />
        <img
          src={img5}
          alt="img5"
          className="absolute w-48 sm:w-60 rounded-xl transition-transform duration-300"
          style={{
            transform: `translate(0, ${distance}px)`,
          }}
        />
      </div>

      {/* Text Content */}
      <div
        className={`relative z-20 text-center px-4 transition-opacity duration-700 ease-in ${
          scrollY > 80 ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-xs sm:text-sm font-semibold uppercase text-gray-600 mb-2">
          15+ Years of Work Experience
        </p>
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight">
          YOUR TRUSTED <br /> PARTNER IN DESIGN <br /> EXCELLENCE
        </h1>
      </div>
    </section>
  );
};

export default HeroImages;
