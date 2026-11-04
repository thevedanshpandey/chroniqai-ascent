import {
  ResourcePost,
  TableOfContentsItem,
  ResourceFAQ,
  PostSeoData,
} from "@/data/resources/types";
import {
  RESOURCE_POSTS,
  getPostBySlug as getLocalPostBySlug,
  getAllCategories as getLocalCategories,
} from "@/data/resources/posts";

// Headless WordPress API Configuration
export const WP_API_BASE = "https://cms.chroniqai.com/wp-json/wp/v2";
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

// In-memory cache
interface CacheEntry<T> {
  timestamp: number;
  data: T;
}
const memoryCache = new Map<string, CacheEntry<unknown>>();

function getFromCache<T>(key: string): T | null {
  const memEntry = memoryCache.get(key);
  if (memEntry && Date.now() - memEntry.timestamp < CACHE_TTL_MS) {
    return memEntry.data as T;
  }

  if (typeof window !== "undefined" && window.sessionStorage) {
    try {
      const stored = sessionStorage.getItem(`wp_cache_${key}`);
      if (stored) {
        const parsed = JSON.parse(stored) as CacheEntry<T>;
        if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
          memoryCache.set(key, parsed);
          return parsed.data;
        }
      }
    } catch {
      // Ignore sessionStorage parsing or quota errors
    }
  }

  return null;
}

function setInCache<T>(key: string, data: T): void {
  const entry: CacheEntry<T> = { timestamp: Date.now(), data };
  memoryCache.set(key, entry);

  if (typeof window !== "undefined" && window.sessionStorage) {
    try {
      sessionStorage.setItem(`wp_cache_${key}`, JSON.stringify(entry));
    } catch {
      // Ignore sessionStorage errors
    }
  }
}

/**
 * Decodes HTML entities like &#8211;, &#8217;, &amp;, &quot;, &lt;, &gt;
 */
export function decodeHtmlEntities(str: string): string {
  if (!str) return "";
  if (typeof document !== "undefined") {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
  }
  return str
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8217;/g, "’")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#038;/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

/**
 * Strips HTML tags from a string to generate clean plain text.
 */
