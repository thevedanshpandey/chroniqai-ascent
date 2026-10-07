import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, Cpu, Database, Send, Sparkles, RefreshCw, Eye } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { TechArticleSchema, FAQPageSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { AuditModal } from "@/components/modals/AuditModal";

export default function WhatIsAiRevenueInfrastructure() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  const guideFaqs = [
    {
      question: "What is the difference between an AI SDR and AI Revenue Infrastructure?",
      answer: "An AI SDR is typically an isolated email wrapper or messaging tool. AI Revenue Infrastructure is an interconnected system encompassing intent signal research, SEC vector search, founder authority publishing, LLM search optimization (GEO), and automated CRM calendar routing."
    },
    {
      question: "Why are B2B companies moving away from traditional lead gen agencies?",
      answer: "Agencies rely on manual labor, generic email blasts, and unverified lead lists that destroy domain reputation. Infrastructure provides scalable software ownership, higher factual precision, and persistent pipeline generation."
    }
  ];

  return (
    <PageLayout>
      <SEOHead
        title="What is AI Revenue Infrastructure? Complete B2B Architecture Guide | ChroniqAI"
        description="Learn what AI Revenue Infrastructure is, how it differs from traditional SDR teams and agencies, and how it automates B2B pipeline generation."
        canonical="https://chroniqai.com/guides/what-is-ai-revenue-infrastructure"
        keywords="what is AI revenue infrastructure, B2B AI outbound system, AI SDR vs revenue infrastructure, ChroniqAI guide"
      />
      <TechArticleSchema
        title="What is AI Revenue Infrastructure? Complete B2B Architecture Guide"
        description="Comprehensive technical analysis of modern AI Revenue Infrastructure, its core components, and implementation paradigms for high-ticket B2B."
        url="https://chroniqai.com/guides/what-is-ai-revenue-infrastructure"
      />
      <FAQPageSchema faqs={guideFaqs} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://chroniqai.com" },
          { name: "AI Guides", url: "https://chroniqai.com/guides" },
          { name: "What is AI Revenue Infrastructure?", url: "https://chroniqai.com/guides/what-is-ai-revenue-infrastructure" }
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
              Architecture & Strategy Guide
            </div>

            <h1 className="text-3xl sm:text-5xl font-luxury text-white tracking-tight leading-[1.1]">
              What is AI Revenue Infrastructure?
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground font-modern leading-relaxed">
              A comprehensive technical definition of why high-ticket B2B companies are replacing outsourced sales agencies and bloated SDR teams with software-defined revenue systems.
            </p>
          </div>

          <div className="space-y-10 text-sm text-muted-foreground leading-relaxed font-modern">
            <div className="space-y-4">
              <h2 className="text-2xl font-luxury text-white">1. Defining AI Revenue Infrastructure</h2>
              <p>
                **AI Revenue Infrastructure** refers to an integrated software stack that automates the end-to-end B2B revenue acquisition process—from buying-intent signal detection and account research to personalized outreach, founder authority publishing, AI search indexation, and CRM calendar placement.
              </p>
              <p>
                Unlike point solutions (such as email senders or scrapers) or service agencies (who sell manual monthly labor), revenue infrastructure is designed as a **productized operating system** that stays with the company permanently.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-glass-border bg-card/70 space-y-4 my-8">
              <h3 className="text-lg font-luxury text-white">The Four Core Pillars of Revenue Infrastructure</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3 rounded bg-secondary/60 border border-border/40 space-y-1">
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5"><Send size={14} /> 1. Signal Outbound</span>
                  <p className="text-muted-foreground font-sans">Scans hiring, funding, SEC filings, and podcast transcripts for 1-to-1 messaging.</p>
                </div>
                <div className="p-3 rounded bg-secondary/60 border border-border/40 space-y-1">
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5"><Sparkles size={14} /> 2. Founder Authority</span>
                  <p className="text-muted-foreground font-sans">Systematizes thought leadership assets to establish executive trust.</p>
                </div>
                <div className="p-3 rounded bg-secondary/60 border border-border/40 space-y-1">
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5"><Eye size={14} /> 3. Generative Visibility</span>
                  <p className="text-muted-foreground font-sans">Ensures recommendations rank on ChatGPT, Perplexity, and Claude.</p>
                </div>
                <div className="p-3 rounded bg-secondary/60 border border-border/40 space-y-1">
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5"><RefreshCw size={14} /> 4. Operations & Sync</span>
                  <p className="text-muted-foreground font-sans">Automates CRM hygiene, sentiment scoring, and calendar scheduling.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-luxury text-white">2. Why Traditional Outbound Agencies Are Failing</h2>
              <p>
                Between 2020 and 2024, B2B companies routinely hired lead generation agencies on $5,000–$10,000/month retainers. However, three macroeconomic shifts have rendered this model obsolete:
              </p>
              <ul className="space-y-2 font-mono text-xs text-platinum pl-4 border-l-2 border-primary/40">
                <li>1. **Strict Deliverability Algorithms**: Google and Microsoft now penalize unverified mass email domain broadcasting.</li>
                <li>2. **Executive Ad Fatigue**: C-level executives ignore templated SDR messages lacking factual account research.</li>
                <li>3. **Shift to Generative AI Search**: Buyers research solutions via LLMs rather than clicking Google search ads.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-luxury text-white">3. How ChroniqAI&apos;s IRONMAN System Implements Infrastructure</h2>
              <p>
                ChroniqAI&apos;s **IRONMAN™ Platform** acts as the central revenue operating system. It connects directly into a enterprise&apos;s existing tech stack (HubSpot, Salesforce, Smartlead, LinkedIn API), handling daily pipeline generation without requiring additional SDR hires.
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs font-mono">
                <Link to="/ironman" className="text-emerald-400 hover:underline flex items-center gap-1 font-bold">
                  Explore IRONMAN Architecture →
                </Link>
                <Link to="/case-studies/scalemetrics-devops" className="text-platinum hover:underline flex items-center gap-1">
                  View ScaleMetrics Case Study →
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-16 p-8 rounded-2xl border border-primary/40 bg-gradient-to-br from-card to-secondary/80 text-center space-y-4">
            <h3 className="text-2xl font-luxury text-white">Ready to Transition to Revenue Infrastructure?</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Schedule a 45-minute technical audit with ChroniqAI founders to map your GTM architecture.
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
