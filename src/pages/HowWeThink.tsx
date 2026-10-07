import { useState } from "react";
import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { AuditModal } from "@/components/modals/AuditModal";
import { ArrowRight, Layers, Lightbulb, ShieldAlert, Sparkles, Target, Zap } from "lucide-react";

const principles = [
  {
    number: "01",
    title: "Why Most Outbound Fails",
    thesis: "Mass volume cold email is dead. Buying signal is the only currency.",
    content: [
      "Traditional outreach agencies rely on brute force—sending 50,000 generic emails a month to scraped lists. In 2026, spam filters, domain reputation burn, and decision-maker fatigue render brute force useless.",
      "The issue isn't deliverability alone; it's signal absence. When you contact prospects who have zero intent, you burn your brand equity.",
      "Our infrastructure targets active intent signals: hiring spikes, tech stack updates, executive leadership shifts, and regulatory changes. Outbound only succeeds when timing precedes volume.",
    ],
  },
  {
    number: "02",
    title: "Why AI Alone Doesn't Create Pipeline",
    thesis: "AI without strategic positioning is just faster noise.",
    content: [
      "Inserting an LLM into an email sequencer doesn't make it effective. Giving ChatGPT access to lead lists creates automated spam at 100x speed.",
      "AI is a powerful multiplier, but it multiplies what you give it. If your offer is weak, your ICP vague, or your messaging generic, AI simply accelerates your failure.",
      "We design revenue systems where AI handles deep research, signal aggregation, and personalized framing—while strategic positioning and executive voice remain strictly human-architected.",
    ],
  },
  {
    number: "03",
    title: "Why Authentic Voice Multiplies Responses",
    thesis: "Decision-makers respond to peers, not generic sales templates.",
    content: [
      "B2B leaders rarely respond to cold pitches sent from anonymous sales accounts using identical templates. They respond when an email reads like a thoughtful peer-to-peer inquiry.",
      "When outreach reflects the founder's authentic voice and shows clear understanding of the recipient's business, response rates jump significantly.",
      "The IRONMAN Outbound System calibrates every sequence to your natural executive tone, generating real conversations rather than spam complaints.",
    ],
  },
  {
    number: "04",
    title: "Why Disconnected Tools Waste Revenue",
    thesis: "Fragmented sales stacks leak qualified opportunities at every handoff.",
    content: [
      "Most sales organizations use 6-10 disconnected tools: one for sequencing, one for data, one for CRM, and another for calendar booking. Information gets lost between every gap.",
      "Leads sit uncontacted for days, attribution breaks down, and sales reps spend over half their time updating spreadsheets instead of talking to buyers.",
      "A unified outbound system ensures instant data flow, zero manual spreadsheet updates, and seamless calendar booking.",
    ],
  },
  {
    number: "05",
    title: "Why Outbound Should Be Built As An Asset",
    thesis: "Agency retainers are temporary. An outbound system is a compounding asset.",
    content: [
      "Agencies sell short-term campaigns: temporary bursts of activity that stop delivering the moment the retainer ends. When you stop paying, your pipeline vanishes.",
      "We build a permanent outbound pipeline system for your company. You own the verified playbooks, dedicated domains, and outreach workflows permanently.",
      "The result is predictable, repeatable sales meetings month after month without being held hostage by agency retainers.",
    ],
  },
];

export default function HowWeThink() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  return (
    <PageLayout>
      <SEOHead
        title="How We Think — ChroniqAI B2B Revenue Thesis"
        description="Our core thesis on B2B revenue infrastructure, why traditional outbound fails, and how AI-native systems generate predictable pipeline."
      />

      <div className="pt-32 pb-24 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] hero-gradient pointer-events-none -z-10" />

        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6 mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/80 border border-primary/20 text-xs font-medium text-platinum">
              <Sparkles size={14} className="text-platinum-glow" />
              The ChroniqAI Revenue Thesis
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-luxury text-white tracking-tight leading-[1.1]">
              How We Think
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground font-modern max-w-2xl mx-auto leading-relaxed">
              We do not view revenue growth as a series of marketing campaigns. We treat B2B revenue generation as an engineering problem requiring repeatable infrastructure.
            </p>
          </motion.div>

          {/* Principles Stack */}
          <div className="space-y-16">
            {principles.map((p, idx) => (
              <motion.div
                key={p.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 md:p-12 rounded-2xl border border-glass-border bg-card/60 backdrop-blur-xl relative overflow-hidden group hover:border-primary/40 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                  <div>
                    <span className="font-mono text-xs font-bold text-platinum uppercase tracking-widest block mb-2">
                      Principle {p.number}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-luxury text-white">
                      {p.title}
                    </h2>
                  </div>

                  <div className="p-3 rounded-xl bg-secondary/50 border border-border text-platinum shrink-0 self-start">
                    <Lightbulb size={20} />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 mb-6 text-sm font-semibold text-platinum font-luxury italic">
                  &ldquo;{p.thesis}&rdquo;
                </div>

                <div className="space-y-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {p.content.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-24 p-10 md:p-14 rounded-2xl border border-glass-border bg-gradient-card text-center space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl font-luxury text-white">
              Ready for Revenue Infrastructure?
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
              Schedule a 45-minute Free Revenue System Audit to analyze your outbound signals, messaging resonance, and pipeline architecture.
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