export function stripHtmlTags(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

/**
 * Creates a URL-friendly slug from text
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Extracts H2 and H3 headings from HTML content to build Table of Contents,
 * and ensures all headings have an id attribute for anchor navigation.
 */
export function processHeadingsAndToc(htmlContent: string): {
  processedHtml: string;
  toc: TableOfContentsItem[];
} {
  const toc: TableOfContentsItem[] = [];
  if (!htmlContent) return { processedHtml: "", toc };

  // 1. SEO Rule: Normalize internal <h1> tags to <h2> so the page strictly maintains a single H1 (the page title)
  let normalizedHtml = htmlContent.replace(/<h1([^>]*)>(.*?)<\/h1>/gi, "<h2$1>$2</h2>");

  // 2. Remove empty paragraphs sometimes output by WordPress blocks
  normalizedHtml = normalizedHtml.replace(/<p[^>]*>\s*(?:&nbsp;|<br\s*\/?>)?\s*<\/p>/gi, "");

  let count = 0;
  const processedHtml = normalizedHtml.replace(
    /<h([2-4])([^>]*)>(.*?)<\/h\1>/gi,
    (match, levelStr, attrs, innerText) => {
      const level = parseInt(levelStr, 10);
      const cleanTitle = decodeHtmlEntities(stripHtmlTags(innerText));
      if (!cleanTitle) return match;

      // Check if heading already has an id
      const idMatch = attrs.match(/id=["']([^"']+)["']/i);
      let id = idMatch ? idMatch[1] : "";
      if (!id) {
        id = slugify(cleanTitle) || `section-${count++}`;
      }

      // Add H2 and H3 to the Table of Contents for clear navigation
      if (level <= 3) {
        toc.push({
          id,
          heading: cleanTitle,
          level,
        });
      }

      // Clean or append id attribute to heading
      let newAttrs = attrs;
      if (!idMatch) {
        newAttrs = ` id="${id}"` + newAttrs;
      }

      return `<h${level}${newAttrs}>${innerText}</h${level}>`;
    }
  );

  return { processedHtml, toc };
}

/**
 * Calculates estimated read time from word count
 */
export function calculateReadTime(textOrHtml: string): string {
  const plainText = stripHtmlTags(textOrHtml);
  const words = plainText.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

// Typed interfaces for WordPress raw data
export interface WordPressRendered {
  rendered?: string;
}

export interface WordPressMediaItem {
  source_url?: string;
  alt_text?: string;
  media_details?: {
    sizes?: {
      large?: { source_url?: string };
      medium?: { source_url?: string };
    };
  };
}

export interface WordPressTermItem {
  id?: number;
  name?: string;
  slug?: string;
}

export interface WordPressAuthorItem {
  id?: number;
  name?: string;
  avatar_urls?: Record<string, string>;
}

export interface WordPressPostRaw {
  id?: number;
  slug?: string;
  date?: string;
  modified?: string;
  title?: WordPressRendered;
  content?: WordPressRendered;
  excerpt?: WordPressRendered;
  acf?: {
    tldr?: string;
    faqs?: Array<{
      question?: string;
      answer?: string;
      faq_question?: string;
      faq_answer?: string;
    }>;
  };
  meta?: Record<string, unknown>;
  rank_math_title?: string;
  rank_math_description?: string;
  rank_math_canonical_url?: string;
  rank_math_schema?: Record<string, unknown>;
  yoast_head_json?: {
    title?: string;
    description?: string;
    canonical?: string;
    og_image?: Array<{ url?: string }>;
    schema?: Record<string, unknown>;
  };
  _embedded?: {
    "wp:featuredmedia"?: WordPressMediaItem[];
    "wp:term"?: WordPressTermItem[][];
    author?: WordPressAuthorItem[];
  };
}

export interface WordPressCategoryRaw {
  id?: number;
  name?: string;
  slug?: string;
  count?: number;
}

/**
 * Extracts Rank Math / Yoast SEO metadata from a raw WordPress post object
 */
export function extractSeoData(rawPost: WordPressPostRaw): PostSeoData {
  // 1. Try Yoast SEO JSON
  if (rawPost.yoast_head_json) {
    const y = rawPost.yoast_head_json;
    return {
      metaTitle: decodeHtmlEntities(y.title || ""),
      metaDescription: decodeHtmlEntities(y.description || ""),
      canonicalUrl: y.canonical || undefined,
      ogImage: y.og_image?.[0]?.url || undefined,
      schemaJsonLd: y.schema || null,
      source: "yoast",
    };
  }

  // 2. Try Rank Math meta
  const rmTitle =
    rawPost.rank_math_title ||
    (rawPost.meta?.rank_math_title as string | undefined);
  const rmDesc =
    rawPost.rank_math_description ||
    (rawPost.meta?.rank_math_description as string | undefined);
  const rmCanonical =
    rawPost.rank_math_canonical_url ||
    (rawPost.meta?.rank_math_canonical_url as string | undefined);
  const rmSchema =
    rawPost.rank_math_schema ||
    (rawPost.meta?.rank_math_schema as Record<string, unknown> | undefined);

  if (rmTitle || rmDesc) {
    return {
      metaTitle: rmTitle ? decodeHtmlEntities(rmTitle) : undefined,
      metaDescription: rmDesc ? decodeHtmlEntities(rmDesc) : undefined,
      canonicalUrl: rmCanonical || undefined,
      schemaJsonLd: rmSchema || null,
      source: "rank_math",
    };
  }

  // 3. Standard fallback from WP core fields
  const fallbackTitle = rawPost.title?.rendered
    ? decodeHtmlEntities(stripHtmlTags(rawPost.title.rendered))
    : "";
  const fallbackDesc = rawPost.excerpt?.rendered
    ? decodeHtmlEntities(stripHtmlTags(rawPost.excerpt.rendered))
    : "";

  return {
    metaTitle: fallbackTitle ? `${fallbackTitle} — ChroniqAI Resources` : undefined,
    metaDescription: fallbackDesc || undefined,
    source: "standard",
  };
}

/**
 * Extracts FAQs from ACF, Yoast/RankMath schema, or HTML blocks
 */
export function extractFaqs(
  rawPost: WordPressPostRaw,
  contentHtml: string
): ResourceFAQ[] {
  const faqs: ResourceFAQ[] = [];

  // 1. From ACF faqs field
  if (Array.isArray(rawPost.acf?.faqs)) {
    rawPost.acf.faqs.forEach((item) => {
      const q = item.question || item.faq_question;
      const a = item.answer || item.faq_answer;
      if (q && a) {
        faqs.push({
          question: decodeHtmlEntities(stripHtmlTags(q)),
          answer: decodeHtmlEntities(stripHtmlTags(a)),
        });
      }
    });
    if (faqs.length > 0) return faqs;
  }

  // 2. From Yoast or Rank Math Schema graph if available
  const schema = rawPost.yoast_head_json?.schema || rawPost.rank_math_schema;
  if (schema) {
    const graph = Array.isArray(schema["@graph"])
      ? (schema["@graph"] as Array<Record<string, unknown>>)
      : [schema];
    const faqEntity = graph.find((entity) => entity["@type"] === "FAQPage");
    if (faqEntity && Array.isArray(faqEntity.mainEntity)) {
      (faqEntity.mainEntity as Array<Record<string, unknown>>).forEach((item) => {
        const acceptedAnswer = item.acceptedAnswer as Record<string, unknown> | undefined;
        if (item.name && acceptedAnswer?.text) {
          faqs.push({
            question: decodeHtmlEntities(stripHtmlTags(String(item.name))),
            answer: decodeHtmlEntities(
              stripHtmlTags(String(acceptedAnswer.text))
            ),
          });
        }
      });
      if (faqs.length > 0) return faqs;
    }
  }

  // 3. Fallback: Parse Yoast/Gutenberg FAQ blocks from HTML
  const faqBlockRegex =
    /<div class="[^"]*schema-faq-section[^"]*">[\s\S]*?<strong class="[^"]*schema-faq-question[^"]*">([\s\S]*?)<\/strong>[\s\S]*?<p class="[^"]*schema-faq-answer[^"]*">([\s\S]*?)<\/p>/gi;
  let match;
  while ((match = faqBlockRegex.exec(contentHtml)) !== null) {
    if (match[1] && match[2]) {
      faqs.push({
        question: decodeHtmlEntities(stripHtmlTags(match[1])),
        answer: decodeHtmlEntities(stripHtmlTags(match[2])),
      });
    }
  }

  // If still empty, supply foundational executive FAQs if relevant
  if (faqs.length === 0) {
    return [
      {
        question:
          "How does ChroniqAI Gravity ensure LinkedIn account safety during outreach?",
        answer:
          "Gravity uses dedicated residential IP proxies, automated browser fingerprint emulation, and humanized action intervals capped at a strict maximum of 20 connection requests daily to remain 100% compliant with platform health standards.",
      },
      {
        question:
          "Can these strategies be implemented for $10k+ to $100k+ enterprise offers?",
        answer:
          "Yes. Gravity is purpose-built for high-ticket B2B founders where deal sizes justify personalized account research, trigger signal monitoring, and peer-to-peer executive dialogue rather than spray-and-pray spam.",
      },
    ];
  }

  return faqs;
}

/**
 * Transforms a raw WordPress REST API post object into our unified ResourcePost
 */
export function transformWordPressPost(rawPost: WordPressPostRaw): ResourcePost {
  const cleanTitle = decodeHtmlEntities(
    stripHtmlTags(rawPost.title?.rendered || "Untitled Resource")
  );
  const rawContent = rawPost.content?.rendered || "";
  const rawExcerpt = rawPost.excerpt?.rendered || "";

  // Process Headings & Table of Contents
  const { processedHtml, toc } = processHeadingsAndToc(rawContent);

  // SEO metadata extraction
  const seo = extractSeoData(rawPost);

  // Featured Media
  let coverImage =
    rawPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    rawPost._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.large
      ?.source_url;
  const coverImageAlt =
    rawPost._embedded?.["wp:featuredmedia"]?.[0]?.alt_text ||
    seo.metaTitle ||
    cleanTitle;

  if (!coverImage) {
    coverImage =
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80";
  }

  // Category
  const categoryTerms = rawPost._embedded?.["wp:term"]?.[0] || [];
  const primaryCategory =
    categoryTerms.length > 0 && categoryTerms[0].name
      ? decodeHtmlEntities(categoryTerms[0].name)
      : "Acquisition Playbooks";

  // Published & Modified dates
  const pubDateStr = rawPost.date ? rawPost.date.split("T")[0] : "2026-07-20";
  const modDateStr = rawPost.modified
    ? rawPost.modified.split("T")[0]
    : pubDateStr;

  // TL;DR extraction: Check ACF -> Custom Meta -> Excerpt
  let tldr = "";
  if (rawPost.acf?.tldr) {
    tldr = decodeHtmlEntities(stripHtmlTags(rawPost.acf.tldr));
  } else if (rawPost.meta?.tldr && typeof rawPost.meta.tldr === "string") {
    tldr = decodeHtmlEntities(stripHtmlTags(rawPost.meta.tldr));
  } else if (rawExcerpt) {
    tldr = decodeHtmlEntities(stripHtmlTags(rawExcerpt));
  }
  if (!tldr) {
    tldr = `${cleanTitle}: A comprehensive guide and framework for high-ticket B2B founders implementing predictable client acquisition.`;
  }

  // Read time
  const readTime = calculateReadTime(rawContent || rawExcerpt);

  // FAQs
  const faqs = extractFaqs(rawPost, rawContent);

  return {
    id: rawPost.id,
    slug: rawPost.slug || slugify(cleanTitle),
    title: cleanTitle,
    metaDescription:
      seo.metaDescription ||
      stripHtmlTags(rawExcerpt).slice(0, 160) ||
      tldr.slice(0, 160),
    category: primaryCategory,
    author: {
      name: "Ved",
      role: "Founder of ChroniqAI",
      avatar:
        rawPost._embedded?.author?.[0]?.avatar_urls?.["96"] ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
      linkedinUrl: "https://www.linkedin.com/in/vedanshpandey/",
    },
    publishDate: pubDateStr,
    updatedDate: modDateStr,
    readTime,
    coverImage,
    coverImageAlt,
    tldr,
    aiDirectAnswer:
      tldr.length > 280 ? `${tldr.slice(0, 277)}...` : tldr,
    contentHtml: processedHtml,
    toc,
    faqs,
    relatedPosts: [],
    seo,
    isWordPressPost: true,
  };
}

/**
 * Fetches all posts from WordPress REST API with caching and graceful local fallback.
 */
export async function fetchWordPressPosts(options?: {
  search?: string;
  category?: string;
  page?: number;
  perPage?: number;
}): Promise<{ posts: ResourcePost[]; isFromWp: boolean; error?: string }> {
  const cacheKey = `posts_${options?.search || ""}_${options?.category || "all"}_${options?.page || 1}`;
  const cached = getFromCache<ResourcePost[]>(cacheKey);

  if (cached) {
    return { posts: cached, isFromWp: true };
  }

  try {
    const url = new URL(`${WP_API_BASE}/posts`);
    url.searchParams.set("_embed", "1");
    url.searchParams.set("per_page", String(options?.perPage || 20));
    if (options?.page) {
      url.searchParams.set("page", String(options.page));
    }
    if (options?.search) {
      url.searchParams.set("search", options.search);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

    const res = await fetch(url.toString(), {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`WordPress API returned HTTP ${res.status}`);
    }

    const rawPosts = (await res.json()) as WordPressPostRaw[];
    if (!Array.isArray(rawPosts)) {
      throw new Error("Invalid response format from WordPress API");
    }

    const transformedPosts = rawPosts.map(transformWordPressPost);

    // If WordPress has zero posts (new installation), merge local showcase posts
    const finalPosts =
      transformedPosts.length > 0 ? transformedPosts : RESOURCE_POSTS;

    setInCache(cacheKey, finalPosts);
    return { posts: finalPosts, isFromWp: transformedPosts.length > 0 };
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "WordPress API unreachable";

    let fallbackPosts = [...RESOURCE_POSTS];
    if (options?.search) {
      const q = options.search.toLowerCase();
      fallbackPosts = fallbackPosts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.tldr.toLowerCase().includes(q) ||
          p.metaDescription.toLowerCase().includes(q)
      );
    }
    if (options?.category && options.category !== "All") {
      fallbackPosts = fallbackPosts.filter(
        (p) => p.category.toLowerCase() === options.category?.toLowerCase()
      );
    }

    return {
      posts: fallbackPosts,
      isFromWp: false,
      error: errorMessage,
    };
  }
}

/**
 * Fetches a single post by slug from WordPress REST API, with fallback.
 */
export async function fetchWordPressPostBySlug(
  slug: string
): Promise<{ post: ResourcePost | undefined; isFromWp: boolean }> {
  let cleanSlug = "";
  try {
    cleanSlug = decodeURIComponent(slug || "").trim();
  } catch {
    cleanSlug = (slug || "").trim();
  }

  const cacheKey = `post_${cleanSlug}`;
  const cached = getFromCache<ResourcePost>(cacheKey);

  if (cached) {
    return { post: cached, isFromWp: true };
  }

  try {
    const url = new URL(`${WP_API_BASE}/posts`);
    url.searchParams.set("slug", cleanSlug);
    url.searchParams.set("_embed", "1");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(url.toString(), {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`WordPress API returned HTTP ${res.status}`);
    }

    const rawPosts = (await res.json()) as WordPressPostRaw[];
    if (Array.isArray(rawPosts) && rawPosts.length > 0) {
      const transformed = transformWordPressPost(rawPosts[0]);
      setInCache(cacheKey, transformed);
      return { post: transformed, isFromWp: true };
    }
  } catch {
    // Silently fallback to local catalog
  }

  // Fallback to local catalog
  const localPost = getLocalPostBySlug(slug);
  return { post: localPost, isFromWp: false };
}

/**
 * Fetches all categories from WordPress REST API, with fallback.
 */
export async function fetchWordPressCategories(): Promise<string[]> {
  const cacheKey = "categories";
  const cached = getFromCache<string[]>(cacheKey);
  if (cached) return cached;

  try {
    const url = `${WP_API_BASE}/categories?per_page=50`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const cats = (await res.json()) as WordPressCategoryRaw[];
      if (Array.isArray(cats) && cats.length > 0) {
        const catNames = cats
          .filter((c) => c.name && (c.count === undefined || c.count > 0))
          .map((c) => decodeHtmlEntities(c.name || ""));
        const merged = Array.from(
          new Set(["All", ...catNames, ...getLocalCategories().slice(1)])
        );
        setInCache(cacheKey, merged);
        return merged;
      }
    }
  } catch {
    // Silently fallback
  }

  return getLocalCategories();
}
