import { useState, useMemo, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { AuditModal } from "@/components/modals/AuditModal";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { TableOfContents } from "@/components/resources/TableOfContents";
import { PostCTA } from "@/components/resources/PostCTA";
import { PostSchema } from "@/components/resources/PostSchema";
import { ResourcePost as ResourcePostType } from "@/data/resources/types";
import { fetchWordPressPostBySlug, fetchWordPressPosts } from "@/services/wordpress";
import { getPostBySlug as getLocalPostBySlug, getRelatedPosts as getLocalRelatedPosts } from "@/data/resources/posts";
import { getUnlockedResource, saveUnlockedResource } from "@/services/leadCapture";
import {
  Calendar,
  Clock,
  ArrowRight,
  Share2,
  ChevronRight,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import { toast } from "sonner";

// Helper to split long HTML content around the midpoint for mid-article CTA placement
function splitHtmlContent(html: string): [string, string] {
  if (!html) return ["", ""];

  // 1. Try splitting after the middle </h2> tag
  const h2Matches = [...html.matchAll(/<\/h2>/gi)];
  if (h2Matches.length >= 2) {
    const splitIndex = Math.floor(h2Matches.length / 2);
    const targetMatch = h2Matches[splitIndex - 1];
    if (targetMatch && targetMatch.index !== undefined) {
      const cutPoint = targetMatch.index + targetMatch[0].length;
      return [html.slice(0, cutPoint), html.slice(cutPoint)];
    }
  }

  // 2. Fallback: Split after the middle paragraph </p> tag
  const pMatches = [...html.matchAll(/<\/p>/gi)];
  if (pMatches.length >= 4) {
    const splitIndex = Math.floor(pMatches.length / 2);
    const targetMatch = pMatches[splitIndex - 1];
    if (targetMatch && targetMatch.index !== undefined) {
      const cutPoint = targetMatch.index + targetMatch[0].length;
      return [html.slice(0, cutPoint), html.slice(cutPoint)];
    }
  }

  return [html, ""];
}

export default function ResourcePost() {
  const { slug } = useParams<{ slug: string }>();
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Persistent lead-capture unlock state keyed by slug
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
        <div className="pt-32 pb-24 container mx-auto px-6 max-w-4xl text-left space-y-8 animate-pulse">
          <div className="h-4 bg-secondary/80 rounded w-24" />
          <div className="h-12 bg-secondary/80 rounded w-4/5" />
          <div className="h-6 bg-secondary/60 rounded w-1/3" />
          <div className="aspect-[16/9] bg-secondary/60 rounded-2xl" />
          <div className="h-28 bg-secondary/40 rounded-2xl" />
        </div>
      </PageLayout>
    );
  }

  if (!post) return null;

  const pageCanonical =
    post.seo?.canonicalUrl || `https://chroniqai.com/resources/${post.slug}`;
  const seoTitle = post.seo?.metaTitle || `${post.title} — ChroniqAI Resources`;
  const seoDescription = post.seo?.metaDescription || post.metaDescription;

  // Split HTML content if post has WordPress rendered content
  const [firstHalfHtml, secondHalfHtml] = post.contentHtml
    ? splitHtmlContent(post.contentHtml)
    : ["", ""];

  // Split structured sections if post uses legacy section format
  const sections = post.sections || [];
  const midPoint = Math.ceil(sections.length / 2);
  const firstHalfSections = sections.slice(0, midPoint);
  const secondHalfSections = sections.slice(midPoint);

  return (
    <PageLayout>
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
              <div className="flex items-center gap-3">
                <img
                  src={
                    post.author.avatar ||
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80"
                  }
                  alt={post.author.name}
                  className="w-9 h-9 rounded-full object-cover border border-platinum/30"
                />
                <div>
                  <div className="text-white font-medium">
                    {post.author.name}
                  </div>
                  <div className="text-muted-foreground text-[11px]">
                    {post.author.role}
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

          {/* Main Grid: Content + Sticky Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
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
                    Apply for 14-Day Trial
                  </LuxuryButton>
                </div>
              </div>
            </aside>

            {/* Main Article Body on Right */}
            <main className="lg:col-span-8 order-1 lg:order-2 space-y-10">
              {/* WordPress Rendered Content (if available) */}
              {post.contentHtml ? (
                <>
                  <div
                    className="prose prose-invert prose-emerald max-w-none text-muted-foreground font-modern leading-relaxed space-y-6 prose-headings:font-luxury prose-headings:text-white prose-headings:tracking-tight prose-headings:scroll-mt-28 prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:leading-snug prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-sm sm:prose-p:text-base prose-p:leading-relaxed prose-a:text-platinum prose-a:underline hover:prose-a:text-white prose-strong:text-white prose-ul:my-4 prose-li:my-1 prose-table:border prose-table:border-glass-border prose-th:bg-secondary/80 prose-th:text-white prose-td:text-muted-foreground prose-img:rounded-xl"
                    dangerouslySetInnerHTML={{ __html: firstHalfHtml }}
                  />

                  {/* Mid-Article CTA Box */}
                  <PostCTA
                    variant="mid-article"
                    postTitle={post.title}
                    resourceSlug={slug || post.slug}
                    unlockedLink={unlockedLink}
                    onUnlocked={handleUnlocked}
                    onBookCallClick={() => setIsAuditModalOpen(true)}
                  />

                  {secondHalfHtml && (
                    <div
                      className="prose prose-invert prose-emerald max-w-none text-muted-foreground font-modern leading-relaxed space-y-6 prose-headings:font-luxury prose-headings:text-white prose-headings:tracking-tight prose-headings:scroll-mt-28 prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:leading-snug prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-sm sm:prose-p:text-base prose-p:leading-relaxed prose-a:text-platinum prose-a:underline hover:prose-a:text-white prose-strong:text-white prose-ul:my-4 prose-li:my-1 prose-table:border prose-table:border-glass-border prose-th:bg-secondary/80 prose-th:text-white prose-td:text-muted-foreground prose-img:rounded-xl"
                      dangerouslySetInnerHTML={{ __html: secondHalfHtml }}
                    />
                  )}
                </>
              ) : (
                /* Structured Sections (Legacy fallback) */
                <>
                  {firstHalfSections.map((section) => (
                    <section
                      key={section.id}
                      id={section.id}
                      className="space-y-4 scroll-mt-28"
                    >
                      <h2 className="text-2xl sm:text-3xl font-luxury text-white leading-snug">
                        {section.heading}
                      </h2>
                      {section.subheading && (
                        <p className="text-xs sm:text-sm font-mono text-platinum/80">
                          {section.subheading}
                        </p>
                      )}

                      <div className="space-y-4 text-muted-foreground text-sm sm:text-base font-modern leading-relaxed">
                        {section.content.map((p, pIdx) => (
                          <p key={pIdx}>{p}</p>
                        ))}
                      </div>

                      {section.listItems && (
                        <ul className="space-y-2.5 my-4 pt-2">
                          {section.listItems.map((item, lIdx) => (
                            <li
                              key={lIdx}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground"
                            >
                              <CheckCircle2
                                size={16}
                                className="text-platinum shrink-0 mt-0.5"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {section.table && (
                        <div className="my-6 overflow-x-auto rounded-xl border border-glass-border">
                          <table className="w-full text-left text-xs font-modern border-collapse">
                            <thead>
                              <tr className="bg-secondary/80 border-b border-border/80 text-white font-mono">
                                {section.table.headers.map((h, hIdx) => (
                                  <th key={hIdx} className="p-3.5">
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border/40 bg-card/40">
                              {section.table.rows.map((row, rIdx) => (
                                <tr
                                  key={rIdx}
                                  className="hover:bg-secondary/30 transition-colors"
                                >
                                  <td className="p-3.5 font-semibold text-white font-mono">
                                    {row.feature}
                                  </td>
                                  <td className="p-3.5 text-muted-foreground">
                                    {row.traditional}
                                  </td>
                                  <td className="p-3.5 text-platinum font-medium">
                                    {row.gravity}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {section.callout && (
                        <div
                          className={`my-6 p-5 rounded-xl border flex items-start gap-3 text-xs sm:text-sm ${
                            section.callout.type === "warning"
                              ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                              : "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                          }`}
                        >
                          {section.callout.type === "warning" ? (
                            <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                          ) : (
                            <Lightbulb size={18} className="shrink-0 mt-0.5" />
                          )}
                          <div>
                            <div className="font-bold font-mono uppercase tracking-wider mb-1">
                              {section.callout.title}
                            </div>
                            <div className="text-foreground/90 font-modern">
                              {section.callout.text}
                            </div>
                          </div>
                        </div>
                      )}
                    </section>
                  ))}

                  {/* Mid-Article CTA Box */}
                  <PostCTA
                    variant="mid-article"
                    postTitle={post.title}
                    resourceSlug={slug || post.slug}
                    unlockedLink={unlockedLink}
                    onUnlocked={handleUnlocked}
                    onBookCallClick={() => setIsAuditModalOpen(true)}
                  />

                  {secondHalfSections.map((section) => (
                    <section
                      key={section.id}
                      id={section.id}
                      className="space-y-4 scroll-mt-28"
                    >
                      <h2 className="text-2xl sm:text-3xl font-luxury text-white leading-snug">
                        {section.heading}
                      </h2>
                      {section.subheading && (
                        <p className="text-xs sm:text-sm font-mono text-platinum/80">
                          {section.subheading}
                        </p>
                      )}

                      <div className="space-y-4 text-muted-foreground text-sm sm:text-base font-modern leading-relaxed">
                        {section.content.map((p, pIdx) => (
                          <p key={pIdx}>{p}</p>
                        ))}
                      </div>

                      {section.listItems && (
                        <ul className="space-y-2.5 my-4 pt-2">
                          {section.listItems.map((item, lIdx) => (
                            <li
                              key={lIdx}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground"
                            >
                              <CheckCircle2
                                size={16}
                                className="text-platinum shrink-0 mt-0.5"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {section.table && (
                        <div className="my-6 overflow-x-auto rounded-xl border border-glass-border">
                          <table className="w-full text-left text-xs font-modern border-collapse">
                            <thead>
                              <tr className="bg-secondary/80 border-b border-border/80 text-white font-mono">
                                {section.table.headers.map((h, hIdx) => (
                                  <th key={hIdx} className="p-3.5">
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border/40 bg-card/40">
                              {section.table.rows.map((row, rIdx) => (
                                <tr
                                  key={rIdx}
                                  className="hover:bg-secondary/30 transition-colors"
                                >
                                  <td className="p-3.5 font-semibold text-white font-mono">
                                    {row.feature}
                                  </td>
                                  <td className="p-3.5 text-muted-foreground">
                                    {row.traditional}
                                  </td>
                                  <td className="p-3.5 text-platinum font-medium">
                                    {row.gravity}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {section.callout && (
                        <div
                          className={`my-6 p-5 rounded-xl border flex items-start gap-3 text-xs sm:text-sm ${
                            section.callout.type === "warning"
                              ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                              : "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                          }`}
                        >
                          {section.callout.type === "warning" ? (
                            <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                          ) : (
                            <Lightbulb size={18} className="shrink-0 mt-0.5" />
                          )}
                          <div>
                            <div className="font-bold font-mono uppercase tracking-wider mb-1">
                              {section.callout.title}
                            </div>
                            <div className="text-foreground/90 font-modern">
                              {section.callout.text}
                            </div>
                          </div>
                        </div>
                      )}
                    </section>
                  ))}
                </>
              )}

              {/* End-of-Article CTA Box */}
              <PostCTA
                variant="end-of-article"
                postTitle={post.title}
                resourceSlug={slug || post.slug}
                unlockedLink={unlockedLink}
                onUnlocked={handleUnlocked}
                onBookCallClick={() => setIsAuditModalOpen(true)}
              />

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
