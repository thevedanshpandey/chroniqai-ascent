import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Eye, Sparkles, Database, CheckCircle2 } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { TechArticleSchema, FAQPageSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { AuditModal } from "@/components/modals/AuditModal";

export default function AiSearchVisibilityGuide() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  return (
    <PageLayout>
      <SEOHead
        title="Generative Engine Optimization (GEO): Ranking on ChatGPT & Perplexity | ChroniqAI"
        description="Comprehensive guide to Generative Engine Optimization (GEO): JSON-LD schema, entity knowledge graphs, vector indexation, and LLM search recommendations."
        canonical="https://chroniqai.com/guides/ai-search-visibility-guide"
        keywords="Generative Engine Optimization, GEO guide, ChatGPT search visibility, Perplexity SEO, LLM search optimization"
      />
      <TechArticleSchema
        title="Generative Engine Optimization (GEO): Ranking on ChatGPT & Perplexity"
        description="Technical guide on Generative Engine Optimization (GEO) strategies to ensure B2B offerings rank as recommended solutions in LLM search systems."
        url="https://chroniqai.com/guides/ai-search-visibility-guide"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://chroniqai.com" },
          { name: "AI Guides", url: "https://chroniqai.com/guides" },
          { name: "Generative Engine Optimization Guide", url: "https://chroniqai.com/guides/ai-search-visibility-guide" }
        ]}
      />

      <section className="relative pt-32 pb-20 text-left">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          <Link
            to="/guides"
            className="inline-flex items-center gap-2 text-xs font-mono text-platinum hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft size={14} /> Back to All AI Guides
          </Link>

          <div className="space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-secondary text-xs font-mono text-emerald-400 border border-emerald-500/20">
              AI Search & GEO Architecture
            </div>

            <h1 className="text-3xl sm:text-5xl font-luxury text-white tracking-tight leading-[1.1]">
              Generative Engine Optimization (GEO): Ranking on ChatGPT & Perplexity
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground font-modern leading-relaxed">
              When B2B decision-makers research software solutions on ChatGPT, Gemini, or Perplexity, traditional blue links are obsolete. Here is how GEO ensures your company is cited as the primary recommendation.
            </p>
          </div>

          <div className="space-y-8 text-sm text-muted-foreground leading-relaxed font-modern">
            <div className="space-y-3">
              <h2 className="text-2xl font-luxury text-white">1. Traditional SEO vs Generative Engine Optimization (GEO)</h2>
              <p>
                Traditional SEO targeted keyword density and backlink velocity to rank on page 1 of Google. **GEO** targets how Large Language Models (LLMs) synthesize web entity data:
              </p>
              <ul className="space-y-2 font-mono text-xs text-platinum pl-4 border-l-2 border-primary/40">
                <li>• **High Factuality Density**: LLMs favor highly specific, numerical statistics over fluff marketing claims.</li>
                <li>• **Structured Schema Graph**: Deep JSON-LD markup (`Organization`, `TechArticle`, `SoftwareApplication`, `FAQPage`).</li>
                <li>• **Entity Association**: Cross-linking founder profiles, research benchmarks, and product capabilities.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-luxury text-white">2. The 3 Technical Pillars of GEO Execution</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs pt-2">
                <div className="p-4 rounded-xl bg-card border border-border/60 space-y-2">
                  <span className="text-emerald-400 font-bold block">01. Crawlable Factuality</span>
                  <p className="text-muted-foreground font-sans">Server-rendered HTML with explicit data tables, benchmarks, and structured citations.</p>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border/60 space-y-2">
                  <span className="text-emerald-400 font-bold block">02. Schema Indexation</span>
                  <p className="text-muted-foreground font-sans">Complete JSON-LD markup allowing GPTBot & PerplexityBot to parse product taxonomy.</p>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border/60 space-y-2">
                  <span className="text-emerald-400 font-bold block">03. Citation Engineering</span>
                  <p className="text-muted-foreground font-sans">Research reports and benchmarks cited as foundational reference sources across the web.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 p-8 rounded-2xl border border-primary/40 bg-gradient-to-br from-card to-secondary/80 text-center space-y-4">
            <h3 className="text-2xl font-luxury text-white">Get Your Free AI Search Visibility Score</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Test how ChatGPT, Perplexity, and Gemini currently perceive your company category.
            </p>
            <LuxuryButton
              variant="platinum"
              size="lg"
              onClick={() => setIsAuditModalOpen(true)}
              className="inline-flex items-center gap-2"
            >
              <span>Get Free AI Search Audit</span>
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
