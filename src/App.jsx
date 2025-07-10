import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import Preloader from "./Preloader/Preloader";
import FrontPage from "./components/FrontPage";
import AboutUsPage from "./components/Aboutus";
import Header from "./components/Header";
import Home from "./components/Home";
import Home2 from "./components/Home2";
import MobileScreens from "./components/MobileScreens";
import Carrer from "./components/Carrer";
import Production from "./components/Production";
import Services from "./components/Services";
import TeamSection from "./components/TeamSection";
import CollabSection from "./components/Collab";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SlidingImag from "./SlidingImages/SlidingImg";
import Projects from "./Project/Projects";
import BestHome from "./Home/BestHome";
import BrandDesign from "./Home/BrandDesign";
import MentionsClients from "./Home/MentionsClients";



function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Adjust timing if needed
    return () => clearTimeout(timer);
  }, []);

  //  cursor logic

  useEffect(() => {
  const cursor = document.createElement("div");
  cursor.classList.add("custom-cursor");
  cursor.style.opacity = "0"; // Hide initially
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
    }, 150); // remove after 150ms of inactivity
  };

  window.addEventListener("mousemove", moveCursor);
  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("mousemove", moveCursor);
    window.removeEventListener("scroll", handleScroll);
    document.body.removeChild(cursor);
  };
}, []);


  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence>
        {isLoading && <Preloader key="preloader" />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Header />
          <BestHome />
          <AboutUsPage />
            <BrandDesign/>
          
          <Home />
          <Home2 />
          {/* <Brand /> */}
          {/* <MobileScreens /> */}
          <Carrer />
          <Production />
          <Projects/>
         {/* <SlidingImag/> */}
          
       
          <Services />
          <MentionsClients/>
          <TeamSection />
          <CollabSection />
          <Contact />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
