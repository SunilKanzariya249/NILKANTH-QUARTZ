import React, { useEffect } from 'react';

const SEO = ({ 
  title = 'Nilkanth Quartz | Premium Wall Clock Manufacturer', 
  description = 'Nilkanth Quartz manufactures high-quality premium designer, office, promotional, acrylic, and gear wall clocks. Handcrafted in Morbi, India.',
  url = window.location.href,
  image = '/nilkanth-quartz-logo.png',
  schemaData = null
}) => {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // Helper to update/create meta tags
    const updateMetaTag = (nameAttr, nameVal, content) => {
      let element = document.querySelector(`meta[${nameAttr}="${nameVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(nameAttr, nameVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Update Standard Meta Tags
    updateMetaTag('name', 'description', description);
    updateMetaTag('name', 'robots', 'index, follow');

    // 3. Update Open Graph (Facebook) Meta Tags
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:url', url);
    updateMetaTag('property', 'og:image', image);
    updateMetaTag('property', 'og:type', 'website');

    // 4. Update Twitter Card Tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', image);

    // 5. Update/Create Canonical Link Tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // 6. Handle JSON-LD Structured Data
    let schemaScript = document.getElementById('seo-schema-script');
    if (schemaScript) {
      schemaScript.remove();
    }

    if (schemaData) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'seo-schema-script';
      schemaScript.type = 'application/ld+json';
      schemaScript.innerHTML = JSON.stringify(schemaData);
      document.head.appendChild(schemaScript);
    }

    return () => {
      // Cleanup schema script on unmount
      const existingScript = document.getElementById('seo-schema-script');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [title, description, url, image, schemaData]);

  return null;
};

export default SEO;
