import { useState, useEffect } from 'react';

export interface PageMetadata {
  title: string;
  description: string;
  schema: string;
  [key: string]: any;
}

export const useCMS = (pageId: string) => {
  const [metadata, setMetadata] = useState<PageMetadata | null>(null);

  const fetchMetadata = () => {
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
