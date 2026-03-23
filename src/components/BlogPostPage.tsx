import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { useCMS } from '../hooks/useCMS';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { isDark } = useTheme();
  const [blog, setBlog] = useState<any | null>(null);
  useCMS('blog');

  useEffect(() => {
    const savedBlogs = localStorage.getItem('treasure_blogs');
    if (savedBlogs) {
      const blogs = JSON.parse(savedBlogs);
      const post = blogs.find((b: any) => b.slug === slug);
      if (post) {
        setBlog(post);
        // SEO: Override metadata with blog-specific content if it exists
        if (post.title) document.title = post.title;
        let metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', post.description || "");
      }
    }
  }, [slug]);

  if (!blog) return <div className="min-h-screen flex items-center justify-center">Loading Story...</div>;

  return (
    <article className={`min-h-screen py-24 px-6 md:px-24 transition-colors duration-500 ${isDark ? 'bg-[#2A0A0A] text-white' : 'bg-[#F9F9F7] text-stone-800'}`}>
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] mb-12 hover:gap-4 transition-all opacity-60 hover:opacity-100"
        >
          <ArrowLeft size={16} /> Back to Stories
        </Link>
        
        <header className="mb-12">
          <div className="flex items-center gap-6 text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold mb-6 opacity-60">
             <span className="flex items-center gap-1.5"><Calendar size={14} /> {blog.date}</span>
             <span className="flex items-center gap-1.5"><User size={14} /> Admin</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-['Playfair_Display'] font-bold leading-tight mb-8">
            {blog.title}
          </h1>
          <p className="text-xl md:text-2xl italic opacity-80 leading-relaxed font-['Playfair_Display'] mb-12 border-l-4 border-[#D4AF37] pl-8">
            {blog.description}
          </p>
        </header>

        <div className="w-full relative rounded-3xl overflow-hidden mb-16 aspect-[16/8]">
          <img 
            src={blog.image || "/assets/images/placeholder.jpg"} 
            alt={blog.title} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-16">
          {/* Main content area */}
          <div 
            className="prose prose-stone dark:prose-invert max-w-none text-lg md:text-xl leading-relaxed font-light font-['Playfair_Display']"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Sidebar / Extra info */}
          <aside className="space-y-12">
            <div className={`p-8 rounded-2xl border ${isDark ? 'border-stone-800 bg-black/20' : 'border-stone-200 bg-white'}`}>
              <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-6">Share Story</h4>
              <div className="flex gap-4">
                {['Twitter', 'LinkedIn', 'Copy Link'].map(platform => (
                  <button key={platform} className="p-2 border border-stone-700/30 rounded-full hover:bg-[#D4AF37] hover:text-white transition-all"><Share2 size={16} /></button>
                ))}
              </div>
            </div>

            <div className={`p-8 rounded-2xl border ${isDark ? 'border-stone-800 bg-black/20' : 'border-stone-200 bg-white'}`}>
              <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-4">Contact Treasure</h4>
              <p className="text-sm opacity-60 leading-relaxed mb-6">Explore the stories of luxury residences and design excellence through our blog.</p>
              <Link to="/contact" className="text-xs uppercase tracking-[0.2em] font-bold border-b border-[#D4AF37] text-[#D4AF37] pb-1">Get In Touch</Link>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
};

export default BlogPostPage;
