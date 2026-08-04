import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = 'Nilkanth Quartz | Premium Wall Clock Manufacturer', 
  description = 'Nilkanth Quartz manufactures high-quality premium designer, office, promotional, acrylic, and gear wall clocks. Handcrafted in Morbi, India.',
  url = window.location.href,
  image = '/nilkanth-quartz-logo.png',
  schemaData = null
}) => {
  const absoluteImage = image.startsWith('http') 
    ? image 
    : `https://nilkanthquartz.com${image.startsWith('/') ? '' : '/'}${image}`;

  return (
    <Helmet>
      {/* Primary SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* BRAND SIGNAL */}
      <meta name="application-name" content="Nilkanth Quartz" />
      <meta property="og:site_name" content="Nilkanth Quartz" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={absoluteImage} />

      {/* Twitter SEO */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />

      {/* FAVICON */}
      <link rel="icon" href="/nilkanth-quartz-logo.png" />

      {/* STRUCTURED DATA */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
