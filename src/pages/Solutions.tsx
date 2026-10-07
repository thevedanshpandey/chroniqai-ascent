import { useState } from "react";
import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { AuditModal } from "@/components/modals/AuditModal";
import { ArrowRight, Bot, CheckCircle2, Database, Eye, Layers, MessageSquare, RefreshCw, Send, ShieldCheck, Sparkles, Target, Zap } from "lucide-react";

const modules = [
  {
    id: "outbound",
    badge: "Module 01",
    title: "IRONMAN™ Outbound",
    purpose: "Automated Signal-Based Prospecting & Qualified Meeting Placement",
    description: "Replaces brute-force cold email with buying intent detection, deep account intelligence, and hyper-personalized executive messaging that lands directly on AE calendars.",
    features: [
      "Buying intent signal monitoring (tech stack additions, hiring, funding)",
      "Automated account research & 10-K / podcast transcript extraction",
      "Hyper-personalized 1-to-1 executive email messaging",
      "Multi-channel LinkedIn executive touchpoints",
      "Automated objection handling & meeting scheduling",
    ],
    metric: "12+ Qualified Meetings / Mo Avg",
    icon: Send,
  },
  {
    id: "authority",
    badge: "Module 02",
    title: "IRONMAN™ Authority",
    purpose: "Systematized Executive Thought Leadership & Category Dominance",
    description: "Transforms founders and executive leaders into recognized industry authorities without demanding hours of drafting time. Authority converts cold outreach into warm inbound calls.",
    features: [
      "Executive voice extraction & tone mapping",
      "Systematized weekly thought leadership publication on LinkedIn & X",
      "Keynote & podcast interview preparation briefs",
      "Category leadership narrative frameworks",
      "Direct conversion feedback loop into outbound sequences",
    ],
    metric: "3.8x Outbound Response Lift",
    icon: Sparkles,
  },
  {
    id: "visibility",
    badge: "Module 03",
    title: "IRONMAN™ Visibility",
    purpose: "Generative Engine Optimization (GEO) & AI Search Presence",
    description: "Ensures your B2B company ranks as the primary recommended solution when buyers research your category on ChatGPT, Perplexity, Gemini, and Google Search.",
    features: [
      "AI Search Engine Optimization (GEO) across LLM platforms",
      "High-intent comparison & recommendation indexation",
      "Structured entity relationship mapping for B2B categories",
      "Technical citation & knowledge graph optimization",
      "AI Search discovery tracking & share-of-voice telemetry",
    ],
    metric: "#1 Recommended AI Search Position",
    icon: Eye,
  },
  {
    id: "operations",
    badge: "Module 04",
    title: "IRONMAN™ Operations",
    purpose: "Autonomous CRM Operations, Enrichment & Sales Workflow Automation",
    description: "Eliminates repetitive manual SDR overhead. Automatically enriches leads, updates CRM fields, logs sentiment, and routes opportunities with zero friction.",
    features: [
      "Real-time lead enrichment across 12+ premium data sources",
      "HubSpot & Salesforce bidirectional automated synchronization",
      "Sentiment classification & priority lead routing",
      "Automated meeting brief generation for Account Executives",
      "End-to-end pipeline attribution & health monitoring",
    ],
    metric: "85% SDR Overhead Reduction",
    icon: RefreshCw,
  },
];

export default function Solutions() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  return (
    <PageLayout>
      <SEOHead
        title="IRONMAN Modules — B2B AI Revenue Infrastructure"
        description="Explore the 4 modular engines of the IRONMAN Revenue Infrastructure Platform: Outbound, Authority, Visibility, and Operations."
      />

      <div className="pt-32 pb-24 relative overflow-hidden">
        {/* Glow background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] hero-gradient pointer-events-none -z-10" />

        <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6 mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/80 border border-primary/20 text-xs font-medium text-platinum">
              <Layers size={14} className="text-platinum-glow" />
              Productized Infrastructure — No Agency Services
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-luxury text-white tracking-tight leading-[1.1]">
              The IRONMAN™ Platform
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground font-modern max-w-2xl mx-auto leading-relaxed">
              Four interconnected modules designed to replace fragmented SDR teams and agency retainers with a unified AI Revenue Operating System.
            </p>
          </motion.div>

          {/* Modules List */}
          <div className="space-y-12">
            {modules.map((mod, idx) => {
              const Icon = mod.icon;
              return (
                <motion.div
                  key={mod.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-8 md:p-12 rounded-2xl border border-glass-border bg-card/70 backdrop-blur-xl relative overflow-hidden group hover:border-primary/50 transition-all duration-300"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-7 space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-secondary border border-border text-platinum">
                          {mod.badge}
                        </span>
                        <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 size={12} /> Active Platform Module
                        </span>
                      </div>

                      <h2 className="text-3xl sm:text-4xl font-luxury text-white flex items-center gap-3">
                        <Icon className="text-platinum-glow shrink-0" size={32} />
                        {mod.title}
                      </h2>

                      <p className="text-sm font-semibold text-platinum font-luxury italic">
                        {mod.purpose}
                      </p>

                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        {mod.description}
                      </p>

                      <div className="pt-2">
                        <div className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
                          Key Module Capabilities:
                        </div>
                        <ul className="space-y-2">
                          {mod.features.map((feat, fIdx) => (
                            <li key={fIdx} className="text-xs sm:text-sm text-muted-foreground flex items-start gap-2.5">
                              <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="lg:col-span-5 flex flex-col justify-between h-full p-6 rounded-xl bg-secondary/40 border border-border/60">
                      <div>
                        <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                          Proven Module Metric
                        </div>
                        <div className="text-2xl sm:text-3xl font-luxury font-bold text-platinum-gradient mb-4">
                          {mod.metric}
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                          Engineered for enterprise compatibility with HubSpot, Salesforce, and custom B2B tech stacks.
                        </p>
                      </div>

                      <LuxuryButton
                        variant="outline"
                        size="sm"
                        onClick={() => setIsAuditModalOpen(true)}
                        className="w-full flex items-center justify-center gap-2"
                      >
                        Deploy {mod.title}
                        <ArrowRight size={16} />
                      </LuxuryButton>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 p-10 md:p-14 rounded-2xl border border-glass-border bg-gradient-card text-center space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl font-luxury text-white">
              Build Your Custom Revenue Infrastructure
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
              Find out which combination of IRONMAN™ modules will deliver maximum pipeline growth for your B2B company in a 45-minute technical audit.
            </p>
            <div className="pt-4">
              <LuxuryButton
                variant="platinum"
                size="lg"
                onClick={() => setIsAuditModalOpen(true)}
              >
                Get My Free Revenue System Audit
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
