import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  X, Phone, ArrowRight,
  Menu, Sun, Moon, Mail, MapPin, Facebook, Twitter, Linkedin, Youtube
} from 'lucide-react';
import toast from "react-hot-toast";

// --- PLACEHOLDERS FOR EXTERNAL IMPORTS ---
import HeroSection from './HeroSection';
import IntroSection from './IntroSection';
import { useCMS } from '../hooks/useCMS';
import { useUI } from '../context/UIContext';
import { useTheme } from './ThemeContext';

// --- MAIN COMPONENT ---

const LandingPage = () => {
  const { isDark, toggleTheme } = useTheme();
  const { openMenu } = useUI();
  const { data: cmsData } = useCMS('home');

  return (
    <main className={`min-h-screen transition-colors duration-700 ease-in-out font-sans overflow-x-hidden
      bg-[#F9F9F7] text-stone-800 
      dark:bg-[#2A0A0A] dark:text-white`}>

      {/* MOBILE HEADER: Visible only on mobile */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50 flex justify-between items-center p-6 mix-blend-difference text-white">
        <button onClick={openMenu} aria-label="Open Menu">
          <Menu size={32} />
        </button>
        <button onClick={toggleTheme} className="p-2 rounded-full border border-white/20 hover:bg-white/10">
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* DESKTOP TOGGLE: Floating top-right */}
      <div className="hidden md:block fixed top-8 right-12 z-50">
        <button
          onClick={toggleTheme}
          className={`p-3 rounded-full border transition-all duration-300 backdrop-blur-md shadow-sm ${isDark
              ? 'bg-black/40 border-white text-white hover:bg-white/20'
              : 'bg-white/20 border-white text-white hover:bg-white/30'
            }`}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* MAIN CONTENT WRAPPER: Padded left on desktop only */}
      <div className="pl-0 md:pl-24 w-full overflow-hidden flex flex-col min-h-screen">

        {/* 1. HERO (Imported) */}
        <HeroSection cmsData={cmsData} />

        {/* 2. INTRO (Imported) */}
        <IntroSection cmsData={cmsData} />

        {/* 3. SUB-SECTIONS */}
        <VideoSection />
        <FeaturesSection isDark={isDark} cmsData={cmsData} />
        <StatsSection isDark={isDark} cmsData={cmsData} />
        <GallerySection />
        <TestimonialSection />
        <BlogSection />
        <ContactHero />
        <LocationSection />
        <Footer />
      </div>

    </main>
  );
};

// --- SUB-COMPONENTS ---

const VideoSection = () => (
  <section className="w-full h-[40vh] md:h-screen relative group overflow-hidden">
    <img
      src="/assets/images/five.png"
      alt="Property Showcase"
      className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
    />
  </section>
);

const UNIT_FEATURES = [''];

