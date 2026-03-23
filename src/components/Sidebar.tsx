import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext';

interface FixedSidebarProps {
  onOpenMenu: () => void;
}

const FixedSidebar = React.memo(({ onOpenMenu }: FixedSidebarProps) => {
  const { isDark } = useTheme();

  return (
    <aside className={`hidden md:flex fixed top-0 left-0 h-screen w-24 z-[100] flex-col justify-between items-center border-r shadow-sm transition-colors duration-500 ${
      isDark ? 'bg-[#2A0A0A] border-[#4A2521]' : 'bg-white border-gray-100'
    }`}>
      
      <div className="flex flex-col items-center w-full pt-8 gap-10">
        <button onClick={onOpenMenu} aria-label="Open Menu" className="group p-2">
            <div className="space-y-1.5">
                <span className={`block w-8 h-0.5 group-hover:w-6 transition-all duration-300 ${isDark ? 'bg-white' : 'bg-gray-800'}`}></span>
                <span className={`block w-5 h-0.5 group-hover:w-8 transition-all duration-300 ${isDark ? 'bg-white' : 'bg-gray-800'}`}></span>
            </div>
        </button>

        <Link to="/" className="opacity-90 hover:opacity-100 transition-opacity">
            <img 
              src="/assets/images/logo.png" 
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

export default FixedSidebar;
