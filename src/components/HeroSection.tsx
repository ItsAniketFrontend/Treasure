import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from "react-router-dom";

// --- CONFIGURATION ---
const SLIDES = [
  
  {
    id: 2,
    url: "/assets/images/two.png", 
    alt: "Luxury Interior"
  },
  {
    id: 3,
    url: "/assets/images/one.png", 
    alt: "Evening Ambience"
  }
];

const HeroSection = ({ cmsData }: { cmsData?: any }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[100dvh] min-h-[600px] w-full overflow-hidden bg-black font-sans">
      
      {/* --- FONT LOADING --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap');
        .font-oswald { font-family: 'Oswald', sans-serif; }
        .font-playfair { font-family: 'Playfair Display', serif; }
      `}</style>

      {/* --- BACKGROUND IMAGE STACK --- */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <img 
            src={SLIDES[currentIndex].url} 
            alt={SLIDES[currentIndex].alt}
            className="w-full h-full object-cover opacity-70" 
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark Overlay for text legibility */}
      <div className="absolute inset-0 z-10 bg-black/30 pointer-events-none" />

      {/* --- CENTER CONTENT --- */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
        
        {/* 1. MAIN TITLE */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-oswald text-6xl md:text-6xl lg:text-7xl text-white uppercase tracking-[0.15em] leading-none drop-shadow-lg"
        >
          {cmsData?.hero_title || 'Treasure'}
        </motion.h1>

        {/* 2. DIVIDER LINE (New Element) */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="h-[1px] w-24 bg-white/80 my-8"
        />
        
        {/* 3. SUBHEADING */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="font-playfair text-2xl md:text-2xl lg:text-3xl text-white font-normal tracking-wide mb-6"
        >
          Built to Last, Designed to Inspire
        </motion.h2>

        {/* 4. DESCRIPTION TEXT */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="font-playfair text-sm md:text-base text-gray-200 max-w-lg md:max-w-2xl leading-relaxed opacity-90 mx-auto"
        >
          {cmsData?.hero_subtitle || "You'll always know what goes into your home, no secrets, just exceptional standards."}
        </motion.p>
        
        {/* 5. CTA BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <Link
            to="/about"
            className="mt-12 inline-block px-10 py-3 border border-gray-300 text-white 
                       font-playfair text-sm tracking-widest uppercase hover:bg-white hover:text-black 
                       transition-all duration-300 ease-in-out"
          >
            About Us
          </Link>
        </motion.div>
      </div>

      {/* --- BOTTOM ELEMENTS --- */}

      {/* Left: Location Text (New Element) */}
      {/* <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-6 md:left-12 z-30"
      >
        <p className="font-playfair text-white text-xs md:text-sm tracking-wide opacity-90">
          Sector-5, Vidhyadhar Nagar, Jaipur
        </p>
      </motion.div> */}

      {/* Right: Numeric Slider Control (Updated Element) */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 right-6 md:right-12 z-30 flex items-center gap-4"
      >
        <span className="font-oswald text-white text-sm tracking-widest">
          0{currentIndex + 1}
        </span>
        
        {/* Progress Line */}
        <div className="w-16 h-[1px] bg-white/30 relative overflow-hidden">
          <motion.div 
            key={currentIndex}
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            transition={{ duration: 5, ease: "linear" }}
            className="absolute inset-0 bg-white"
          />
        </div>

        <span className="font-oswald text-white/60 text-sm tracking-widest">
          0{SLIDES.length}
        </span>
      </motion.div>

    </section>
  );
};

export default HeroSection;