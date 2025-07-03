import React, { useEffect, useState } from 'react';
import leftMobile from '../assets/mobile.png';      // Your left mobile image
import rightMobile from '../assets/mobile1.png';    // Your right mobile image

const MobileScreen = () => {
  const [scrollY, setScrollY] = useState(0);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollDirection(currentScroll > prevScrollY ? 'down' : 'up');
      setPrevScrollY(currentScroll);
      setScrollY(currentScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollY]);

  // Config
  const maxScroll = 400;
  const progress = Math.min(scrollY / maxScroll, 1);

  // Translate & Scale Logic Based on Scroll Direction
  const baseDistance = 120;
  const moveDistance = scrollDirection === 'down'
    ? baseDistance * (1 - progress) // close on scroll down
    : baseDistance * progress;      // open on scroll up

  const scale = 0.85 + progress * 0.15; // scales up slightly when scrolling

  return (
    <section className="relative h-[200vh] bg-black flex items-center justify-center overflow-hidden px-4">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1610] via-black to-[#2a0b00] z-0" />

      {/* Center Text */}
      <div className="absolute top-[20%] z-10 text-center text-white w-full px-4">
        <p className="text-sm font-semibold mb-2">
          TRUSTED <span className="text-gray-300">18,000+</span> SATISFIED CLIENTS
        </p>
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">
          Future <br className="sm:hidden" /> <span className="text-gray-300">Automation</span>
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto mb-6">
          Lorem ipsum dolor amet consur adipiscing. Nunc tortor odio rutrum fringilla.
        </p>
        <button className="bg-white text-black px-6 py-2 rounded-full font-medium hover:scale-105 transition">
          Explore Service →
        </button>
      </div>

      {/* Left Mobile */}
      <img
        src={leftMobile}
        alt="Left"
        className="absolute top-1/2 w-[240px] sm:w-[300px] md:w-[360px] transition-transform duration-300 ease-out"
        style={{
          transform: `translateY(-50%) translateX(-${moveDistance}px) scale(${scale})`,
          left: '5%',
          zIndex: 10,
        }}
      />

      {/* Right Mobile */}
      <img
        src={rightMobile}
        alt="Right"
        className="absolute top-1/2 w-[240px] sm:w-[300px] md:w-[360px] transition-transform duration-300 ease-out"
        style={{
          transform: `translateY(-50%) translateX(${moveDistance}px) scale(${scale})`,
          right: '5%',
          zIndex: 10,
        }}
      />
    </section>
  );
};

export default MobileScreen;
