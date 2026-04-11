import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface PageMetadata {
  title: string;
  description: string;
  schema: string;
  [key: string]: any;
}

const cmsCache: Record<string, PageMetadata> = {};

export const useCMS = (pageId: string) => {
  const [metadata, setMetadata] = useState<PageMetadata | null>(cmsCache[pageId] || null);

  const fetchMetadata = async () => {
    // 1. Try fetching from Supabase first for real-time data
    try {
      const { data, error } = await supabase
        .from('cms_data')
        .select('*')
        .eq('slug', pageId)
        .single();
      
      if (!error && data) {
        cmsCache[pageId] = data;
        setMetadata(data);
        return;
      }
    } catch (err) {
      console.error('Error fetching from Supabase:', err);
    }

    // 2. Fallback to localStorage
    const savedData = localStorage.getItem('cms_metadata');
    if (savedData) {
      const data = JSON.parse(savedData);
      if (data[pageId]) {
        setMetadata(data[pageId]);
      }
    }
  };

  useEffect(() => {
    fetchMetadata();

    // Listen for updates from Admin
    window.addEventListener('cms_data_updated', fetchMetadata);
    return () => window.removeEventListener('cms_data_updated', fetchMetadata);
  }, [pageId]);

  useEffect(() => {
    if (metadata) {
      // Update Title
      if (metadata.title) document.title = metadata.title;

      // Update Meta Description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', metadata.description);

      // Update Schema
      let scriptSchema = document.getElementById(`schema-${pageId}`);
      if (!scriptSchema) {
        scriptSchema = document.createElement('script');
        scriptSchema.id = `schema-${pageId}`;
        scriptSchema.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptSchema);
      }
      scriptSchema.innerHTML = metadata.schema || '{}';
    }
  }, [metadata, pageId]);

  return { data: metadata };
};
