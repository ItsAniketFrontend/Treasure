import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from './ThemeContext';
import { useUI } from '../context/UIContext';
import { useCMS } from '../hooks/useCMS';
import Footer from './Footer';
import SEO from './SEO';

const LOCAL_ASSETS = {
  hero: "/assets/images/sixteen.png",
  aboutExterior: "/assets/images/seventeen.png",
  aboutInterior: "/assets/images/eighteen.png",
  logo: "/assets/images/logo.png",
};

const StatsSection = () => {
  const { data: homeData } = useCMS('home');
  const STATS_DATA = [
    { val: homeData?.stat_1 || '78%', label: 'Climate Responsive Architecture' },
    { val: homeData?.stat_2 || '92%', label: 'Premium Material Selection' },
    { val: homeData?.stat_3 || '88%', label: 'Optimal Layout Efficiency' },
    { val: homeData?.stat_4 || '45', label: 'AQI' },
  ];
  
  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  return (
    <section className="relative py-12 md:py-20 overflow-hidden">
       <div className="relative z-10 max-w-[1400px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {STATS_DATA.map((stat, idx) => {
             const isAQI = stat.label === 'AQI';
             const numericVal = parseInt(stat.val) || 0;
             return (
               <motion.div key={idx} initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="flex flex-col items-center">
                  <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border border-stone-300 dark:border-stone-600 flex flex-col items-center justify-center mb-6 relative">
                     <div className="z-10 flex flex-col items-center">
                        <span className="font-['Oswald'] text-3xl md:text-5xl font-bold dark:text-white tracking-wider">{stat.val}</span>
                        {isAQI && <div className="mt-2 w-16 md:w-20 h-1 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden relative"><div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-rose-500 opacity-80" /></div>}
                     </div>
                     <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r={radius} fill="none" stroke="currentColor" strokeWidth="0.5" className="text-stone-800/5 dark:text-white/5" />
                        {!isAQI && <motion.circle cx="50" cy="50" r={radius} fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }} whileInView={{ strokeDashoffset: circumference * (1 - numericVal / 100) }} viewport={{ once: true }} className="text-stone-800 dark:text-white" />}
                     </svg>
                  </div>
                  <h3 className="text-[10px] md:text-xs uppercase tracking-widest text-stone-600 dark:text-white/80 font-['Playfair_Display']">{stat.label}</h3>
               </motion.div>
             );
          })}
       </div>
    </section>
  );
};

const AboutUsPage = () => {
    const { isDark, toggleTheme } = useTheme();
    const { openMenu } = useUI();
    const { data: cmsData } = useCMS('about');
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <div className={`min-h-screen w-full font-sans relative transition-colors duration-700 ${isDark ? 'bg-[#2A0A0A] text-white' : 'bg-[#F9F9F7] text-slate-800'}`}>
        <SEO
          title="About Treasure | Luxury Flats in Vidhyadhar Nagar, Jaipur"
          description="Treasure by Katewa Companies designs premium homes in Vidhyadhar Nagar, Jaipur, with thoughtful architecture, quality craftsmanship, and timeless interiors."
        />
        <main className="relative w-full pl-0 md:pl-24 overflow-hidden">
          <header className="absolute md:fixed top-0 left-0 w-full z-50 px-6 py-4 md:pl-36 md:pr-12 md:py-6 flex justify-between md:justify-end items-center">
              <div className="flex md:hidden items-center gap-4">
                  <button onClick={openMenu} className="p-2">
                      <div className="space-y-1.5"><span className={`block w-6 h-0.5 ${isDark ? 'bg-white' : 'bg-stone-800'}`}></span><span className={`block w-4 h-0.5 ${isDark ? 'bg-white' : 'bg-stone-800'}`}></span></div>
                  </button>
                  <img src={LOCAL_ASSETS.logo} alt="Logo" className={`h-8 w-auto ${isDark ? 'brightness-100' : 'brightness-0'}`} />
              </div>
              <button onClick={toggleTheme} className={`p-3 rounded-full border transition-all ${isDark ? 'bg-black/40 border-white text-white' : 'bg-white/20 border-stone-800 text-stone-800'}`}>{isDark ? <Sun size={20} /> : <Moon size={20} />}</button>
          </header>

          <section className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden mb-12 group">
            <img src={LOCAL_ASSETS.hero} alt="Architecture" className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 md:p-24">
              <h1 className="text-3xl md:text-5xl font-['Oswald'] uppercase text-white mb-4 tracking-widest">{cmsData?.heading || "Our Spaces & Purpose"}</h1>
              <p className="font-['Playfair_Display'] text-white/90 text-sm md:text-lg max-w-2xl leading-relaxed">{cmsData?.title_desc || "We envision Treasure as Jaipur’s modern benchmark for homes that endure."}</p>
            </div>
          </section>

          <div className="px-6 md:px-12 pb-20 max-w-7xl mx-auto">
            <StatsSection />
            <section className="py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5">
                    <div className={`w-12 h-0.5 mb-6 ${isDark ? 'bg-white/50' : 'bg-gray-400'}`} />
                    <h2 className="font-['Oswald'] text-3xl md:text-4xl mb-6 uppercase tracking-widest">{cmsData?.about_heading || "About Us"}</h2>
                    <div className="font-['Playfair_Display'] text-base md:text-lg leading-loose opacity-80">
                        <p className="mb-4">{cmsData?.description || "At Treasure, architecture is an experience—a rhythm of proportion, material, and calm."}</p>
                        <AnimatePresence>
                            {isExpanded && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                                <p className="mb-4">{cmsData?.description_extended || "Every home is shaped by measured proportions and natural materials. We design to endure with modern calm."}</p>
                            </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <button onClick={() => setIsExpanded(!isExpanded)} className="mb-8 text-xs font-bold uppercase tracking-widest border-b pb-1">{isExpanded ? 'Read Less' : 'Read More'}</button>
                    <Link to="/contact" className={`inline-flex items-center text-xs font-bold tracking-widest uppercase border px-8 py-4 transition-all ${isDark ? 'border-white hover:bg-white hover:text-black' : 'border-stone-800 hover:bg-stone-800 hover:text-white'}`}>View Location <ArrowRight size={16} className="ml-2" /></Link>
                </div>
                <div className="lg:col-span-7 relative h-[400px] md:h-[600px]">
                    <img src={LOCAL_ASSETS.aboutExterior} className="absolute left-0 top-0 w-[60%] aspect-[3/4] object-cover shadow-2xl" />
                    <img src={LOCAL_ASSETS.aboutInterior} className="absolute right-0 bottom-0 w-[55%] aspect-[3/4] object-cover shadow-2xl translate-y-12" />
                </div>
            </section>
          </div>
          <Footer />
        </main>
      </div>
    );
};

export default AboutUsPage;