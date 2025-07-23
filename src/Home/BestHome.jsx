"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Header from "../components/header"

// Background pill elements for the data section
const backgroundPills = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  width: Math.random() * 150 + 80,
  height: 40 + Math.random() * 20,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 2,
}))

function Besthome() {
  const sectionRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)
  const [textStage, setTextStage] = useState(0)
  const [animatingIcons, setAnimatingIcons] = useState(new Set())
  const [iconPositions, setIconPositions] = useState([0, 1, 2, 3, 4])
  const [isAnimationRunning, setIsAnimationRunning] = useState(false)

  const icons = [
    {
      bg: "bg-[#26B663]",
      src: "/src/Home/HomeImg/clapboard.png",
      alt: "Clapboard",
      shape: "rounded-3xl",
      text: "movie",
    },
    {
      bg: "bg-[#FFD950]",
      src: "/src/Home/HomeImg/ticket.png",
      alt: "Ticket",
      shape: "rounded-3xl",
      text: "shopping",
    },
    {
      bg: "bg-[#6FA3FF]",
      src: "/src/Home/HomeImg/calender.png",
      alt: "Calendar",
      shape: "rounded-3xl",
      clipPath: "polygon(5% 5%, 85% 5%, 100% 50%, 85% 95%, 5% 95%)",
      text: "habits",
    },
    {
      bg: "bg-[#FFA267]",
      src: "/src/Home/HomeImg/note.png",
      alt: "Note",
      shape: "rounded-full",
      text: "interests",
    },
    {
      bg: "bg-[#7C73FF]",
      src: "/src/Home/HomeImg/music.png",
      alt: "Music",
      shape: "rounded-full",
      text: "songs",
    },
  ]

  const shuffleArray = (array) => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  const startAnimation = () => {
    if (isAnimationRunning) return
    setIsAnimationRunning(true)
    // Phase 1: First 2 icons blink (slower)
    setAnimatingIcons(new Set([0, 1]))
    setTimeout(() => {
      // Shuffle positions during first blink
      setIconPositions(shuffleArray(iconPositions))
    }, 400)
    setTimeout(() => {
      // Stop first 2 icons blinking
      setAnimatingIcons(new Set())
    }, 800)
    // Phase 2: Other 3 icons blink quickly after a short delay
    setTimeout(() => {
      setAnimatingIcons(new Set([2, 3, 4]))
    }, 900)
    setTimeout(() => {
      // Shuffle positions again during second blink
      setIconPositions((prev) => shuffleArray(prev))
    }, 1100)
    setTimeout(() => {
      // Stop all animations
      setAnimatingIcons(new Set())
      setIsAnimationRunning(false)
    }, 1400)
  }

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
          setTextStage(0.1) // Icons move to center
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
          setTextStage(4) // "Your top [interests]" appears
        } else if (currentScrollY >= 2050 && currentScrollY < 2200) {
          setTextStage(5) // "Your top [interests] interests and" completes
        } else if (currentScrollY >= 2200 && currentScrollY < 2350) {
          setTextStage(6) // "all your shopping [shopping][habits] habits." completes
        } 
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Auto-trigger animation every 1.5 seconds
  useEffect(() => {
    if (textStage === 0) {
      const interval = setInterval(() => {
        startAnimation()
      }, 1500)
      return () => clearInterval(interval)
    }
  }, [iconPositions, isAnimationRunning, textStage])

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
      className={`inline-flex items-center justify-center ${iconData.bg} ${iconData.shape} mx-1 p-2`}
      style={{ width: size, height: size }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <img
        src={iconData.src || "/placeholder.svg"}
        alt={iconData.alt}
        style={{
          width: size * 0.6,
          height: size * 0.6,
          objectFit: "contain",
        }}
      />
    </motion.div>
  )

  // Function to determine if a word should be visible based on scroll progress
  const getWordVisibility = (wordIndex, totalWords) => {
    if (textStage < 7) return false
    const progress = textStage - 7 // Get the decimal part (0 to 1)
    const wordThreshold = wordIndex / totalWords
    return progress >= wordThreshold - 0.02
  }

  // Split text into words and render with progressive visibility
  const renderProgressiveText = (text, startIndex = 0) => {
    const words = text.split(" ")
    return words.map((word, index) => {
      const globalIndex = startIndex + index
      const isVisible = getWordVisibility(globalIndex, 65)
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
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden relative pt-10">
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

        <Header />

        {/* Original Hero Content */}
        <div
          className={`text-center mt-2 transition-opacity duration-500 ${
            textStage > 0 ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <h1
            className="font-santoshi font-black text-[94px] leading-[0.9] text-[#fefaf3]"
            style={{ fontFamily: "sans-serif" }}
          >
            Your data runs
            <br /> the world
          </h1>
          <p className="text-white mt-6 mb-8 text-base">Start earning from it today.</p>
          <button
            className="inline-flex items-center bg-[#C1FF72] px-6 py-3 rounded-full font-bold text-black mb-16 shadow transition-colors hover:bg-[#eaffb5]"
            onClick={startAnimation}
          >
            <img src="/src/Home/HomeImg/appstore2.png" alt="Icon" className="w-6 h-6 mr-2" />
            Download App
          </button>

          {/* Original Icon block row - keeping exact same sizes and positions */}
          <div className="flex justify-center gap-4 -mt-8">
            {iconPositions.map((originalIndex, currentIndex) => {
              const icon = icons[originalIndex]
              const isCurrentlyAnimating = animatingIcons.has(currentIndex)

              return (
                <div
                  key={originalIndex}
                  className={`${icon.bg} w-55 h-55 ${icon.shape} flex items-center justify-center transition-all ease-in-out ${
                    isCurrentlyAnimating ? "opacity-0 scale-75 duration-700" : "opacity-100 scale-100 duration-500"
                  }`}
                  style={{
                    clipPath: icon.clipPath || "none",
                    borderRadius: icon.shape === "rounded-3xl" ? "2rem" : "50%",
                  }}
                >
                  <img
                    src={icon.src || "/placeholder.svg"}
                    alt={icon.alt}
                    className={`w-50 h-50 transition-all ${isCurrentlyAnimating ? "duration-700" : "duration-500"}`}
                  />
                </div>
              )
            })}
          </div>
        </div>

        {/* Icons Moving to Center Phase */}
        {textStage >= 0.1 && textStage < 1 && (
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: textStage >= 0.1 && textStage < 1 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center gap-4">
              {icons.map((icon, index) => (
                <div
                  key={index}
                  className={`${icon.bg} w-55 h-55 ${icon.shape} flex items-center justify-center`}
                  style={{
                    clipPath: icon.clipPath || "none",
                    borderRadius: icon.shape === "rounded-3xl" ? "2rem" : "50%",
                  }}
                >
                  <img src={icon.src || "/placeholder.svg"} alt={icon.alt} className="w-50 h-50" />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Fun fact text that appears when background turns cream */}
       

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
                    {renderInlineIcon(icons[4], 80)}
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
                    {renderInlineIcon(icons[0], 80)}
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
                    {renderInlineIcon(icons[3], 80)}
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
                    {renderInlineIcon(icons[1], 80)}
                    {renderInlineIcon(icons[2], 80)}
                    <span>habits.</span>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}

       
      </div>

      <style jsx>{`
        .w-62 { width: 15.5rem; }
        .h-62 { height: 15.5rem; }
        .w-55 { width: 13.75rem; }
        .h-55 { height: 13.75rem; }
        .w-50 { width: 12.5rem; }
        .h-50 { height: 12.5rem; }
      `}</style>
    </section>
  )
}

export default Besthome
