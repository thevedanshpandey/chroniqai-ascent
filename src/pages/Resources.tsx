import { useState } from "react";
import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { AuditModal } from "@/components/modals/AuditModal";
import { ArrowRight, BookOpen, Download, FileText, Sparkles, CheckCircle2 } from "lucide-react";

const resources = [
  {
    id: "outbound-benchmarks",
    title: "2026 B2B Outbound Deliverability & Response Benchmarks",
    category: "Benchmark Report",
    description: "An analysis of 2.4M cold emails across 120 B2B tech companies. Details inbox protection practices, secondary domain setup, and high-converting message structures.",
    pages: "28 Pages PDF",
  },
  {
    id: "personalization-playbook",
    title: "The Executive Outbound Personalization Playbook",
    category: "Executive Guide",
    description: "How to research target accounts and write compelling 1-to-1 executive messages that decision-makers actually read and respond to.",
    pages: "24 Pages PDF",
  },
  {
    id: "intent-signals-guide",
    title: "Buyer Intent Signals & Account Trigger Guide",
    category: "Strategy Guide",
    description: "How to identify active buying triggers like hiring spikes, executive appointments, and tech stack changes before reaching out.",
    pages: "20 Pages PDF",
  },
  {
    id: "domain-protection-manual",
    title: "Domain Protection & Inbox Deliverability Manual",
    category: "Operations Manual",
    description: "Best practices for setting up secondary sending domains, gradual warming schedules, and ensuring your outreach stays out of spam folders.",
    pages: "18 Pages PDF",
  },
];

export default function Resources() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<string | null>(null);

  const handleDownload = (title: string) => {
    setSelectedResource(title);
    setIsAuditModalOpen(true);
  };

  return (
    <PageLayout>
      <SEOHead
        title="B2B Outbound Resources & Playbooks — ChroniqAI"
        description="Download B2B outbound playbooks, deliverability benchmark reports, buyer intent guides, and messaging frameworks."
      />

      <div className="pt-32 pb-24 relative overflow-hidden">
        {/* Glow backdrop */}
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
              <BookOpen size={14} className="text-platinum-glow" />
              Empirical Data & Systems Architecture
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-luxury text-white tracking-tight leading-[1.1]">
              ChroniqAI Research Lab
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground font-modern max-w-2xl mx-auto leading-relaxed">
              Empirical benchmark reports, platform experiments, technical frameworks, and systems documentation for high-ticket B2B pipeline.
            </p>
          </motion.div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resources.map((res, idx) => (
              <motion.div
                key={res.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-8 rounded-2xl border border-glass-border bg-card/70 backdrop-blur-xl flex flex-col justify-between group hover:border-primary/50 transition-all"
              >
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-secondary border border-border text-platinum">
                      {res.category}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground flex items-center gap-1">
                      <FileText size={12} /> {res.pages}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-luxury text-white group-hover:text-platinum transition-colors">
                    {res.title}
                  </h2>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {res.description}
                  </p>
                </div>

                <LuxuryButton
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(res.title)}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Download size={16} />
                  Get Playbook & Audit
                </LuxuryButton>
              </motion.div>
            ))}
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
              Want These Systems Implemented For You?
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
              Book a 45-minute Free Revenue System Audit to analyze your outbound signals and get a customized deployment roadmap.
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
