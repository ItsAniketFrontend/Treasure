import React, { useState, useEffect } from 'react';
import {
  Settings,
  FileText,
  LogOut,
  Save,
  Plus,
  Trash2,
  ChevronRight,
  Globe,
  Layout as LayoutIcon,
  CheckCircle2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const PAGES = [
  { id: 'home', name: 'Home Page', slug: '/' },
  { id: 'about', name: 'About Us', slug: '/about' },
  { id: 'services', name: 'Services', slug: '/services' },
  { id: 'projects', name: 'Our Projects', slug: '/projects' },
  { id: 'contact', name: 'Contact Us', slug: '/contact' },
  { id: 'blog', name: 'Blog Index', slug: '/blog' },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'pages' | 'settings' | 'content' | 'blogs'>('pages');
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [pageData, setPageData] = useState<any>({});
  const [blogs, setBlogs] = useState<any[]>([]);
  const [editingBlog, setEditingBlog] = useState<any | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const toastId = toast.loading('Uploading image...');

    try {
      // First, check if bucket exists or just try uploading
      // Note: User must create 'blog-images' bucket in Supabase dashboard
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      setEditingBlog({ ...editingBlog, image: publicUrl });
      toast.success('Image uploaded successfully!', { id: toastId });
    } catch (err: any) {
      console.error('Upload error:', err);
      toast.error(`Upload failed: ${err.message || 'Check if "blog-images" bucket exists'}`, { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      // Fetch from Supabase
      const { data, error } = await supabase.from('cms_data').select('*');
      
      if (!error && data && data.length > 0) {
        const remoteData: any = {};
        data.forEach(item => {
          remoteData[item.slug] = item;
        });
        setPageData(remoteData);
        localStorage.setItem('cms_metadata', JSON.stringify(remoteData));
      } else {
        const savedData = localStorage.getItem('cms_metadata');
        if (savedData) {
          setPageData(JSON.parse(savedData));
        } else {
          const initial: any = {};
          PAGES.forEach(p => {
            initial[p.id] = {
              slug: p.id,
              title: `Treasure - ${p.name}`,
              description: `Welcome to Treasure Jaipur - ${p.name}.`,
              schema: '{}',
              content: {}
            };
          });
          setPageData(initial);
        }
      }
    };

    fetchInitialData();

    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('id, created_at, title, slug, description, image, date')
        .order('created_at', { ascending: false });
      if (!error && data) setBlogs(data);
    };
    fetchBlogs();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Save all pages to Supabase
      for (const pageId of Object.keys(pageData)) {
        await supabase
          .from('cms_data')
          .upsert({ slug: pageId, ...pageData[pageId] });
      }
      
      localStorage.setItem('cms_metadata', JSON.stringify(pageData));
      window.dispatchEvent(new Event('cms_data_updated'));
      toast.success('Changes synced to Supabase successfully!');
    } catch (err) {
      console.error('Save error:', err);
      toast.error('Failed to sync with Supabase');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const handleFieldChange = (pageId: string, field: string, value: string) => {
    setPageData((prev: any) => ({
      ...prev,
      [pageId]: {
        ...prev[pageId],
        [field]: value
      }
    }));
  };

  return (
    <div className="flex h-screen bg-[#F9F9F7] dark:bg-[#1a0505] overflow-hidden">
      <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-gray-100 dark:border-white/10 flex flex-col">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-[#A03333] rounded-lg flex items-center justify-center">
              <Settings className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-lg dark:text-white">Admin Hub</span>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'pages', name: 'Page SEO', icon: Globe },
              { id: 'content', name: 'Page Content', icon: LayoutIcon },
              { id: 'blogs', name: 'Blog Posts', icon: FileText },
              { id: 'settings', name: 'Site Settings', icon: Settings },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id 
                    ? 'bg-[#A03333] text-white shadow-lg shadow-red-500/20' 
                    : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5'
                }`}
              >
                <tab.icon size={18} />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl text-sm font-medium transition-all">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-12">
        <div className="max-w-4xl mx-auto">
          <header className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white capitalize">
                {activeTab === 'pages' ? 'Search Engine Optimization (SEO)' : activeTab + ' Management'}
              </h2>
              <p className="text-gray-500 mt-1">Manage your website's visibility and data structure</p>
            </div>
            <button onClick={handleSave} disabled={isSaving} className="px-6 py-2.5 bg-[#A03333] hover:bg-[#802222] text-white rounded-xl font-semibold flex items-center gap-2 transition-all active:scale-95 disabled:opacity-70 shadow-lg shadow-red-500/20">
              {isSaving ? <Plus className="animate-spin w-5 h-5" /> : <Save size={18} />}
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </header>

          {activeTab === 'pages' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PAGES.map(page => (
                  <button key={page.id} onClick={() => setSelectedPage(page.id)} className={`p-4 rounded-2xl border text-left transition-all ${selectedPage === page.id ? 'bg-white dark:bg-zinc-800 border-[#A03333] shadow-md ring-2 ring-[#A03333]/10' : 'bg-white dark:bg-zinc-800 border-gray-100 dark:border-white/5 hover:border-[#A03333]/50'}`}>
                    <span className="text-xs text-gray-400 font-mono tracking-widest uppercase mb-1 block">{page.slug}</span>
                    <span className="font-bold text-gray-900 dark:text-white block">{page.name}</span>
                  </button>
                ))}
              </div>
              {selectedPage && (
                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-gray-100 dark:border-white/10 shadow-sm">
                  <h3 className="font-bold text-xl mb-8 dark:text-white flex items-center gap-2"><CheckCircle2 className="text-green-500" /> Editing Metadata for {PAGES.find(p => p.id === selectedPage)?.name}</h3>
                  <div className="space-y-6 text-left">
                    <div>
                      <label className="block text-sm font-semibold mb-2 dark:text-gray-300">Meta Title (Browser Tab)</label>
                      <input type="text" value={pageData[selectedPage]?.title || ''} onChange={(e) => handleFieldChange(selectedPage, 'title', e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-white/10 rounded-xl outline-none dark:text-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 dark:text-gray-300">H1 Tag (Main Page Heading)</label>
                      <input type="text" value={pageData[selectedPage]?.h1 || ''} onChange={(e) => handleFieldChange(selectedPage, 'h1', e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-white/10 rounded-xl outline-none dark:text-white" placeholder="The main title displayed on the page" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 dark:text-gray-300">Meta Description</label>
                      <textarea rows={3} value={pageData[selectedPage]?.description || ''} onChange={(e) => handleFieldChange(selectedPage, 'description', e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-white/10 rounded-xl outline-none dark:text-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 dark:text-gray-300">JSON-LD Schema</label>
                      <textarea rows={8} value={pageData[selectedPage]?.schema || ''} onChange={(e) => handleFieldChange(selectedPage, 'schema', e.target.value)} className="w-full px-4 py-3 bg-zinc-950 font-mono text-xs text-green-400 border border-white/5 rounded-xl outline-none" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-8">
              <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-gray-100 dark:border-white/10 shadow-sm text-left">
                <h3 className="font-bold text-xl mb-6 dark:text-white flex items-center gap-2"><FileText className="text-[#A03333]" /> Home Page Content</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">Hero Heading</label>
                    <textarea rows={2} value={pageData['home']?.hero_title || ''} onChange={(e) => handleFieldChange('home', 'hero_title', e.target.value)} className="w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-zinc-800 dark:text-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">Hero Subtitle</label>
                    <textarea rows={2} value={pageData['home']?.hero_subtitle || ''} onChange={(e) => handleFieldChange('home', 'hero_subtitle', e.target.value)} className="w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-zinc-800 dark:text-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">Intro Section Title</label>
                    <input type="text" value={pageData['home']?.intro_title || ''} onChange={(e) => handleFieldChange('home', 'intro_title', e.target.value)} className="w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-zinc-800 dark:text-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">Intro Section Description</label>
                    <textarea rows={4} value={pageData['home']?.intro_text || ''} onChange={(e) => handleFieldChange('home', 'intro_text', e.target.value)} className="w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-zinc-800 dark:text-white outline-none" />
                   </div>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-gray-100 dark:border-white/10 shadow-sm text-left">
                <h3 className="font-bold text-xl mb-6 dark:text-white flex items-center gap-2"><FileText className="text-orange-500" /> About Page Content</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">About Heading</label>
                    <input type="text" value={pageData['about']?.heading || ''} onChange={(e) => handleFieldChange('about', 'heading', e.target.value)} className="w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-zinc-800 dark:text-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">About Description</label>
                    <textarea rows={4} value={pageData['about']?.description || ''} onChange={(e) => handleFieldChange('about', 'description', e.target.value)} className="w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-zinc-800 dark:text-white outline-none" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'blogs' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold dark:text-white">Manage Blog Posts</h3>
                <button onClick={() => {
                  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                  setEditingBlog({ title: '', slug: '', description: '', image: '', content: '', date: today });
                }} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold flex items-center gap-2"><Plus size={16} /> New Post</button>
              </div>
              {!editingBlog ? (
                <div className="grid grid-cols-1 gap-4">
                  {blogs.map(blog => (
                    <div key={blog.id} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-white/10 flex justify-between items-center">
                      <div>
                        <h4 className="font-bold dark:text-white">{blog.title || 'Untitled'}</h4>
                        <p className="text-xs text-gray-400 font-mono">/blog/{blog.slug}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setEditingBlog(blog)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><ChevronRight size={18} /></button>
                        <button onClick={async () => {
                          const { error } = await supabase.from('blogs').delete().eq('id', blog.id);
                          if (!error) setBlogs(blogs.filter(b => b.id !== blog.id));
                          else toast.error('Failed to delete post');
                        }} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-gray-100 dark:border-white/10 shadow-sm text-left">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="font-bold text-xl dark:text-white">Editing: {editingBlog.title}</h3>
                    <button onClick={() => setEditingBlog(null)} className="text-sm underline">Back</button>
                  </div>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2 dark:text-gray-300">Main Title (H1)</label>
                        <input type="text" placeholder="e.g. The Future of Luxury" value={editingBlog.title} onChange={e => setEditingBlog({...editingBlog, title: e.target.value})} className="w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-zinc-800 dark:text-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 dark:text-gray-300">Meta Title (SEO)</label>
                        <input type="text" placeholder="Optional: SEO specific title" value={editingBlog.metaTitle} onChange={e => setEditingBlog({...editingBlog, metaTitle: e.target.value})} className="w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-zinc-800 dark:text-white" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2 dark:text-gray-300">URL Slug</label>
                        <input type="text" placeholder="e.g. luxury-villas" value={editingBlog.slug} onChange={e => setEditingBlog({...editingBlog, slug: e.target.value})} className="w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-zinc-800 dark:text-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 dark:text-gray-300">Publish Date</label>
                        <input type="text" placeholder="e.g. Oct 24, 2023" value={editingBlog.date} onChange={e => setEditingBlog({...editingBlog, date: e.target.value})} className="w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-zinc-800 dark:text-white" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="block text-sm font-semibold dark:text-gray-300">Blog Image</label>
                      <div className="flex flex-col md:flex-row gap-4 items-start">
                        <div className="flex-1 w-full space-y-2">
                          <input type="text" placeholder="Image URL (or upload below)" value={editingBlog.image} onChange={e => setEditingBlog({...editingBlog, image: e.target.value})} className="w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-zinc-800 dark:text-white" />
                          <div className="relative">
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={handleImageUpload} 
                              className="hidden" 
                              id="image-upload"
                              disabled={isUploading}
                            />
                            <label 
                              htmlFor="image-upload" 
                              className={`flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed rounded-xl cursor-pointer transition-all ${isUploading ? 'opacity-50' : 'hover:border-[#A03333] hover:bg-red-50/10'}`}
                            >
                              <Plus size={18} />
                              <span className="text-sm font-medium">{isUploading ? 'Uploading...' : 'Upload Image'}</span>
                            </label>
                          </div>
                        </div>
                        {editingBlog.image && (
                          <div className="w-full md:w-32 h-32 rounded-xl overflow-hidden border">
                            <img src={editingBlog.image} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                       <label className="block text-sm font-semibold dark:text-gray-300">Meta Description (Short excerpt for SEO)</label>
                       <textarea placeholder="Write a short summary..." rows={2} value={editingBlog.description} onChange={e => setEditingBlog({...editingBlog, description: e.target.value})} className="w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-zinc-800 dark:text-white" />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold dark:text-gray-300">Blog Content</label>
                      <div className="quill-editor-container bg-white dark:bg-zinc-800 rounded-xl overflow-hidden border border-gray-200 dark:border-white/10">
                        <ReactQuill 
                          theme="snow" 
                          value={editingBlog.content} 
                          onChange={content => setEditingBlog({...editingBlog, content})}
                          modules={{
                            toolbar: [
                              [{ 'header': [1, 2, 3, false] }],
                              ['bold', 'italic', 'underline', 'strike'],
                              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                              ['link', 'clean']
                            ],
                          }}
                          placeholder="Write your story here..."
                          className="dark:text-white"
                        />
                      </div>
                      <style>{`
                        .ql-container { font-family: 'Playfair Display', serif; font-size: 16px; border: none !important; min-h: 300px; }
                        .ql-toolbar { border: none !important; border-bottom: 1px solid rgba(0,0,0,0.1) !important; background: #f9f9f9; }
                        .dark .ql-toolbar { background: #1a0505; border-bottom: 1px solid rgba(255,255,255,0.05) !important; }
                        .dark .ql-toolbar .ql-stroke { stroke: #fff; }
                        .dark .ql-toolbar .ql-fill { fill: #fff; }
                        .dark .ql-toolbar .ql-picker { color: #fff; }
                        .dark .ql-editor.ql-blank::before { color: rgba(255,255,255,0.3); }
                      `}</style>
                    </div>
                    <button onClick={async () => {
                      if (!editingBlog.title) { toast.error('Title is required'); return; }
                      
                      // Auto-generate slug if missing
                      let finalSlug = editingBlog.slug || editingBlog.title.toLowerCase()
                        .replace(/[^\w\s-]/g, '')
                        .replace(/\s+/g, '-');
                      
                      // Ensure slug is clean
                      finalSlug = finalSlug.trim().replace(/^\/+|\/+$/g, '');

                      const blogPayload = {
                        title: editingBlog.title,
                        metaTitle: editingBlog.metaTitle || editingBlog.title,
                        slug: finalSlug,
                        description: editingBlog.description,
                        image: editingBlog.image,
                        content: editingBlog.content,
                        date: editingBlog.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                      };

                      if (editingBlog.id) {
                        // Update existing
                        const { error } = await supabase.from('blogs').update(blogPayload).eq('id', editingBlog.id);
                        if (error) { 
                          console.error('Save error:', error);
                          toast.error(`Failed to save: ${error.message}`); 
                          return; 
                        }
                        setBlogs(blogs.map(b => b.id === editingBlog.id ? { ...editingBlog, ...blogPayload } : b));
                      } else {
                        // Insert new
                        const { data, error } = await supabase.from('blogs').insert(blogPayload).select().single();
                        if (error) { 
                          console.error('Insert error:', error);
                          toast.error(`Failed to publish: ${error.message}`); 
                          return; 
                        }
                        setBlogs([data, ...blogs]);
                      }
                      toast.success('Blog post saved!');
                      setEditingBlog(null);
                    }} className="w-full py-4 bg-[#A03333] text-white rounded-xl font-bold">Publish Post</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-gray-100 dark:border-white/10 shadow-sm text-left">
              <h3 className="font-bold text-xl mb-6 dark:text-white">Site Settings</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">Phone</label>
                  <input type="text" value={pageData['settings']?.phone || ''} onChange={e => handleFieldChange('settings', 'phone', e.target.value)} className="w-full px-4 py-2 rounded-lg border dark:bg-zinc-800 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">Email</label>
                  <input type="text" value={pageData['settings']?.email || ''} onChange={e => handleFieldChange('settings', 'email', e.target.value)} className="w-full px-4 py-2 rounded-lg border dark:bg-zinc-800 dark:text-white" />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
