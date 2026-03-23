import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, MapPin, Menu, X, Sun, Moon, 
  Facebook, Twitter, Linkedin, Youtube, ArrowRight, Phone 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeContext';
import toast from "react-hot-toast";

// --- CONFIGURATION: LOCAL ASSETS ---
const LOCAL_ASSETS = {
  logo: "/assets/images/logo.png",
  footerPattern: "/assets/images/dpattern.jpg",
  building: "/assets/images/twentyseven.png" 
};

// --- SHARED COMPONENTS ---

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
            
            <div className="flex-1 flex flex-col justify-center px-8 md:px-12 space-y-6">
                {MENU_ITEMS.map(item => (
                    <Link 
                      key={item.label} 
                      to={item.href} 
                      onClick={onClose} 
                      className={`group flex items-center justify-between text-xl md:text-3xl font-['Playfair_Display'] transition-colors ${isDark ? 'text-[#EBEBE6]/60 hover:text-white' : 'text-stone-400 hover:text-stone-800'}`}
                    >
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
              <span className="text-xs font-bold font-['Oswald'] tracking-[0.25em] uppercase [writing-mode:vertical-lr] rotate-180">
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
                <span className="break-all">admin@katewacompanies.in</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-white/40 mt-1" />
                <span>Vidhyadhar Nagar, Jaipur</span>
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

const ContactPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    message: ''
  });
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const [loading, setLoading] = useState(false);
 
   const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ VALIDATION
    if (!formData.email || !formData.phone || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    if (formData.message.length < 10) {
      toast.error("Message should be at least 10 characters.");
      return;
    }

    // 🚀 SUBMIT
    if (loading) return;

    setLoading(true);
    const toastId = toast.loading("Sending your enquiry...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // ✅ SAFE JSON PARSE (fixes your error)
      let data;

      try {
        const contentType = res.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          data = await res.json();
        } else {
          const text = await res.text();
          console.error("❌ Non-JSON response:", text);
          data = { success: false, message: "Server returned invalid response" };
        }

      } catch (err) {
        console.error("❌ Parse error:", err);
        data = { success: false, message: "Response parsing failed" };
      }

      toast.dismiss(toastId);

      // ✅ Check HTTP status also
      if (res.ok && data.success) {
        toast.success(
          "Your enquiry has been sent successfully. We’ll get back to you shortly."
        );

        setFormData({
          email: "",
          phone: "",
          message: "",
        });
      } else {
        toast.error(
          data?.message || "We couldn’t send your enquiry. Please try again."
        );
      }

    } catch (err) {
      toast.dismiss(toastId);
      toast.error("Something went wrong. Please check your connection.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      {/* 1. IMPORT FONTS */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
        `}
      </style>

      <div className={`min-h-screen w-full font-sans overflow-x-hidden relative transition-colors duration-700 ease-in-out ${
        isDark ? 'bg-[#2A0A0A] text-white' : 'bg-[#EEF2F3] text-[#4A3B32]'
      }`}>
        
        <NavigationSidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        <FixedSidebar isDark={isDark} onOpenMenu={() => setIsMenuOpen(true)} />

        <main className="relative w-full pl-0 md:pl-24">
          
          {/* --- MOBILE HEADER --- */}
          <div className="md:hidden flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-white/10 relative z-30">
              <div className="flex items-center gap-4">
                  <button onClick={() => setIsMenuOpen(true)} className={`p-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      <Menu size={24} />
                  </button>
                  <img src={LOCAL_ASSETS.logo} alt="Logo" className="h-8 w-auto object-contain" />
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

          {/* --- DESKTOP HEADER --- */}
          <header className="hidden md:flex absolute top-0 left-0 w-full z-20 pl-36 pr-12 py-6 justify-end items-center pointer-events-none">
            <button 
              onClick={toggleTheme} 
              aria-label="Toggle Dark Mode" 
              className={`pointer-events-auto p-3 rounded-full border transition-all duration-300 backdrop-blur-md shadow-sm ${
                isDark 
                  ? 'bg-black/40 border-white text-white hover:bg-white/20' 
                  : 'bg-white border-gray-300 text-[#4A3B32] hover:bg-white/30'
              }`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </header>
        
          {/* --- Header & Map Section --- */}
          <section className="relative w-full flex flex-col">
              
              <div className={`px-8 pt-6 pb-8 md:px-16 flex justify-between items-end transition-colors duration-500 ${
                  isDark ? 'bg-[#2A0A0A]' : 'bg-[#EEF2F3]'
              }`}>
                  <div>
                      <h2 className={`text-sm font-['Oswald'] font-medium uppercase tracking-wide mb-1 opacity-80 ${
                          isDark ? 'text-white/80' : 'text-[#4A3B32]/80'
                      }`}>Contact form</h2>
                      <h1 className={`text-3xl md:text-5xl font-['Oswald'] font-bold tracking-tight ${
                          isDark ? 'text-white' : 'text-[#4A3B32]'
                      }`}>
                          GET IN TOUCH
                      </h1>
                  </div>
              </div>

              {/* Map Container - UPDATED WITH SPECIFIC LOCATION */}
              <div className="w-full h-[300px] md:h-[500px] relative bg-gray-200 overflow-hidden group border-y border-white/10">
              <iframe 
                  src="https://maps.google.com/maps?q=,%20Vidhyadhar%20Nagar,%20Jaipur&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: isDark ? 'grayscale(100%) invert(90%) contrast(0.8)' : 'grayscale(100%) contrast(1.1) opacity(0.85)' }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                  className="transition-all duration-700 group-hover:grayscale-0 group-hover:invert-0 group-hover:opacity-100"
              ></iframe>
              
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <div className="bg-[#4A3B32] text-white p-3 rounded-full shadow-xl animate-bounce">
                      <MapPin size={32} fill="currentColor" />
                  </div>
              </div>
              </div>
          </section>

          {/* --- Split Content Section --- */}
          <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
              
              <div className="w-full lg:w-1/2">
                  <div className={`border p-2 inline-block w-full transition-colors duration-500 ${
                      isDark ? 'border-white' : 'border-[#4A3B32]'
                  }`}>
                  <img 
                      src={LOCAL_ASSETS.building}
                      alt="Modern Apartment Building" 
                      className="w-full h-[300px] md:h-[600px] object-cover shadow-lg filter sepia-[0.2]"
                  />
                  </div>
              </div>

              <div className="w-full lg:w-1/2 relative pt-8 lg:pt-0">
                  
                  <div className="absolute -top-10 right-0 select-none pointer-events-none overflow-hidden z-0">
                  <span className={`text-[100px] md:text-[180px] font-['Playfair_Display'] leading-none transition-opacity duration-500 ${
                      isDark ? 'text-white opacity-10' : 'text-[#E3E8EA] opacity-60'
                  }`}>
                      hello
                  </span>
                  </div>

                  <div className="relative z-10">
                  <h2 className={`text-2xl md:text-4xl font-['Oswald'] font-bold mb-6 tracking-tight transition-colors duration-500 ${
                      isDark ? 'text-white' : 'text-[#4A3B32]'
                  }`}>
                      GET IN TOUCH
                  </h2>
                  
                  <div className={`w-12 h-0.5 mb-6 transition-colors duration-500 ${
                      isDark ? 'bg-white' : 'bg-[#4A3B32]'
                  }`}></div>

                  <p className={`mb-12 max-w-md leading-relaxed font-['Playfair_Display'] transition-colors duration-500 ${
                      isDark ? 'text-[#EBEBE6]/70' : 'text-gray-600'
                  }`}>
                      Every meaningful conversation begins with intention. If you're exploring a home, an opportunity or simply wish to understand our way of building, we'd be glad to hear from you. Share a few details and our team will contact with you thoughtfully to answer questions offer clarity and guide you at your pace.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-10 max-w-md">
                      
                      <div className="group">
                      <label htmlFor="email" className={`block text-sm font-['Oswald'] font-semibold mb-1 transition-colors duration-500 ${
                          isDark ? 'text-white' : 'text-[#4A3B32]'
                      }`}>
                          Email*
                      </label>
                      <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full bg-transparent border-b py-2 outline-none font-['Playfair_Display'] transition-colors duration-300 ${
                              isDark 
                                  ? 'border-[#4A2521] focus:border-white text-[#EBEBE6]' 
                                  : 'border-gray-300 focus:border-[#4A3B32] text-[#4A3B32]'
                          }`}
                      />
                      </div>

                      <div className="group">
                      <label htmlFor="phone" className={`block text-sm font-['Oswald'] font-semibold mb-1 transition-colors duration-500 ${
                          isDark ? 'text-white' : 'text-[#4A3B32]'
                      }`}>
                          Phone*
                      </label>
                      <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full bg-transparent border-b py-2 outline-none font-['Playfair_Display'] transition-colors duration-300 ${
                              isDark 
                                  ? 'border-[#4A2521] focus:border-white text-[#EBEBE6]' 
                                  : 'border-gray-300 focus:border-[#4A3B32] text-[#4A3B32]'
                          }`}
                      />
                      </div>

                      <div className="group">
                      <label htmlFor="message" className={`block text-sm font-['Oswald'] font-semibold mb-1 transition-colors duration-500 ${
                          isDark ? 'text-white' : 'text-[#4A3B32]'
                      }`}>
                          Message
                      </label>
                      <textarea
                          id="message"
                          name="message"
                          rows={1}
                          value={formData.message}
                          onChange={handleChange}
                          className={`w-full bg-transparent border-b py-2 outline-none resize-none font-['Playfair_Display'] transition-colors duration-300 min-h-[40px] ${
                              isDark 
                                  ? 'border-[#4A2521] focus:border-white text-[#EBEBE6]' 
                                  : 'border-gray-300 focus:border-[#4A3B32] text-[#4A3B32]'
                          }`}
                      />
                      </div>

                      <button 
                      type="submit" 
                      disabled={loading}
                      className={`
                        mt-8 flex items-center justify-center px-8 py-4 border text-sm font-['Oswald'] font-medium 
                        transition-all duration-300 shadow-sm
                        ${loading 
                          ? "bg-gray-400 cursor-not-allowed" 
                          : ""}
                        ${
                          isDark 
                            ? "bg-[#4A2521] border-white/30 hover:bg-white hover:text-[#2A0A0A] text-[#EBEBE6]" 
                            : "bg-[#F5F7F8] border-gray-200 hover:border-[#4A3B32] hover:bg-white text-[#4A3B32]"
                        }
                      `}
                    >
                      <Mail className={`w-4 h-4 mr-3 ${
                          isDark ? 'text-white' : 'text-gray-400'
                      }`} />
                      {loading ? "Sending..." : "Send Us A Message"} 
                      </button>

                  </form>
                  </div>
              </div>

              </div>
          </section>

          <Footer />
          
        </main>
      </div>
    </>
  );
};

export default ContactPage;