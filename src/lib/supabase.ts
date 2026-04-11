import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials missing. Check your environment variables.');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);

// Helper to fetch CMS data
export const getCMSData = async () => {
    try {
        const { data, error } = await supabase
            .from('cms_data')
            .select('*');
        
        if (error) throw error;
        
        // Convert array to record Object
        const record: any = {};
        data?.forEach((item: any) => {
            record[item.slug] = item;
        });
        return record;
    } catch (err) {
        console.error('Supabase fetch error:', err);
        return null;
    }
};

// Helper to update CMS data
export const updateCMSData = async (slug: string, updates: any) => {
    try {
        const { error } = await supabase
            .from('cms_data')
            .upsert({ slug, ...updates });
        
        if (error) throw error;
        return true;
    } catch (err) {
        console.error('Supabase update error:', err);
        return false;
    }
};
