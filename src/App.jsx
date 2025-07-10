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



function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Adjust timing if needed
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence>
        {isLoading && <Preloader key="preloader" />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <BestHome />
          <AboutUsPage />
          <Header />
          <Home />
          <Home2 />
          {/* <Brand /> */}
          <MobileScreens />
          <Carrer />
          <Production />
          <Projects/>
         <SlidingImag/>
          
          
          <Services />
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
