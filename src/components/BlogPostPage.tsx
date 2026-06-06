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

  const readingTime = Math.max(1, Math.round((blog.content?.replace(/<[^>]+>/g, '').split(/\s+/).length || 0) / 220));

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
          <div className="flex flex-wrap items-center gap-6 text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold mb-6 opacity-60">
             <span className="flex items-center gap-1.5"><Calendar size={14} /> {blog.date}</span>
             <span className="flex items-center gap-1.5"><User size={14} /> Admin</span>
             <span className="hidden md:inline">·</span>
             <span>{readingTime} min read</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-['Playfair_Display'] font-bold leading-[1.05] mb-8 text-[#2A0A0A] dark:text-white">
            {blog.title}
          </h1>
          <p className="text-xl md:text-2xl italic opacity-80 leading-relaxed font-['Playfair_Display'] mb-4 border-l-4 border-[#D4AF37] pl-8">
            {blog.description}
          </p>
        </header>

        <div className="w-full relative rounded-3xl overflow-hidden mb-16 aspect-[16/8] shadow-2xl ring-1 ring-black/5 dark:ring-white/10">
          <img
            src={blog.image || "/assets/images/placeholder.jpg"}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-16">
          {/* Main content area */}
          <div
            className="
              prose prose-stone dark:prose-invert max-w-none
              prose-headings:font-['Oswald'] prose-headings:uppercase prose-headings:tracking-wide prose-headings:font-semibold
              prose-headings:text-[#4A2521] dark:prose-headings:text-white
              prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-14 prose-h2:mb-6 prose-h2:pb-3
              prose-h2:border-b prose-h2:border-[#D4AF37]/40
              prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
              prose-p:font-['Playfair_Display'] prose-p:text-base md:prose-p:text-lg
              prose-p:leading-[1.85] prose-p:my-5
              prose-p:text-stone-700 dark:prose-p:text-stone-300
              prose-a:text-[#A8842B] dark:prose-a:text-[#D4AF37] prose-a:font-semibold prose-a:no-underline
              hover:prose-a:underline prose-a:underline-offset-4
              prose-strong:text-[#2A0A0A] dark:prose-strong:text-white prose-strong:font-semibold
              prose-em:text-stone-600 dark:prose-em:text-stone-300
              prose-blockquote:border-l-4 prose-blockquote:border-[#D4AF37]
              prose-blockquote:not-italic prose-blockquote:font-['Playfair_Display']
              prose-blockquote:text-stone-700 dark:prose-blockquote:text-stone-200
              prose-blockquote:bg-[#D4AF37]/5 dark:prose-blockquote:bg-white/5
              prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
              prose-blockquote:my-8
              prose-ul:my-6 prose-ol:my-6
              prose-li:font-['Playfair_Display'] prose-li:my-2 prose-li:text-stone-700 dark:prose-li:text-stone-300
              prose-li:marker:text-[#D4AF37]
              prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-10
              prose-hr:border-stone-200 dark:prose-hr:border-stone-700
              [&>p:first-of-type]:text-lg md:[&>p:first-of-type]:text-xl
              [&>p:first-of-type]:leading-relaxed [&>p:first-of-type]:text-stone-800 dark:[&>p:first-of-type]:text-stone-200
              [&>p:first-of-type:first-letter]:float-left
              [&>p:first-of-type:first-letter]:font-['Playfair_Display']
              [&>p:first-of-type:first-letter]:text-6xl md:[&>p:first-of-type:first-letter]:text-7xl
              [&>p:first-of-type:first-letter]:font-bold
              [&>p:first-of-type:first-letter]:leading-none
              [&>p:first-of-type:first-letter]:mr-3 [&>p:first-of-type:first-letter]:mt-2
              [&>p:first-of-type:first-letter]:text-[#D4AF37]
              [&_table]:my-10 [&_table]:w-full [&_table]:border-collapse [&_table]:overflow-hidden
              [&_table]:rounded-xl [&_table]:shadow-sm [&_table]:ring-1
              [&_table]:ring-stone-200 dark:[&_table]:ring-stone-700
              [&_thead]:bg-[#4A2521] dark:[&_thead]:bg-[#1a0505]
              [&_th]:text-white [&_th]:font-['Oswald'] [&_th]:uppercase [&_th]:tracking-wider
              [&_th]:text-xs md:[&_th]:text-sm [&_th]:p-4 [&_th]:text-left [&_th]:font-semibold
              [&_td]:font-['Playfair_Display'] [&_td]:p-4 [&_td]:align-top
              [&_td]:text-stone-700 dark:[&_td]:text-stone-300
              [&_td]:border-t [&_td]:border-stone-200 dark:[&_td]:border-stone-700
              [&_tbody_tr:nth-child(even)]:bg-stone-50 dark:[&_tbody_tr:nth-child(even)]:bg-white/[0.03]
            "
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Sidebar / Extra info */}
          <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
            <div className={`p-8 rounded-2xl border ${isDark ? 'border-stone-800 bg-black/20' : 'border-stone-200 bg-white'}`}>
              <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-6">Share Story</h4>
              <div className="flex gap-4">
                {['Twitter', 'LinkedIn', 'Copy Link'].map(platform => (
                  <button key={platform} aria-label={platform} className="p-2 border border-stone-700/30 rounded-full hover:bg-[#D4AF37] hover:text-white hover:border-[#D4AF37] transition-all"><Share2 size={16} /></button>
                ))}
              </div>
            </div>

            <div className={`p-8 rounded-2xl border ${isDark ? 'border-stone-800 bg-black/20' : 'border-stone-200 bg-white'}`}>
              <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-4">Contact Treasure</h4>
              <p className="text-sm opacity-60 leading-relaxed mb-6 font-['Playfair_Display']">Explore the stories of luxury residences and design excellence through our blog.</p>
              <Link to="/contact" className="text-xs uppercase tracking-[0.2em] font-bold border-b border-[#D4AF37] text-[#D4AF37] pb-1 hover:opacity-80 transition-opacity">Get In Touch</Link>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
};

export default BlogPostPage;
