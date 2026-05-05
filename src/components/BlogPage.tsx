import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useCMS } from '../hooks/useCMS';
import SEO from './SEO';

const BlogPage = () => {
  const { isDark } = useTheme();
  useCMS('blog');
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('id, created_at, title, slug, description, image, date')
        .order('created_at', { ascending: false });
      if (!error && data) setBlogs(data);
    };
    fetchBlogs();
  }, []);

  return (
    <div className={`min-h-screen py-24 px-6 md:px-24 transition-colors duration-500 ${isDark ? 'bg-[#2A0A0A] text-white' : 'bg-[#F9F9F7] text-stone-800'}`}>
      <SEO
        title="Treasure Blog | Stories on Architecture, Design and Living in Jaipur"
        description="Insights and stories on premium living, architecture, and design from Treasure's team in Jaipur."
      />
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-xs uppercase tracking-[0.3em] font-bold ${isDark ? 'text-[#D4AF37]/60' : 'text-stone-400'}`}
          >
            Insights & Stories
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-['Playfair_Display'] font-bold mt-4"
          >
            THE TREASURE BLOG
          </motion.h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {blogs.map((blog, idx) => (
            <motion.article 
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <Link to={`/blog/${blog.slug}`} className="block overflow-hidden rounded-2xl mb-6 relative aspect-[16/10]">
                <img 
                  src={blog.image || "/assets/images/placeholder.jpg"} 
                  alt={blog.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
              </Link>

              <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold mb-4 opacity-60">
                <span className="flex items-center gap-1"><Calendar size={12} /> {blog.date}</span>
                <span className="flex items-center gap-1"><User size={12} /> Admin</span>
              </div>

              <h2 className="text-2xl font-bold mb-4 font-['Playfair_Display'] group-hover:text-[#D4AF37] transition-colors leading-tight">
                <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
              </h2>

              <p className="text-sm opacity-70 mb-6 line-clamp-3 font-light leading-relaxed">
                {blog.description}
              </p>

              <Link 
                to={`/blog/${blog.slug}`} 
                className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest border-b pb-1 transition-all ${isDark ? 'border-[#D4AF37] text-[#D4AF37] hover:gap-4' : 'border-stone-800 text-stone-800 hover:gap-4'}`}
              >
                Read More <ArrowRight size={14} />
              </Link>
            </motion.article>
          ))}
        </div>

        {blogs.length === 0 && (
          <div className="text-center py-24">
            <p className="text-xl opacity-50 italic">New stories coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
