import React, { useState } from "react";

const clients = [
  {
    name: "Verizon",
    year: "2021",
    description: "Small Business Feature",
    image:
      "https://duo-studio-v2.netlify.app/images/home-mentions-awwwards-mobile.webp",
  },
  {
    name: "Awwards",
    year: "2023",
    description: "Honorable Mention",
    image:
      "https://duo-studio-v2.netlify.app/images/home-mentions-awwwards-honorablemention.webp",
  },
  {
    name: "Awwards",
    year: "2020",
    description: "Mobile Excellence",
    image:
      "https://duo-studio-v2.netlify.app/images/home-mentions-verizon.webp",
  },
  {
    name: "Mindsparkle Mag",
    year: "2020",
    description: "Site of the Day",
    image:
      "https://duo-studio-v2.netlify.app/images/home-mentions-orpetron.webp",
  },
  {
    name: "Orpetron",
    year: "2020",
    description: "Site of the Day",
    image:
      "https://duo-studio-v2.netlify.app/images/home-mentions-mindsparkle.webp",
  },
];

const MentionsClients = () => {
  const [hoveredImage, setHoveredImage] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="relative bg-[#0F0D0D] text-white px-8 py-20 overflow-hidden scroll-smooth"
      onMouseMove={handleMouseMove}
    >
      {/* Floating Image following cursor */}
      {hoveredImage && (
        <div
          className="fixed z-50 w-[400px] h-[300px] rounded-[10px] bg-cover bg-center pointer-events-none transition-all duration-100 ease-linear mix-blend-normal"
          style={{
            backgroundImage: `url(${hoveredImage})`,
            left: `${mousePosition.x + 20}px`,
            top: `${mousePosition.y - 150}px`,
          }}
        />
      )}

      {/* Header */}
      <div className="flex justify-between items-center gap-10 px-10 mb-12">
        <h1 className="text-[9vh] font-light leading-tight">
          <span className="text-[#EDBFFF]">MENTIONS</span> CLIENTS
        </h1>
        <h3 className="text-[2.5vh] font-light">VIEW CLIENTS</h3>
      </div>

      {/* Client Grid */}
      <div className="space-y-4 text-[#8b8b8b]">
        {clients.map((client, index) => (
          <div
            key={index}
            className="grid grid-cols-3 border-t border-white/50 px-10 py-6 items-center transition duration-300 hover:bg-white/5"
            onMouseEnter={() => setHoveredImage(client.image)}
            onMouseLeave={() => setHoveredImage(null)}
          >
            <h3 className="text-[3.2vh] font-light hover:text-white transition">
              {client.name}
            </h3>
            <p className="text-[2.5vh] font-light text-center hover:text-white transition">
              {client.description}
            </p>
            <h4 className="text-[2.5vh] font-light text-right hover:text-white transition">
              {client.year}
            </h4>
          </div>
        ))}
        <div className="border-b border-white/50 px-10" />
      </div>
    </div>
  );
};

export default MentionsClients;
