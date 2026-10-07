import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, ArrowRight, Sparkles, Bot, Search, Cpu, Send, Eye } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { AuditModal } from "@/components/modals/AuditModal";

export const guidesData = [
  {
    slug: "/guides/what-is-ai-revenue-infrastructure",
    title: "What is AI Revenue Infrastructure?",
    category: "Architecture & Systems",
    readingTime: "8 min read",
    description: "A comprehensive analysis of why B2B companies are shifting from manual SDR teams and agency retainers to permanent software revenue infrastructure.",
    icon: Cpu
  },
  {
    slug: "/guides/ai-sdr-vs-human-sdr",
    title: "AI SDR vs Human SDR: The 2026 Pipeline Cost & Efficiency Analysis",
    category: "Benchmarking",
    readingTime: "10 min read",
    description: "An empirical comparison of CAC, monthly meeting velocity, response rates, and unit economics between human SDR reps and AI Revenue Infrastructure.",
    icon: Bot
  },
  {
    slug: "/guides/founder-authority-guide",
    title: "The B2B Founder Authority Playbook: Engineering Trust at Scale",
    category: "Executive Authority",
    readingTime: "7 min read",
    description: "How high-ticket B2B founders turn proprietary operational expertise into systematic authority across LinkedIn and industry channels to drive 3.8x outbound reply lift.",
    icon: Sparkles
  },
  {
    slug: "/guides/b2b-ai-outbound-guide",
    title: "B2B AI Outbound Systems Guide: Signal Intent & 10-K Vector Search",
    category: "Outbound Engineering",
    readingTime: "12 min read",
    description: "Step-by-step engineering breakdown of buying-intent signal triggers, SEC filing vector search, and hyper-personalized executive outreach.",
    icon: Send
  },
  {
    slug: "/guides/ai-search-visibility-guide",
    title: "Generative Engine Optimization (GEO): Ranking on ChatGPT & Perplexity",
    category: "AI Search Visibility",
    readingTime: "9 min read",
    description: "How B2B platforms optimize entity knowledge graphs, JSON-LD schema, and factual citations to become the default recommended answer on LLM search engines.",
    icon: Eye
  }
];

export default function GuidesIndex() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  return (
    <PageLayout>
      <SEOHead
        title="AI Revenue Infrastructure Guides & Search Knowledge Base | ChroniqAI"
        description="Definitive knowledge base and technical guides on AI Revenue Infrastructure, Generative Engine Optimization (GEO), AI SDRs, and B2B outbound architecture."
        canonical="https://chroniqai.com/guides"
        keywords="AI revenue infrastructure guides, AI SDR vs human SDR, GEO ranking guide, B2B AI outbound guide"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://chroniqai.com" },
          { name: "AI Guides", url: "https://chroniqai.com/guides" }
        ]}
      />

      <section className="relative pt-32 pb-20 text-left">
        <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6 mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 border border-primary/20 text-xs font-medium text-platinum">
              <BookOpen size={14} className="text-platinum-glow" />
              <span>AI Revenue Knowledge Base</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-luxury text-white tracking-tight">
              AI Revenue Systems Guides
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground font-modern max-w-2xl mx-auto leading-relaxed">
              Factual, highly cited, and mathematically rigorous documentation on building, operating, and scaling AI Revenue Infrastructure for high-ticket B2B.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {guidesData.map((guide, idx) => {
              const Icon = guide.icon;
              return (
                <motion.div
                  key={guide.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-8 rounded-2xl border border-glass-border bg-card/70 backdrop-blur-xl flex flex-col justify-between group hover:border-primary/50 transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-xl bg-secondary border border-border text-platinum-glow">
                        <Icon size={22} />
                      </div>
                      <span className="text-xs font-mono text-platinum bg-secondary/60 border border-border/40 px-3 py-1 rounded-full">
                        {guide.category}
                      </span>
                    </div>

                    <h2 className="text-2xl font-luxury text-white group-hover:text-platinum transition-colors">
                      {guide.title}
                    </h2>

                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {guide.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-border/40 flex items-center justify-between">
                    <span className="text-xs font-mono text-muted-foreground">{guide.readingTime}</span>
                    <Link
                      to={guide.slug}
                      className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors"
                    >
                      Read Full Guide <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-16 p-8 rounded-2xl border border-primary/30 bg-card/80 text-center space-y-4">
            <h3 className="text-2xl font-luxury text-white">Need Help Deploying This Architecture?</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Get a 45-minute revenue audit with ChroniqAI systems architects to evaluate your GTM stack.
            </p>
            <LuxuryButton
              variant="platinum"
              size="lg"
              onClick={() => setIsAuditModalOpen(true)}
              className="inline-flex items-center gap-2"
            >
              <span>Get Free Revenue System Audit</span>
              <ArrowRight size={18} />
            </LuxuryButton>
          </div>
        </div>
      </section>

      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
      />
    </PageLayout>
  );
}
