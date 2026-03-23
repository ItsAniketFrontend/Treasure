import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, X, Sun, Moon, 
  Mail, Facebook, Twitter, Linkedin, Youtube, 
  Phone, MapPin
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from './ThemeContext';

// --- CONFIGURATION: LOCAL IMAGE PATHS ---
const LOCAL_ASSETS = {
  hero: "/assets/images/sixteen.png",
  aboutExterior: "/assets/images/seventeen.png",
  aboutInterior: "/assets/images/eighteen.png",
  banner: "/assets/images/six.png", 
  founder: "/assets/images/founder.jpg",
  logo: "/assets/images/logo.png",
  footerPattern: "/assets/images/dpattern.jpg"
};

// --- SHARED COMPONENTS (Internal) ---

const NavigationSidebar = React.memo(({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { isDark } = useTheme();
  
  const MENU_ITEMS = [
    { label: 'Home', href: '/' }, 
    { label: 'About Us', href: '/about' },
    { label: 'Our Services', href: '/services' },
    { label: 'Our Projects', href: '/projects' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose} 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[140]" 
          />
          
          {/* DRAWER PANEL */}
          <motion.div 
            initial={{ x: '-100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '-100%' }} 
            transition={{ type: 'tween', duration: 0.5 }} 
            className={`fixed top-0 left-0 h-full w-[85%] md:w-1/4 z-[150] shadow-2xl flex flex-col border-r backdrop-blur-md transition-colors duration-500 ${
              isDark ? 'bg-[#2A0A0A]/95 border-[#4A2521]' : 'bg-[#F9F9F7]/95 border-stone-200'
            }`}
          >
            {/* HEADER */}
            <div className={`flex justify-between items-center p-6 md:p-8 border-b ${isDark ? 'border-[#4A2521]' : 'border-stone-200'}`}>
                <div className="flex flex-col">
                    <span className={`text-2xl md:text-3xl font-['Oswald'] font-bold tracking-widest ${isDark ? 'text-white' : 'text-stone-800'}`}>TREASURE</span>
                    <span className={`text-[10px] tracking-[0.3em] uppercase font-['Oswald'] ${isDark ? 'text-white/60' : 'text-stone-500'}`}>Menu</span>
                </div>
                <button 
                  onClick={onClose} 
                  className={`p-2 rounded-full border transition-colors group ${isDark ? 'border-white/30 hover:bg-white/10 text-white' : 'border-stone-300 hover:bg-stone-200 text-stone-800'}`}
                >
                    <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>
            </div>
            
            {/* LINKS */}
            <div className="flex-1 flex flex-col justify-center px-8 md:px-12 space-y-6">
                {MENU_ITEMS.map(item => (
                    <Link 
                      key={item.label} 
                      to={item.href} 
                      onClick={onClose} 
                      className={`group flex items-center justify-between text-xl md:text-3xl font-['Playfair_Display'] uppercase tracking-wide transition-colors ${isDark ? 'text-white/60 hover:text-white' : 'text-stone-400 hover:text-stone-800'}`}
                    >
                        {item.label} 
                        <ArrowRight className={`opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ${isDark ? 'text-white' : 'text-[#D4AF37]'}`} size={20} />
                    </Link>
                ))}
            </div>

            {/* MOBILE FOOTER */}
            <div className={`p-8 border-t ${isDark ? 'border-[#4A2521]' : 'border-stone-200'}`}>
                <img 
                  src="/assets/images/katewa-logo.png" 
                  alt="Katewa Group" 
                  className={`w-12 h-auto object-contain opacity-80 ${isDark ? 'brightness-0 invert' : ''}`} 
                />
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

// Sidebar is HIDDEN on mobile (hidden md:flex)
const FixedSidebar = React.memo(({ onOpenMenu }: { onOpenMenu: () => void }) => {
  const { isDark } = useTheme();
  return (
    <aside className={`hidden md:flex fixed top-0 left-0 h-screen w-24 z-[100] flex-col justify-between items-center border-r shadow-sm transition-colors duration-500 ${isDark ? 'bg-[#2A0A0A] border-[#4A2521]' : 'bg-white border-gray-100'}`}>
      
      <div className="flex flex-col items-center w-full pt-8 gap-10">
        <button onClick={onOpenMenu} aria-label="Open Menu" className="group p-2">
            <div className="space-y-1.5">
                <span className={`block w-8 h-0.5 group-hover:w-6 transition-all duration-300 ${isDark ? 'bg-white' : 'bg-gray-800'}`}></span>
                <span className={`block w-5 h-0.5 group-hover:w-8 transition-all duration-300 ${isDark ? 'bg-white' : 'bg-gray-800'}`}></span>
            </div>
        </button>

        <Link to="/" className="opacity-90 hover:opacity-100 transition-opacity">
            <img 
              src={LOCAL_ASSETS.logo} 
              alt="Treasure Logo" 
              className="w-12 h-auto object-contain" 
            />
        </Link>
      </div>

      <div className="w-full flex flex-col items-center">
        {/* DESKTOP Secondary Logo */}
        <div className="mb-6 opacity-80 hover:opacity-100 transition-opacity">
            <img 
              src="/assets/images/katewa-logo.png" 
              alt="Katewa Group" 
              className={`w-12 h-auto object-contain ${isDark ? 'brightness-0 invert' : ''}`} 
            />
          </div>
          <Link 
            to="/contact" 
            className="w-full h-48 bg-[#3E2723] text-white flex items-center justify-center hover:bg-[#2C1A16] transition-colors"
          >
              <span className="text-xs font-['Oswald'] font-bold tracking-[0.25em] uppercase [writing-mode:vertical-lr] rotate-180">Make an Enquiry</span>
          </Link>
      </div>
    </aside>
  );
});

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <a href="#" className="w-10 h-10 rounded-full bg-[#1A0B09] flex items-center justify-center text-white/70 hover:bg-white hover:text-[#4A2521] transition-all duration-300">
    {icon}
  </a>
);

const Footer = () => {
  return (
    <footer className="w-full bg-[#2C1A16] text-[#EBEBE6] relative font-sans border-t border-white/10">
      
      {/* --- BACKGROUND PATTERN --- */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <img 
          src="/assets/images/dpattern.jpg" 
          alt="Background Pattern" 
          className="w-full h-full object-cover" 
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-[#2C1A16]/95 to-[#1A0B09]/98 z-0" />

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          
          {/* COLUMN 1 */}
          <div className="space-y-4">
            <h3 className="text-base font-bold uppercase tracking-widest font-['Oswald'] text-white">About</h3>
            <p className="text-sm text-[#EBEBE6]/60 leading-relaxed font-['Playfair_Display'] max-w-xs ">
              Katewa Companies is a visionary real estate and development firm committed to exceptional residential and commercial environments, grounded in quality
              thoughtful design, and sustainable excellence, shaping places people are proud to call their own. 
            </p>
          </div>

          {/* COLUMN 2 */}
          <div className="space-y-4">
            <h3 className="text-base font-bold uppercase tracking-widest font-['Oswald'] text-white">Contact</h3>
            <ul className="space-y-2 text-sm text-[#EBEBE6]/60 font-['Playfair_Display']">
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-white/40" />
                <span>+91 9353181818</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-white/40" />
                <span className="break-all">admin@katewacompanies.in</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-white/40 mt-1" />
                <span>Sector-5, Vidhyadhar Nagar, Jaipur</span>
              </li>
            </ul>
          </div>

          {/* COLUMN 3 */}
          <div className="space-y-4">
            <h3 className="text-base font-bold uppercase tracking-widest font-['Oswald'] text-white">Links</h3>
            <ul className="space-y-2 text-sm text-[#EBEBE6]/60 font-['Playfair_Display']">
              <li>
                <Link to="/about" className="flex items-center gap-2 hover:text-white transition-colors group">
                  <span className="w-1 h-1 bg-white/40 rounded-full group-hover:bg-white transition-colors" />
                  <span>About us</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="flex items-center gap-2 hover:text-white transition-colors group">
                  <span className="w-1 h-1 bg-white/40 rounded-full group-hover:bg-white transition-colors" />
                  <span>Services</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4 */}
          <div className="space-y-4">
            <h3 className="text-base font-bold uppercase tracking-widest font-['Oswald'] text-white">Newsletter</h3>
            
            <div className="space-y-3">
              <div className="relative border-b border-[#EBEBE6]/20">
                <Mail size={14} className="absolute left-0 top-2.5 text-white/40" />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full bg-transparent py-2 pl-6 text-sm focus:outline-none placeholder:text-[#EBEBE6]/30 text-white font-['Playfair_Display']"
                />
              </div>
              <button className="w-full py-2 border border-[#EBEBE6]/20 text-xs uppercase tracking-widest hover:bg-[#EBEBE6] hover:text-[#2C1A16] transition-colors font-['Oswald']">
                Subscribe
              </button>
            </div>

            <div className="flex gap-3 pt-2">
               <SocialIcon icon={<Facebook size={14} />} />
               <SocialIcon icon={<Linkedin size={14} />} />
               <SocialIcon icon={<Twitter size={14} />} />
               <SocialIcon icon={<Youtube size={14} />} />
            </div>
          </div>

        </div>
      </div>

      {/* --- BOTTOM BAR --- */}
      <div className="bg-[#1A0B09] py-4 border-t border-[#EBEBE6]/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="flex items-center gap-3">
             <img 
               src="/assets/images/logo.png" 
               alt="Treasure" 
               className="h-6 w-auto object-contain brightness-0 invert opacity-70" 
             />
             <span className="text-xs text-[#EBEBE6]/30 uppercase tracking-wider font-['Oswald']">© 2025 Treasure</span>
          </div>

          <div className="flex gap-6 text-xs text-[#EBEBE6]/40 font-['Oswald']">
             <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
             <Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
          </div>

        </div>
      </div>
    </footer>
  );
};

// --- UPDATED STATS SECTION ---
const StatsSection = () => {
  const STATS_DATA = [
    { val: '78%', label: 'Climate Responsive Architecture' },
    { val: '92%', label: 'Premium Material Selection' },
    { val: '88%', label: 'Optimal Layout Efficiency' },
    { val: '45', label: 'AQI' }, // Set a numeric value for the demo
  ];
  
  // Standardized SVG Geometry
  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  return (
    <section className="relative py-12 md:py-20 overflow-hidden">
       {/* BACKGROUND SHADE */}
       <div 
         className="absolute inset-0 z-0 pointer-events-none" 
         style={{
           background: 'linear-gradient(135deg, transparent 85%, rgba(255,255,255,0.8) 85%)'
         }} 
       />
       <div className="absolute inset-0 z-0 pointer-events-none hidden dark:block bg-gradient-to-br from-transparent via-transparent to-white/5" />

       <div className="relative z-10 max-w-[1400px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {STATS_DATA.map((stat, idx) => {
             const isAQI = stat.label === 'AQI';
             const numericVal = parseInt(stat.val) || 0;

             return (
               <motion.div 
                  key={idx}
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-center"
               >
                  {/* CIRCLE CONTAINER */}
                  <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border border-stone-300 dark:border-stone-600 flex flex-col items-center justify-center mb-6 relative overflow-hidden">
                     
                     {/* CONTENT INSIDE CIRCLE */}
                     <div className="z-10 flex flex-col items-center justify-center">
                        <span className="font-['Oswald'] text-3xl md:text-5xl font-bold dark:text-white tracking-wider">
                          {stat.val}
                        </span>

                        {/* CONDITIONAL: Render Bar if AQI, otherwise nothing (circular stroke handles it) */}
                        {isAQI && (
                          <div className="mt-2 flex flex-col items-center">
                             {/* The Bar */}
                             <div className="relative w-16 md:w-20 h-1 md:h-1.5 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-yellow-400 to-rose-500 opacity-80" />
                                {/* Marker */}
                                <motion.div 
                                  className="absolute top-0 bottom-0 w-0.5 bg-stone-900 dark:bg-white shadow-[0_0_4px_rgba(0,0,0,0.5)]"
                                  initial={{ left: 0 }}
                                  whileInView={{ left: `${Math.min(numericVal, 100)}%` }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                                />
                             </div>
                             {/* Micro Labels */}
                             <div className="flex justify-between w-16 md:w-20 text-[8px] md:text-[9px] uppercase tracking-widest mt-1 font-medium text-stone-400 dark:text-stone-500 font-['Oswald']">
                                <span>Good</span>
                                <span>Poor</span>
                             </div>
                          </div>
                        )}
                     </div>
                     
                     {/* SVG GRAPHICS */}
                     <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100" aria-hidden="true">
                        {/* Static Background Track (Always visible) */}
                        <circle 
                          cx="50" 
                          cy="50" 
                          r={radius} 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="0.5" 
                          className="text-stone-800/5 dark:text-white/5" 
                        />
                        
                        {/* Animated Percentage Stroke (Only if NOT AQI) */}
                        {!isAQI && (
                          <motion.circle 
                            cx="50" 
                            cy="50" 
                            r={radius} 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="0.5" 
                            strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            whileInView={{ strokeDashoffset: circumference * (1 - numericVal / 100) }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 0.2 + idx * 0.1 }}
                            className="text-stone-800 dark:text-white" 
                          />
                        )}
                     </svg>
                  </div>

                  {/* SUBTEXT LABEL */}
                  <h3 className="text-[10px] md:text-xs uppercase tracking-widest max-w-[180px] text-stone-600 dark:text-white/80 font-['Playfair_Display']">
                    {stat.label}
                  </h3>
               </motion.div>
             );
          })}
       </div>
    </section>
  );
};

// --- MAIN PAGE COMPONENT ---

const AboutUsPage: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const values = [
    {
      id: "01",
      title: "Design",
      desc: "Designs shaped by clarity, research, and purpose-driven thinking.",
    },
    {
      id: "02",
      title: "PASSION & WORK",
      desc: "Every detail refined with care, precision, and craftsmanship.",
    },
    {
      id: "03",
      title: "CREATIVE EXCELLENCE",
      desc: " Ideas shaped by imagination, grounded in practicality.",
    },
  ];

  return (
    <>
      {/* 1. IMPORT FONTS */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
        `}
      </style>

      <div className={`min-h-screen w-full font-sans relative transition-colors duration-700 ease-in-out ${
        isDark ? 'bg-[#2A0A0A] text-white' : 'bg-[#F9F9F7] text-slate-800'
      }`}>
        
        <NavigationSidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        <FixedSidebar onOpenMenu={() => setIsMenuOpen(true)} />

        {/* Main Content Wrapper */}
        <main className="relative w-full pl-0 md:pl-24 overflow-hidden">
          
          {/* Background Abstract Shape */}
          <div className={`absolute top-[40%] right-0 w-2/3 h-[60vh] transform -skew-y-12 origin-top-right -z-10 pointer-events-none transition-colors duration-700 ${
            isDark ? 'bg-[#4A2521] opacity-10' : 'bg-white opacity-60'
        }`} />

          {/* TOP BAR / HEADER */}
          <header className="absolute md:fixed top-0 left-0 w-full z-50 px-6 py-4 md:pl-36 md:pr-12 md:py-6 flex justify-between md:justify-end items-center">
              
              {/* Mobile Only: Hamburger & Logo */}
              <div className="flex md:hidden items-center gap-4">
                  <button onClick={() => setIsMenuOpen(true)} className={`p-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      <div className="space-y-1.5">
                          <span className="block w-6 h-0.5 bg-current"></span>
                          <span className="block w-4 h-0.5 bg-current"></span>
                      </div>
                  </button>
                  <img src={LOCAL_ASSETS.logo} alt="Logo" className="h-8 w-auto object-contain" />
              </div>

              <button 
                  onClick={toggleTheme} 
                  aria-label="Toggle Dark Mode" 
                  className={`pointer-events-auto p-2 md:p-3 rounded-full border transition-all duration-300 backdrop-blur-md shadow-sm ${
                  isDark 
                      ? 'bg-black/40 border-white text-white hover:bg-white/20' 
                      : 'bg-white/20 border-white text-white hover:bg-white/30'
                  }`}
              >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
          </header>

          {/* HERO SECTION */}
          <section className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden mb-12 md:mb-20 group">
            <img
              src={LOCAL_ASSETS.hero}
              alt="Architecture"
              loading="lazy"
              className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-end items-start text-left px-6 md:px-12 lg:px-24 pb-12 md:pb-16 z-10">
              {/* HEADING: Oswald */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-['Oswald'] uppercase text-white mb-4 tracking-widest drop-shadow-lg">
                Our Spaces & Purpose
              </h1>
              <div className="w-16 h-0.5 bg-white/70 mb-4" />
              {/* SUBTEXT: Playfair */}
              <p className="font-['Playfair_Display'] text-white/90 text-sm md:text-lg max-w-2xl leading-relaxed font-light drop-shadow-md">
                We envision Treasure as Jaipur’s modern benchmark for homes that endure, architecturally, emotionally, and generationally.
              </p>
            </div>
          </section>

          <div className="px-6 md:px-12 pb-20 max-w-7xl mx-auto">
            
            {/* STATS SECTION */}
            <StatsSection />

            {/* ABOUT US SECTION */}
            <section className="relative py-12 lg:py-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                  
                  {/* Text Content */}
                  <div className="lg:col-span-5 lg:pr-12 mb-8 lg:mb-0 order-2 lg:order-1">
                    <div className={`w-12 h-0.5 mb-6 ${isDark ? 'bg-white/50' : 'bg-gray-400'}`} />
                    
                    {/* HEADING: Oswald */}
                    <h2 className={`font-['Oswald'] text-3xl md:text-4xl mb-6 uppercase tracking-widest leading-tight ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        About Us
                    </h2>
                    
                    {/* SUBTEXT: Playfair */}
                    <div className={`font-['Playfair_Display'] text-sm md:text-lg leading-loose transition-colors duration-500 ${isDark ? 'text-[#EBEBE6]/80' : 'text-gray-600'}`}>
                        <p className="mb-4">
                            There is a rare honesty in homes built with intention.
Treasure, the residential arm of Katewa Companies, celebrates this belief through architecture that feels personal, grounded, and quietly extraordinary.

                        </p>

                        <AnimatePresence>
                            {isExpanded && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                <p className="mb-4">
                                Every home is shaped by measured proportions, its love for natural materials. 
                                Treasure reinterprets luxury with a modern calm: softer lines, warmer textures, 
                                and spaces that feel lived in from the moment you step inside.

                                </p>
                                <p className="mb-4">
                                Here, design isn't a spectacle. It’s sincerity.
                                Walls feel warm, rooms breathe easily, and materials carry the comfort of things made to last.

                                </p>
                                <p className="mb-4">
                                Treasure is not built to impress the world; it is built to belong to you.
A place where craftsmanship becomes emotion, and where home becomes a feeling you can return to, again and again.
                                </p>
                            </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* READ MORE TOGGLE */}
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className={`mb-8 text-xs font-['Oswald'] font-bold tracking-[0.15em] uppercase border-b pb-1 transition-all duration-300 ${
                        isDark 
                            ? 'border-white/30 text-white/70 hover:text-white hover:border-white' 
                            : 'border-gray-400/30 text-gray-500 hover:text-gray-900 hover:border-gray-900'
                        }`}
                    >
                        {isExpanded ? 'Read Less' : 'Read More'}
                    </button>
                    
                    {/* BUTTON: Oswald */}
                    <div className="block">
                        <Link 
                        to="/contact"
                        className={`group inline-flex items-center text-xs font-['Oswald'] font-bold tracking-[0.15em] uppercase border px-6 py-3 transition-all duration-300 ${isDark ? 'border-white text-white hover:bg-white hover:text-[#2A0A0A]' : 'text-gray-800 border-gray-300 hover:bg-gray-800 hover:text-white'}`}
                        >
                            View Location <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                  </div>

                  {/* Overlapping Images Composition */}
                  <div className="lg:col-span-7 relative h-[400px] md:h-[600px] order-1 lg:order-2">
                    {/* Top Left Image */}
                    <img 
                      src={LOCAL_ASSETS.aboutExterior} 
                      alt="Exterior"
                      className="absolute left-0 top-0 w-[55%] md:w-[55%] aspect-[3/4] object-cover  z-10" 
                    />
                    {/* Bottom Right Image */}
                    <img 
                      src={LOCAL_ASSETS.aboutInterior} 
                      alt="Interior"
                      className={`absolute right-0 bottom-12 w-[55%] md:w-[55%] aspect-[3/4] object-cover  z-0 `} 
                    />
                  </div>

              </div>
            </section>
          </div>

          {/* BANNER SECTION */}
          <section className="w-full h-[300px] md:h-[460px] relative group overflow-hidden">
            <img 
              src={LOCAL_ASSETS.banner} 
              alt="Luxury Interior View" 
              className="w-full h-full object-cover brightness-75 transition-transform duration-700 group-hover:scale-105" 
            />
          </section>

          {/* VALUES SECTION */}
          <section className="w-full py-16 md:py-24 relative overflow-hidden group">
            
            {/* Background Image */}
            <img 
              src="/assets/images/dpattern.jpg" 
              alt="Background" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            <div className="absolute inset-0 bg-black/10 z-0" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 relative z-10">
              {values.map((item) => (
                <div key={item.id} className="relative flex flex-col items-center text-center group">
                  {/* Number: Playfair */}
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-8xl md:text-9xl font-['Playfair_Display'] text-white/10 font-bold select-none pointer-events-none">
                    {item.id}
                  </span>
                  
                  {/* Title: Oswald */}
                  <h3 className="text-white text-sm font-['Oswald'] font-bold tracking-[0.15em] uppercase mb-4 mt-16">
                    {item.title}
                  </h3>
                  
                  {/* Divider */}
                  <div className="w-8 h-px bg-white/50 mb-4" />
                  
                  {/* Description: Playfair */}
                  <p className="text-white dark:white text-sm leading-6 max-w-[250px] font-['Playfair_Display']">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* TEAM SECTION */}
          <section className={`w-full relative py-20 md:py-32 overflow-hidden transition-colors duration-700 ${isDark ? 'bg-[#2A0A0A]' : 'bg-[#F4F6F8]'}`}>
              <div className={`absolute inset-0 -skew-y-6 transform origin-top-left z-0 pointer-events-none transition-colors duration-700 ${isDark ? 'bg-[#2A0A0A]' : 'bg-white'}`} />
              <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                  {/* HEADING: Oswald */}
                  <h2 className={`text-xl md:text-3xl font-['Oswald'] tracking-widest uppercase mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    The People Behind The Vision
                  </h2>
                  <div className="w-12 h-px bg-gray-400 mx-auto mb-8" />
                  
                  {/* SUBTEXT: Playfair */}
                  <p className={`text-sm md:text-lg leading-relaxed mb-12 md:mb-16 font-['Playfair_Display'] font-light max-w-2xl mx-auto ${isDark ? 'text-[#EBEBE6]/80' : 'text-gray-600'}`}>
                      "Real estate, for me, is an expression of optimism, a belief that every space we create should inspire confidence in what lies ahead."
                  </p>
                  
                  <div className="flex flex-col items-center">
                      <div className={`p-2 border inline-block mb-6 shadow-lg transition-colors duration-700 ${isDark ? 'bg-[#4A2521] border-white/50' : 'bg-white border-[#927B5B]'}`}>
                          <img 
  src={LOCAL_ASSETS.founder} 
  alt="Founder" 
  className="w-80 h-48 md:w-[600px] md:h-[350px] object-cover grayscale hover:grayscale-0 transition-all duration-500" 
/>
                      </div>
                      {/* Name: Oswald */}
                      <h3 className={`text-sm font-['Oswald'] font-bold tracking-[0.15em] uppercase mb-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>Robin Katewa</h3>
                      <span className="text-xs text-gray-500 font-light tracking-wider uppercase font-['Oswald']">Director</span>
                  </div>
              </div>
          </section>

          <Footer />
        </main>
      </div>
    </>
  );
};

export default AboutUsPage;