import React from "react";
import img1 from "../assets/prof1.jpg";
import img2 from "../assets/prof2.jpg";
import img3 from "../assets/prof3.jpg";
import img4 from "../assets/prof4.jpg";
import img5 from "../assets/prof5.jpg";
import img6 from "../assets/prof6.jpg";
import img7 from "../assets/prof7.jpg";
import img8 from "../assets/prof8.jpg";

const team = [
  { name: "Neha Tandon Sharma", role: "Founder, Isadora Life", img: img1 },
  { name: "Sandeep Jain", role: "Founder, XYZ Studio", img: img2 },
  { name: "Nikita Gujral", role: "Founder, AN Fashions", img: img3 },
  { name: "Aryan Shah", role: "CTO, Techverse", img: img4 },
  { name: "Riya Kapoor", role: "CMO, Trendy Styles", img: img5 },
  { name: "Rahul Verma", role: "COO, Innovatech", img: img6 },
  { name: "Priya Singh", role: "CFO, FinCorp", img: img7 },
  { name: "Arjun Mehta", role: "Founder, Designify", img: img8 },
];

const TeamSection = () => {
  const handleSpin = (e, dir) => {
    e.currentTarget.classList.add(dir === "clockwise" ? "spin-cw" : "spin-ccw");
    setTimeout(() => {
      e.currentTarget.classList.remove("spin-cw", "spin-ccw");
    }, 1000);
  };

  return (
    <section className="bg-[#f4f5f7] py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-10 flex justify-between items-center">
        <h2 className="text-4xl font-extrabold text-gray-800">
          Cineartery grows with <span className="text-blue-600">you!</span>
        </h2>
        <p className="text-xl font-semibold text-gray-700">
          1,50,000+ Businesses
        </p>
      </div>

      {/* Auto-scrolling container */}
      <div className="relative">
        {/* Fade effect on sides */}
        <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r  to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l  to-transparent z-10 pointer-events-none" />

        {/* Scrolling row */}
        <div className="whitespace-nowrap overflow-hidden">
          <div className="inline-flex animate-scroll gap-6">
            {[...team, ...team].map((member, idx) => (
              <div
                key={idx}
                className="min-w-[320px] rounded-lg overflow-hidden bg-white shadow-md transform transition duration-500 hover:scale-105 cursor-pointer relative"
                onMouseEnter={(e) => handleSpin(e, "clockwise")}
                onClick={(e) => handleSpin(e, "anticlockwise")}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-sm">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
