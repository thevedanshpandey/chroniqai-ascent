import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { AuditModal } from "@/components/modals/AuditModal";
import {
  BookOpen,
  Search,
  Clock,
  Calendar,
  ArrowRight,
  Sparkles,
  X,
  RefreshCw,
  Layers,
} from "lucide-react";
import { ResourcePost } from "@/data/resources/types";
import {
  fetchWordPressPosts,
  fetchWordPressCategories,
  WP_API_BASE,
} from "@/services/wordpress";
import { RESOURCE_POSTS, getAllCategories as getLocalCategories } from "@/data/resources/posts";

export default function Resources() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [posts, setPosts] = useState<ResourcePost[]>(RESOURCE_POSTS);
  const [categories, setCategories] = useState<string[]>(getLocalCategories());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFromWordPress, setIsFromWordPress] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const [postsResult, catsResult] = await Promise.all([
        fetchWordPressPosts(),
        fetchWordPressCategories(),
      ]);

      if (postsResult.posts && postsResult.posts.length > 0) {
        setPosts(postsResult.posts);
      }
      if (catsResult && catsResult.length > 0) {
        setCategories(catsResult);
      }
      setIsFromWordPress(postsResult.isFromWp);
      if (postsResult.error && !postsResult.isFromWp) {
        setFetchError(postsResult.error);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to sync with WordPress";
      setFetchError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter posts based on search query and category
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" ||
        post.category.toLowerCase() === selectedCategory.toLowerCase();
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.tldr.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.metaDescription.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [posts, searchQuery, selectedCategory]);

  return (
    <PageLayout>
      <SEOHead
        title="Resources & Playbooks — ChroniqAI Gravity"
        description="Explore in-depth playbooks, benchmark studies, account safety guides, and frameworks for high-ticket B2B LinkedIn client acquisition."
        canonical="https://chroniqai.com/resources"
      />

      <div className="pt-32 pb-24 relative overflow-hidden text-left">
        {/* Glow backdrop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] hero-gradient pointer-events-none -z-10" />

        <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6 mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/80 border border-primary/20 text-xs font-medium text-platinum">
              <BookOpen size={14} className="text-platinum-glow" />
              <span>Empirical Data, Playbooks & Architecture</span>
              {isFromWordPress && (
                <span className="ml-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
                  Headless CMS Active
                </span>
              )}
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-luxury text-white tracking-tight leading-[1.1]">
              ChroniqAI Resources
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground font-modern max-w-2xl mx-auto leading-relaxed">
              Step-by-step guides, safety benchmarks, and tactical playbooks to acquire high-ticket B2B clients on LinkedIn.
            </p>
          </motion.div>

          {/* Search & Category Filter Bar */}
          <div className="mb-12 space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
              {/* Search input */}
              <div className="relative flex-1 max-w-md">
                <Search
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="text"
                  placeholder="Search guides, intent signals, safety rules..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-card/80 border border-glass-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-platinum transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                      selectedCategory.toLowerCase() === cat.toLowerCase()
                        ? "bg-platinum text-background font-semibold shadow-md"
                        : "bg-secondary/60 text-muted-foreground hover:text-white hover:bg-secondary border border-border/50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Post Grid or Loading Skeleton or Empty State */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="rounded-2xl border border-glass-border bg-card/40 overflow-hidden flex flex-col justify-between animate-pulse"
                >
                  <div className="aspect-[16/9] bg-secondary/60" />
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-secondary/80 rounded w-1/3" />
                    <div className="h-6 bg-secondary/80 rounded w-5/6" />
                    <div className="h-4 bg-secondary/60 rounded w-full" />
                    <div className="h-4 bg-secondary/60 rounded w-4/5" />
                  </div>
                  <div className="p-6 pt-0 border-t border-border/30 flex justify-between items-center">
                    <div className="h-4 bg-secondary/60 rounded w-20" />
                    <div className="h-4 bg-secondary/60 rounded w-16" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="p-12 text-center rounded-2xl border border-glass-border bg-card/40 my-8 space-y-4">
              <Layers size={36} className="text-muted-foreground/60 mx-auto" />
              <p className="text-muted-foreground text-base">
                No guides found matching &quot;{searchQuery || selectedCategory}&quot;.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="px-4 py-2 rounded-lg bg-secondary text-xs font-mono text-platinum hover:text-white border border-border transition-colors"
                >
                  Clear all filters
                </button>
                <button
                  onClick={loadData}
                  className="px-4 py-2 rounded-lg bg-secondary/50 text-xs font-mono text-muted-foreground hover:text-white border border-border/50 flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw size={12} />
                  <span>Sync with CMS</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, idx) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="rounded-2xl border border-glass-border bg-card/70 backdrop-blur-xl overflow-hidden flex flex-col justify-between group hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
                >
                  <div>
                    {/* Cover Image */}
                    <Link
                      to={`/resources/${post.slug}`}
                      className="block relative aspect-[16/9] overflow-hidden bg-secondary/50"
                    >
                      <img
                        src={post.coverImage}
                        alt={post.coverImageAlt}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="font-mono text-[11px] font-semibold px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-md border border-border text-platinum">
                          {post.category}
                        </span>
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-6 space-y-3">
                      {/* Meta dates and read time */}
                      <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {post.publishDate}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {post.readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-luxury text-white group-hover:text-platinum transition-colors leading-snug">
                        <Link to={`/resources/${post.slug}`}>{post.title}</Link>
                      </h2>

                      {/* Summary */}
                      <p className="text-muted-foreground text-xs sm:text-sm line-clamp-3 leading-relaxed font-modern">
                        {post.tldr}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 pb-6 pt-2 border-t border-border/40 mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-[10px] font-mono text-platinum font-bold">
                        {post.author.name.charAt(0)}
                      </div>
                      <span className="text-xs font-modern text-muted-foreground">
                        {post.author.name}
                      </span>
                    </div>

                    <Link
                      to={`/resources/${post.slug}`}
                      className="text-xs font-mono text-platinum hover:text-white flex items-center gap-1 group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Read Guide</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {/* Bottom Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 p-10 md:p-14 rounded-2xl border border-glass-border bg-gradient-card text-center space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl font-luxury text-white">
              Want These Outbound Systems Deployed For You?
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed font-modern">
              Book a free strategy session with our founders to get a free pipeline audit and see how ChroniqAI Gravity fills your calendar with qualified B2B decision-makers.
            </p>
            <div className="pt-4">
              <LuxuryButton
                variant="platinum"
                size="lg"
                onClick={() => setIsAuditModalOpen(true)}
              >
                Book a Free Strategy Session & Pipeline Audit
                <ArrowRight size={18} className="ml-2" />
              </LuxuryButton>
            </div>
          </motion.div>
        </div>
      </div>

      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
      />
    </PageLayout>
  );
}
