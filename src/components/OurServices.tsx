import { useState } from 'react';
import { Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { useUI } from '../context/UIContext';
import { useCMS } from '../hooks/useCMS';
import Footer from './Footer';
import SEO from './SEO';

const services = [
  { id: "01", title: "ARCHITECTURE & SPACE PLANNING", description: "We develop spatial frameworks that balance function and elegance." },
  { id: "02", title: "INTERIOR DESIGN & MATERIAL SELECTION", description: "From textures to tones, we curate environments with high-quality materials." },
  { id: "03", title: "PROJECT MANAGEMENT & EXECUTION", description: "Our team ensures precision from concept to completion." }
];

const OurServicesPage = () => {
  const { isDark } = useTheme();
  const { openMenu } = useUI();
  const { data: cmsData } = useCMS('services');
  const [activeService, setActiveService] = useState(0);

  return (
    <div className={`min-h-screen w-full font-sans transition-colors duration-700 ${isDark ? 'bg-[#2A0A0A] text-white' : 'bg-[#F9F9F7] text-stone-800'}`}>
      <SEO
        title="Our Services | Treasure - Architecture & Interiors in Jaipur"
        description="Architecture, interior design, and project management services by Treasure for premium 2BHK and 3BHK flats in Vidhyadhar Nagar, Jaipur."
      />
      <main className="relative pl-0 md:pl-24 overflow-hidden">

        {/* Header */}
        <header className="fixed top-0 left-0 w-full z-50 p-6 md:pl-36 md:pr-12 flex justify-between md:justify-end items-center pointer-events-none">
          <div className="md:hidden pointer-events-auto"><button onClick={openMenu} className="p-2 bg-black/20 rounded-lg backdrop-blur-md"><Menu size={32} className="text-white" /></button></div>
        </header>

        <section className="relative h-[40vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
          <img src="/assets/images/sixtyone.png" className="absolute inset-0 w-full h-full object-cover brightness-50" />
          <div className="relative z-10 text-center px-6">
            <h1 className="text-4xl md:text-7xl font-['Playfair_Display'] font-bold text-white uppercase tracking-tight">{cmsData?.heading || "Excellence in Craft"}</h1>
            <p className="mt-6 text-lg md:text-xl text-white/80 font-['Playfair_Display'] max-w-2xl mx-auto">{cmsData?.description || "Providing comprehensive design and development solutions for Jaipur's elite residences."}</p>
          </div>
        </section>

        <section className="py-24 px-6 md:px-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-40">Our Services</span>
                <h2 className="text-3xl md:text-5xl font-['Playfair_Display'] font-bold">Comprehensive Solutions</h2>
              </div>
              <div className="space-y-6">
                {services.map((service, idx) => (
                  <motion.div key={service.id} onClick={() => setActiveService(idx)} className={`p-8 rounded-2xl border cursor-pointer transition-all ${activeService === idx ? 'bg-white dark:bg-zinc-900 border-white/20 shadow-xl scale-[1.02]' : 'bg-transparent border-stone-200 dark:border-white/5 opacity-40'}`}>
                    <span className="text-xs font-mono font-bold mb-2 block">{service.id}</span>
                    <h3 className="text-lg font-bold mb-3">{service.title}</h3>
                    <p className="text-sm leading-relaxed opacity-80">{service.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <AnimatePresence mode='wait'>
                <motion.img key={activeService} src={galleryImages[activeService]?.src || "/assets/images/placeholder.jpg"} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.5 }} className="w-full h-full object-cover" />
              </AnimatePresence>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

const galleryImages = [
  { src: "/assets/images/twentytwo.png" },
  { src: "/assets/images/sixtyone.png" },
  { src: "/assets/images/twentyfour.png" }
];

export default OurServicesPage;