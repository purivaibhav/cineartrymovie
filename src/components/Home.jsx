import React, { useEffect, useState, useRef } from "react";

const Home = () => {
  const sectionRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [isInView, setIsInView] = useState(false);

  const lines = [
    "WE DELIVER INNOVATIVE",
    "SOLUTIONS TO HELP YOUR STARTUP",
    "THRIVE BY STRATEGICALLY",
    "BUILDING ITS PRESENCE IN THE",
    "MARKET.",
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      checkInView();
    };

    const checkInView = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      setIsInView(isVisible);
    };

    window.addEventListener("scroll", handleScroll);
    checkInView();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getOpacity = (charIndex, lineIndex) => {
    if (!isInView) return 0.2;
    const base = lineIndex * 100 + charIndex * 3;
    const progress = (scrollY - sectionRef.current.offsetTop - base) / 100;
    return Math.min(Math.max(progress, 0.2), 1);
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-[100vh] flex flex-col items-center justify-end px-4 text-center bg-white pb-10 relative z-10"
    >
      {/* Always Black Title */}
      <p className="text-sm uppercase tracking-widest mb-6 font-bold text-black">
        <span className="font-bold">WELCOME TO CINEARTERY</span>
      </p>

      {/* Scroll-reactive lines */}
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
                  transition: "color 0.3s ease",
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
  );
};

export default Home;
