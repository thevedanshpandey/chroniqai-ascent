export interface ResourceAuthor {
  name: string;
  role: string;
  avatar?: string;
  linkedinUrl?: string;
}

export interface ResourceFAQ {
  question: string;
  answer: string;
}

export interface TableRow {
  feature: string;
  traditional: string;
  gravity: string;
}

export interface ContentSection {
  id: string;
  heading: string;
  subheading?: string;
  content: string[]; // Paragraphs
  listItems?: string[];
  table?: {
    headers: string[];
    rows: TableRow[];
  };
  callout?: {
    type: "info" | "warning" | "success" | "tip";
    title: string;
    text: string;
  };
}

export interface TableOfContentsItem {
  id: string;
  heading: string;
  level: number;
}

export interface PostSeoData {
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogImage?: string;
  schemaJsonLd?: Record<string, unknown> | null;
  source?: "yoast" | "rank_math" | "standard" | "fallback";
}

export interface ResourcePost {
  id?: number | string;
  slug: string;
  title: string;
  metaDescription: string;
  category: string;
  author: ResourceAuthor;
  publishDate: string; // YYYY-MM-DD
  updatedDate: string; // YYYY-MM-DD
  readTime: string;
  coverImage: string;
  coverImageAlt: string;
  tldr: string;
  aiDirectAnswer: string;
  sections?: ContentSection[];
  contentHtml?: string; // Rich HTML content from WordPress
  toc?: TableOfContentsItem[]; // Dynamic TOC from H2/H3
  faqs: ResourceFAQ[];
  relatedPosts: string[]; // Slugs
  downloadableAsset?: {
    title: string;
    fileSize: string;
    format: string;
  };
  seo?: PostSeoData;
  isWordPressPost?: boolean;
}
