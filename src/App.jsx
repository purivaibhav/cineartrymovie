import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Services from "./components/Services";
import TeamSection from "./components/TeamSection";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import CinemaHall from "./components/Cinema";
import Production from "./components/Production";
import Productions from "./components/Prodcution1";
import CollabSection from "./components/Collab";
import Brand from "./components/Brand";
import Carrer from "./components/Carrer";
import MobileScreens from "./components/MobileScreens";
import AboutUs from "./components/Aboutus";

// import CustomCursor from "./components/CustomCursor";

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* <CustomCursor/> */}
      <Header />
      <AboutUs/>
      {/* <CinemaHall/>q */}
      <Home/>
      <Brand/>
      <MobileScreens/>
      <Carrer/>
      <Production/>
      <Productions/>
      <Services/>
      <TeamSection/>
      <CollabSection/>
      <Contact/>

      <Footer/>
      
      
    </div>
  );
}

export default App;
