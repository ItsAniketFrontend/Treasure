import { useState } from 'react';
import { Menu, ChevronLeft, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { useUI } from '../context/UIContext';
import Footer from './Footer';
import SEO from './SEO';

const treasureData = [
  { id: 1, title: "GUEST BEDROOM", subtitle: "Treasure", src: "/assets/images/twentynine.png" },
  { id: 2, title: "MASTER BEDROOM", subtitle: "Treasure", src: "/assets/images/thirty.png" },
  { id: 3, title: "LIVING DINING", subtitle: "Treasure", src: "/assets/images/thirtyone.png" },
  { id: 4, title: "LIVING DINING", subtitle: "Treasure", src: "/assets/images/thirtytwo.png" },
  { id: 5, title: "DAUGHTER'S ROOM", subtitle: "Treasure", src: "/assets/images/thirtythree.png" },
  { id: 6, title: "LIVING DINING", subtitle: "Treasure", src: "/assets/images/thirtyfour.png" },
  { id: 7, title: "GUEST BEDROOM", subtitle: "Treasure", src: "/assets/images/thirtyfive.png" },
  { id: 8, title: "MASTER BEDROOM", subtitle: "Treasure", src: "/assets/images/thirtysix.png" },
  { id: 9, title: "LIVING DINING", subtitle: "Treasure", src: "/assets/images/thirtyseven.png" },
  { id: 10, title: "LIVING DINING", subtitle: "Treasure", src: "/assets/images/thirtyeight.png" },
  { id: 11, title: "DAUGHTER'S ROOM", subtitle: "Treasure", src: "/assets/images/thirtynine.png" },
  { id: 12, title: "LIVING DINING", subtitle: "Treasure", src: "/assets/images/forty.png" },
];

const Projects = () => {
    const { isDark } = useTheme();
    const { openMenu } = useUI();
    const [expandedImageSrc, setExpandedImageSrc] = useState<string | null>(null);

    return (
        <div className={`min-h-screen w-full font-sans transition-colors duration-700 ${isDark ? 'bg-[#2A0A0A] text-white' : 'bg-[#F9F9F7] text-stone-800'}`}>
            <SEO
              title="Treasure | Premium 2BHK & 3BHK Flats in Vidhyadhar Nagar, Jaipur"
              description="Explore Treasure: 2BHK and 3BHK luxury flats in Vidhyadhar Nagar, Jaipur, with floor plans, finishes, and amenities curated for timeless living."
            />
            <main className="relative pl-0 md:pl-24">

                {/* Header */}
                <header className="fixed top-0 left-0 w-full z-50 p-6 md:pl-36 md:pr-12 flex justify-between md:justify-end items-center pointer-events-none">
                    <div className="md:hidden pointer-events-auto"><button onClick={openMenu} className="p-2 bg-black/20 rounded-lg backdrop-blur-md"><Menu size={32} className="text-white" /></button></div>
                </header>

                <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
                    <div className="flex items-center gap-4 mb-12">
                        <button onClick={() => window.history.back()} className="p-2 rounded-full border border-stone-200 dark:border-white/10 hover:bg-stone-100 dark:hover:bg-white/5"><ChevronLeft size={20} /></button>
                        <h1 className="text-3xl md:text-5xl font-['Playfair_Display'] font-bold uppercase tracking-tight">Treasure Showrooms</h1>
                    </div>

                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                        {treasureData.map((item) => (
                            <motion.div key={item.id} layout initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="relative group cursor-pointer break-inside-avoid rounded-2xl overflow-hidden shadow-lg" onClick={() => setExpandedImageSrc(item.src)}>
                                <img src={item.src} alt={item.title} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                                    <span className="text-[10px] text-white/60 font-bold uppercase tracking-widest">{item.subtitle}</span>
                                    <h3 className="text-white font-bold tracking-wide">{item.title}</h3>
                                    <ArrowUpRight size={20} className="text-white absolute top-6 right-6" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <AnimatePresence>
                    {expandedImageSrc && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12" onClick={() => setExpandedImageSrc(null)}>
                            <button className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors" onClick={() => setExpandedImageSrc(null)}><X size={40} strokeWidth={1} /></button>
                            <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} src={expandedImageSrc} className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
                        </motion.div>
                    )}
                </AnimatePresence>

                <Footer />
            </main>
        </div>
    );
};

export default Projects;