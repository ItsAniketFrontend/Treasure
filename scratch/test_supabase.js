import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing env vars');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  console.log('Testing connection to:', supabaseUrl);
  
  const { data: blogs, error: blogsError } = await supabase.from('blogs').select('*').limit(1);
  if (blogsError) console.error('Error fetching blogs:', blogsError.message);
  else console.log('Successfully fetched blogs:', blogs?.length);

  const { data: cms, error: cmsError } = await supabase.from('cms_data').select('*').limit(1);
  if (cmsError) console.error('Error fetching cms_data:', cmsError.message);
  else console.log('Successfully fetched cms_data:', cms?.length);
}

test();
