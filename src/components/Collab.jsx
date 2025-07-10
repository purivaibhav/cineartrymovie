import React from "react";
import bgImage from "../assets/collabimg.png"; // <-- Replace this with your image path

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <img
        src={bgImage}
        alt="LinkedIn-style background"
        className="w-full h-full object-cover"
      />

      {/* Text & Button Overlay */}
      <div className="absolute top-0 left-0 w-full h-full flex items-start justify-start pt-20 pl-10 sm:pt-32 sm:pl-20">
        <div className="max-w-xl">
          {/* <h1 className="text-2xl md:text-3xl font-semibold text-white mb-6 leading-snug">
            Join your colleagues, classmates, and friends on CineArtery.
          </h1> */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg rounded-full transition duration-300">
            Get started
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
