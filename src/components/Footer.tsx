import React from 'react';
import { Mail, Facebook, Linkedin, Youtube, Instagram } from 'lucide-react';
import { useCMS } from '../hooks/useCMS';
import { useTheme } from './ThemeContext';

const Footer = () => {
  const { data: settings } = useCMS('settings');
  const { isDark } = useTheme();

  return (
    <footer className={`w-full text-[#EBEBE6] ${isDark ? 'bg-[#2A0A0A]' : 'bg-[#4A2521]'}`}>
      {/* Upper Footer: Newsletter & Socials */}
      <div className="relative max-w-7xl mx-auto px-6 py-20 overflow-hidden">
        
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" 
             style={{backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px'}}>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between gap-16">
          
          {/* Newsletter */}
          <div className="flex-1 max-w-lg">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-2">Subscribe to our Newsletter</h3>
            <p className="text-xs text-[#EBEBE6]/60 mb-8">Stay Updated</p>
            
            <div className="space-y-6">
              <input 
                type="email" 
                placeholder="Your e-mail..." 
                className="w-full bg-transparent border-b border-[#EBEBE6]/20 py-3 text-sm focus:outline-none focus:border-[#EBEBE6] transition-colors"
              />
              <button className="flex items-center gap-3 px-8 py-3 border border-[#EBEBE6]/30 hover:bg-[#EBEBE6] hover:text-[#4A2521] transition-colors text-xs uppercase tracking-widest">
                <Mail size={14} />
                Subscribe
              </button>
            </div>
          </div>

          {/* Divider Line */}
          <div className="hidden md:block w-px bg-[#EBEBE6]/20" />

          {/* Social Connect */}
          <div className="w-full md:w-auto">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-8">Connect With Us</h3>
            <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                <SocialLink href={settings?.facebook || "https://www.facebook.com/profile.php?id=61585526793030"} icon={<Facebook size={18} />} label="Facebook" />
                <SocialLink href={settings?.instagram || "https://www.instagram.com/treasurejaipur"} icon={<Instagram size={18} />} label="Instagram" />
                <SocialLink href={settings?.linkedin || "https://www.linkedin.com/company/katewa-groups/"} icon={<Linkedin size={18} />} label="LinkedIn" />
                <SocialLink href={settings?.youtube || "https://www.youtube.com/@KatewaCompanies-km1dh"} icon={<Youtube size={18} />} label="YouTube" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#2D1815] py-6 border-t border-[#EBEBE6]/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs text-[#EBEBE6]/50 uppercase tracking-wider">
          
          <div className="flex items-center gap-2">
             <div className="w-6 h-6 bg-[#EBEBE6]/20 rounded-sm" />
             <span>Treasure</span>
          </div>

          <div className="flex gap-8">
            <span>{settings?.phone || '+91 93531 81818'}</span>
            <span>{settings?.email || 'admin@katewacompanies.in'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group hover:text-white transition-colors text-[#EBEBE6]/60">
    <div className="p-2 border border-transparent group-hover:border-[#EBEBE6]/30 rounded-full transition-all">
        {icon}
    </div>
    <span className="text-[10px] uppercase tracking-widest">{label}</span>
  </a>
);

export default Footer;