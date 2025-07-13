"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"

// Icon components
const Users = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const DollarSign = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
)

const Calendar = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const Camera = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
)

const Play = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="5,3 19,12 5,21" />
  </svg>
)

const ArrowRight = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12,5 19,12 12,19" />
  </svg>
)

const Star = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
)

const Sparkles = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
  </svg>
)

const ChevronDown = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6,9 12,15 18,9" />
  </svg>
)

// Custom components
const Button = ({ children, className = "", size = "default", variant = "default", ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

  const sizeClasses = {
    default: "h-10 py-2 px-4",
    lg: "h-12 px-8 text-lg",
  }

  const variantClasses = {
    default: "bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white",
    outline: "border border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent",
    ghost: "text-red-400 hover:text-red-300 hover:bg-red-500/10 bg-transparent",
  }

  return (
    <button className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

const Card = ({ children, className = "", ...props }) => (
  <div
    className={`bg-gray-900/50 border border-gray-800 rounded-xl backdrop-blur-sm transition-all duration-300 ${className}`}
    {...props}
  >
    {children}
  </div>
)

const CardContent = ({ children, className = "", ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
)

const Badge = ({ children, className = "", variant = "default", ...props }) => {
  const variantClasses = {
    default: "bg-red-500/20 text-red-400 border-red-500/30",
    secondary: "bg-gray-800 text-gray-300",
  }

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold border ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const benefits = [
  {
    icon: Users,
    title: "Build Your Crew",
    description:
      "Artists build portfolios to show what they do best. Producers and directors explore real work and choose the talent that fits their story.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: DollarSign,
    title: "Set Your Budget Right",
    description:
      "Real-time, itemized costing plus a clear budget overview, especially helpful for new producers and directors. We guide you through every detail, so nothing slips through.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Calendar,
    title: "Scheduling And Calendar",
    description:
      "Create and share personalized call sheets and scene breakdowns with locations, cast, props, and shoot notes. It's your full shoot calendar, built for clarity your crew will actually follow.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Camera,
    title: "Rentals",
    description:
      "Book equipment, locations, studios, and transport—all within the platform. One stop, one payment. We've got your back.",
    color: "from-orange-500 to-red-500",
  },
]

const collaborators = [
  {
    name: "Sarah Chen",
    role: "Director",
    project: "Midnight Stories",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Marcus Rodriguez",
    role: "Cinematographer",
    project: "Urban Dreams",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Elena Vasquez",
    role: "Producer",
    project: "Silent Echoes",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "David Kim",
    role: "Sound Designer",
    project: "The Last Frame",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
]

const projects = [
  {
    title: "Midnight Stories",
    genre: "Drama",
    year: "2024",
    image: "https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=400&h=300&fit=crop",
  },
  {
    title: "Urban Dreams",
    genre: "Documentary",
    year: "2024",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop",
  },
  {
    title: "Silent Echoes",
    genre: "Thriller",
    year: "2023",
    image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=300&fit=crop",
  },
  {
    title: "The Last Frame",
    genre: "Short Film",
    year: "2024",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=300&fit=crop",
  },
]

export default function LandingPage() {
  const [activeCollabIndex, setActiveCollabIndex] = useState(0)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCollabIndex((prev) => (prev + 1) % collaborators.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden font-sans">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-orange-900/20"
        />

        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
                y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <Badge className="mb-6">
              <Sparkles className="w-4 h-4" />
              The Future of Filmmaking
            </Badge>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Think filmmaking is{" "}
            <motion.span
              className="text-red-500 relative"
              animate={{
                textShadow: ["0 0 0px #ef4444", "0 0 20px #ef4444", "0 0 0px #ef4444"],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              chaotic
            </motion.span>
            ?
            <br />
            <motion.span
              className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Not anymore.
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            CineArtery brings everything, and everyone you need into one streamlined platform. From directors, actors,
            cinematographers to makeup artists, and choreographers under one roof.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button size="lg" className="group">
              Start Your Project
              <motion.div
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                <ArrowRight />
              </motion.div>
            </Button>
            <Button size="lg" variant="outline" className="group bg-transparent">
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </motion.div>

          <motion.div
            className="text-gray-500"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <ChevronDown className="mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need,{" "}
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                One Platform
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Whether you're crafting a short film or your next blockbuster, we make the process faster, smoother, and
              smarter.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {benefits.map((benefit, index) => (
              <motion.div key={index} variants={fadeInUp} whileHover={{ scale: 1.02, y: -5 }} className="group">
                <Card className="hover:border-gray-700 h-full">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <motion.div
                        className={`p-3 rounded-xl bg-gradient-to-r ${benefit.color} group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <benefit.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-4 group-hover:text-red-400 transition-colors">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-400 mb-6 leading-relaxed">{benefit.description}</p>
                        <Button variant="ghost" className="p-0 h-auto group/btn">
                          Explore Now
                          <motion.div
                            className="ml-2"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                          >
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </motion.div>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Recent Collaborators */}
      <section className="py-20 bg-gray-900/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Recent Collaborators</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Check out the filmmakers, producers, and artists who've tapped into our future-ready approach to creative
              collaboration.
            </p>

            <motion.div
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 px-6 py-3 rounded-full border border-red-500/30"
              animate={{
                boxShadow: [
                  "0 0 0px rgba(239, 68, 68, 0.3)",
                  "0 0 20px rgba(239, 68, 68, 0.3)",
                  "0 0 0px rgba(239, 68, 68, 0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <Sparkles className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-semibold">It's a collab!</span>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="wait">
              {collaborators.map((collaborator, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: index === activeCollabIndex ? 1 : 0.6,
                    scale: index === activeCollabIndex ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <Card
                    className={`transition-all duration-500 ${
                      index === activeCollabIndex ? "border-red-500/50 shadow-lg shadow-red-500/20" : ""
                    }`}
                  >
                    <CardContent>
                      <motion.div whileHover={{ scale: 1.1 }} className="relative mb-4 inline-block">
                        <img
                          src={collaborator.avatar || "/placeholder.svg"}
                          alt={collaborator.name}
                          className="w-20 h-20 rounded-full mx-auto border-2 border-gray-700 object-cover"
                        />
                        {index === activeCollabIndex && (
                          <motion.div
                            className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            <Star className="w-3 h-3 text-white" />
                          </motion.div>
                        )}
                      </motion.div>
                      <h3 className="font-bold text-lg mb-1">{collaborator.name}</h3>
                      <p className="text-red-400 text-sm mb-2">{collaborator.role}</p>
                      <p className="text-gray-500 text-sm">{collaborator.project}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* CineArtery Library */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The{" "}
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                CineArtery
              </span>{" "}
              Library
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Projects that started here, and made it to screen.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group cursor-pointer"
              >
                <Card className="hover:border-red-500/50 overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                        <Play className="w-6 h-6 text-white ml-1" />
                      </div>
                    </motion.div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-red-400 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary">{project.genre}</Badge>
                      <span className="text-gray-500 text-sm">{project.year}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-900/20 to-orange-900/20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your{" "}
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Filmmaking Journey
              </span>
              ?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of filmmakers who've already discovered the future of creative collaboration.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="px-12 py-6 text-xl">
                Get Started Today
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
