import React from "react";

const Footer = () => {
  return (
    <footer className="w-full h-screen bg-[#141414] text-white relative overflow-hidden font-sans">
      {/* Top Left Text */}
      <div className="absolute top-10 left-5 md:left-10">
        <p className="text-[24px] md:text-[28px] font-extrabold leading-tight">
          WE NO NAME,<br />
          WE WORK THEREFOR
        </p>
      </div>

      {/* Center Right Call-to-Action */}
      <div className="absolute right-5 md:right-10 top-1/2 transform -translate-y-1/2 text-right group">
        <h2 className="text-[32px] md:text-[36px] font-extrabold">
          LET'S KEEP IN TOUCH{" "}
          <span className="inline-block transition-transform group-hover:animate-wiggle">
            👈
          </span>
        </h2>
        <a
          href="#contact"
          className="mt-2 block text-sm md:text-base text-gray-300 underline"
        >
          ↳ WRITE TO US
        </a>
      </div>

      {/* Bottom Left Copyright */}
      <div className="absolute bottom-40 left-5 md:left-10 text-sm text-gray-400">
        Copyright - CineArtery. Created by Vaibhav Puri
      </div>

      {/* Bottom Right Confidentiality Link */}
      <div className="absolute bottom-40 right-5 md:right-10 text-sm text-gray-400">
        <a href="#" className="underline">
          CONFIDENTIALITY POLICY
        </a>
      </div>

      {/* Giant NONAME Text */}
      <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-full text-center px-4">
        <h1 className="text-[200px] md:text-[200px] font-black text-white opacity-5 tracking-tight leading-none select-none pointer-events-none whitespace-nowrap">
          CINEARTERY
        </h1>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-white text-black shadow-md flex items-center justify-center text-xl hover:scale-110 transition"
      >
        ↑
      </button>

      {/* Wiggle Animation Style */}
      <style>
        {`
          @keyframes wiggle {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-4px); }
            75% { transform: translateX(4px); }
          }
          .animate-wiggle {
            animation: wiggle 0.5s ease-in-out infinite;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
