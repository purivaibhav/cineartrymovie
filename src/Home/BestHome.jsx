"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Clapperboard, Camera, Monitor } from "lucide-react"

const originalList = [
  {
    id: 1,
    icon: <Clapperboard size={80} />,
    bg: "bg-purple-500",
    shape: "rounded-full",
    text: "pre-production",
    description: "From finding the perfect crew to setting the right budget for your next film. WE have it all.",
  },
  {
    id: 2,
    icon: <Camera size={80} />,
    bg: "bg-green-600",
    shape: "rounded-2xl",
    text: "production",
    description: "Ease of scheduling and shooting now at your fingertips.",
  },
  {
    id: 3,
    icon: <Monitor size={80} />,
    bg: "bg-orange-500",
    shape: "rounded-2xl",
    text: "post-production",
    description: "Visualize the future of the cinema industry!",
  },
]

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
        // Increased scroll ranges for smoother transitions
        if (currentScrollY <= 1000) {
          setTextStage(0) // Initial state - shuffling
        } else if (currentScrollY > 1000 && currentScrollY < 1250) {
          setTextStage(0.1) // Icons shrink but stay visible
        } else if (currentScrollY >= 1250 && currentScrollY < 1500) {
          setTextStage(0.2) // Background changes to cream
        } else if (currentScrollY >= 1500 && currentScrollY < 1750) {
          setTextStage(0.3) // Icons move to positions
        } else if (currentScrollY >= 1750 && currentScrollY < 2000) {
          setTextStage(1) // Pre-production text appears
        } else if (currentScrollY >= 2000 && currentScrollY < 2250) {
          setTextStage(2) // Production text appears
        } else if (currentScrollY >= 2250 && currentScrollY < 2500) {
          setTextStage(3) // Post-production text appears
        } else {
          setTextStage(3) // Stay at final stage
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
    if (textStage >= 0.2) {
      return "bg-amber-50 text-black" // Cream color
    }
    return "bg-black text-white"
  }

  const renderInlineIcon = (iconData, size = 80) => (
    <motion.div
      className={`inline-flex items-center justify-center ${iconData.bg} ${iconData.shape} mx-2`}
      style={{ width: size, height: size }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {React.cloneElement(iconData.icon, { size: size * 0.6 })}
    </motion.div>
  )

  return (
    <section
      ref={sectionRef}
      className={`min-h-[350vh] w-full transition-colors duration-500 ease-in-out ${getBackgroundColor()}`}
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
          Where creativity flows through every frame.
        </p>

        {/* Fun fact text that appears when background turns cream */}
        {textStage >= 0.2 && textStage < 1 && (
          <motion.div
            className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center w-full px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: textStage >= 0.2 && textStage < 1 ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl md:text-2xl font-bold mb-2">{"Here's what we offer:"}</h2>
            <p className="text-lg md:text-xl mb-6">Complete film production solutions</p>
          </motion.div>
        )}

        {/* Progressive text with positioned icons */}
        {textStage >= 1 && (
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: textStage >= 1 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight max-w-6xl mx-auto space-y-12">
              {/* Stage 1: Pre-production */}
              {textStage >= 1 && (
                <motion.div
                  className="flex flex-col items-center justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: textStage >= 1 ? 1 : 0, y: textStage >= 1 ? 0 : 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center justify-center mb-4">
                    {renderInlineIcon(originalList[0], 100)}
                    <span className="ml-4">Pre-Production</span>
                  </div>
                  <p className="text-lg md:text-xl max-w-3xl">{originalList[0].description}</p>
                </motion.div>
              )}

              {/* Stage 2: Production */}
              {textStage >= 2 && (
                <motion.div
                  className="flex flex-col items-center justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: textStage >= 2 ? 1 : 0, y: textStage >= 2 ? 0 : 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center justify-center mb-4">
                    {renderInlineIcon(originalList[1], 100)}
                    <span className="ml-4">Production</span>
                  </div>
                  <p className="text-lg md:text-xl max-w-3xl">{originalList[1].description}</p>
                </motion.div>
              )}

              {/* Stage 3: Post-production */}
              {textStage >= 3 && (
                <motion.div
                  className="flex flex-col items-center justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: textStage >= 3 ? 1 : 0, y: textStage >= 3 ? 0 : 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center justify-center mb-4">
                    {renderInlineIcon(originalList[2], 100)}
                    <span className="ml-4">Post-Production</span>
                  </div>
                  <p className="text-lg md:text-xl max-w-3xl">{originalList[2].description}</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* Original shuffling icons - visible during initial state and shrinking */}
        {textStage < 1 && (
          <motion.div
            className="flex justify-center gap-4 flex-wrap max-w-5xl mx-auto relative"
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
