import React from "react";
import videoFile from "../assets/Film_Studio_Render_Ready_1.mp4";

const Services = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white font-sans">
      {/* Background Video */}
      <video
        src={videoFile}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-90 z-0 pointer-events-none"
      />

      {/* Overlay Content */}
      {/* <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 bg-black/50">
        <h1 className="text-[8vw] font-extrabold text-gray-100 drop-shadow-md">
          Our Services
        </h1>
        <p className="text-xl sm:text-2xl max-w-2xl mt-4 text-gray-300">
          We craft immersive film studio experiences with design, VFX, and creative direction that tell powerful stories.
        </p>
        <button className="mt-10 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all">
          Get in Touch
        </button>
      </div> */}
    </div>
  );
};

export default Services;
