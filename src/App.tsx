import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Theme Provider
import { ThemeProvider } from './components/ThemeContext';

import LandingPage from './components/LandingPage';
import AboutUsPage from './components/AboutUs';
import OurServicesPage from './components/OurServices';
import OurProjectsPage from './components/OurProjects';
import ContactPage from './components/ContactPage';
import Layout from './components/Layout';
import Projects from './components/Projects';
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";
import InstagramButton from './components/InstagramButton';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />  
        {/* ROUTES */}
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/services" element={<OurServicesPage />} />
            <Route path="/projects" element={<OurProjectsPage />} />
            <Route path="/projects/treasure" element={<Projects />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>
        </Routes>

        {/* WHATSAPP BUTTON - OUTSIDE ROUTES */}
        <Toaster position="top-right" />
        <InstagramButton />
        <WhatsAppButton />
        <BottomBar />

      </Router>
    </ThemeProvider>
  );
};

const BottomBar = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full flex z-[9999] backdrop-blur-md border-t border-white/10 md:hidden">

      {/* Instagram */}
      <a
        href="https://www.instagram.com/treasurejaipur"
        target="_blank"
        rel="noopener noreferrer"
        className="w-1/2 bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 text-white flex items-center justify-center gap-2 py-4"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
          className="w-5 h-5"
          alt="Instagram"
        />
        <span className="text-sm font-medium">Instagram</span>
      </a>

      {/* WhatsApp */}
      <a
        href="https://wa.me/919353181818?text=Hi%2C%20I%20want%20to%20connect."
        target="_blank"
        rel="noopener noreferrer"
        className="w-1/2 bg-[#25D366] text-white flex items-center justify-center gap-2 py-4"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          className="w-5 h-5"
          alt="WhatsApp"
        />
        <span className="text-sm font-medium">WhatsApp</span>
      </a>

    </div>
  );
};


export default App;


