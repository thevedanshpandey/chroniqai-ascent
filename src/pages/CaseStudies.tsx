import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { AuditModal } from "@/components/modals/AuditModal";
import { ArrowRight, CheckCircle2, TrendingUp, Quote, Sparkles } from "lucide-react";

const caseStudies = [
  {
    id: "enterprise-saas",
    slug: "/case-studies/scalemetrics-devops",
    client: "ScaleMetrics (B2B Enterprise SaaS)",
    industry: "DevOps & Cloud Infrastructure",
    problem: "Outbound sales team was spending 30 hours/week manually prospecting with sub-1% meeting conversion rates. Domain deliverability was deteriorating.",
    systemBuilt: "Deployed the IRONMAN Outbound System. Integrated buyer intent triggers (funding & hiring) with in-depth company research and 1-to-1 executive personalization.",
    results: [
      "$1.4M ARR Pipeline Created",
      "22 VP & C-Level Meetings Booked / Month",
      "19.2% Cold Response Rate (Industry avg is 2-3%)",
      "80% Sales Rep Time Saved",
    ],
    testimonial: "ChroniqAI didn't just give us leads; they built an outbound system that generates qualified executive conversations every week without adding headcount.",
    author: "Marcus Vance",
    role: "VP Revenue, ScaleMetrics",
  },
  {
    id: "cyber-tech",
    slug: "/case-studies/cybersecurity-enterprise",
    client: "Aegis Security Systems",
    industry: "Cybersecurity & Enterprise Infrastructure",
    problem: "Cybersecurity offer was buried under 100+ weekly cold emails sent to CISOs by competing vendors. Sub-1% response rates.",
    systemBuilt: "Deployed the IRONMAN Outbound System. Focused on security compliance triggers, hiring alerts, and peer-to-peer technical executive messaging.",
    results: [
      "18 Qualified CISO Meetings / Month",
      "$120,000 Average Deal ACV",
      "18.4% Cold Response Rate",
      "3.8x Outbound Reply Lift",
    ],
    testimonial: "Before ChroniqAI, getting enterprise CISOs on a call felt impossible. IRONMAN aligned our outreach with real hiring signals and authentic executive tone.",
    author: "Elena Rostova",
    role: "Founder & CEO, Aegis Security",
  },
  {
    id: "ai-saas-platform",
    slug: "/case-studies/ai-saas-platform",
    client: "NeuralFlow Platform",
    industry: "Enterprise AI Analytics",
    problem: "Manual prospecting was too slow and untargeted, missing enterprise buyers who were actively evaluating data analytics solutions.",
    systemBuilt: "Deployed the IRONMAN Outbound System. Automated buyer intent identification and tailored messaging to VP Data and E-commerce leaders.",
    results: [
      "20+ Enterprise Demos Booked / Month",
      "$1.2M Qualified Pipeline in 60 Days",
      "17.8% Average Response Rate",
      "54% Reduction in Customer Acquisition Cost",
    ],
    testimonial: "IRONMAN helped us reach decision-makers right when they were expanding their data teams. Our sales reps now spend their days talking to qualified prospects.",
    author: "Devashish S.",
    role: "Co-Founder, NeuralFlow",
  },
];

export default function CaseStudies() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  return (
    <PageLayout>
      <SEOHead
        title="B2B Outbound Case Studies & Pipeline Results | ChroniqAI"
        description="Explore verified case studies, pipeline benchmarks, and client outcomes achieved through ChroniqAI IRONMAN Outbound System."
        canonical="https://chroniqai.com/case-studies"
        keywords="B2B AI outbound case studies, IRONMAN outbound results, cold outreach benchmarks, executive email personalization"
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
              <Sparkles size={14} className="text-platinum-glow" />
              Verified Performance & Hard Metrics
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-luxury text-white tracking-tight leading-[1.1]">
              Proven System Outcomes
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground font-modern max-w-2xl mx-auto leading-relaxed">
              We lead with evidence. Here is how B2B companies transformed fragmented sales efforts into predictable revenue infrastructure.
            </p>
          </motion.div>

          {/* Case Studies List */}
          <div className="space-y-16">
            {caseStudies.map((cs, idx) => (
              <motion.div
                key={cs.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 md:p-12 rounded-2xl border border-glass-border bg-card/70 backdrop-blur-xl relative overflow-hidden group hover:border-primary/50 transition-all"
              >
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 pb-6 border-b border-border/60">
                  <div>
                    <span className="text-xs font-mono text-platinum uppercase tracking-wider block mb-1">
                      {cs.industry}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-luxury text-white">
                      {cs.client}
                    </h2>
                  </div>

                  <span className="px-3.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-semibold">
                    Verified Revenue Outcome
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-2 text-rose-400">
                        The Core Bottleneck / Problem
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {cs.problem}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-2 text-platinum">
                        The System Built
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {cs.systemBuilt}
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-6 rounded-xl bg-secondary/40 border border-border/60">
                    <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                      <TrendingUp size={16} className="text-emerald-400" />
                      Measurable System Results
                    </h3>

                    <ul className="space-y-3">
                      {cs.results.map((res, rIdx) => (
                        <li key={rIdx} className="text-xs sm:text-sm font-semibold text-white flex items-center gap-2.5">
                          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                          <span>{res}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Testimonial Quote */}
                <div className="p-6 rounded-xl bg-background/60 border border-border/50 relative">
                  <Quote size={24} className="text-primary/30 absolute top-4 right-4" />
                  <p className="text-sm font-luxury italic text-white/90 mb-3 max-w-3xl leading-relaxed">
                    &ldquo;{cs.testimonial}&rdquo;
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div className="text-xs font-mono text-platinum">
                      <span className="font-bold text-white">{cs.author}</span> — {cs.role}
                    </div>
                    <Link
                      to={cs.slug}
                      className="text-xs font-mono text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1.5 transition-colors"
                    >
                      Read Full Case Study & Architecture Breakdown <ArrowRight size={14} />
                    </Link>
                  </div>
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
              Achieve Similar Pipeline Predictability
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
              Book a 45-minute Free Revenue System Audit to analyze your current sales friction and receive a tailored pipeline architecture.
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
