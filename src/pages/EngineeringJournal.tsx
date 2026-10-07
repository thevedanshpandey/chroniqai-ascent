import { useState } from "react";
import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { AuditModal } from "@/components/modals/AuditModal";
import { ArrowRight, Terminal, Cpu, Zap, CheckCircle2, GitCommit, Sparkles, Layers } from "lucide-react";

const journalEntries = [
  {
    week: "Week 18",
    date: "July 2026",
    title: "IRONMAN Outbound: Real-Time Executive Hiring & Growth Signal Pipeline",
    summary: "Integrated real-time feeds for executive hiring appointments and company expansion milestones.",
    changes: [
      "Real-time processing from executive hiring announcements to prioritized lead queues",
      "Automated extraction of strategic company initiatives from recent public updates",
      "Direct HubSpot and Salesforce synchronization with instant meeting attribution",
    ],
    impact: "Meeting booking velocity increased by 22% across active B2B clients.",
  },
  {
    week: "Week 16",
    date: "June 2026",
    title: "Buyer Intent Detection & Company Trigger Upgrades",
    summary: "Expanded company trigger data to identify high-intent buyer accounts earlier in their buying cycle.",
    changes: [
      "Added technology stack upgrade signals across 40+ software categories",
      "Refined filtering to eliminate dormant accounts before outreach is drafted",
      "Introduced automated company size and role verification",
    ],
    impact: "Response rates improved by 28% across all new outbound sequences.",
  },
  {
    week: "Week 14",
    date: "May 2026",
    title: "Executive Voice Personalization & Tone Calibration",
    summary: "Upgraded message generation to craft natural 1-to-1 emails matching the founder's authentic tone.",
    changes: [
      "Voice calibration based on founder writing samples and interview transcripts",
      "Contextual follow-up sequences that answer common prospect questions naturally",
      "Proactive spam filter verification prior to email dispatch",
    ],
    impact: "Average outbound cold reply rate jumped from 11.2% to 18.4%.",
  },
  {
    week: "Week 12",
    date: "April 2026",
    title: "Automated Calendar Scheduling & Meeting Briefs",
    summary: "Eliminated scheduling delays by placing confirmed sales calls directly on rep calendars.",
    changes: [
      "Automated time zone and sales rep availability coordination",
      "Pre-meeting research briefs automatically attached to Google Calendar invites",
      "CRM stage progression automatically updated upon positive email response",
    ],
    impact: "Saved sales reps over 20 hours per week on manual research and scheduling.",
  },
];

export default function EngineeringJournal() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  return (
    <PageLayout>
      <SEOHead
        title="Engineering Journal — ChroniqAI IRONMAN Development Log"
        description="Weekly updates, architecture improvements, and performance benchmarks from the ChroniqAI engineering team."
      />

      <div className="pt-32 pb-24 relative overflow-hidden text-left">
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
              <Terminal size={14} className="text-platinum-glow" />
              Documenting the Platform Engine
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-luxury text-white tracking-tight leading-[1.1]">
              Engineering Journal
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground font-modern max-w-2xl mx-auto leading-relaxed">
              We build revenue infrastructure like software. Here is what we changed, optimized, and deployed inside the IRONMAN platform.
            </p>
          </motion.div>

          {/* Journal Entries List */}
          <div className="space-y-12">
            {journalEntries.map((entry, idx) => (
              <motion.div
                key={entry.week}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-8 md:p-10 rounded-2xl border border-glass-border bg-card/70 backdrop-blur-xl relative overflow-hidden group hover:border-primary/50 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-border/60">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-secondary border border-primary/30 text-platinum">
                      {entry.week}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">{entry.date}</span>
                  </div>

                  <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                    <GitCommit size={14} /> Platform Update
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-luxury text-white mb-3">
                  {entry.title}
                </h2>

                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6 font-modern">
                  {entry.summary}
                </p>

                <div className="p-4 rounded-xl bg-secondary/40 border border-border/50 mb-6 space-y-2">
                  <div className="text-xs font-mono text-platinum uppercase tracking-wider mb-2">
                    Key Technical Improvements:
                  </div>
                  {entry.changes.map((change, cIdx) => (
                    <div key={cIdx} className="text-xs sm:text-sm text-muted-foreground flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{change}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold flex items-center gap-2">
                  <Zap size={15} className="shrink-0" />
                  <span>Verified Outcome: {entry.impact}</span>
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
            className="mt-20 p-10 md:p-14 rounded-2xl border border-glass-border bg-gradient-card text-center space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl font-luxury text-white">
              Want This Revenue Engine Inside Your Company?
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
              Book a 45-minute Free Revenue System Audit to analyze your outbound signals and get a customized IRONMAN deployment roadmap.
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
