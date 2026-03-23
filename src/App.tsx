import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';
import { UIProvider } from './context/UIContext';

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
import BlogPage from './components/BlogPage';
import BlogPostPage from './components/BlogPostPage';
import { useCMS } from './hooks/useCMS';
import { Toaster } from 'react-hot-toast';
import { Phone, Instagram } from 'lucide-react';

// Admin Components
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import ProtectedRoute from './components/Admin/ProtectedRoute';

const App = () => {
  return (
    <ThemeProvider>
      <UIProvider>
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
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
            </Route>

            {/* ADMIN ROUTES */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          </Routes>

          {/* WHATSAPP BUTTON - OUTSIDE ROUTES */}
          <Toaster position="top-right" />
          <InstagramButton />
          <WhatsAppButton />
          <BottomBar />

        </Router>
      </UIProvider>
    </ThemeProvider>
  );
};

const BottomBar = () => {
  const { data: settings } = useCMS('settings');
  const waPhone = settings?.phone?.replace(/\+/g, '').replace(/\s/g, '') || "919353181818";

  return (
    <div className="fixed bottom-0 left-0 w-full z-[9999] md:hidden pb-4 px-4 pointer-events-none">
      <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-full p-2 flex items-center justify-between gap-2 pointer-events-auto mx-auto max-w-sm">

        {/* Call Now */}
        <a
          href={`tel:${settings?.phone || "+919353181818"}`}
          className="flex-1 flex flex-col items-center justify-center py-2 text-gray-600 dark:text-gray-300 hover:text-[#A03333] dark:hover:text-[#A03333] transition-all rounded-3xl hover:bg-gray-100 dark:hover:bg-white/5 active:scale-95"
        >
          <Phone className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-semibold tracking-wide uppercase font-lato">Call</span>
        </a>

        {/* WhatsApp - Highlighted Center Action */}
        <a
          href={`https://wa.me/${waPhone}?text=Hi%2C%20I%20want%20to%20connect.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-2.5 text-white bg-gradient-to-tr from-[#20B25E] to-[#25D366] rounded-3xl shadow-lg shadow-green-500/30 transform transition-transform active:scale-95 border border-green-400/20"
        >
          <svg className="w-5 h-5 mb-1 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.964.041A11.956 11.956 0 001.077 15.65L.03 23.953l8.475-2.822A11.954 11.954 0 1011.964.041zM11.963 21.6A9.61 9.61 0 017 20.352l-.337-.2-4.992 1.662.62-4.88-.223-.357A9.613 9.613 0 1111.963 21.6zm5.286-7.234c-.29-.145-1.713-.846-1.978-.943-.264-.097-.458-.146-.65.146-.192.29-.747.943-.915 1.137-.168.193-.337.218-.626.073-.29-.145-1.222-.45-2.327-1.437-.86-.768-1.442-1.718-1.61-2.008-.168-.29-.018-.445.126-.59.13-.13.29-.338.435-.507.146-.17.194-.29.29-.484.097-.193.048-.362-.025-.507-.072-.146-.65-1.57-.89-2.148-.234-.567-.472-.49-.65-.499h-.556c-.193 0-.507.073-.772.363-.265.29-1.012.988-1.012 2.413 0 1.425 1.036 2.801 1.18 2.994.145.193 2.043 3.12 4.947 4.37.69.299 1.23.477 1.65.611.692.22 1.32.189 1.815.115.556-.083 1.714-.7 1.955-1.376.241-.676.241-1.256.168-1.376-.072-.12-.265-.193-.554-.338z"/>
          </svg>
          <span className="text-[10px] font-semibold tracking-wide uppercase font-lato">WhatsApp</span>
        </a>

        {/* Instagram */}
        <a
          href={settings?.instagram || "https://www.instagram.com/treasurejaipur"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-2 text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-all rounded-3xl hover:bg-gray-100 dark:hover:bg-white/5 active:scale-95"
        >
          <Instagram className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-semibold tracking-wide uppercase font-lato">Instagram</span>
        </a>

      </div>
    </div>
  );
};

export default App;
