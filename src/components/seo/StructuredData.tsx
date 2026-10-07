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
    description: "AI Revenue Infrastructure Platform for High-Ticket B2B Companies.",
    foundingDate: "2024",
    founders: [
      {
        "@type": "Person",
        "@id": "https://chroniqai.com/#vedansh-pandey",
        name: "Vedansh Pandey",
        jobTitle: "Founder & Platform Architect",
        url: "https://chroniqai.com/how-we-think",
        description: "Designs the architecture behind IRONMAN AI Revenue Infrastructure."
      },
      {
        "@type": "Person",
        "@id": "https://chroniqai.com/#abhay-rawat",
        name: "Abhay Rawat",
        jobTitle: "Co-Founder & Revenue Systems Architect",
        url: "https://chroniqai.com/how-we-think",
        description: "Helps B2B founders build predictable revenue pipeline engines."
      }
    ],
    sameAs: [
      "https://www.linkedin.com/company/chroniqai"
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "IRONMAN Revenue Infrastructure Platform Modules",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "SoftwareApplication",
            "@id": "https://chroniqai.com/ironman#software",
            name: "IRONMAN Outbound Module",
            description: "Books qualified meetings through signal-based 10-K research and intent triggers.",
            url: "https://chroniqai.com/ironman"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            "@id": "https://chroniqai.com/solutions#authority",
            name: "IRONMAN Authority Module",
            description: "Systematizes executive thought leadership and founder brand trust.",
            url: "https://chroniqai.com/solutions"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            "@id": "https://chroniqai.com/solutions#visibility",
            name: "IRONMAN Visibility Module",
            description: "Ranks B2B solutions in ChatGPT, Perplexity, and AI search engines.",
            url: "https://chroniqai.com/solutions"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            "@id": "https://chroniqai.com/solutions#operations",
            name: "IRONMAN Operations Module",
            description: "Automates CRM sync, lead enrichment, sentiment scoring, and calendar routing.",
            url: "https://chroniqai.com/solutions"
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

// Software Application Schema for IRONMAN Platform
export function SoftwareApplicationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://chroniqai.com/ironman#software",
    name: "IRONMAN AI Revenue Infrastructure",
    operatingSystem: "Cloud / Web-based",
    applicationCategory: "BusinessApplication",
    description: "Proprietary AI Revenue Infrastructure platform automating intent discovery, executive research, and pipeline placement for B2B enterprises.",
    publisher: {
      "@type": "Organization",
      "@id": "https://chroniqai.com/#organization",
      name: "ChroniqAI"
    },
    offers: {
      "@type": "Offer",
      price: "Custom Enterprise",
      priceCurrency: "USD"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

// Article / Case Study Schema
interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  authorName?: string;
  image?: string;
}

export function ArticleSchema({
  title,
  description,
  url,
  datePublished = "2026-07-01",
  authorName = "ChroniqAI Research Lab",
  image = "https://chroniqai.com/og-image.png"
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    mainEntityOfPage: url,
    datePublished: datePublished,
    author: {
      "@type": "Organization",
      name: authorName,
      url: "https://chroniqai.com"
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://chroniqai.com/#organization",
      name: "ChroniqAI"
    },
    image: image
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

// TechArticle Schema for Guides & Knowledge Base
interface TechArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  proficiencyLevel?: string;
}

export function TechArticleSchema({
  title,
  description,
  url,
  proficiencyLevel = "Expert"
}: TechArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description: description,
    mainEntityOfPage: url,
    proficiencyLevel: proficiencyLevel,
    publisher: {
      "@type": "Organization",
      "@id": "https://chroniqai.com/#organization",
      name: "ChroniqAI"
    },
    author: {
      "@type": "Organization",
      name: "ChroniqAI Systems Engineering"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

// FAQ Page Schema
interface FAQItem {
  question: string;
  answer: string;
}

export function FAQPageSchema({ faqs }: { faqs: FAQItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
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
