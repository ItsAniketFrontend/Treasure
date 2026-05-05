import { Menu, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import { useUI } from '../context/UIContext';
import { useCMS } from '../hooks/useCMS';
import Footer from './Footer';
import SEO from './SEO';

const PROJECTS_DATA = [
  { id: 1, name: "Treasure", slug: "treasure", image: "/assets/images/twentyeight.png", desc: "A series of residences shaped by measured proportions and natural materials." },
  { id: 2, name: "Limited Edition", slug: "limited", image: "/assets/images/twentyseven.png", desc: "Our upcoming architectural landmark in the heart of the city." }
];

const OurProjectsPage = () => {
  const { isDark } = useTheme();
  const { openMenu } = useUI();
  const { data: cmsData } = useCMS('projects');

  return (
    <div className={`min-h-screen w-full font-sans transition-colors duration-700 ${isDark ? 'bg-[#2A0A0A] text-white' : 'bg-[#F9F9F7] text-stone-800'}`}>
      <SEO
        title="Our Projects | Treasure - Premium Residences in Jaipur"
        description="Explore Treasure's portfolio of premium residential projects in Jaipur, including luxury 2BHK and 3BHK flats in Vidhyadhar Nagar."
      />
      <main className="relative pl-0 md:pl-24 overflow-hidden">

        <header className="fixed top-0 left-0 w-full z-50 p-6 md:pl-36 md:pr-12 flex justify-between md:justify-end items-center pointer-events-none">
          <div className="md:hidden pointer-events-auto"><button onClick={openMenu} className="p-2 bg-black/20 rounded-lg backdrop-blur-md"><Menu size={32} className="text-white" /></button></div>
        </header>

        <section className="relative py-24 md:py-32 px-6 md:px-24 max-w-7xl mx-auto">
          <div className="space-y-6 mb-20 text-center md:text-left">
            <h1 className="text-4xl md:text-7xl font-['Playfair_Display'] font-bold leading-tight">{cmsData?.heading || "Our Works"}</h1>
            <p className="text-lg md:text-xl font-['Playfair_Display'] opacity-60 max-w-2xl">{cmsData?.description || "Architectural excellence translated into living spaces."}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            {PROJECTS_DATA.map((project, idx) => (
              <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.2 }} className="group">
                <Link to={`/projects/${project.slug}`} className="block relative aspect-[4/5] rounded-3xl overflow-hidden mb-8">
                  <img src={project.image} alt={project.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                  <div className="absolute bottom-10 left-10 text-white">
                    <span className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2 block">Project {project.id}</span>
                    <h3 className="text-3xl font-bold font-['Playfair_Display']">{project.name}</h3>
                  </div>
                </Link>
                <div className="space-y-4 px-4">
                   <p className="text-sm leading-loose opacity-60 font-medium">{project.desc}</p>
                   <Link to={`/projects/${project.slug}`} className="inline-flex items-center text-xs font-bold uppercase tracking-widest border-b pb-1 gap-2 hover:gap-4 transition-all">Explore Project <ArrowRight size={14} /></Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default OurProjectsPage;