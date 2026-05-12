import { Helmet } from 'react-helmet-async';

const DEFAULT_TITLE = 'Luxury Flats & Apartments in Vidhyadhar Nagar, Jaipur';
const DEFAULT_DESCRIPTION =
  'Discover luxury flats and apartments in Jaipur by Katewa Companies. Premium residences at Treasure, Vidhyadhar Nagar. Book a site visit today.';
const DEFAULT_IMAGE = '/assets/images/two.png';

type SEOProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  schemas?: object[];
};

const SEO = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  schemas,
}: SEOProps) => {
  const canonical = url || (typeof window !== 'undefined' ? window.location.href : '');

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}

      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:site_name" content="Katewa Companies" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {schemas?.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
