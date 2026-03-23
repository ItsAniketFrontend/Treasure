import React, { useState } from 'react';
import { 
  Menu, ChevronLeft, ArrowUpRight, Sun, Moon, X, 
  Mail, Facebook, Twitter, Linkedin, Youtube, 
  Phone, MapPin, ArrowRight 
} from 'lucide-react'; 
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext';

// --- DATASETS ---
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

const limitedData = [
  { id: 13, title: "PENTHOUSE SUITE", subtitle: "Limited Edition", src: "/assets/images/fortytwo.png" },
  { id: 14, title: "PRIVATE LOUNGE", subtitle: "Limited Edition", src: "/assets/images/fortyfive.png" },
  { id: 15, title: "SKY TERRACE", subtitle: "Limited Edition", src: "/assets/images/ten.png" },
  { id: 16, title: "MASTER BATH", subtitle: "Limited Edition", src: "/assets/images/sixtytwo.png" },
  { id: 17, title: "WALK-IN CLOSET", subtitle: "Limited Edition", src: "/assets/images/twentysix.png" },
  { id: 18, title: "GRAND FOYER", subtitle: "Limited Edition", src: "/assets/images/fortyone.png" },
  { id: 19, title: "PENTHOUSE SUITE", subtitle: "Limited Edition", src: "/assets/images/fortyseven.png" },
  { id: 20, title: "PRIVATE LOUNGE", subtitle: "Limited Edition", src: "/assets/images/fiftyfive.png" },
  { id: 21, title: "SKY TERRACE", subtitle: "Limited Edition", src: "/assets/images/fiftysix.png" },
  { id: 22, title: "MASTER BATH", subtitle: "Limited Edition", src: "/assets/images/fiftyfour.png" },
  { id: 23, title: "WALK-IN CLOSET", subtitle: "Limited Edition", src: "/assets/images/fiftyeight.png" },
  { id: 24, title: "GRAND FOYER", subtitle: "Limited Edition", src: "/assets/images/fiftyseven.png" },
];

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
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]" 
          />
          <motion.div 
            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'tween', duration: 0.5 }} 
            className={`fixed top-0 left-0 h-full w-[85%] md:w-1/4 z-[70] shadow-2xl flex flex-col border-r backdrop-blur-md transition-colors duration-500 ${
              isDark ? 'bg-[#2A0A0A]/95 border-[#4A2521]' : 'bg-[#F9F9F7]/95 border-stone-200'
            }`}
          >
            <div className={`flex justify-between items-center p-6 md:p-8 border-b ${isDark ? 'border-[#4A2521]' : 'border-stone-200'}`}>
                <div className="flex flex-col">
                    <span className={`text-2xl md:text-3xl font-['Oswald'] font-bold tracking-widest ${isDark ? 'text-white' : 'text-stone-800'}`}>TREASURE</span>
                    <span className={`text-[10px] tracking-[0.3em] uppercase font-['Oswald'] ${isDark ? 'text-white/60' : 'text-stone-500'}`}>Menu</span>
                </div>
                <button onClick={onClose} className={`p-2 rounded-full border transition-colors group ${isDark ? 'border-white/30 hover:bg-white/10 text-white' : 'border-stone-300 hover:bg-stone-200 text-stone-800'}`}>
                    <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>
            </div>
            <div className="flex-1 flex flex-col justify-center px-8 md:px-12 space-y-6">
                {MENU_ITEMS.map(item => (
                    <Link key={item.label} to={item.href} onClick={onClose} className={`group flex items-center justify-between text-xl md:text-3xl font-['Playfair_Display'] transition-colors ${isDark ? 'text-[#EBEBE6]/60 hover:text-white' : 'text-stone-400 hover:text-stone-800'}`}>
                        {item.label} 
                        <ArrowRight className={`opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ${isDark ? 'text-white' : 'text-[#D4AF37]'}`} size={20} />
                    </Link>
                ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

const FixedSidebar = ({ isDark, onOpenMenu }: { isDark: boolean, onOpenMenu: () => void }) => {
  return (
    <aside className={`hidden md:flex fixed top-0 left-0 h-screen w-24 z-50 flex-col justify-between items-center border-r shadow-sm transition-colors duration-500 ${
      isDark ? 'bg-[#2A0A0A] border-white/10' : 'bg-white border-gray-100'
    }`}>
      <div className="flex flex-col items-center w-full pt-8 gap-12">
        <button onClick={onOpenMenu} aria-label="Open Menu" className="group p-2">
          <div className="space-y-1.5">
            <span className={`block w-8 h-0.5 group-hover:w-6 transition-all duration-300 ${isDark ? 'bg-white' : 'bg-stone-800'}`}></span>
            <span className={`block w-5 h-0.5 group-hover:w-8 transition-all duration-300 ${isDark ? 'bg-white' : 'bg-stone-800'}`}></span>
          </div>
        </button>
        
        <Link to="/" className="group hover:opacity-80 transition-opacity">
          <img 
            src="/assets/images/logo.png" 
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
              <span className="text-xs font-['Oswald'] font-bold tracking-[0.25em] uppercase [writing-mode:vertical-lr] rotate-180">
                Make an Enquiry
              </span>
          </Link>
      </div>
    </aside>
  );
};

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
             This is property showcase done in a clean and
contemporary manner. We built Treasure to provide you with a trouble-free website setup and managing, and to let you have fun along the way.
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
                <span className="break-all">admin@katewacompanies.in</span>
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

// --- MAIN PROJECTS COMPONENT ---

const Projects = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const [activeProject, setActiveProject] = useState('TREASURE');
  const [expandedImageSrc, setExpandedImageSrc] = useState(null);

  const currentImages = activeProject === 'TREASURE' ? treasureData : limitedData;

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
        `}
      </style>

      <div className={`min-h-screen w-full font-sans overflow-x-hidden relative transition-colors duration-700 ease-in-out ${
        isDark ? 'bg-[#2A0A0A] text-white' : 'bg-[#F2F5F5] text-[#4A342B]'
      }`}>
        
        <NavigationSidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        <FixedSidebar isDark={isDark} onOpenMenu={() => setIsMenuOpen(true)} />

        {/* LIGHTBOX MODAL */}
        <AnimatePresence>
          {expandedImageSrc && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setExpandedImageSrc(null)}
              className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            >
              <button onClick={() => setExpandedImageSrc(null)} className="absolute top-4 right-4 p-2 text-white/70 hover:text-white z-[110] bg-black/20 rounded-full">
                <X size={32} />
              </button>
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                src={expandedImageSrc}
                alt="Expanded view"
                className="max-w-full max-h-[90vh] object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()} 
              />
            </motion.div>
          )}
        </AnimatePresence>

        <main className="relative w-full pl-0 md:pl-24">
          
          {/* MOBILE HEADER */}
          <div className="md:hidden flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-white/10">
              <div className="flex items-center gap-4">
                  <button onClick={() => setIsMenuOpen(true)} className={`p-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      <Menu size={24} />
                  </button>
                  <img src="/assets/images/logo.png" alt="Logo" className="h-8 w-auto object-contain" />
              </div>
              <button 
                  onClick={toggleTheme} 
                  className={`p-2 rounded-full border transition-all duration-300 ${
                      isDark ? 'border-white text-white' : 'border-gray-300 text-gray-600'
                  }`}
              >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
          </div>

          {/* PAGE HEADER */}
          <div className="px-6 md:px-12 pt-8 md:pt-12 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end">
              <div className="mb-2 md:mb-0">
                  <span className={`block text-[10px] font-['Oswald'] font-bold tracking-[0.2em] uppercase mb-1 ${isDark ? 'text-[#EBEBE6]/60' : 'text-gray-500'}`}>Our Projects</span>
                  <h1 className="text-2xl md:text-4xl font-['Oswald'] tracking-widest uppercase">Property Standard List</h1>
              </div>
              
              <button 
                onClick={toggleTheme} 
                aria-label="Toggle Dark Mode" 
                className={`hidden md:block p-3 rounded-full border transition-all duration-300 ${
                  isDark 
                    ? 'border-white text-white hover:bg-white/10' 
                    : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
          </div>

          {/* HERO */}
          <div className="px-6 md:px-12 mb-16 md:mb-24">
              <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden shadow-lg">
                  <img src="/assets/images/twentysix.png" alt="Luxury Bedroom Interior" className="w-full h-full object-cover" />
                  <div className="absolute bottom-8 left-6 md:bottom-20 md:left-16 max-w-2xl pr-4">
                      <div className="w-12 h-0.5 bg-white mb-4 md:mb-6" />
                      <p className="text-white font-['Oswald'] text-xl md:text-3xl leading-snug drop-shadow-md">
                          We craft environments that blend modern elegance with functional clarity — spaces designed to be lived in, felt, and remembered.
                      </p>
                  </div>
              </div>
          </div>

          {/* RESIDENTIALS BANNERS */}
          <div className="px-6 md:px-12 mb-16 md:mb-24">
              <div className="text-center mb-8 md:mb-10">
                  <h3 className={`text-xs font-['Oswald'] font-bold tracking-[0.25em] uppercase ${isDark ? 'text-white' : 'text-[#8C7B6C]'}`}>Residentials</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Banner 1 */}
                  <div 
                      onClick={() => setActiveProject('TREASURE')}
                      className={`group relative h-[180px] md:h-[260px] overflow-hidden border-4 cursor-pointer transition-all duration-300 ${
                          activeProject === 'TREASURE' 
                          ? (isDark ? 'border-white scale-[1.02]' : 'border-[#4A342B] scale-[1.02]') 
                          : 'border-white dark:border-[#2A0A0A] opacity-70 hover:opacity-100'
                      } shadow-xl`}
                  >
                      <img src="/assets/images/twentyeight.png" alt="Treasure" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-75" />
                      <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white font-['Oswald'] font-bold tracking-[0.15em] uppercase text-xl md:text-2xl drop-shadow-lg">Treasure</span>
                      </div>
                  </div>

                  {/* Banner 2 */}
                  <div 
                      onClick={() => setActiveProject('LIMITED')}
                      className={`group relative h-[180px] md:h-[260px] overflow-hidden border-4 cursor-pointer transition-all duration-300 ${
                          activeProject === 'LIMITED' 
                          ? (isDark ? 'border-white scale-[1.02]' : 'border-[#4A342B] scale-[1.02]') 
                          : 'border-white dark:border-[#2A0A0A] opacity-70 hover:opacity-100'
                      } shadow-xl`}
                  >
                      <img src="/assets/images/twentyseven.png" alt="Treasure Limited" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-75" />
                      <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white font-['Oswald'] font-bold tracking-[0.15em] uppercase text-xl md:text-2xl drop-shadow-lg">Treasure - Limited Edition</span>
                      </div>
                  </div>
              </div>
          </div>

          {/* 4. PROJECT GRID */}
          <div className="px-6 md:px-12 pb-16 md:pb-24">
              <motion.div 
                  key={activeProject}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  // CHANGED: Reduced gaps to gap-3 (approx 12px) for a tighter fit
                  className="grid grid-cols-1 md:grid-cols-3 gap-3"
              >
                  {currentImages.map((item) => (
                      <div key={item.id} className="group cursor-pointer" onClick={() => setExpandedImageSrc(item.src)}>
                          <div className={`border p-1 transition-colors duration-500 ${isDark ? 'border-white/30' : 'border-[#8C7B6C]'}`}>
                              <div className="overflow-hidden h-[250px] md:h-[300px]">
                                  <img 
                                      src={item.src} 
                                      alt={item.title} 
                                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                  />
                              </div>
                          </div>
                      </div>
                  ))}
              </motion.div>
          </div>

          <Footer />
        </main>
      </div>
    </>
  );
};

export default Projects;