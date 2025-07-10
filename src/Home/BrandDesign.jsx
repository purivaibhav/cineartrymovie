import React, { useState } from "react";

const BrandDesign = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const sections = [
    {
      title: "Strategy",
      img1: "https://duo-studio-v2.netlify.app/images/page4-img1.webp",
      img2: "https://duo-studio-v2.netlify.app/images/page4-img2.webp",
    },
    {
      title: "Identity",
      img1: "https://duo-studio-v2.netlify.app/images/page4-img3.webp",
      img2: "https://duo-studio-v2.netlify.app/images/page4-img4.webp",
    },
    {
      title: "Experience",
      img1: "https://duo-studio-v2.netlify.app/images/page4-img5.webp",
      img2: "https://duo-studio-v2.netlify.app/images/page4-img6.webp",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-black border-b-2 border-gray-800 px-8 py-16 relative">
      <h4 className="text-center text-xs font-light text-white mb-6 leading-tight">
        DESIGNED TO BRING OUT <br /> THE TRUTH OF YOUR BRAND
      </h4>

      {sections.map((item, index) => (
        <div
          key={index}
          className="relative flex items-center justify-center py-6 group cursor-pointer"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Left Image */}
          <img
            src={item.img1}
            alt=""
            className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out translate-y-4 group-hover:translate-y-0 left-10 h-64 pointer-events-none"
          />

          {/* Center Text */}
          <div className="overflow-hidden h-[120px] relative">
            <h1
              className={`text-[6.5vw] font-light transition-colors duration-300 ${
                hoveredIndex === index
                  ? "text-[#EDBFFF]"
                  : hoveredIndex !== null
                  ? "text-black"
                  : "text-white"
              }`}
            >
              {item.title}
            </h1>
          </div>

          {/* Right Image */}
          <img
            src={item.img2}
            alt=""
            className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out translate-y-4 group-hover:translate-y-0 right-10 h-64 pointer-events-none"
          />
        </div>
      ))}
    </div>
  );
};

export default BrandDesign;
