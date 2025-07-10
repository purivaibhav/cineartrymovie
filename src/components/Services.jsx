import React, { useRef } from "react";
import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";
import video3 from "../assets/video3.mp4";
import video4 from "../assets/video4.mp4";

const Services = () => {
  const scrollRef = useRef(null);

  const scrollToContent = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#1c1c1c] text-white font-sans">
      {/* Hero Section */}
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-[240px] font-extrabold leading-none text-center">WHAT<br />WE DO</h1>
        <button
          onClick={scrollToContent}
          className="mt-10 text-white text-l font-bold tracking-widest hover:underline"
        >
          CHECK OUT OUR SERVICES ↘
        </button>
      </div>

      {/* Strategy Section */}
      <div ref={scrollRef} className="flex flex-col md:flex-row items-center px-10 py-20 gap-12">
        {/* Left Content */}
        <div className="md:w-1/2 relative">
          <div className="absolute left-[-30px] top-[-5px] " />  {/* Decorative element  h-4 w-4 rounded-full animate-ping bg-red-600*/ }
          <h2 className="text-8xl font-extrabold mb-6">STRATEGY</h2>
          <p className="mb-4 text-lg text-gray-300">
            We focus on crafting a tailored creative vision that aligns with your brand’s goals. From initial concept development to scriptwriting and storyboarding, we ensure everything aligns with your goals.
          </p>
          <p className="mb-4 text-lg text-gray-300">
            We amplify brands through strategic promotion and community engagement. With real-time analytics and influencer partnerships, we ensure your audience stays connected and your content reaches its full potential.
          </p>
          <ul className="text-gray-300 mt-6 space-y-1 text-sm">
            <li>CREATIVE DIRECTION</li>
            <li>BRANDING</li>
            <li>CAMPAIGN DEVELOPMENT</li>
            <li>STORYBOARDING</li>
            <li>CONTENT STRATEGY</li>
            <li>COMMUNITY BUILDING</li>
            <li>PERFORMANCE DATA ANALYTICS</li>
          </ul>
        </div>

        {/* Right Video */}
        <div className="md:w-1/2">
          <video src={video1} autoPlay muted loop playsInline className="rounded-xl w-full" />
        </div>
      </div>

      {/* Captation Section */}
      <div className="flex flex-col md:flex-row items-center px-10 py-20 gap-12">
        <div className="md:w-1/2">
          <video src={video2} autoPlay muted loop playsInline className="rounded-xl w-full" />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-8xl font-extrabold mb-6">CAPTATION</h2>
          <p className="mb-4 text-lg text-gray-300">
            We specialize in capturing content that connects. Our goal is to create compelling content that performs across various platforms.
          </p>
          <ul className="text-gray-300 mt-6 space-y-1 text-sm">
            <li>COMMERCIALS</li>
            <li>AFTERMOVIES</li>
            <li>PHOTOGRAPHY</li>
            <li>DISPLAY CONTENT</li>
            <li>SOCIAL MEDIA CONTENT</li>
          </ul>
        </div>
      </div>

      {/* Post Production Section */}
      <div className="flex flex-col md:flex-row items-center px-10 py-20 gap-12">
        <div className="md:w-1/2">
          <h2 className="text-8xl font-extrabold mb-6">POST PRODUCTION</h2>
          <p className="mb-4 text-lg text-gray-300">
            We take your content to the next level with high-end editing, sound design and advanced visual effects. We integrate advanced techniques to bring your story to life in the most dynamic way.
          </p>
          <ul className="text-gray-300 mt-6 space-y-1 text-sm">
            <li>EDITING</li>
            <li>COLOR GRADING</li>
            <li>3D SCANNING, MODELING & ANIMATION</li>
            <li>MOTION GRAPHICS</li>
            <li>MUSIC & SOUND DESIGN</li>
          </ul>
        </div>
        <div className="md:w-1/2">
          <video src={video3} autoPlay muted loop playsInline className="rounded-xl w-full" />
        </div>
      </div>

      {/* Experience Section */}
      <div className="flex flex-col md:flex-row items-center px-10 py-20 gap-12">
        <div className="md:w-1/2">
          <video src={video4} autoPlay muted loop playsInline className="rounded-xl w-full" />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-8xl font-extrabold mb-6">EXPERIENCE</h2>
          <p className="mb-4 text-lg text-gray-300">
            We bring live events to life with dynamic visuals and seamless execution, capturing and sharing every moment to maximize audience impact and create lasting impressions.
          </p>
          <ul className="text-gray-300 mt-6 space-y-1 text-sm">
            <li>SHOW CONTENT</li>
            <li>LIVE BROADCAST</li>
            <li>SCREEN CONTENT</li>
            <li>DAY RECAPS</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Services;