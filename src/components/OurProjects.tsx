import React, { useState } from 'react';
import { 
  Menu, Sun, Moon, X, 
  Mail, Facebook, Twitter, Linkedin, Youtube, Phone, MapPin, ArrowRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext';

// --- CONFIGURATION: LOCAL IMAGE PATHS ---
const LOCAL_ASSETS = {
  hero: "/assets/images/twentysix.png", 
  treasure: "/assets/images/twentyeight.png",
  limited: "/assets/images/twentyseven.png",
  logo: "/assets/images/logo.png",
  footerPattern: "/assets/images/dpattern.jpg"
};

// --- INTERNAL COMPONENTS ---

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
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose} 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]" 
          />
          <motion.div 
            initial={{ x: '-100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '-100%' }} 
            transition={{ type: 'tween', duration: 0.5 }} 
            className={`fixed top-0 left-0 h-full w-[85%] md:w-1/4 z-[70] shadow-2xl flex flex-col border-r backdrop-blur-md transition-colors duration-500 ${
              isDark ? 'bg-[#2A0A0A]/95 border-[#4A2521]' : 'bg-[#F9F9F7]/95 border-stone-200'
            }`}
          >
            <div className={`flex justify-between items-center p-6 md:p-8 border-b ${isDark ? 'border-[#4A2521]' : 'border-stone-200'}`}>
                <div className="flex flex-col">
                    <span className={`text-2xl md:text-3xl font-['Oswald'] font-bold tracking-widest ${isDark ? 'text-[#fdfdfc]' : 'text-stone-800'}`}>TREASURE</span>
                    <span className={`text-[10px] tracking-[0.3em] uppercase font-['Oswald'] ${isDark ? 'text-[#D4AF37]/60' : 'text-stone-500'}`}>Menu</span>
                </div>
                <button 
                  onClick={onClose} 
                  className={`p-2 rounded-full border transition-colors group ${isDark ? 'border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 text-[#fefefd]' : 'border-stone-300 hover:bg-stone-200 text-stone-800'}`}
                >
                    <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>
            </div>
            
            <div className="flex-1 flex flex-col justify-center px-8 md:px-12 space-y-6">
                {MENU_ITEMS.map(item => (
                    <Link 
                      key={item.label} 
                      to={item.href} 
                      onClick={onClose} 
                      className={`group flex items-center justify-between text-xl md:text-3xl font-['Playfair_Display'] transition-colors ${isDark ? 'text-[#EBEBE6]/60 hover:text-[#D4AF37]' : 'text-stone-400 hover:text-stone-800'}`}
                    >
                        {item.label} 
                        <ArrowRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-[#D4AF37]" size={20} />
                    </Link>
                ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

const FixedSidebar = React.memo(({ onOpenMenu }: { onOpenMenu: () => void }) => {
  const { isDark } = useTheme();
  return (
    <aside className={`hidden md:flex fixed top-0 left-0 h-screen w-24 z-50 flex-col justify-between items-center border-r shadow-sm transition-colors duration-500 ${isDark ? 'bg-[#2A0A0A] border-[#4A2521]' : 'bg-white border-gray-100'}`}>
      
      <div className="flex flex-col items-center w-full pt-8 gap-10">
        <button onClick={onOpenMenu} aria-label="Open Menu" className="group p-2">
            <div className="space-y-1.5">
                <span className={`block w-8 h-0.5 group-hover:w-6 transition-all duration-300 ${isDark ? 'bg-[#fbfbfa]' : 'bg-gray-800'}`}></span>
                <span className={`block w-5 h-0.5 group-hover:w-8 transition-all duration-300 ${isDark ? 'bg-[#fdfdfc]' : 'bg-gray-800'}`}></span>
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
        <div className="mb-6 opacity-80 hover:opacity-100 transition-opacity">
            <img 
              src="/assets/images/katewa-logo.png" 
              alt="Secondary Logo" 
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
      
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <img 
          src="/assets/images/dpattern.jpg" 
          alt="Background Pattern" 
          className="w-full h-full object-cover" 
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-[#2C1A16]/95 to-[#1A0B09]/98 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          
          <div className="space-y-4">
            <h3 className="text-base font-bold uppercase tracking-widest font-['Oswald'] text-white">About</h3>
            <p className="text-sm text-[#EBEBE6]/60 leading-relaxed font-['Playfair_Display'] font-light max-w-xs">
              Katewa Companies is a visionary real estate and development firm committed to exceptional residential and commercial environments, grounded in quality
              thoughtful design, and sustainable excellence, shaping places people are proud to call their own. 
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold uppercase tracking-widest font-['Oswald'] text-white">Contact</h3>
            <ul className="space-y-2 text-sm text-[#EBEBE6]/60 font-['Playfair_Display'] font-light">
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-white/40" />
                <span>+91 9353181818</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-white/40" />
                <span>admin@katewacompanies.in</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-white/40 mt-1" />
                <span>Sector-5, Vidhyadhar Nagar, Jaipur</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold uppercase tracking-widest font-['Oswald'] text-white">Links</h3>
            <ul className="space-y-2 text-sm text-[#EBEBE6]/60 font-['Playfair_Display'] font-light">
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
              <li>
                <Link to="/contact" className="flex items-center gap-2 hover:text-white transition-colors group">
                  <span className="w-1 h-1 bg-white/40 rounded-full group-hover:bg-white transition-colors" />
                  <span>Contact us</span>
                </Link>
              </li>
            </ul>
          </div>

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

// --- MAIN PAGE COMPONENT ---

const OurProjectsPage = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
        `}
      </style>

      <div className={`min-h-screen w-full font-sans overflow-x-hidden relative transition-colors duration-700 ease-in-out ${
        isDark ? 'bg-[#2A0A0A] text-[#D4AF37]' : 'bg-[#F2F5F5] text-[#4A342B]'
      }`}>
        
        <NavigationSidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        <FixedSidebar onOpenMenu={() => setIsMenuOpen(true)} />

        <main className="relative w-full pl-0 md:pl-24">
          
          <div className={`absolute top-0 right-0 w-1/2 h-screen z-0 pointer-events-none transition-opacity duration-700 ${
              isDark ? 'opacity-10 bg-[#4A2521]' : 'opacity-10 bg-[#D4AF37]'
          }`} style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }} />

          {/* --- MOBILE HEADER --- */}
          <div className="md:hidden flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-white/10 relative z-30">
              <div className="flex items-center gap-4">
                  <button onClick={() => setIsMenuOpen(true)} className={`p-1 ${isDark ? 'text-[#D4AF37]' : 'text-gray-800'}`}>
                      <Menu size={24} />
                  </button>
                  <img src={LOCAL_ASSETS.logo} alt="Logo" className="h-8 w-auto object-contain" />
              </div>
              <button 
                  onClick={toggleTheme} 
                  className={`p-2 rounded-full border transition-all duration-300 ${
                      isDark ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-gray-300 text-gray-600'
                  }`}
              >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
          </div>

          {/* --- DESKTOP HEADER --- */}
          <header className="hidden md:flex absolute top-0 left-0 w-full z-20 pl-36 pr-12 py-6 justify-end items-center">
            <button 
              onClick={toggleTheme} 
              aria-label="Toggle Dark Mode" 
              className={`p-3 rounded-full border transition-all duration-300 backdrop-blur-md shadow-sm ${
                isDark 
                  ? 'bg-black/40 border-[#fbfafa] text-[#fcfcfb] hover:bg-[#D4AF37]/20' 
                  : 'bg-white/20 border-white text-white hover:bg-white/30'
              }`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </header>

          {/* --- HERO SECTION --- */}
          <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden group mb-12">
              <img
                  src={LOCAL_ASSETS.hero}
                  alt="Modern architectural building"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-6 md:bottom-20 md:left-24 max-w-2xl text-white pr-4">
                  <div className="w-12 h-[2px] bg-white mb-6"></div>
                  <p className="font-['Oswald'] text-2xl md:text-4xl leading-snug drop-shadow-md">
                      We craft environments that blend modern elegance with functional clarity.
                  </p>
              </div>
          </div>

          <div className="pt-8 md:pt-12 pb-12 text-center">
              <p className={`text-xs font-['Oswald'] font-bold tracking-[0.3em] uppercase mb-4 ${isDark ? 'text-[#EBEBE6]/60' : 'text-gray-500'}`}>
                  Residentials
              </p>
          </div>

          {/* --- FEATURED PROJECTS STACK --- */}
          <div className="px-6 md:px-12 lg:px-24 pb-24 md:pb-40 flex flex-col gap-6 md:gap-8">
              
              {/* Project 1: TREASURE */}
              <Link to="/projects/treasure" className="group relative w-full h-[50vh] md:h-[70vh] overflow-hidden block">
                  <img 
                      src={LOCAL_ASSETS.treasure} 
                      alt="Treasure Residences Exterior" 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 brightness-75 group-hover:brightness-90"
                  />
                  
                  {/* Center Content Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 text-center">
                      <h2 className="text-3xl md:text-5xl font-['Oswald'] text-white tracking-widest uppercase drop-shadow-lg">
                          Treasure
                      </h2>
                      
                      {/* View Property Button (Replaced Arrow) */}
                      <span className="mt-8 px-6 md:px-8 py-3 border border-white/80 text-white font-['Oswald'] text-xs md:text-sm tracking-[0.2em] uppercase hover:bg-white hover:text-[#2C1A16] transition-all duration-300 backdrop-blur-sm group-hover:border-white">
                          View Property
                      </span>
                  </div>
              </Link>

              {/* Project 2: TREASURE LIMITED EDITION */}
              <Link to="/projects/treasure" className="group relative w-full h-[50vh] md:h-[70vh] overflow-hidden block">
                  <img 
                      src={LOCAL_ASSETS.limited} 
                      alt="Treasure Limited Edition Exterior" 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 brightness-75 group-hover:brightness-90"
                  />
                  
                  {/* Center Content Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 text-center">
                      <h2 className="text-3xl md:text-5xl font-['Oswald'] text-white tracking-widest uppercase drop-shadow-lg">
                          Treasure <span className="font-['Playfair_Display'] italic font-light opacity-90 block text-lg md:text-2xl mt-2 tracking-[0.15em] lowercase">Limited Edition</span>
                      </h2>

                      {/* View Property Button (Replaced Arrow) */}
                      <span className="mt-8 px-6 md:px-8 py-3 border border-white/80 text-white font-['Oswald'] text-xs md:text-sm tracking-[0.2em] uppercase hover:bg-white hover:text-[#2C1A16] transition-all duration-300 backdrop-blur-sm group-hover:border-white">
                          View Property
                      </span>
                  </div>
              </Link>

          </div>

          <Footer />
        </main>
      </div>
    </>
  );
};

export default OurProjectsPage;