import React, { useEffect, useState } from "react";

const Preloader = ({ onFinish }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
      setTimeout(onFinish, 800);
    }, 1600); // animation before split

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gray-800">
      {/* Top-left slanted panel */}
      <div
        className={`absolute w-full h-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 transform origin-bottom-right transition-transform duration-[700ms] ease-in-out ${
          loaded ? "-translate-y-full rotate-[-30deg]" : "rotate-[-30deg]"
        }`}
      />

      {/* Bottom-right slanted panel */}
      <div
        className={`absolute bottom-0 w-full h-1/2 bg-gradient-to-r from-pink-500 to-red-500 transform origin-top-left transition-transform duration-[700ms] ease-in-out ${
          loaded ? "translate-y-full rotate-[30deg]" : "rotate-[30deg]"
        }`}
      />
    </div>
  );
};

export default Preloader;
