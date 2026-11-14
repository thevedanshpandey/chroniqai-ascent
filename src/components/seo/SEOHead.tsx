import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string;
}

export function SEOHead({
  title,
  description,
  canonical,
  ogImage = "https://chroniqai.com/og-image.png",
  ogType = "website",
  keywords,
}: SEOHeadProps) {
  const fullTitle = title.includes("ChroniqAI") ? title : `${title} | ChroniqAI`;
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:site_name" content="ChroniqAI" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* GEO Optimization - AI Crawlers */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    </Helmet>
  );
}