const FeaturesSection = ({ isDark, cmsData }: { isDark: boolean, cmsData?: any }) => (
  <section className="relative py-16 md:py-32 px-6 md:px-24 max-w-[1600px] mx-auto overflow-hidden">

    <div className="
        absolute 
        -top-4 md:-top-20 
        right-0 
        text-[15vw] md:text-[12rem] 
        opacity-5 
        pointer-events-none 
        font-['Playfair_Display'] font-bold 
        whitespace-nowrap 
        dark:text-white dark:opacity-[0.05]
        z-0
     ">
      Building
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">

      <div className="lg:col-span-7 relative h-[350px] sm:h-[450px] md:h-[600px] w-full">
        <motion.img
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          src="/assets/images/seven.png"
          className="absolute left-0 top-0 w-[70%] md:w-[55%] h-[80%] object-cover z-10 shadow-lg"
        />

        <motion.img
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          src="/assets/images/six.png"
          className="absolute right-0 bottom-0 w-[70%] md:w-[55%] h-[75%] object-cover z-0"
        />
      </div>

      {/* Added lg:pt-24 to shift text content down on desktop */}
      <div className="lg:col-span-5 lg:pl-12 mt-4 lg:mt-0 lg:pt-24 text-left">
        <h2 className="font-['Oswald'] text-3xl sm:text-4xl md:text-5xl mb-6 uppercase tracking-wide leading-tight dark:text-white">
          {cmsData?.hero_title || 'Refined Residences Designed for your Comfort'}
        </h2>

        <p className="font-['Playfair_Display'] text-stone-600 dark:text-white/80 mb-6 font-light leading-relaxed text-base sm:text-lg">
          {cmsData?.hero_subtitle || 'Treasure offers some of the most thoughtfully crafted 2BHK and 3BHK flats in Vidhyadhar Nagar, Jaipur. Every apartment is laid out to maximize space, flood rooms with natural light, and ensure cross ventilation throughout the day.'}
        </p>

        <p className="font-['Playfair_Display'] text-stone-600 dark:text-white/80 mb-8 font-light leading-relaxed text-base sm:text-lg">
          From luxury-grade finishes to precision detailing in every corner the interiors at Treasure reflect a standard of living that Jaipur's homebuyers have long deserved. Whether you are buying your first home or upgrading to something truly premium, Treasure delivers comfort without compromise.
        </p>

        <div className="grid grid-cols-1 gap-4 mb-8">
          {UNIT_FEATURES.map(item => (
            <div key={item} className="font-['Oswald'] text-sm sm:text-base uppercase tracking-wider text-stone-500 dark:text-white/60">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const StatsSection = ({ isDark, cmsData }: { isDark: boolean, cmsData?: any }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  const STATS_DATA = [
    { val: cmsData?.stat_1 || '78%', label: 'Climate Responsive Architecture' },
    { val: cmsData?.stat_2 || '92%', label: 'Premium Material Selection' },
    { val: cmsData?.stat_3 || '88%', label: 'Optimal Layout Efficiency' },
    { val: cmsData?.stat_4 || '45', label: 'AQI' },
  ];

  return (
    <section className="py-12 md:py-20 relative overflow-hidden">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 md:gap-12 text-center">
        {STATS_DATA.map((stat, idx) => {
          // Extract number for calculation
          const numericVal = parseInt(stat.val.replace(/\D/g, '')) || 0;
          const isAQI = stat.label === 'AQI';

          return (
            <motion.div
              key={idx}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center"
            >
              <div
                className={`
                    w-32 h-32 md:w-48 md:h-48
                    rounded-full 
                    border ${isDark ? 'border-stone-600' : 'border-stone-300'}
                    flex flex-col items-center justify-center 
                    mb-6 
                    relative 
                    overflow-hidden
                  `}
              >
                {/* Value Text - Using Oswald for distinct numbering */}
                <span
                  className={`font-['Oswald'] text-3xl md:text-5xl font-bold z-10 tracking-wider ${isDark ? 'text-white' : 'text-stone-800'
                    }`}
                >
                  {stat.val}
                </span>

                {/* --- AQI BAR --- */}
                {isAQI && (
                  <div className="mt-2 flex flex-col items-center z-10 w-full px-4">
                    {/* The Gradient Bar */}
                    <div className={`w-16 md:w-20 h-1 md:h-1.5 rounded-full relative overflow-hidden ${isDark ? 'bg-stone-700' : 'bg-stone-200'}`}>
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-yellow-400 to-orange-500 opacity-90" />

                      {/* Marker */}
                      <motion.div
                        className={`absolute top-0 bottom-0 w-0.5 shadow-sm z-20 ${isDark ? 'bg-white' : 'bg-stone-900'}`}
                        initial={{ left: 0 }}
                        whileInView={{ left: `${Math.min(numericVal, 100)}%` }}
                        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                      />
                    </div>

                    {/* Micro Labels */}
                    <div className={`flex justify-between w-16 md:w-20 text-[8px] md:text-[9px] uppercase tracking-widest mt-1 font-medium font-['Oswald'] ${isDark ? 'text-white/60' : 'text-stone-500'}`}>
                      <span>Good</span>
                      <span>Poor</span>
                    </div>
                  </div>
                )}

                {/* SVG Circle Logic */}
                <svg
                  className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
                  viewBox="0 0 100 100"
                  aria-hidden="true"
                >
                  {/* Background Track */}
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className={`${isDark ? 'text-white/10' : 'text-stone-800/10'}`}
                  />

                  {/* Progress Stroke (Only if NOT AQI) */}
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
                      whileInView={{
                        strokeDashoffset:
                          circumference * ((100 - numericVal) / 100),
                      }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.5,
                        delay: 0.2 + idx * 0.1,
                        ease: 'easeOut',
                      }}
                      className={`${isDark ? 'text-white' : 'text-stone-800'}`}
                    />
                  )}
                </svg>
              </div>

              {/* Label */}
              <h3
                className={`text-[10px] md:text-xs uppercase tracking-widest max-w-[160px] leading-relaxed font-['Playfair_Display'] ${isDark ? 'text-white/80' : 'text-stone-600'
                  }`}
              >
                {stat.label}
              </h3>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

const GALLERY_ITEMS = [
  {
    id: 1,
    src: "/assets/images/sixty.png",
    title: "Master Bedroom",
    colSpan: "md:col-span-7"
  },
  {
    id: 2,
    src: "/assets/images/eight.png",
    title: "Guest Bedroom",
    colSpan: "md:col-span-5"
  },
  {
    id: 3,
    src: "/assets/images/ten.png",
    title: "Dining",
    colSpan: "md:col-span-5"
  },
  {
    id: 4,
    src: "/assets/images/eleven.png",
    title: "Living",
    colSpan: "md:col-span-7"
  }
];

const GalleryCard = ({ item, onClick }: { item: any, onClick: (item: any) => void }) => (
  <div
    onClick={() => onClick(item)}
    className={`relative group overflow-hidden bg-stone-200 cursor-pointer w-full ${item.colSpan} h-[300px] md:h-[400px]`}
  >
    <img
      src={item.src}
      alt={item.title}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

    <div className="absolute bottom-0 left-0 w-full bg-black/90 p-4 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
      <p className="text-[10px] text-white/70 uppercase tracking-widest mb-1 font-playfair italic">
        {item.category}
      </p>
      <h4 className="text-white font-oswald text-lg md:text-xl uppercase tracking-wide">
        {item.title}
      </h4>
    </div>
  </div>
);

const GallerySection = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  return (
    <section className="relative py-24 px-4 sm:px-6 bg-white dark:bg-[#2A0A0A] transition-colors duration-700">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap');
        .font-oswald { font-family: 'Oswald', sans-serif; }
        .font-playfair { font-family: 'Playfair Display', serif; }
      `}</style>

      {/* Decorative Background Text */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-[20vw] md:text-[15vw] leading-none opacity-[0.03] pointer-events-none font-playfair font-bold whitespace-nowrap dark:text-white select-none">
        Gallery
      </div>

      <div className="text-center mb-16 relative z-10 max-w-3xl mx-auto px-4">
        <h2 className="font-oswald text-3xl md:text-4xl lg:text-5xl uppercase tracking-widest mb-4 text-black dark:text-white">
          Visualize Your Future Home
        </h2>
        <div className="w-24 h-[1px] bg-stone-400 mx-auto mb-6"></div>
        <p className="font-playfair text-stone-600 dark:text-stone-300 text-base md:text-lg italic">
          A curated collection of renders showcasing the architectural brilliance of Treasure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 max-w-[1600px] mx-auto">
        {GALLERY_ITEMS.map((item) => (
          <GalleryCard
            key={item.id}
            item={item}
            onClick={setSelectedItem}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm cursor-zoom-out"
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50"
              onClick={() => setSelectedItem(null)}
            >
              <X size={40} strokeWidth={1} />
            </button>

            <div className="relative max-w-7xl w-full flex flex-col items-center justify-center" onClick={e => e.stopPropagation()}>
              <motion.img
                layoutId={`image-${selectedItem.id}`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                src={selectedItem.src}
                alt={selectedItem.title}
                className="max-h-[85vh] w-auto object-contain shadow-2xl"
              />

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-center"
              >
                <h3 className="text-white font-oswald text-2xl md:text-3xl uppercase tracking-widest mb-2">
                  {selectedItem.title}
                </h3>
                <p className="text-white/60 font-playfair italic">
                  {selectedItem.category}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const BlogSection = () => {
  const posts = [
    { id: 1, category: "Design", date: "June 10, 2024", title: "WARM LUXURY", image: "/assets/images/twelve.png", excerpt: "Exploring the nuances of warm tones in modern interiors." },
    { id: 2, category: "Lifestyle", date: "June 9, 2024", title: "A GUIDE TO ELEGANCE", image: "/assets/images/thirteen.png", excerpt: "How to curate a lifestyle that reflects architectural beauty." },
    { id: 3, category: "Architecture", date: "June 8, 2024", title: "A CALM AFTERNOON", image: "/assets/images/fourteen.png", excerpt: "The importance of natural light in creating calming spaces." },
  ];

  return (
    <section className="relative py-24 bg-[#ffffff] dark:bg-[#2A0A0A] overflow-hidden transition-colors duration-700">

      <div className="absolute top-[-20px] left-4 md:left-20 select-none pointer-events-none z-0">
        <span className="text-[20vw] md:text-[14rem] font-['Playfair_Display'] text-[#EBEBE6] dark:text-white/5 leading-none opacity-80">
          Blog
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-xl md:text-2xl font-['Oswald'] tracking-widest text-[#8C7B6C] dark:text-white/70 uppercase mb-2">
            Hot off the Press
          </h2>
          <div className="w-12 h-px bg-[#8C7B6C] dark:bg-white/70" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {posts.map((post) => (
            <div key={post.id} className="group cursor-pointer flex flex-col gap-6">
              <div className="overflow-hidden aspect-[3/4] w-full bg-stone-200 dark:bg-stone-800">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="space-y-3">
                <div className="text-xs font-['Oswald'] font-medium text-stone-500 dark:text-white/60 uppercase tracking-wider">
                  {post.date} / <span className="text-stone-800 dark:text-white/90">{post.category}</span>
                </div>

                <h3 className="text-2xl font-['Oswald'] text-stone-900 dark:text-white tracking-wide group-hover:text-[#8C7B6C] dark:group-hover:text-white/70 transition-colors">
                  {post.title}
                </h3>

                <p className="text-sm font-['Playfair_Display'] text-stone-600 dark:text-white/80 leading-relaxed line-clamp-3 font-light">
                  {post.excerpt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 

// 
const ContactHero = () => {
  const [formData, setFormData] = useState<Record<string, string>>({
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // console.log(import.meta.env.VITE_RESEND_API_KEY);

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

  const formFields = [
    { name: 'email', label: 'Email*', type: 'email' },
    { name: 'phone', label: 'Phone*', type: 'tel' },
    { name: 'message', label: 'Message', type: 'text' },
  ];

  return (
    <section className="relative w-full pt-16 md:pt-24 bg-[#F9F9F7] dark:bg-[#2A0A0A] transition-colors duration-700">

      <div className="max-w-7xl mx-auto relative px-6 md:px-0">

        {/* --- Hero Background Video --- */}
        <div className="w-full h-[50vh] md:h-[90vh] overflow-hidden">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            poster="/assets/images/fourteen.png" // Optional: Shows while video loads
          >
            {/* TODO: Replace with your actual video path */}
            <source src="/assets/images/contact.mov" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Optional: Dark overlay to ensure form legibility if video is too bright */}
          {/* <div className="absolute inset-0 bg-black/20 pointer-events-none" /> */}
        </div>

        {/* --- Floating Form Container --- */}
        <div className="relative md:absolute md:top-1/2 md:left-12 md:-translate-y-1/2 z-10 max-w-md w-full -mt-20 md:mt-0 mx-auto px-4 md:px-0 pb-12 md:pb-0">
          <div className="bg-[#4A2521] dark:bg-[#1a0505] text-[#EBEBE6] p-8 md:p-12 shadow-2xl relative overflow-hidden">

            {/* --- BACKGROUND IMAGE ICON (TRANSPARENT) --- */}
            {/* <div className="absolute -right-10 top-0 h-full w-40 opacity-40 pointer-events-none flex items-center justify-center select-none">
                 <img
                   src="/assets/images/fifteen.png" 
                   alt=""
                   className="h-[120%] w-auto object-contain pointer-events-none" 
                 />
              </div> */}

            {/* --- Header --- */}
            <h2 className="font-['Oswald'] text-2xl md:text-3xl mb-8 leading-snug tracking-wide relative z-10 text-white uppercase">
              Schedule a visit or<br /> request more details
            </h2>

            {/* --- Form --- */}
            <form onSubmit={handleSubmit} className="space-y-8 z-10 relative">
              {formFields.map(({ name, label, type }) => (
                <div key={name} className="relative">
                  <input
                    type={type}
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={label}
                    className="peer block w-full bg-transparent border-b border-white/30 py-2 text-white placeholder:text-transparent focus:outline-none focus:border-white transition-colors font-['Playfair_Display']"
                  />
                  <label
                    htmlFor={name}
                    className="absolute left-0 -top-4 text-[10px] uppercase tracking-widest text-white/60 font-['Oswald']
                        transition-all duration-300 
                        peer-placeholder-shown:top-2 peer-placeholder-shown:text-xs peer-placeholder-shown:text-white/60
                        peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-white"
                  >
                    {label}
                  </label>
                </div>
              ))}

              <button
                type="submit"
                disabled={loading}
                className={`group flex items-center justify-center gap-3 px-8 py-3 border border-white/50 hover:bg-[#EBEBE6] hover:text-[#4A2521] text-white transition-all duration-300 uppercase text-xs tracking-widest mt-4 font-['Oswald']
                   ${loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : ""}
                  `}
              >
                <Mail size={14} />
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const LocationSection = () => {
  return (
    <section className="relative py-24 md:py-32 bg-[#F5F5F0] dark:bg-[#2A0A0A] overflow-hidden transition-colors duration-700">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
      `}</style>

      {/* Background Image with Gradient Mask */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="absolute top-0 right-0 w-full md:w-[75%] h-full z-0 pointer-events-none overflow-hidden flex items-center justify-end"
      >
        <img
          src="/assets/images/bp.png"
          alt="Building Blueprint Sketch"
          className="w-full h-full object-contain object-right p-4 md:p-1 mix-blend-multiply dark:mix-blend-lighten opacity-60 dark:opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F5F5F0] via-[#F5F5F0]/80 to-transparent dark:from-[#2A0A0A] dark:via-[#2A0A0A]/80" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
        <div className="w-full md:w-1/2 pr-0 md:pr-12">

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-['Oswald'] text-[#4A2521] dark:text-white uppercase tracking-widest mb-8 leading-tight"
          >
            Located at <br /> Vidhyadhar Nagar, Jaipur
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-16 h-px bg-[#4A2521]/60 dark:bg-white/60 mb-8 origin-left"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-['Playfair_Display'] text-stone-600 dark:text-white/80 leading-relaxed mb-6 text-lg lg:text-xl font-light"
          >
            Perfectly situated in one of Jaipur’s most calm residential zones, nested near the Aravallis. Treasure offers easy connectivity to schools, hospitals, markets, restaurants, and transport hubs.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-['Playfair_Display'] text-stone-600 dark:text-white/80 leading-relaxed mb-6 text-base lg:text-lg font-light"
          >
            Vidhyadhar Nagar is one of Jaipur's most sought-after residential addresses and Treasure sits right at its heart. Nestled in a calm, well-planned zone near the Aravallis, our apartments enjoy the rare combination of natural serenity and urban convenience.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-['Playfair_Display'] text-stone-600 dark:text-white/80 leading-relaxed mb-6 text-base lg:text-lg font-light"
          >
            When you buy a flat in Vidhyadhar Nagar, you gain effortless access to Jaipur's best schools, hospitals, markets, and transport hubs. With Sikar Road, Jaipur Junction, and the city's metro network all within easy reach, this is a location that adds lasting value to your investment.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="font-['Playfair_Display'] text-stone-600 dark:text-white/80 leading-relaxed mb-10 text-base lg:text-lg font-light"
          >
            Rated among Jaipur's top residential localities for safety, connectivity, and livability. Vidhyadhar Nagar is not just where Treasure is located. It is why Treasure was built here.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 px-8 py-3.5 
                         border border-stone-400 dark:border-white/50 
                         text-stone-800 dark:text-white 
                         hover:bg-stone-800 hover:text-white dark:hover:bg-white dark:hover:text-black 
                         transition-all duration-300 uppercase text-xs tracking-[0.2em] 
                         bg-white/50 dark:bg-black/50 backdrop-blur-sm font-['Oswald']"
            >
              <MapPin size={16} className="group-hover:scale-110 transition-transform duration-300" />
              <span>View on map</span>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

const SocialIcon = ({ icon, href = "#", label }: { icon: React.ReactNode; href?: string; label?: string }) => (
  <a
    href={href}
    target={href === "#" ? undefined : "_blank"}
    rel={href === "#" ? undefined : "noopener noreferrer"}
    aria-label={label}
    className="w-10 h-10 rounded-full bg-[#1A0B09] flex items-center justify-center text-white/70 hover:bg-white hover:text-[#4A2521] transition-all duration-300"
  >
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
            <p className="text-sm text-[#EBEBE6]/60 leading-relaxed font-['Playfair_Display'] max-w-xs ">
              At Katewa Companies, we believe a home is more than a structure, it’s a reflection of your journey.
              Through thoughtful design, quality craftsmanship, and attention to detail, we create spaces that feel personal, timeless, and truly yours.
            </p>
          </div>

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
                <span> Vidhyadhar Nagar, Jaipur</span>
              </li>
            </ul>
          </div>

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
              <SocialIcon icon={<Facebook size={14} />} href="https://www.facebook.com/profile.php?id=61585526793030" label="Facebook" />
              <SocialIcon icon={<Linkedin size={14} />} href="https://www.linkedin.com/company/katewa-groups/" label="LinkedIn" />
              <SocialIcon icon={<Twitter size={14} />} label="Twitter" />
              <SocialIcon icon={<Youtube size={14} />} href="https://www.youtube.com/@KatewaCompanies-km1dh" label="YouTube" />
            </div>
          </div>

        </div>
      </div>

      <div className="bg-[#1A0B09] py-4 border-t border-[#EBEBE6]/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left mb-6">

          <div className="flex flex-col md:flex-row items-center gap-3">
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
const TestimonialSection = () => {
  const slides = [
    {
      type: "video",
      title: "Life at Treasure",
      video: "/assets/videos/testimonial-1.mp4",
    },
    {
      type: "video",
      title: "Experience Luxury",
      video: "/assets/videos/testimonial-2.mp4",
    },
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative py-24 md:py-32 bg-[#ffffff] dark:bg-[#2A0A0A] overflow-hidden transition-colors duration-700">

      {/* Background Typography */}
      <div className="absolute top-10 left-4 md:left-20 opacity-80 pointer-events-none z-0">
        <span className="text-[20vw] md:text-[12rem] font-['Playfair_Display'] text-[#EBEBE6] dark:text-white/5 leading-none select-none">
          Stories
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-xl md:text-2xl font-['Oswald'] tracking-widest text-[#8C7B6C] dark:text-white/70 uppercase mb-4">
            Hear From Our Clients
          </h2>
          <div className="w-16 h-[1px] bg-[#8C7B6C] dark:bg-white/70" />
        </div>

        {/* Video Slider Container */}
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 bg-[#F9F9F7]/80 dark:bg-black/20 backdrop-blur-md p-6 md:p-12 rounded-3xl border border-stone-200 dark:border-white/10 shadow-2xl">

          {/* Video Player */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-[280px] aspect-[9/16] rounded-[2rem] overflow-hidden shadow-2xl border-[6px] border-white dark:border-stone-800 bg-black">
              <AnimatePresence mode="wait">
                <motion.video
                  key={current}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  src={slides[current].video}
                  controls
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Video Content & Controls */}
          <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${current}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-xs font-['Oswald'] text-[#8C7B6C] dark:text-white/50 tracking-[0.2em] uppercase mb-4">Featured Film</div>
                <h3 className="font-['Playfair_Display'] text-3xl md:text-5xl text-stone-900 dark:text-white italic mb-6">
                  {slides[current].title || "Life at Treasure"}
                </h3>
                <p className="font-['Playfair_Display'] text-stone-600 dark:text-white/70 leading-relaxed mb-10 text-lg font-light">
                  Hear directly from our residents and explore the unparalleled lifestyle, world-class amenities, and exquisite design that make Treasure the ultimate residential destination.
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center md:justify-start gap-6">
              <button
                onClick={prevSlide}
                className="w-14 h-14 flex items-center justify-center rounded-full border border-stone-300 dark:border-white/30 text-stone-600 dark:text-white/70 hover:bg-stone-800 dark:hover:bg-white/10 hover:text-white transition-all duration-300 group"
              >
                <ArrowRight className="rotate-180 w-5 h-5 group-active:scale-90 transition-transform" />
              </button>
              <div className="font-['Oswald'] text-sm tracking-widest text-stone-500 dark:text-white/50">
                0{current + 1} <span className="mx-2 opacity-50">/</span> 0{slides.length}
              </div>
              <button
                onClick={nextSlide}
                className="w-14 h-14 flex items-center justify-center rounded-full border border-stone-300 dark:border-white/30 text-stone-600 dark:text-white/70 hover:bg-stone-800 dark:hover:bg-white/10 hover:text-white transition-all duration-300 group"
              >
                <ArrowRight className="w-5 h-5 group-active:scale-90 transition-transform" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LandingPage;