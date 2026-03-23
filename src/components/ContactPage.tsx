import React, { useState } from 'react';
import { Mail, MapPin, Menu, Sun, Moon, ArrowRight, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { useUI } from '../context/UIContext';
import { useCMS } from '../hooks/useCMS';
import Footer from './Footer';
import toast from "react-hot-toast";

const LOCAL_ASSETS = {
  logo: "/assets/images/logo.png",
  building: "/assets/images/twentyseven.png" 
};

const ContactPage = () => {
  const { isDark, toggleTheme } = useTheme();
  const { openMenu } = useUI();
  const { data: cmsData } = useCMS('contact');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! We've received your inquiry.");
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className={`min-h-screen w-full font-sans transition-colors duration-700 ${isDark ? 'bg-[#2A0A0A] text-white' : 'bg-[#F9F9F7] text-stone-800'}`}>
      <main className="relative pl-0 md:pl-24 overflow-hidden">
        
        {/* Mobile Header */}
        <header className="md:hidden fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center bg-transparent">
          <button onClick={openMenu}><Menu size={32} className={isDark ? 'text-white' : 'text-stone-800'} /></button>
          <img src={LOCAL_ASSETS.logo} alt="Logo" className={`h-8 w-auto ${isDark ? 'brightness-100' : 'brightness-0'}`} />
          <button onClick={toggleTheme}>{isDark ? <Sun size={24} /> : <Moon size={24} />}</button>
        </header>

        {/* Desktop Theme Toggle */}
        <div className="hidden md:block fixed top-8 right-12 z-50">
          <button onClick={toggleTheme} className={`p-3 rounded-full border transition-all ${isDark ? 'bg-black/40 border-white text-white' : 'bg-white/20 border-stone-800 text-stone-800'}`}>{isDark ? <Sun size={20} /> : <Moon size={20} />}</button>
        </div>

        <section className="relative py-24 md:py-32 px-6 md:px-24">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            
            <div className="space-y-12">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-7xl font-['Playfair_Display'] font-bold leading-tight uppercase tracking-tight">Connect with us</h1>
                <p className="text-lg md:text-xl font-['Playfair_Display'] opacity-60 leading-relaxed max-w-xl">Explore our spaces or start a conversation about your future residence. Our team is ready to guide you.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] opacity-40">Office Address</h3>
                  <div className="flex gap-4">
                    <MapPin size={20} className="mt-1 opacity-60" />
                    <p className="text-sm font-medium leading-loose opacity-80">{cmsData?.address || "Sector-5, Vidhyadhar Nagar, Jaipur"}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] opacity-40">Enquiries</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4"><Mail size={18} className="opacity-60" /> <span className="text-sm font-medium opacity-80">admin@katewacompanies.in</span></div>
                    <div className="flex items-center gap-4"><Phone size={18} className="opacity-60" /> <span className="text-sm font-medium opacity-80">+91 93531 81818</span></div>
                  </div>
                </div>
              </div>

              <div className="relative rounded-3xl overflow-hidden shadow-2xl group border border-stone-200 dark:border-white/10 h-[300px] md:h-[400px]">
                <img src={LOCAL_ASSETS.building} alt="Office" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
            </div>

            <div className={`p-8 md:p-12 rounded-3xl border ${isDark ? 'bg-zinc-900 border-white/5' : 'bg-white border-stone-100'} shadow-2xl`}>
               <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2"><label className="text-xs font-bold uppercase tracking-widest opacity-60">Full Name</label><input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" className="w-full bg-transparent border-b border-stone-300 dark:border-stone-700 py-3 outline-none focus:border-stone-900 dark:focus:border-white transition-colors" /></div>
                    <div className="space-y-2"><label className="text-xs font-bold uppercase tracking-widest opacity-60">Email Address</label><input required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} type="email" className="w-full bg-transparent border-b border-stone-300 dark:border-stone-700 py-3 outline-none focus:border-stone-900 dark:focus:border-white transition-colors" /></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2"><label className="text-xs font-bold uppercase tracking-widest opacity-60">Phone</label><input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} type="tel" className="w-full bg-transparent border-b border-stone-300 dark:border-stone-700 py-3 outline-none focus:border-stone-900 dark:focus:border-white transition-colors" /></div>
                    <div className="space-y-2"><label className="text-xs font-bold uppercase tracking-widest opacity-60">Subject</label><input value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} type="text" className="w-full bg-transparent border-b border-stone-300 dark:border-stone-700 py-3 outline-none focus:border-stone-900 dark:focus:border-white transition-colors" /></div>
                  </div>
                  <div className="space-y-2"><label className="text-xs font-bold uppercase tracking-widest opacity-60">Message</label><textarea required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows={4} className="w-full bg-transparent border-b border-stone-300 dark:border-stone-700 py-3 outline-none focus:border-stone-900 dark:focus:border-white transition-colors" /></div>
                  <button type="submit" className={`w-full py-4 font-bold uppercase tracking-widest text-xs rounded-xl flex items-center justify-center gap-2 group transition-all ${isDark ? 'bg-white text-[#2A0A0A] hover:bg-stone-200' : 'bg-stone-900 text-white hover:bg-stone-800'}`}>Send Inquiry <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></button>
               </form>
            </div>

          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default ContactPage;