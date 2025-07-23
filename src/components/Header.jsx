import React from "react";

export default function Header() {
  return (
    <nav className="flex items-center bg-[#191919] rounded-tl-xl rounded-bl-xl p-2 px-4 w-fit shadow-md -mt-6 ml-4">
      <div className="flex items-center">
       <button className="bg-[#FF732D] w-12 h-12 rounded flex items-center justify-center mr-3">
  <img
    src="/src/Home/HomeImg/cinlogo.jpg"
    alt="Logo"
    className="w-30 h-30 object-contain"
  />
</button>

        <button className="bg-[#454545] text-white font-semibold px-3 py-1 rounded-md mr-2 text-sm">Home</button>
        <span className="text-gray-200 font-semibold mx-2 text-sm">About</span>
        <span className="text-gray-200 font-semibold mx-2 text-sm">Services</span>
        <span className="text-gray-200 font-semibold mx-2 text-sm">Work</span>
        <div className="h-6 border-l border-[#454545] mx-3"/>
        <div className="relative">
          <button className="text-white font-semibold flex items-center text-sm">
                Contact
            
          </button>
          {/* Optionally, include dropdown items here */}
        </div>
        <button className="ml-6 bg-[#1C1C1C] hover:bg-[#333] border border-[#444] rounded-full px-4 py-1 text-[#C1FF72] font-semibold text-sm transition-colors duration-150 shadow-lg">
          Login
        </button>
      </div>
    </nav>
  );
}
