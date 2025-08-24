"use client"

import { motion } from "motion/react"
import { useEffect, useRef, useState } from "react"

export default function LoveFromAbout() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -10% 0px"
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const disciplines = [
    "architects",
    "artists", 
    "engineers",
    "filmmakers",
    "graphic designers",
    "industrial designers",
    "interaction designers",
    "motion designers",
    "musicians",
    "sound designers",
    "type designers",
    "writers"
  ]

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 40
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-background flex items-center justify-center px-6 py-24 lg:py-32"
    >
      <motion.div
        className="max-w-2xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {/* Opening line */}
        <motion.p
          variants={itemVariants}
          className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground mb-16 lg:mb-20"
        >
          LoveFrom is a creative collective.
        </motion.p>

        {/* Disciplines list */}
        <motion.div
          className="space-y-6 lg:space-y-8 mb-16 lg:mb-20"
          variants={containerVariants}
        >
          {disciplines.map((discipline, index) => (
            <motion.div
              key={discipline}
              variants={itemVariants}
              className="font-display text-xl md:text-2xl lg:text-3xl text-foreground"
            >
              {discipline}
            </motion.div>
          ))}
        </motion.div>

        {/* Founding line */}
        <motion.p
          variants={itemVariants}
          className="font-display text-xl md:text-2xl lg:text-3xl text-foreground"
        >
          Founded by <em>Jony Ive</em> with Marc Newson.
        </motion.p>
      </motion.div>
    </section>
  )
}