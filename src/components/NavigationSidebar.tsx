import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavigationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_ITEMS = [
  { label: 'About Us', href: '/about' },
  { label: 'Our Services', href: '/services' },
  { label: 'Our Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const MotionLink = motion(Link);

const NavigationSidebar = ({ isOpen, onClose }: NavigationSidebarProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Click to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
          />

          {/* Sidebar Panel - Takes 1/4 (25%) of the page on desktop */}
          <motion.div
            initial={{ x: '-100%' }} // Start off-screen left
            animate={{ x: 0 }}
            exit={{ x: '-100%' }} // Exit off-screen left
            transition={{ type: 'tween', duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 h-full w-full md:w-1/4 bg-[#F9F9F7] dark:bg-[#2A0A0A] z-[120] shadow-2xl flex flex-col border-r border-stone-200 dark:border-stone-800"
          >
            {/* Header Area inside Sidebar */}
            <div className="flex justify-between items-center p-6 md:p-8 border-b border-stone-200 dark:border-stone-800">
              {/* Heading when Opened */}
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-playfair font-bold tracking-widest text-stone-800 dark:text-[#D4AF37]">
                  TREASURE
                </span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-stone-500 dark:text-stone-400">
                  Menu
                </span>
              </div>

              {/* Close Button */}
              <button 
                onClick={onClose}
                className="p-2 rounded-full border border-stone-300 dark:border-stone-700 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors group"
              >
                <X size={20} className="text-stone-800 dark:text-[#D4AF37] group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Menu Content - Reduced padding and text size for 1/4 width */}
            <div className="flex-1 flex flex-col justify-center px-8 space-y-6 md:space-y-8">
              {MENU_ITEMS.map((item, idx) => (
                <MotionLink
                  key={item.label}
                  to={item.href}
                  initial={{ opacity: 0, x: -50 }} // Slide text in from left slightly
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1 }}
                  onClick={onClose}
                  className="group flex items-center justify-between text-2xl md:text-3xl lg:text-4xl font-playfair text-stone-400 hover:text-stone-800 dark:text-stone-600 dark:hover:text-[#F9F9F7] transition-colors"
                >
                  {item.label}
                  <ArrowRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-[#D4AF37]" size={24} />
                </MotionLink>
              ))}
            </div>

            {/* Footer Area - Adjusted for narrower layout */}
            <div className="p-6 md:p-8 border-t border-stone-200 dark:border-stone-800 text-stone-500 text-[10px] md:text-xs uppercase tracking-widest flex flex-col gap-4">
              <div className="flex justify-between w-full">
                 <a href="#" className="hover:text-[#D4AF37] transition-colors">Instagram</a>
                 <a href="#" className="hover:text-[#D4AF37] transition-colors">Facebook</a>
                 <a href="#" className="hover:text-[#D4AF37] transition-colors">Email</a>
              </div>
              <span className="opacity-50">© 2025 Treasure Residences</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NavigationSidebar;