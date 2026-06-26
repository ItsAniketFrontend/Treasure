const SITE_URL = 'https://www.katewacompanies.in';

const STATIC_ROUTES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.9' },
  { path: '/services', changefreq: 'monthly', priority: '0.8' },
  { path: '/projects', changefreq: 'weekly', priority: '0.8' },
  { path: '/projects/treasure', changefreq: 'monthly', priority: '0.7' },
  { path: '/blog', changefreq: 'weekly', priority: '0.8' },
  { path: '/contact', changefreq: 'monthly', priority: '0.6' },
];

const escapeXml = (str) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const fetchBlogs = async () => {
  const supabaseUrl =
    process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase env vars missing; sitemap will only include static routes.');
    return [];
  }

  try {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/blogs?select=slug,created_at&order=created_at.desc`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      }
    );
    if (!res.ok) {
      console.error('Supabase fetch failed', res.status, await res.text());
      return [];
    }
    return await res.json();
  } catch (err) {
    console.error('Supabase fetch error', err);
    return [];
  }
};

export default async function handler(req, res) {
  const blogs = await fetchBlogs();
  const today = new Date().toISOString().slice(0, 10);

  const urls = [
    ...STATIC_ROUTES.map((r) => ({
      loc: `${SITE_URL}${r.path}`,
      lastmod: today,
      changefreq: r.changefreq,
      priority: r.priority,
    })),
    ...blogs
      .filter((b) => b.slug)
      .map((b) => ({
        loc: `${SITE_URL}/blog/${b.slug}`,
        lastmod: (b.created_at || today).slice(0, 10),
        changefreq: 'monthly',
        priority: '0.7',
      })),
  ];

  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls
      .map(
        (u) =>
          '  <url>\n' +
          `    <loc>${escapeXml(u.loc)}</loc>\n` +
          `    <lastmod>${u.lastmod}</lastmod>\n` +
          `    <changefreq>${u.changefreq}</changefreq>\n` +
          `    <priority>${u.priority}</priority>\n` +
          '  </url>'
      )
      .join('\n') +
    '\n</urlset>\n';

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader(
    'Cache-Control',
    'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400'
  );
  res.status(200).send(body);
}
