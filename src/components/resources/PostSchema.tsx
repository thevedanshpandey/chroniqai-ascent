import { Helmet } from "react-helmet-async";
import { ResourcePost } from "@/data/resources/types";

interface PostSchemaProps {
  post: ResourcePost;
}

export function PostSchema({ post }: PostSchemaProps) {
  const pageUrl = post.seo?.canonicalUrl || `https://chroniqai.com/resources/${post.slug}`;
  const metaTitle = post.seo?.metaTitle || post.title;
  const metaDescription = post.seo?.metaDescription || post.metaDescription;

  // Standard high-fidelity Schema.org Article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    "headline": metaTitle,
    "description": metaDescription,
    "image": [post.coverImage],
    "datePublished": `${post.publishDate}T08:00:00+00:00`,
    "dateModified": `${post.updatedDate}T08:00:00+00:00`,
    "author": [
      {
        "@type": "Person",
        "name": "Vedansh Pandey",
        "jobTitle": "Founder & CEO",
        "url": "https://www.linkedin.com/in/vedansh-pandey/"
      },
      {
        "@type": "Person",
        "name": "Abhay Rawat",
        "jobTitle": "Co-Founder",
        "url": "https://www.linkedin.com/in/abhayrawat15/"
      }
    ],
    "publisher": {
      "@type": "Organization",
      "name": "ChroniqAI",
      "url": "https://chroniqai.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://chroniqai.com/favicon.ico",
      },
    },
  };

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://chroniqai.com",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Resources",
        "item": "https://chroniqai.com/resources",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": pageUrl,
      },
    ],
  };

  const faqSchema = post.faqs && post.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  } : null;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ChroniqAI",
    "url": "https://chroniqai.com",
    "logo": "https://chroniqai.com/favicon.ico",
    "description": "ChroniqAI Gravity — AI-Powered LinkedIn Client Acquisition for High-Ticket B2B Founders.",
    "founders": [
      {
        "@type": "Person",
        "name": "Vedansh Pandey",
        "jobTitle": "Founder & CEO",
        "url": "https://www.linkedin.com/in/vedansh-pandey/"
      },
      {
        "@type": "Person",
        "name": "Abhay Rawat",
        "jobTitle": "Co-Founder",
        "url": "https://www.linkedin.com/in/abhayrawat15/"
      }
    ],
    "sameAs": [
      "https://www.linkedin.com/company/chroniqai",
      "https://www.linkedin.com/in/vedansh-pandey/",
      "https://www.linkedin.com/in/abhayrawat15/"
    ],
  };

  // If WordPress Yoast or Rank Math gave us complete schema, inject that alongside
  const customWpSchema = post.seo?.schemaJsonLd;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbsSchema)}
      </script>
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      {customWpSchema && (
        <script type="application/ld+json">
          {JSON.stringify(customWpSchema)}
        </script>
      )}
    </Helmet>
  );
}
