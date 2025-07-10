import React, { useEffect, useState } from "react";
import { Menu, ShoppingCart } from "lucide-react";
import logo from "../assets/logoo.jpg";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import CinemaHall from "./Cinema";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ${
        scrolled ? "-translate-y-full" : "translate-y-0"
      } bg-white  pl-1 pr-4 py-1`}
    >
      <div className="flex items-center justify-between">
        {/* LEFT SIDE: Logo + Contact */}
        <div className="flex items-center gap-4 ">
          {/* Logo */}
          <img
            src={logo}
            alt="Company Logo"
            className={`transition-all cursor-pointer duration-300 object-contain  ${
              scrolled ? "h-10" : "h-20"  //h-15 h-30
            } -ml-7 ${!scrolled ? "animate-float" : ""}`}
          />

          {/* Inquiry + Call Info */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm text-gray-700">
            <div className="text-left">
              <p className="text-xs text-gray-500 font-semibold  uppercase">
                For Inquiries :
              </p>
              <p className={`font-bold ${scrolled ? "text-sm" : "text-lg"}`}>
                info@example.com
              </p>
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-500 font-semibold uppercase">
                Call Us :
              </p>
              <p className={`font-bold ${scrolled ? "text-sm" : "text-lg"}`}>
                (888) 123 4560
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: Cart + Menu */}
        <div className="flex items-center gap-10 mr-4 cursor-pointer">
          {/* <div className="relative">
            <ShoppingCart size={scrolled ? 22 : 28} className="text-black" />
            <span className="absolute -top-2 -right-2 text-xs bg-black text-white rounded-full px-1">
              0
            </span>
          </div> */}
          <button onClick={() => setMenuOpen(true)}>
            <Menu size={scrolled ? 24 : 30} />
          </button>
        </div>
      </div>

    {menuOpen && (
  <div className="fixed inset-0 z-[999] flex text-black h-screen">
    {/* Left Side */}
    <div className="w-1/2 bg-white flex flex-col justify-start px-10 pt-10 space-y-6 animate-slide-down">
      <img
        src={logo}
        alt="CREARIST Logo"
        className="h-12 w-auto object-contain -ml-50"
      />

      {["HOME", "ABOUT US", "PRODUCTION", "SERVICES", "CONTACT", "FAQ"].map((item) => (
        <a
          key={item}
          className="text-6xl text-black font-heading font-bold tracking-wide transform transition-all duration-300 hover:translate-x-6 cursor-pointer"
        >
          {item}
        </a>
      ))}
    </div>

    {/* Right Side */}
    <div className="w-1/2 bg-gray-100 flex flex-col justify-between px-10 pt-10 pb-16 space-y-8 overflow-y-auto h-screen">
      {/* Contact Info */}
      <div>
        <h2 className="text-2xl font-bold mb-6">GET IN TOUCH</h2>

        {[{
          Icon: FiPhone,
          label: "Phone",
          value: "(888) 456 7890"
        }, {
          Icon: FiMail,
          label: "Email now",
          value: "info@example.com"
        }, {
          Icon: FiMapPin,
          label: "Office address",
          value: "410 Sandtown, California\n94001, USA"
        }].map(({ Icon, label, value }, idx) => (
          <div key={idx} className="flex items-center gap-4 mb-4">
            <div className="bg-black rounded-full p-3">
              <Icon className="text-white text-lg" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{label}</p>
              <p className="text-md font-medium whitespace-pre-line">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Social Links */}
      <div>
        <h2 className="text-xl font-bold mb-4">SOCIAL LINK</h2>
        <div className="flex flex-wrap gap-6 text-md text-gray-700">
          {[{
            Icon: FaFacebookF, label: "Facebook"
          }, {
            Icon: FaTwitter, label: "Twitter"
          }, {
            Icon: FaLinkedinIn, label: "LinkedIn"
          }, {
            Icon: FaInstagram, label: "Instagram"
          }].map(({ Icon, label }, idx) => (
            <div key={idx} className="flex items-center gap-2 cursor-pointer hover:-translate-x-2 transition-all duration-300">
              <Icon /> <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Close Button */}
    <button
      onClick={() => setMenuOpen(false)}
      className="absolute top-6 right-6 text-5xl font-bold text-gray-700 hover:text-black transition-all z-[1000] cursor-pointer"
    >
      &times;
    </button>
  </div>
)}

     
    </header>

    
  );
};

<section className="relative bg-black pt-10 min-h-screen">
  <CinemaHall/>
</section>

export default Header;
