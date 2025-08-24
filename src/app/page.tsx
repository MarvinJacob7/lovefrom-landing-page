"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

export default function HomePage() {
  const [currentText, setCurrentText] = useState("")
  const [phase, setPhase] = useState<'typing-adewin' | 'pausing' | 'erasing' | 'typing-ads' | 'complete'>('typing-adewin')
  const [charIndex, setCharIndex] = useState(0)
  const [showScrollContent, setShowScrollContent] = useState(false)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])

  const adewinText = "Adewin"
  const adsText = "Ads"

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    switch (phase) {
      case 'typing-adewin':
        if (charIndex <= adewinText.length) {
          timeoutId = setTimeout(() => {
            setCurrentText(adewinText.slice(0, charIndex))
            setCharIndex(prev => prev + 1)
          }, 150)
        } else {
          setPhase('pausing')
          setCharIndex(0)
        }
        break

      case 'pausing':
        timeoutId = setTimeout(() => {
          setPhase('erasing')
          setCharIndex(adewinText.length)
        }, 1000)
        break

      case 'erasing':
        if (charIndex >= 0) {
          timeoutId = setTimeout(() => {
            setCurrentText(adewinText.slice(0, charIndex))
            setCharIndex(prev => prev - 1)
          }, 100)
        } else {
          setPhase('typing-ads')
          setCharIndex(0)
        }
        break

      case 'typing-ads':
        if (charIndex <= adsText.length) {
          timeoutId = setTimeout(() => {
            setCurrentText(adsText.slice(0, charIndex))
            setCharIndex(prev => prev + 1)
          }, 150)
        } else {
          setPhase('complete')
          // Show scroll content after animation completes
          setTimeout(() => setShowScrollContent(true), 1500)
        }
        break
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [phase, charIndex])

  return (
    <div ref={containerRef}>
      {/* Hero Section */}
      <motion.main 
        className="min-h-screen bg-white flex items-center justify-center sticky top-0"
        style={{ opacity, scale }}
      >
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl text-black" style={{ fontFamily: '"Playfair Display", "Times", serif' }}>
            {currentText}
            <span className="animate-pulse text-black ml-1">|</span>
          </h1>
        </div>
      </motion.main>

      {/* Scroll Content Section */}
      {showScrollContent && (
        <section className="min-h-screen bg-white relative z-10">
          {/* Main Content */}
          <div className="px-8 py-32 max-w-5xl mx-auto">
            {/* Image Section - moved to appear first */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="relative w-full max-w-4xl mx-auto">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1755901452311-kf49obwrea.jpeg"
                  alt="Local business owner at their market stall"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover rounded-lg shadow-2xl"
                  priority={false}
                />
              </div>
            </motion.div>

            {/* Main headline - appears after image */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl lg:text-7xl text-black leading-tight" style={{ fontFamily: '"Playfair Display", "Times", serif' }}>
                Now anyone with a Phone & Dream can grow their Business
              </h2>
            </motion.div>

            {/* Enhanced CTA Button - updated text without play button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <button className="group bg-white text-black px-16 py-6 text-2xl font-medium tracking-wide transition-all duration-300 hover:bg-gray-50 border border-gray-200 rounded-full shadow-lg hover:shadow-xl" style={{ fontFamily: '"Playfair Display", "Times", serif' }}>
                <span>Be First To Join</span>
              </button>
            </motion.div>

            {/* Industries List - vertical layout like LoveFrom */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-lg mx-auto mb-20"
            >
              <div className="space-y-6">
                {[
                  "Shop owners",
                  "Service providers", 
                  "Restaurants & cafes",
                  "Home businesses",
                  "Creators & freelancers",
                  "Small businesses of all kinds"
                ].map((industry, index) => (
                  <motion.div
                    key={industry}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl text-black py-2"
                    style={{ fontFamily: '"Playfair Display", "Times", serif' }}
                  >
                    {industry}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Headline after industries */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h3 className="text-4xl md:text-6xl lg:text-7xl text-black leading-tight" style={{ fontFamily: '"Playfair Display", "Times", serif' }}>
                Adewin solving your Problems
              </h3>
            </motion.div>

            {/* Ads are too Complex section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h4 className="text-2xl md:text-4xl lg:text-5xl text-black leading-tight" style={{ fontFamily: '"Playfair Display", "Times", serif' }}>
                Ads are too Complex
              </h4>
            </motion.div>

            {/* Complex ads illustration */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative w-full max-w-2xl mx-auto">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1756063181423-nrs6qj8o33.png"
                  alt="Illustration showing the complexity of ads"
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain"
                  priority={false}
                />
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  )
}