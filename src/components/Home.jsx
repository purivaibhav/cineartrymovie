import React, { useEffect, useState, useRef } from "react";
import img1 from "../assets/img1.webp";
import img2 from "../assets/img2.webp";
import img3 from "../assets/img3.webp";
import img4 from "../assets/img4.webp";
import img5 from "../assets/img5.webp";

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("down");
  const [activeSection, setActiveSection] = useState(0);

  const nextSectionRef = useRef(null);
  const showcaseSectionRef = useRef(null);

  const scrollToNextSection = () => {
    nextSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrollDirection(currentY > prevScrollY ? "down" : "up");
      setPrevScrollY(currentY);
      setScrollY(currentY);
      
      // Determine active section based on scroll position
      if (showcaseSectionRef.current) {
        const showcaseTop = showcaseSectionRef.current.offsetTop;
        const showcaseHeight = showcaseSectionRef.current.offsetHeight;
        if (currentY >= showcaseTop && currentY < showcaseTop + showcaseHeight) {
          setActiveSection(1);
        } else if (currentY < showcaseTop) {
          setActiveSection(0);
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  const lines = [
    "WE DELIVER INNOVATIVE",
    "SOLUTIONS TO HELP YOUR STARTUP",
    "THRIVE BY STRATEGICALLY",
    "BUILDING ITS PRESENCE IN THE",
    "MARKET.",
  ];

  const getOpacity = (charIndex, lineIndex) => {
    const base = lineIndex * 100 + charIndex * 3;
    const progress = (scrollY - base) / 100;
    return Math.min(Math.max(progress, 0.2), 1);
  };

  // Image motion config
  const maxDistance = 200;
  const distance = Math.min(scrollY, maxDistance);
  const mergeFactor = scrollDirection === "up" ? 1 - distance / maxDistance : 1;

  return (
    <>
      {/* Hero Text Section */}
      <section className="min-h-[100vh] flex flex-col items-center justify-end px-4 text-center bg-white pb-10 relative z-10">
        <p className="text-sm uppercase tracking-widest mb-6 font-bold">
          <span className="font-bold">WELCOME TO CINEARTERY</span>
        </p>

        <div className="space-y-4">
          {lines.map((line, lineIndex) => (
            <h1
              key={lineIndex}
              className="text-[40px] sm:text-[56px] md:text-[72px] font-black tracking-tight leading-[1.1]"
            >
              {line.split("").map((char, charIndex) => (
                <span
                  key={charIndex}
                  style={{
                    color: `rgba(0,0,0,${getOpacity(charIndex, lineIndex)})`,
                    transition: "color 0.2s ease",
                    display: "inline-block",
                    marginRight: char === " " ? "0.19em" : "0",
                  }}
                >
                  {char}
                </span>
              ))}
            </h1>
          ))}
        </div>
      </section>

      {/* Image Scatter Section */}
      <section
        ref={nextSectionRef}
        className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden"
      >
        {/* Image Layer */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <img
            src={img1}
            alt="img1"
            className="absolute w-44 sm:w-56 rounded-xl transition-transform duration-[1000ms] ease-out"
            style={{
              transform: `translate(${distance * mergeFactor}px, -${distance * 1.2 * mergeFactor}px)`,
            }}
          />
          <img
            src={img2}
            alt="img2"
            className="absolute w-44 sm:w-56 rounded-xl transition-transform duration-[1100ms] ease-out"
            style={{
              transform: `translate(-${distance * 1.5 * mergeFactor}px, -${distance * 0.8 * mergeFactor}px)`,
            }}
          />
          <img
            src={img3}
            alt="img3"
            className="absolute w-44 sm:w-56 rounded-xl transition-transform duration-[1200ms] ease-out"
            style={{
              transform: `translate(-${distance * 1.2 * mergeFactor}px, ${distance * 1.1 * mergeFactor}px)`,
            }}
          />
          <img
            src={img4}
            alt="img4"
            className="absolute w-44 sm:w-56 rounded-xl transition-transform duration-[1300ms] ease-out"
            style={{
              transform: `translate(${distance * 1.3 * mergeFactor}px, ${distance * 0.9 * mergeFactor}px)`,
            }}
          />
          <img
            src={img5}
            alt="img5"
            className="absolute w-48 sm:w-60 rounded-xl transition-transform duration-[1400ms] ease-out"
            style={{
              transform: `translate(${-(1 - mergeFactor) * 250}px, ${distance * 0.8}px)`,
            }}
          />
        </div>

        {/* Center Text Content */}
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

        {/* Scroll Down Button */}
        <div className="absolute bottom-10 z-30 flex justify-center w-full">
          <button
            onClick={scrollToNextSection}
            className="w-16 h-16 rounded-full bg-black text-white text-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300"
          >
            ↓
          </button>
        </div>
      </section>

      {/* Showcase Section - Image 3 big on left with content on right */}
      <section 
        ref={showcaseSectionRef}
        className="min-h-screen bg-white py-20 px-4 sm:px-8 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
      >
        {/* Big Image 3 on left */}
        <div className={`w-full md:w-1/2 transition-all duration-1000 ease-out ${
          activeSection === 1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
        }`}>
          <img 
            src={img3} 
            alt="Showcase" 
            className="w-full h-auto max-h-[70vh] object-cover rounded-xl shadow-xl"
          />
        </div>
        
        {/* Content on right */}
        <div className={`w-full md:w-1/2 space-y-6 transition-all duration-1000 ease-out delay-200 ${
          activeSection === 1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
        }`}>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
            WE SHOWCASE OUR EXCELLENCE
          </h2>
          <h3 className="text-2xl font-semibold text-gray-700">
            SUCCESS THROUGH OUR CLIENTS
          </h3>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="text-4xl font-bold text-gray-900">98%</p>
              <p className="text-sm text-gray-600 mt-2">SOCIAL MEDIA IMPRESSIONS</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="text-4xl font-bold text-gray-900">15M</p>
              <p className="text-sm text-gray-600 mt-2">CREATIVE IDEAS DELIVERED</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="text-4xl font-bold text-gray-900">120+</p>
              <p className="text-sm text-gray-600 mt-2">TEMPLATES</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-600">CUSTOMIZATION</p>
            </div>
          </div>
          
          <button className="mt-8 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors duration-300">
            Hire Our Team
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;