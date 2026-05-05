import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import SEO from './SEO';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { isDark } = useTheme();
  const [blog, setBlog] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const { data, error: fetchError } = await supabase
          .from('blogs')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        if (fetchError) {
          console.error('Error fetching blog:', fetchError);
          setError(fetchError.message);
        } else if (data) {
          setBlog(data);
        } else {
          setError('Post not found');
        }
      } catch (err: any) {
        console.error('Unexpected error:', err);
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchBlog();
  }, [slug]);

  if (loading) return (
    <div className={`min-h-screen flex flex-col items-center justify-center gap-4 transition-colors duration-500 ${isDark ? 'bg-[#2A0A0A] text-white' : 'bg-[#F9F9F7] text-stone-800'}`}>
      <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      <span className="text-xs uppercase tracking-widest font-bold opacity-60">Loading Story...</span>
    </div>
  );

  if (error || !blog) return (
    <div className={`min-h-screen flex flex-col items-center justify-center gap-6 transition-colors duration-500 ${isDark ? 'bg-[#2A0A0A] text-white' : 'bg-[#F9F9F7] text-stone-800'}`}>
      <h2 className="text-3xl font-['Playfair_Display'] font-bold">Story Not Found</h2>
      <p className="opacity-60 max-w-md text-center px-6">We couldn't find the story you're looking for. It might have been moved or doesn't exist.</p>
      <Link to="/blog" className="px-8 py-3 bg-[#D4AF37] text-white rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-yellow-900/20">
        Back to Stories
      </Link>
    </div>
  );

  return (
    <article className={`min-h-screen py-24 px-6 md:px-24 transition-colors duration-500 ${isDark ? 'bg-[#2A0A0A] text-white' : 'bg-[#F9F9F7] text-stone-800'}`}>
      <SEO
        title={blog.meta_title || `${blog.title} | Treasure Blog`}
        description={blog.description || `Read "${blog.title}" on the Treasure blog.`}
        image={blog.image}
        type="article"
      />
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
            className="prose prose-stone dark:prose-invert max-w-none text-lg md:text-xl leading-relaxed font-['Playfair_Display']"
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
