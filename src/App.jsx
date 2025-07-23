import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Preloader from "./Preloader/Preloader";
// import Header from "./components/Header"; 
import Footer from "./components/Footer";

import BestHome from "./Home/BestHome";
import AboutUsPage from "./components/Aboutus";
import Production from "./components/Production";
import Services from "./components/Services";
import Contact from "./components/Contact";

import MentionsClients from "./Home/MentionsClients";
import Home from "./components/Home";
import Home2 from "./components/Home2";
import Carrer from "./components/Carrer";
import TeamSection from "./components/TeamSection";
import CollabSection from "./components/Collab";
import Projects from "./Project/Projects";
import StickySectionsLayout from "./components/StickySectionsLayout";
// import Component from "./components/Crearistpa";
import PortfolioPage from "./components/Crearistpa";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Cursor logic
  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.classList.add("custom-cursor");
    cursor.style.opacity = "0";
    document.body.appendChild(cursor);

    let firstMove = true;
    let scrollTimeout;

    const moveCursor = (e) => {
      if (firstMove) {
        cursor.style.opacity = "1";
        firstMove = false;
      }

      cursor.style.top = `${e.clientY}px`;
      cursor.style.left = `${e.clientX}px`;

      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element) {
        const bg = getComputedStyle(element).backgroundColor;
        if (isLight(bg)) {
          cursor.classList.add("black");
        } else {
          cursor.classList.remove("black");
        }
      }
    };

    const isLight = (color) => {
      if (!color) return false;
      const rgb = color.match(/\d+/g);
      if (!rgb) return false;
      const [r, g, b] = rgb.map(Number);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness > 180;
    };

    const handleScroll = () => {
      cursor.classList.add("scrolling");
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        cursor.classList.remove("scrolling");
      }, 150);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("scroll", handleScroll);
      document.body.removeChild(cursor);
    };
  }, []);

  if (isLoading) {
    return (
      <AnimatePresence>
        <Preloader key="preloader" />
      </AnimatePresence>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-white">
        {/* <Header />  */}

        <Routes>
          {/* Homepage */}
          <Route
            path="/"
            element={
              <>
                <BestHome />
                <AboutUsPage />
                <StickySectionsLayout/>
                <Home />
                <Home2 />
                <PortfolioPage/>
                <Carrer />
                
              
               
                <Services />
                <MentionsClients />
                <TeamSection />
                <CollabSection />
                <Contact />
              </>
            }
          />

          {/* Other main pages */}
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/production" element={<Production />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
