import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const INTRO_IMAGES = [
  "/assets/images/four.png",
  // Add more images here if needed
];

const IntroSection = ({ cmsData }: { cmsData?: any }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (INTRO_IMAGES.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % INTRO_IMAGES.length);
    }, 4000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
        `}
      </style>

      <section className="relative py-16 lg:py-32 px-4 sm:px-6 lg:px-24 max-w-[1600px] mx-auto overflow-hidden">
        
        {/* --- WATERMARK BACKGROUND --- */}
        <div className="
          absolute
          bottom-[-30px] lg:bottom-[-60px]
          left-1/2 -translate-x-1/4
          text-[4rem] sm:text-[7rem] lg:text-[11rem]
          text-stone-900/5 dark:text-white/5 
          pointer-events-none 
          font-['Playfair_Display'] font-bold whitespace-nowrap
          select-none
          z-0 
        ">
          Interiors
        </div>

        {/* GRID LAYOUT:
           gap-12 lg:gap-20:  Added a little space between image and text 
        */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
          
          {/* --- LEFT COLUMN: IMAGE --- */}
          <div className="flex justify-center lg:justify-end items-center w-full relative">
             
            {/* Image Container */}
            <div className="relative w-full max-w-[350px] lg:max-w-[450px] aspect-[3/4] overflow-hidden shadow-2xl border border-stone-200 dark:border-white/10 bg-stone-100">
              {INTRO_IMAGES.map((src, index) => (
                <motion.img
                  key={index}
                  src={src}
                  alt="Interior Showcase"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: index === currentIndex ? 1 : 0,
                    scale: index === currentIndex ? 1 : 1.1 
                  }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ))}

              {/* Indicators */}
              {INTRO_IMAGES.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                  {INTRO_IMAGES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-1 rounded-full transition-all duration-500 shadow-sm ${idx === currentIndex ? 'w-8 bg-white' : 'w-1.5 bg-white/60 hover:bg-white'}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* --- RIGHT COLUMN: TEXT --- */}
          <motion.div
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             viewport={{ once: true }}
             className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left"
          >
            {/* Heading: Removed <br/> for one-line display */}
            <h2 className="font-['Oswald'] text-3xl sm:text-4xl lg:text-5xl lg:leading-tight mb-6 uppercase tracking-wider text-stone-900 dark:text-white">
              {cmsData?.intro_title || 'Light. Space. Sophistication.'}
            </h2>

            {/* Horizontal Divider */}
            <div className="h-[1px] w-16 bg-stone-400 mb-8" />

            <p className="font-['Playfair_Display'] text-stone-600 dark:text-stone-300 mb-6 leading-loose text-base lg:text-lg max-w-lg">
              {cmsData?.intro_text || 'At Treasure, architecture is more than construction, it is an experience. A careful rhythm of proportion, natural light, and material quality that transforms four walls into a home you feel the moment you walk in.'}
            </p>

            <p className="font-['Playfair_Display'] text-stone-600 dark:text-stone-300 mb-6 leading-loose text-base lg:text-lg max-w-lg">
              Every flat at Treasure, Vidhyadhar Nagar has been designed with one belief: that the finest apartments in Jaipur should feel timeless from the day they are finished. Between light and space, between family and home, between craft and comfort, it strikes a balance that is rare, and entirely intentional.
            </p>

          </motion.div>

        </div>
      </section>
    </>
  );
};

export default IntroSection;