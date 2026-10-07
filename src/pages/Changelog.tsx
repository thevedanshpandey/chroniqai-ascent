import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GitCommit, Sparkles, Cpu, Send, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { TechArticleSchema } from "@/components/seo/StructuredData";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { AuditModal } from "@/components/modals/AuditModal";

interface ReleaseLog {
  version: string;
  date: string;
  badge?: string;
  title: string;
  description: string;
  highlights: string[];
  category: "IRONMAN Engine" | "AI Search (GEO)" | "CRM Operations" | "Security & Deliverability";
}

const releases: ReleaseLog[] = [
  {
    version: "v2.1.0",
    date: "July 24, 2026",
    badge: "Major Update",
    title: "10-K SEC Vector Search & Podcast Transcription Synthesis",
    description: "Upgraded the IRONMAN research engine with dense embedding vector pipelines for SEC filings and executive podcast transcripts.",
    category: "IRONMAN Engine",
    highlights: [
      "Extracted quarterly 10-K priority topics and mapped them automatically to B2B value props.",
      "Synthesized executive quotes from Spotify & YouTube podcast transcripts into hyper-personalized opening sentences.",
      "Reduced signal processing latency by 42% via parallel LLM inference workers."
    ]
  },
  {
    version: "v2.0.4",
    date: "July 12, 2026",
    title: "Perplexity & ChatGPT Generative Engine Indexation",
    description: "Deployed structured citation modules ensuring client solution offerings rank as primary recommendations in LLM searches.",
    category: "AI Search (GEO)",
    highlights: [
      "Introduced AI Search visibility index scoring across OpenAI GPT-4o, Perplexity Pro, and Gemini 1.5 Pro.",
      "Automated JSON-LD TechArticle schema generator for all research reports.",
      "Achieved #1 AI recommended position for DevOps, Cybersecurity, and AI SaaS client categories."
    ]
  },
  {
    version: "v1.9.2",
    date: "June 28, 2026",
    title: "Zero-Latency Calendar Routing & Sentiment Classifier",
    description: "Enhanced response handling with real-time sentiment scoring and instant calendar routing.",
    category: "CRM Operations",
    highlights: [
      "Categorized prospect responses automatically into Interested, Out of Office, Not a Fit, or Referral.",
      "Dispatched zero-latency calendar booking links directly to prospect inbox upon high-intent sentiment detection.",
      "Synced bidirectionally with HubSpot Deals and Salesforce Opportunity pipelines."
    ]
  },
  {
    version: "v1.8.0",
    date: "June 14, 2026",
    title: "Domain Health Guardian & Smart Deliverability Capping",
    description: "Engineered automated domain warm-up and hourly email distribution throttles to maintain 99.4% inbox placement.",
    category: "Security & Deliverability",
    highlights: [
      "Dynamic spintax variation with contextual AI semantic rephrasing.",
      "Automated SPF/DKIM/DMARC health verification checks every 6 hours.",
      "Instant automatic pause mechanism if bounce rate exceeds 1.2% threshold."
    ]
  }
];

export default function Changelog() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  return (
    <PageLayout>
      <SEOHead
        title="Product Changelog & Platform Releases | ChroniqAI"
        description="Follow the continuous release notes and feature updates of the IRONMAN AI Revenue Infrastructure platform. Engineering updates published regularly."
        canonical="https://chroniqai.com/changelog"
        keywords="ChroniqAI changelog, IRONMAN platform releases, AI SDR updates, B2B outbound features, release notes"
      />
      <TechArticleSchema
        title="ChroniqAI IRONMAN Product Changelog"
        description="Official release documentation and system improvements for the IRONMAN AI Revenue Infrastructure platform."
        url="https://chroniqai.com/changelog"
      />

      <section className="relative pt-32 pb-20 text-left">
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 border border-primary/20 text-xs font-medium text-platinum">
              <GitCommit size={14} className="text-platinum-glow" />
              <span>Platform Engineering Log</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-luxury text-white tracking-tight">
              Product Changelog
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground font-modern max-w-2xl leading-relaxed">
              We build revenue infrastructure like a software product. Here is the continuous release log of feature enhancements, AI research engines, and system optimizations powering IRONMAN™.
            </p>
          </motion.div>

          <div className="space-y-12">
            {releases.map((rel, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-2xl border border-glass-border bg-card/60 backdrop-blur-xl relative overflow-hidden"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border/40 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-lg font-bold text-white px-3 py-1 rounded bg-secondary border border-border">
                      {rel.version}
                    </span>
                    {rel.badge && (
                      <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                        {rel.badge}
                      </span>
                    )}
                    <span className="text-xs font-mono text-platinum px-2.5 py-1 rounded bg-secondary/50">
                      {rel.category}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">{rel.date}</span>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-luxury text-white">{rel.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{rel.description}</p>

                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-mono text-platinum uppercase tracking-wider">
                      Key Capabilities Included:
                    </div>
                    <ul className="space-y-2">
                      {rel.highlights.map((item, hIdx) => (
                        <li key={hIdx} className="text-xs text-muted-foreground flex items-start gap-2 leading-relaxed font-modern">
                          <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 p-8 rounded-2xl border border-primary/30 bg-card/80 text-center space-y-4">
            <h3 className="text-2xl font-luxury text-white">Want This System Configured For Your B2B Offer?</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Schedule a technical revenue system audit to review how IRONMAN can automate your outbound pipeline.
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
