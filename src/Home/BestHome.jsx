"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

// Import images
import musicImg from "./HomeImg/music.png"
import clapboardImg from "./HomeImg/clapboard.png"
import noteImg from "./HomeImg/note.png"
import calenderImg from "./HomeImg/calender.png"
import ticketImg from "./HomeImg/ticket.png"

const originalList = [
  {
    id: 1,
    // image: musicImg,
    image: noteImg,
    bg: "bg-purple-500",
    shape: "rounded-full",
    text: "songs",
  },
  {
    id: 2,
    image: clapboardImg,
    bg: "bg-green-600",
    shape: "rounded-2xl",
    text: "movie",
  },
  {
    id: 3,
    // image: noteImg,
    image: calenderImg,
    bg: "bg-orange-500",
    shape: "rounded-2xl",
    text: "interests",
  },
  {
    id: 4,
    // image: ticketImg,
    image: musicImg,
    bg: "bg-yellow-400",
    shape: "rounded-2xl",
    text: "shopping",
  },
  {
    id: 5,
    // image: calenderImg,
    image: ticketImg,
    bg: "bg-blue-500",
    shape: "rounded-full",
    text: "habits",
  },
]



export default function BestHome() {
  const sectionRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)
  const [icons, setIcons] = useState(originalList)
  const [shuffling, setShuffling] = useState(true)
  const [blink, setBlink] = useState(false)
  const [textStage, setTextStage] = useState(0)

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const scrollTop = window.scrollY
        const currentScrollY = scrollTop - rect.top
        setScrollY(currentScrollY)

        // Update text stage based on scroll position
        if (currentScrollY <= 1000) {
          setTextStage(0) // Initial state - shuffling
        } else if (currentScrollY > 1000 && currentScrollY < 1150) {
          setTextStage(0.1) // Icons shrink but stay visible
        } else if (currentScrollY >= 1150 && currentScrollY < 1300) {
          setTextStage(0.2) // Background changes to cream
        } else if (currentScrollY >= 1300 && currentScrollY < 1450) {
          setTextStage(0.3) // Icons move to positions
        } else if (currentScrollY >= 1450 && currentScrollY < 1600) {
          setTextStage(1) // "Your favorite [music] songs." appears
        } else if (currentScrollY >= 1600 && currentScrollY < 1750) {
          setTextStage(2) // "That [movie]" appears
        } else if (currentScrollY >= 1750 && currentScrollY < 1900) {
          setTextStage(3) // "That [movie] must-see movie." completes
        } else if (currentScrollY >= 1900 && currentScrollY < 2050) {
          setTextStage(4) // "Your top [ghost]" appears
        } else if (currentScrollY >= 2050 && currentScrollY < 2200) {
          setTextStage(5) // "Your top [ghost] interests and" completes
        } else if (currentScrollY >= 2200 && currentScrollY < 2350) {
          setTextStage(6) // "all your shopping [shopping][shirt] habits." completes
        } else if (currentScrollY >= 2350 && currentScrollY < 2500) {
          setTextStage(7) // Transition to data section - background turns black
        } else {
          // Calculate word reveal progress for the data section - FASTER AND SMOOTHER
          const dataStartScroll = 2500
          const totalDataScroll = 1500 // Reduced from 3000 to make it faster
          const wordRevealProgress = Math.max(0, Math.min(1, (currentScrollY - dataStartScroll) / totalDataScroll))
          setTextStage(7 + wordRevealProgress)
        }

        // Handle shuffling state
        if (currentScrollY <= 1000) {
          if (!shuffling) {
            setShuffling(true)
            setIcons(originalList)
          }
        } else {
          if (shuffling) {
            setShuffling(false)
            setIcons(originalList)
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [shuffling])

  // Shuffle and Blink icons before scroll
  useEffect(() => {
    if (!shuffling) return

    const interval = setInterval(() => {
      setBlink(true)
      setTimeout(() => {
        setIcons((prev) => [...prev].sort(() => Math.random() - 0.5))
        setBlink(false)
      }, 300)
    }, 2500)

    return () => clearInterval(interval)
  }, [shuffling])

  const getIconStyle = (index) => {
    const delay = index * 150
    // Handle different scroll states
    if (textStage === 0) {
      // Initial shuffling state
      const yOffset = scrollY > delay && scrollY <= 1000 ? -70 : 0
      const scale = blink ? 0.6 : 1
      return { y: yOffset, scale }
    } else if (textStage >= 0.1 && textStage < 1) {
      // Icons shrink and stay visible
      const scale = blink ? 0.4 : 0.5
      return { y: -70, scale }
    } else {
      // Text phase - icons are hidden (handled by text component)
      return { y: -70, scale: 0.5, opacity: 0 }
    }
  }

  

  const getBackgroundColor = () => {
  if (textStage >= 7) {
    return "bg-amber-50 text-black" // Keep cream instead of going to black
  } else if (textStage >= 0.2) {
    return "bg-amber-50 text-black"
  }
  return "bg-black text-white"
}


  const renderInlineIcon = (iconData, size = 80) => (
    <motion.div
      className={`inline-flex items-center justify-center ${iconData.bg} ${iconData.shape} mx-1 p-2`}
      style={{ width: size, height: size }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <img
        src={iconData.image || "/placeholder.svg"}
        alt={iconData.text}
        style={{
          width: size * 0.6,
          height: size * 0.6,
          objectFit: "contain",
        }}
      />
    </motion.div>
  )

  // Function to determine if a word should be visible based on scroll progress - SMOOTHER
  const getWordVisibility = (wordIndex, totalWords) => {
    if (textStage < 7) return false
    const progress = textStage - 7 // Get the decimal part (0 to 1)
    const wordThreshold = wordIndex / totalWords
    // Add a small buffer for smoother transitions
    return progress >= wordThreshold - 0.02
  }

  // Split text into words and render with progressive visibility - FASTER TRANSITIONS
  const renderProgressiveText = (text, startIndex = 0) => {
    const words = text.split(" ")
    return words.map((word, index) => {
      const globalIndex = startIndex + index
      const isVisible = getWordVisibility(globalIndex, 65) // Increased total word count for smoother progression
      return (
        <span
          key={globalIndex}
          className={`transition-colors duration-150 ease-out ${isVisible ? "text-white" : "text-black"}`}
        >
          {word}{" "}
        </span>
      )
    })
  }

  return (
    <section
      ref={sectionRef}
      className={`min-h-[270vh] w-full transition-colors duration-500 ease-in-out ${getBackgroundColor()}`}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden relative pt-24 sm:pt-32">
      

        <h1
          className={`text-[60px] md:text-[90px] font-black text-center leading-none mb-4 transition-opacity duration-500 ${
            scrollY > 100 ? "opacity-0" : "opacity-100"
          }`}
        >
          Welcome to
          <br />
          CineArtery
        </h1>

        <p
          className={`text-lg md:text-xl mb-6 transition-opacity duration-500 ${
            scrollY > 100 ? "opacity-0" : "opacity-100"
          }`}
        >
          From imagination to ‘Action!’ Your story starts here...
        </p>

         {/* Download Rewards Button */}
        <motion.div
          className={`mb-12 transition-opacity duration-500 ${
            scrollY > 100 ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: scrollY > 100 ? 0 : 1,
            y: scrollY > 100 ? -20 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <button className="bg-green-400 hover:bg-green-500 text-black font-semibold px-6 py-3 rounded-full flex items-center gap-3 transition-all duration-200 hover:scale-105 shadow-lg">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-gradient-to-br from-red-500 via-yellow-500 to-green-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
            </div>
            <span>Download App</span>
          </button>
        </motion.div>

        

        {/* Fun fact text that appears when background turns cream */}
        {textStage >= 0.2 && textStage < 7 && (
          <motion.div
            className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center w-full px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: textStage >= 0.2 && textStage < 7 ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl md:text-2xl font-bold mb-2 -mt-8">{"Here's a fun fact:"}</h2>
            <p className="text-lg md:text-xl mb-3 -mt-2" >Today, you are the product</p>
          </motion.div>
        )}

        {/* Progressive text with positioned icons */}
        {textStage >= 1 && 
 (
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: textStage >= 1 && textStage < 7 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-4xl md:text-5xl font-black leading-tight max-w-6xl mx-auto">
              <div className="relative w-full min-h-96">
                {/* Stage 1: Your favorite songs */}
                {textStage >= 1 && (
                  <motion.div
                    className="flex items-center justify-center mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: textStage >= 1 ? 1 : 0, y: textStage >= 1 ? 0 : 20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span>Creative Talent.</span>
                    {renderInlineIcon(originalList[0], 80)}
                    <span> Right Budget.</span>
                  </motion.div>
                )}

                {/* Stage 2-3: That movie */}
                {textStage >= 2 && (
                  <motion.div
                    className="flex items-center justify-center mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: textStage >= 2 ? 1 : 0, y: textStage >= 2 ? 0 : 20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span>Clutter-free Scripting</span>
                    {renderInlineIcon(originalList[1], 80)}
                    {textStage >= 3 && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: textStage >= 3 ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        and Scheduling.

                      </motion.span>
                    )}
                  </motion.div>
                )}

                {/* Stage 4-5: Your top interests */}
                {textStage >= 4 && (
                  <motion.div
                    className="flex items-center justify-center mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: textStage >= 4 ? 1 : 0, y: textStage >= 4 ? 0 : 20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span>And a film ready </span>
                    {renderInlineIcon(originalList[2], 80)}
                    {textStage >= 5 && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: textStage >= 5 ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                       
                       to meet its audience.

                      </motion.span>
                    )}
                  </motion.div>
                )}

                {/* Stage 6: Shopping habits */}
                {textStage >= 6 && (
                  <motion.div
                    className="flex items-center justify-center flex-wrap"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: textStage >= 6 ? 1 : 0, y: textStage >= 6 ? 0 : 20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span></span>
                    {renderInlineIcon(originalList[3], 80)}
                    {renderInlineIcon(originalList[4], 80)}
                    <span>Now at your Fingertips. 
</span>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}

      

        {/* Original shuffling icons - visible during initial state and shrinking */}
        {textStage < 1 && (
          <motion.div
            className="flex justify-center gap-2 flex-wrap max-w-5xl mx-auto relative"
            animate={{ opacity: textStage < 1 ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {icons.map((item, index) => (
              <motion.div
                key={item.id}
                className={`w-36 h-36 md:w-44 md:h-44 flex items-center justify-center ${item.bg} ${item.shape} relative p-4`}
                animate={getIconStyle(index)}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.text}
                  style={{
                    width: 120,
                    height: 120,
                    objectFit: "contain",
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
