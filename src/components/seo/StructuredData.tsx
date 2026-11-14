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
    description: "ChroniqAI Gravity | AI-Powered LinkedIn Client Acquisition for High-Ticket B2B Founders.",
    foundingDate: "2024",
    founders: [
      {
        "@type": "Person",
        "@id": "https://chroniqai.com/#vedansh-pandey",
        name: "Vedansh Pandey",
        jobTitle: "Founder & CEO",
        url: "https://www.linkedin.com/in/vedansh-pandey/",
        sameAs: "https://www.linkedin.com/in/vedansh-pandey/",
        description: "Co-creator and architect of ChroniqAI Gravity client acquisition system."
      },
      {
        "@type": "Person",
        "@id": "https://chroniqai.com/#abhay-rawat",
        name: "Abhay Rawat",
        jobTitle: "Co-Founder",
        url: "https://www.linkedin.com/in/abhayrawat15/",
        sameAs: "https://www.linkedin.com/in/abhayrawat15/",
        description: "Co-founder of ChroniqAI and client acquisition systems architect."
      }
    ],
    sameAs: [
      "https://www.linkedin.com/company/chroniqai",
      "https://www.linkedin.com/in/vedansh-pandey/",
      "https://www.linkedin.com/in/abhayrawat15/"
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "ChroniqAI Gravity System",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "SoftwareApplication",
            "@id": "https://chroniqai.com/gravity#software",
            name: "ChroniqAI Gravity",
            description: "AI-powered LinkedIn client acquisition system for B2B founders with high-ticket offers.",
            url: "https://chroniqai.com/gravity"
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

// Software Application Schema for ChroniqAI Gravity
export function SoftwareApplicationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://chroniqai.com/gravity#software",
    name: "ChroniqAI Gravity",
    operatingSystem: "Cloud / Web-based",
    applicationCategory: "BusinessApplication",
    description: "AI-powered LinkedIn client acquisition system for B2B founders with high-ticket offers.",
    publisher: {
      "@type": "Organization",
      "@id": "https://chroniqai.com/#organization",
      name: "ChroniqAI"
    },
    offers: {
      "@type": "Offer",
      price: "Free Strategy Session & Pipeline Audit",
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
