import React, { useState, useMemo, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { AuditModal } from "@/components/modals/AuditModal";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { TableOfContents } from "@/components/resources/TableOfContents";
import { PostCTA } from "@/components/resources/PostCTA";
import { PostSchema } from "@/components/resources/PostSchema";
import { ResourcePost as ResourcePostType } from "@/data/resources/types";
import { BRAND_ASSETS } from "@/lib/brandAssets";
import { fetchWordPressPostBySlug, fetchWordPressPosts } from "@/services/wordpress";
import { getPostBySlug as getLocalPostBySlug, getRelatedPosts as getLocalRelatedPosts } from "@/data/resources/posts";
import {
  getUnlockedResource,
  saveUnlockedResource,
  isLeadGateActive,
} from "@/services/leadCapture";
import {
  Calendar,
  Clock,
  ArrowRight,
  Share2,
  ChevronRight,
  CheckCircle2,
  HelpCircle,
  Linkedin,
  Sparkles,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import { toast } from "sonner";


export default function ResourcePost() {
  const { slug: rawSlug } = useParams<{ slug: string }>();

  // Ensure slug is cleanly decoded with decodeURIComponent
  const slug = useMemo(() => {
    if (!rawSlug) return "";
    try {
      return decodeURIComponent(rawSlug).trim();
    } catch {
      return rawSlug.trim();
    }
  }, [rawSlug]);

  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // LinkedIn or gate=1 parameter detection for top lead gate (persisted in sessionStorage)
  const [showTopGate, setShowTopGate] = useState<boolean>(() => isLeadGateActive());

  useEffect(() => {
    setShowTopGate(isLeadGateActive());
  }, []);

  // Persistent lead-capture unlock state keyed by decoded slug
  const [unlockedLink, setUnlockedLink] = useState<string | null>(() =>
    slug ? getUnlockedResource(slug) : null
  );

  useEffect(() => {
    if (slug) {
      setUnlockedLink(getUnlockedResource(slug));
    }
  }, [slug]);

  const handleUnlocked = (link: string) => {
    setUnlockedLink(link);
    if (slug) {
      saveUnlockedResource(slug, link);
    }
  };

  const [post, setPost] = useState<ResourcePostType | undefined>(() =>
    slug ? getLocalPostBySlug(slug) : undefined
  );
  const [relatedPosts, setRelatedPosts] = useState<ResourcePostType[]>(() =>
    slug ? getLocalRelatedPosts(slug) : []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [readingProgress, setReadingProgress] = useState<number>(0);

  // Track scroll reading progress for UX & engagement
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setReadingProgress(progress);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!slug) return;

    let isMounted = true;
    setIsLoading(true);

    fetchWordPressPostBySlug(slug).then((result) => {
      if (!isMounted) return;
      if (result.post) {
        setPost(result.post);
      }
      setIsLoading(false);
    });

    // Also fetch related posts
    fetchWordPressPosts().then((postsResult) => {
      if (!isMounted) return;
      const allPosts = postsResult.posts;
      const filtered = allPosts
        .filter((p) => p.slug !== slug)
        .slice(0, 2);
      setRelatedPosts(filtered);
    });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (!isLoading && !post) {
    return <Navigate to="/resources" replace />;
  }

  // Loading skeleton state
  if (isLoading && !post) {
    return (
      <PageLayout>
        <div className="pt-32 pb-24 container mx-auto px-6 max-w-4xl text-left space-y-8">
          <div className="flex justify-center pb-2">
            <img
              src={BRAND_ASSETS.brandLoader}
              alt="Loading ChroniqAI resource"
              className="h-14 w-auto object-contain"
            />
          </div>
          <div className="space-y-8 animate-pulse">
            <div className="h-4 bg-secondary/80 rounded w-24" />
            <div className="h-12 bg-secondary/80 rounded w-4/5" />
            <div className="h-6 bg-secondary/60 rounded w-1/3" />
            <div className="aspect-[16/9] bg-secondary/60 rounded-2xl" />
            <div className="h-28 bg-secondary/40 rounded-2xl" />
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!post) return null;

  const pageCanonical =
    post.seo?.canonicalUrl || `https://chroniqai.com/resources/${post.slug}`;
  const seoTitle = post.seo?.metaTitle || `${post.title} — ChroniqAI Resources`;
  const seoDescription = post.seo?.metaDescription || post.metaDescription;

  const sections = post.sections || [];

  // LinkedIn Lead Gate: Visitors with utm_medium=linkedin land on this page first
  // which ONLY contains the container and nothing else.
  // When they enter their details on the container, the resource is unlocked and revealed.
  if (showTopGate && !unlockedLink) {
    return (
      <PageLayout>
        <SEOHead
          title={seoTitle}
          description={seoDescription}
          canonical={pageCanonical}
          ogImage={post.seo?.ogImage || post.coverImage}
          ogType="article"
        />
        <PostSchema post={post} />

        <main className="pt-32 pb-24 relative overflow-hidden text-left min-h-[80vh] flex flex-col justify-center">
          {/* Subtle luxury ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[450px] hero-gradient pointer-events-none -z-10" />

          <div className="container mx-auto px-6 max-w-4xl">
            <PostCTA
              variant="top-gate"
              postTitle={post.title}
              resourceSlug={slug || post.slug}
              unlockedLink={null}
              onUnlocked={handleUnlocked}
              onBookCallClick={() => setIsAuditModalOpen(true)}
              allowSkip={false}
            />
          </div>
        </main>

        <AuditModal
          isOpen={isAuditModalOpen}
          onClose={() => setIsAuditModalOpen(false)}
        />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Reading Progress Indicator for Long-Form Guide UX */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-platinum via-platinum-glow to-white z-50 pointer-events-none transition-all duration-150 ease-out"
        style={{ width: `${readingProgress}%` }}
        aria-hidden="true"
      />

      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonical={pageCanonical}
        ogImage={post.seo?.ogImage || post.coverImage}
        ogType="article"
      />

      {/* JSON-LD Schema (Article, Breadcrumbs, FAQPage, Organization + Rank Math / Yoast) */}
      <PostSchema post={post} />

      <article className="pt-28 pb-24 relative overflow-hidden text-left">
        {/* Glow backdrop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] hero-gradient pointer-events-none -z-10" />

        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumbs" className="mb-8">
            <ol className="flex items-center gap-2 text-xs font-mono text-muted-foreground flex-wrap">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight size={12} />
              </li>
              <li>
                <Link to="/resources" className="hover:text-white transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <ChevronRight size={12} />
              </li>
              <li>
                <span className="text-platinum font-semibold">{post.category}</span>
              </li>
            </ol>
          </nav>

          {/* Article Header */}
          <header className="space-y-6 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-primary/20 text-xs font-mono text-platinum">
              <Sparkles size={12} className="text-platinum-glow" />
              <span>{post.category}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-luxury text-white tracking-tight leading-[1.15]">
              {post.title}
            </h1>

            {/* Author Byline & Metadata Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-border/50 text-xs font-mono text-muted-foreground">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-secondary border border-platinum/40 flex items-center justify-center text-[10px] font-luxury font-bold text-platinum">
                    VP
                  </div>
                  <div>
                    <a
                      href="https://www.linkedin.com/in/vedansh-pandey/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-platinum font-medium inline-flex items-center gap-1 transition-colors hover:underline underline-offset-2"
                    >
                      <span>Vedansh Pandey</span>
                      <Linkedin size={11} className="text-[#0A66C2]" />
                    </a>
                    <div className="text-muted-foreground text-[10px]">
                      Founder & CEO
                    </div>
                  </div>
                </div>

                <span className="text-border">|</span>

                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-secondary border border-platinum/40 flex items-center justify-center text-[10px] font-luxury font-bold text-platinum">
                    AR
                  </div>
                  <div>
                    <a
                      href="https://www.linkedin.com/in/abhayrawat15/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-platinum font-medium inline-flex items-center gap-1 transition-colors hover:underline underline-offset-2"
                    >
                      <span>Abhay Rawat</span>
                      <Linkedin size={11} className="text-[#0A66C2]" />
                    </a>
                    <div className="text-muted-foreground text-[10px]">
                      Co-Founder
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} />
                  Published {post.publishDate}
                </span>
                <span className="text-muted-foreground/40">•</span>
                <span className="text-platinum-glow">
                  Updated {post.updatedDate}
                </span>
                <span className="text-muted-foreground/40">•</span>
                <span className="flex items-center gap-1.5">
                  <Clock size={13} />
                  {post.readTime}
                </span>
                <button
                  type="button"
                  onClick={handleShare}
                  className="p-1.5 rounded-lg bg-secondary/60 hover:bg-secondary hover:text-white transition-colors"
                  aria-label="Share article link"
                >
                  <Share2 size={14} />
                </button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="rounded-2xl overflow-hidden border border-glass-border aspect-[16/9] max-h-[460px] bg-secondary/40">
              <img
                src={post.coverImage}
                alt={post.coverImageAlt}
                className="w-full h-full object-cover"
              />
            </div>

            {/* TL;DR Summary Box (Crucial for Readers & AI Crawlers) */}
            <aside
              aria-label="Article Executive Summary"
              className="p-6 md:p-8 rounded-2xl border border-platinum/30 bg-card/80 backdrop-blur-xl space-y-3 relative overflow-hidden"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-platinum">
                <Sparkles size={14} className="text-platinum-glow" />
                <span>Executive Summary (TL;DR)</span>
              </div>
              <p className="text-sm md:text-base text-platinum font-modern leading-relaxed">
                {post.tldr}
              </p>
            </aside>

            {/* AI Direct Answer Block */}
            {post.aiDirectAnswer && (
              <div className="p-5 rounded-xl bg-secondary/40 border border-border/50 text-sm font-modern text-muted-foreground leading-relaxed">
                <span className="font-mono text-xs font-semibold text-white block mb-1">
                  Direct Answer:
                </span>
                {post.aiDirectAnswer}
              </div>
            )}
          </header>

          {/* LinkedIn-Only Lead Gate: appears BEFORE the article only if utm_source=linkedin or gate=1 */}
          {showTopGate && (
            <section aria-label="Access Resource Playbook" className="mb-10 animate-in fade-in duration-300">
              <PostCTA
                variant="top-gate"
                postTitle={post.title}
                resourceSlug={slug || post.slug}
                unlockedLink={unlockedLink}
                onUnlocked={handleUnlocked}
                onBookCallClick={() => setIsAuditModalOpen(true)}
                onScrollToArticle={() => {
                  const target = document.getElementById("article-content");
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
              />
            </section>
          )}

          {/* Main Grid: Content + Sticky Sidebar */}
          <div id="article-content" className="grid grid-cols-1 lg:grid-cols-12 gap-10 scroll-mt-28">
            {/* Sticky TOC on Left / Desktop */}
            <aside className="lg:col-span-4 order-2 lg:order-1">
              <div className="lg:sticky lg:top-28 space-y-6">
                <TableOfContents
                  sections={post.sections}
                  items={post.toc}
                />

                {/* Quick Gravity Callout */}
                <div className="p-6 rounded-2xl border border-glass-border bg-card/60 text-left space-y-3">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-platinum font-bold">
                    ChroniqAI Gravity
                  </span>
                  <h4 className="text-base font-luxury text-white">
                    Need high-ticket meetings on your calendar?
                  </h4>
                  <p className="text-xs text-muted-foreground font-modern leading-relaxed">
                    We deploy the entire infrastructure, warmup safety, intent signal feeds, and reply-booking pipeline for you.
                  </p>
                  <LuxuryButton
                    variant="platinum"
                    size="sm"
                    onClick={() => setIsAuditModalOpen(true)}
                    className="w-full mt-2"
                  >
                    Book a Free Strategy Session
                  </LuxuryButton>
                </div>
              </div>
            </aside>

            {/* Main Article Body on Right */}
            <main className="lg:col-span-8 order-1 lg:order-2 space-y-12">
              {/* WordPress Rendered Content (if available) */}
              {post.contentHtml ? (
                <div
                  className="blog-article-content max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                />
              ) : (
                /* Structured Sections (Legacy fallback) */
                <div className="blog-article-content max-w-none">
                  {sections.map((section) => (
                    <section
                      key={section.id}
                      id={section.id}
                      className="scroll-mt-28"
                    >
                      <h2>{section.heading}</h2>
                      {section.subheading && (
                        <h3>{section.subheading}</h3>
                      )}

                      {section.content.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}

                      {section.listItems && (
                        <ul>
                          {section.listItems.map((item, lIdx) => (
                            <li key={lIdx}>{item}</li>
                          ))}
                        </ul>
                      )}

                      {section.table && (
                        <div className="my-6 overflow-x-auto rounded-xl border border-glass-border">
                          <table>
                            <thead>
                              <tr>
                                {section.table.headers.map((h, hIdx) => (
                                  <th key={hIdx}>{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {section.table.rows.map((row, rIdx) => (
                                <tr key={rIdx}>
                                  <td className="font-semibold text-white font-mono">
                                    {row.feature}
                                  </td>
                                  <td>{row.traditional}</td>
                                  <td className="text-platinum font-medium">
                                    {row.gravity}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {section.callout && (
                        <blockquote className="my-6">
                          <div className="font-bold font-mono uppercase tracking-wider mb-1 text-platinum not-italic text-xs">
                            {section.callout.title}
                          </div>
                          <p className="not-italic text-sm sm:text-base">
                            {section.callout.text}
                          </p>
                        </blockquote>
                      )}
                    </section>
                  ))}
                </div>
              )}

              {/* End-of-Article CTA Box - ONLY shown if visitor is from LinkedIn */}
              {showTopGate && (
                <PostCTA
                  variant="end-of-article"
                  postTitle={post.title}
                  resourceSlug={slug || post.slug}
                  unlockedLink={unlockedLink}
                  onUnlocked={handleUnlocked}
                  onBookCallClick={() => setIsAuditModalOpen(true)}
                />
              )}

              {/* FAQs Section */}
              {post.faqs && post.faqs.length > 0 && (
                <section className="my-16 space-y-6 pt-6 border-t border-border/60">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-platinum">
                    <HelpCircle size={14} className="text-platinum-glow" />
                    <span>Frequently Asked Questions</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-luxury text-white">
                    Questions Decision-Makers Ask About This Strategy
                  </h3>

                  <div className="space-y-3">
                    {post.faqs.map((faq, fIdx) => {
                      const isOpen = openFaqIndex === fIdx;
                      return (
                        <div
                          key={fIdx}
                          className="rounded-xl border border-glass-border bg-card/60 overflow-hidden transition-all duration-200"
                        >
                          <button
                            onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                            className="w-full text-left p-5 flex items-center justify-between gap-4 font-luxury text-base sm:text-lg text-white hover:text-platinum transition-colors"
                          >
                            <span>{faq.question}</span>
                            <span className="font-mono text-xs text-muted-foreground shrink-0">
                              {isOpen ? "−" : "+"}
                            </span>
                          </button>
                          {isOpen && (
                            <div className="px-5 pb-5 pt-1 text-sm text-muted-foreground font-modern leading-relaxed border-t border-border/30 animate-in fade-in duration-200">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Related Posts Section */}
              {relatedPosts.length > 0 && (
                <section className="my-16 pt-8 border-t border-border/60 space-y-6">
                  <h3 className="text-2xl font-luxury text-white">
                    Related Playbooks & Resources
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {relatedPosts.map((related) => (
                      <Link
                        key={related.slug}
                        to={`/resources/${related.slug}`}
                        className="p-6 rounded-xl border border-glass-border bg-card/60 hover:border-primary/50 transition-all group flex flex-col justify-between"
                      >
                        <div>
                          <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-secondary border border-border text-platinum">
                            {related.category}
                          </span>
                          <h4 className="text-base font-luxury text-white group-hover:text-platinum transition-colors mt-3 line-clamp-2">
                            {related.title}
                          </h4>
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-2">
                            {related.tldr}
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs font-mono text-platinum">
                          <span>{related.readTime}</span>
                          <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            Read <ArrowRight size={12} />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </main>
          </div>
        </div>
      </article>

      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
      />
    </PageLayout>
  );
}
