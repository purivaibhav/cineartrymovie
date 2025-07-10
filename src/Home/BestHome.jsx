"use client"
import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Music, Film, Ghost, ShoppingBag, Shirt } from "lucide-react"

const originalList = [
  { id: 1, icon: <Music size={80} />, bg: "bg-purple-500", shape: "rounded-full", text: "songs" },
  { id: 2, icon: <Film size={80} />, bg: "bg-green-600", shape: "rounded-2xl", text: "movie" },
  { id: 3, icon: <Ghost size={80} />, bg: "bg-orange-500", shape: "rounded-2xl", text: "interests" },
  { id: 4, icon: <ShoppingBag size={80} />, bg: "bg-yellow-400", shape: "rounded-2xl", text: "shopping" },
  { id: 5, icon: <Shirt size={80} />, bg: "bg-blue-500", shape: "rounded-full", text: "habits" },
]

// Background pill elements for the data section
const backgroundPills = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  width: Math.random() * 150 + 80,
  height: 40 + Math.random() * 20,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 2,
}))

export default function ProjectSection() {
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
      return "bg-black text-white" // Data section - black background
    } else if (textStage >= 0.2) {
      return "bg-amber-50 text-black" // Cream color
    }
    return "bg-black text-white"
  }

  const renderInlineIcon = (iconData, size = 80) => (
    <motion.div
      className={`inline-flex items-center justify-center ${iconData.bg} ${iconData.shape} mx-1`}
      style={{ width: size, height: size }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {React.cloneElement(iconData.icon, { size: size * 0.6 })}
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
      className={`min-h-[450vh] w-full transition-colors duration-500 ease-in-out ${getBackgroundColor()}`}
    >
     <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden relative pt-24 sm:pt-32">

        {/* Background pills for data section */}
        {textStage >= 7 && (
          <div className="absolute inset-0 overflow-hidden">
            {backgroundPills.map((pill) => (
              <motion.div
                key={pill.id}
                className="absolute bg-gray-600 rounded-full opacity-30"
                style={{
                  width: pill.width,
                  height: pill.height,
                  left: `${pill.x}%`,
                  top: `${pill.y}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: textStage >= 7 ? 0.3 : 0,
                  scale: textStage >= 7 ? 1 : 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: pill.delay,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        )}

        <h1
          className={`text-[60px] md:text-[90px] font-black text-center leading-none mb-4 transition-opacity duration-500 ${
            scrollY > 100 ? "opacity-0" : "opacity-100"
          }`}
        >
          Welcome to
          <br />  CineArtery
        </h1>
        <p
          className={`text-lg md:text-xl mb-6 transition-opacity duration-500 ${
            scrollY > 100 ? "opacity-0" : "opacity-100"
          }`}
        >
          Where creativity flows through every frame.
        </p>

        {/* Fun fact text that appears when background turns cream */}
        {textStage >= 0.2 && textStage < 7 && (
          <motion.div
            className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center w-full px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: textStage >= 0.2 && textStage < 7 ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl md:text-2xl font-bold mb-2">{"Here's a fun fact:"}</h2>
            <p className="text-lg md:text-xl mb-6">Today, you are the product</p>
          </motion.div>
        )}

        {/* Progressive text with positioned icons */}
        {textStage >= 1 && textStage < 7 && (
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: textStage >= 1 && textStage < 7 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-4xl md:text-6xl font-black leading-tight max-w-6xl mx-auto">
              <div className="relative w-full min-h-96">
                {/* Stage 1: Your favorite songs */}
                {textStage >= 1 && (
                  <motion.div
                    className="flex items-center justify-center mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: textStage >= 1 ? 1 : 0, y: textStage >= 1 ? 0 : 20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span>Your favorite</span>
                    {renderInlineIcon(originalList[0], 80)}
                    <span>songs.</span>
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
                    <span>That</span>
                    {renderInlineIcon(originalList[1], 80)}
                    {textStage >= 3 && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: textStage >= 3 ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        must-see movie.
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
                    <span>Your top</span>
                    {renderInlineIcon(originalList[2], 80)}
                    {textStage >= 5 && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: textStage >= 5 ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        interests and
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
                    <span>all your shopping</span>
                    {renderInlineIcon(originalList[3], 80)}
                    {renderInlineIcon(originalList[4], 80)}
                    <span>habits.</span>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Data section with progressive word reveal */}
        {textStage >= 7 && (
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full px-4 max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: textStage >= 7 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight">
              <div className="mb-6">
                <div className="flex items-center justify-center flex-wrap gap-2">
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-full inline-flex items-center">
                    <span>Your data</span>
                  </div>
                  {renderProgressiveText("is taken by companies", 0)}
                </div>
              </div>

              <div className="mb-6">{renderProgressiveText("and used to train the next wave of AI", 5)}</div>

              <div className="mb-6">{renderProgressiveText("models and build the world's top", 14)}</div>

              <div className="mb-8">{renderProgressiveText("products and services.", 20)}</div>

              <div className="mb-6">{renderProgressiveText("Yet it often", 23)}</div>

              <div className="mb-6">{renderProgressiveText("happens without any earnings being", 26)}</div>

              <div className="mb-12">{renderProgressiveText("distributed back to you.", 32)}</div>

              <div className="mb-8">{renderProgressiveText("It's time for a change.", 37)}</div>

              <div className="mb-6">
                <div className="flex items-center justify-center flex-wrap gap-2">
                  {renderProgressiveText("With", 42)}
                  <div className="bg-orange-500 text-white px-4 py-2 rounded-full inline-flex items-center font-bold">
                    <span>Navigate</span>
                  </div>
                  {renderProgressiveText("you join a decentralized", 43)}
                </div>
              </div>

              <div className="mb-6">{renderProgressiveText("intelligence platform that puts the", 47)}</div>

              <div className="mb-6">{renderProgressiveText("power back in your hands and rewards", 53)}</div>

              <div>{renderProgressiveText("you for the data you contribute.", 60)}</div>
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
                className={`w-36 h-36 md:w-44 md:h-44 flex items-center justify-center ${item.bg} ${item.shape} relative`}
                animate={getIconStyle(index)}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {item.icon}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
