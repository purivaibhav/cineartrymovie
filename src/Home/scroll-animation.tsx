"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"

interface ScrollAnimationProps {
  children: React.ReactNode
}

export function ScrollAnimation({ children }: ScrollAnimationProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight

      const progress = Math.min(scrollTop / (documentHeight * 0.8), 1)
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={containerRef} className="relative">
      {children}
    </div>
  )
}
