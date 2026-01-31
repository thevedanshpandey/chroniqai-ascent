import { Helmet } from "react-helmet-async";

// Organization Schema
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://chroniqai.com/#organization",
    name: "ChroniqAI",
    url: "https://chroniqai.com",
    logo: "https://chroniqai.com/logo.png",
    description: "Infrastructure-grade AI systems powering automation, authority, and AI-native visibility. Automate. Scale. Dominate.",
    foundingDate: "2024",
    founders: [
      {
        "@type": "Person",
        "@id": "https://chroniqai.com/#vedansh-pandey",
        name: "Vedansh Pandey",
        jobTitle: "Founder & CEO",
        url: "https://chroniqai.com/about",
        sameAs: ["https://www.linkedin.com/in/vedansh-pandey"]
      },
      {
        "@type": "Person",
        "@id": "https://chroniqai.com/#abhay-rawat",
        name: "Abhay Rawat",
        jobTitle: "Co-Founder & Revenue Systems Architect",
        url: "https://chroniqai.com/about",
        description: "Creator of the IRONMAN System - an AI-powered acquisition framework for high-ticket businesses"
      }
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Delhi",
      addressCountry: "IN"
    },
    sameAs: [
      "https://www.linkedin.com/company/chroniqai"
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "ChroniqAI Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            "@id": "https://chroniqai.com/automation#service",
            name: "AI Automation Infrastructure",
            description: "Autonomous systems that qualify, convert, and operate at enterprise scale",
            url: "https://chroniqai.com/automation"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            "@id": "https://chroniqai.com/branding#service",
            name: "AI Personal Branding",
            description: "Fully AI-generated autonomous presence infrastructure for founders",
            url: "https://chroniqai.com/branding"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            "@id": "https://chroniqai.com/seo#service",
            name: "AI SEO & GEO",
            description: "AI-native visibility infrastructure - ranking on GPT, Gemini, Grok and knowledge graphs",
            url: "https://chroniqai.com/seo"
          }
        }
      ]
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

// Person Schema for Founders
interface PersonSchemaProps {
  name: string;
  jobTitle: string;
  description: string;
  expertise: string[];
  linkedIn?: string;
  id: string;
}

export function PersonSchema({ name, jobTitle, description, expertise, linkedIn, id }: PersonSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `https://chroniqai.com/#${id}`,
    name,
    jobTitle,
    description,
    url: "https://chroniqai.com/about",
    worksFor: {
      "@type": "Organization",
      "@id": "https://chroniqai.com/#organization",
      name: "ChroniqAI"
    },
    knowsAbout: expertise,
    sameAs: linkedIn ? [linkedIn] : []
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

// Service Schema
interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  features?: string[];
}

export function ServiceSchema({ name, description, url, features }: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: {
      "@type": "Organization",
      "@id": "https://chroniqai.com/#organization",
      name: "ChroniqAI"
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide"
    },
    ...(features && {
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${name} Features`,
        itemListElement: features.map((feature, index) => ({
          "@type": "Offer",
          position: index + 1,
          itemOffered: {
            "@type": "Service",
            name: feature
          }
        }))
      }
    })
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

// Website Schema with Sitelinks Search
export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://chroniqai.com/#website",
    name: "ChroniqAI",
    url: "https://chroniqai.com",
    description: "Infrastructure-grade AI systems powering automation, authority, and AI-native visibility",
    publisher: {
      "@type": "Organization",
      "@id": "https://chroniqai.com/#organization"
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://chroniqai.com/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

// Breadcrumb Schema
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
