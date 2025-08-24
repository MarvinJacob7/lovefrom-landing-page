"use client"

import { X } from "lucide-react"
import { motion } from "motion/react"

export default function LoveFromHero() {
  return (
    <motion.section 
      className="min-h-screen bg-background flex items-center justify-center relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* Close Button */}
      <motion.button
        className="absolute top-8 right-8 p-2 hover:bg-muted rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        aria-label="Close"
      >
        <X className="w-5 h-5 text-foreground" />
      </motion.button>

      {/* Main Title */}
      <motion.div 
        className="text-center px-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      >
        <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal text-foreground tracking-tight leading-none">
          LoveFrom
        </h1>
      </motion.div>
    </motion.section>
  )
}