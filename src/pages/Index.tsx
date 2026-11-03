import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { OrganizationSchema, WebsiteSchema } from "@/components/seo/StructuredData";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { AuditModal, FORM_LINK } from "@/components/modals/AuditModal";
import { InteractiveGravityDashboard } from "@/components/revenue/InteractiveGravityDashboard";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Clock,
  HelpCircle,
  Quote,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";

// --- HERO SECTION ---
function OfficialHeroSection({ onOpenAudit }: { onOpenAudit: () => void }) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden text-left">
      {/* Background radial gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] hero-gradient pointer-events-none -z-10" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/90 border border-primary/25 text-xs font-medium text-platinum backdrop-blur-md">
              <Sparkles size={14} className="text-platinum-glow" />
              <span>AI Revenue Infrastructure Platform</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-luxury text-white tracking-tight leading-[1.12]">
              Build Predictable Sales Pipeline <br />
              <span className="text-platinum-gradient">With ChroniqAI Gravity.</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 font-modern leading-relaxed max-w-xl">
              ChroniqAI engineers autonomous client acquisition systems powered by the Gravity engine. We detect buyer intent signals, research target accounts, and book qualified, sales-ready meetings directly into your calendar.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <LuxuryButton
                variant="platinum"
                size="lg"
                onClick={onOpenAudit}
                className="flex items-center justify-center gap-2 text-sm"
              >
                <span>Apply for 14-Day Gravity Trial</span>
                <ArrowRight size={17} />
              </LuxuryButton>

              <Link to="/gravity">
                <LuxuryButton
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 text-sm"
                >
                  <span>Explore Gravity System</span>
                  <ArrowUpRight size={16} />
                </LuxuryButton>
              </Link>
            </div>

            {/* Trust Points */}
            <div className="pt-4 border-t border-border/50">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-slate-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-400" /> 1,000+ Meetings Booked
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-400" /> LinkedIn Account Safety
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-400" /> Outcome Guarantee
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Live Interactive Dashboard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            <InteractiveGravityDashboard compact={false} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// --- STATS STRIP ---
function OfficialStatsSection() {
  const stats = [
    { label: "Pipeline Created", value: "$1.4M+", detail: "Enterprise ARR Generated" },
    { label: "Meetings Booked", value: "1,000+", detail: "Sales-Ready Decision Makers" },
    { label: "Average Reply Rate", value: "18.4%", detail: "Industry Average is 2-3%" },
    { label: "Speed to First Deal", value: "34 Days", detail: "Fast Time-to-Value Velocity" },
  ];

  return (
    <section className="py-14 border-y border-border/50 bg-secondary/30 text-left">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-card/75 border border-glass-border">
              <div className="text-xs font-mono text-platinum/80 uppercase tracking-wider mb-1">
                {stat.label}
              </div>
              <div className="text-3xl sm:text-4xl font-luxury font-bold text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs text-slate-300 mt-1 font-modern">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- GRAVITY SYSTEM PILLARS SECTION ---
function OutboundSystemPillarsSection({ onOpenAudit }: { onOpenAudit: () => void }) {
  const pillars = [
    {
      num: "01",
      icon: Target,
      title: "Buyer Intent Discovery",
      desc: "Filters and pinpoints decision-makers actively experiencing the exact problem your high-ticket offer solves. Monitors hiring spikes, technology updates, and executive appointments.",
      tags: ["Funding & Hiring Triggers", "ICP Precision Filtering", "Zero Cold Scraping"],
    },
    {
      num: "02",
      icon: Search,
      title: "Deep Account Context",
      desc: "Reviews recent company announcements, executive interviews, and business priorities for every target account to craft authentic, peer-level observations.",
      tags: ["100% Contextual Relevance", "Executive Priority Mapping", "Peer-Level Talking Points"],
    },
    {
      num: "03",
      icon: Send,
      title: "1-to-1 Executive Messaging",
      desc: "Crafts bespoke messages written in your natural executive tone. Reads like a thoughtful peer conversation rather than automated sales copy.",
      tags: ["Founder Voice Calibration", "High Response Velocity", "Natural Conversational Flows"],
    },
    {
      num: "04",
      icon: ShieldCheck,
      title: "Account Safety & Meeting Placement",
      desc: "Protects your accounts with gradual warming, daily limits, and human-like pacing while placing confirmed sales calls directly onto rep calendars.",
      tags: ["Multi-Account Distribution", "Daily Pacing Safeguards", "Direct Calendar Scheduling"],
    },
  ];

  return (
    <section id="system-pillars" className="py-24 text-left bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl space-y-16">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary border border-primary/20 text-xs font-medium text-platinum">
            <Zap size={13} className="text-platinum-glow" />
            Core Architecture
          </div>
          <h2 className="text-3xl sm:text-5xl font-luxury text-white">
            The 4 Pillars of ChroniqAI Gravity
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-modern">
            Every layer of executive outbound client acquisition engineered into a reliable, self-operating pipeline engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.num}
                className="p-8 rounded-3xl border border-glass-border bg-card/80 backdrop-blur-xl space-y-5 hover:border-primary/50 transition-colors shadow-xl group"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-secondary/80 border border-primary/25 text-platinum-glow">
                    <Icon size={24} />
                  </div>
                  <span className="font-mono text-sm text-platinum/50 font-bold">
                    Pillar {pillar.num}
                  </span>
                </div>

                <h3 className="text-2xl font-luxury text-white group-hover:text-platinum transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed font-modern">
                  {pillar.desc}
                </p>

                <div className="pt-2 border-t border-border/40 flex flex-wrap gap-2">
                  {pillar.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-md bg-secondary/60 border border-border/50 text-[11px] font-mono text-platinum/90"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-8 rounded-3xl bg-secondary/40 border border-primary/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl font-luxury text-white mb-1">
              Want Gravity Deployed For Your B2B Offer?
            </h4>
            <p className="text-xs text-slate-300 font-modern max-w-lg">
              We audit your target market and provide a complete 14-day trial roadmap to book 6-10+ qualified sales meetings.
            </p>
          </div>

          <LuxuryButton
            variant="platinum"
            size="lg"
            onClick={onOpenAudit}
            className="shrink-0"
          >
            Apply for 14-Day Gravity Trial
          </LuxuryButton>
        </div>
      </div>
    </section>
  );
}

// --- GRAVITY SPOTLIGHT BANNER ---
function GravitySpotlightBanner() {
  return (
    <section className="py-20 bg-secondary/15 border-y border-border/50 text-left">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <div className="p-8 md:p-14 rounded-3xl border border-glass-border bg-gradient-card relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-primary/25 text-xs font-mono text-platinum">
                <Sparkles size={13} className="text-platinum-glow" />
                Featured Acquisition System
              </div>

              <h2 className="text-3xl sm:text-5xl font-luxury text-white tracking-tight">
                Gravity by Chroniq
              </h2>

              <p className="text-base text-slate-200 leading-relaxed font-modern max-w-2xl">
                &ldquo;Stop chasing clients. Let them fall into your calendar.&rdquo; Gravity is our specialized LinkedIn client acquisition system for high-ticket B2B founders. Includes our proven black-hole positioning philosophy, 14-day trial, and verified meeting guarantee.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link to="/gravity">
                  <LuxuryButton variant="platinum" size="lg" className="flex items-center gap-2">
                    <span>Explore Gravity by Chroniq</span>
                    <ArrowRight size={17} />
                  </LuxuryButton>
                </Link>

                <span className="text-xs font-mono text-platinum/80">
                  By application only • Limited founder cohort
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full p-6 rounded-2xl bg-card/85 border border-primary/30 space-y-3 text-center">
                <div className="text-xs font-mono text-platinum uppercase">Standard Monthly Delivery</div>
                <div className="text-3xl font-luxury font-bold text-white">6 - 30</div>
                <div className="text-xs text-emerald-400 font-semibold font-mono">
                  Qualified Meetings Booked
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed pt-2 border-t border-border/50">
                  Backed by our commitment: if we don&apos;t deliver the monthly minimum, the next month is free.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- CASE STUDIES HIGHLIGHT ---
function CaseStudiesHighlightSection() {
  const studies = [
    {
      client: "ScaleMetrics",
      niche: "DevOps Enterprise SaaS",
      result: "$1.4M ARR Pipeline",
      metric: "22 Meetings / Mo",
      link: "/case-studies/scalemetrics-devops",
    },
    {
      client: "Aegis Security",
      niche: "Enterprise Cybersecurity",
      result: "$120k Average ACV",
      metric: "18 CISO Meetings / Mo",
      link: "/case-studies/cybersecurity-enterprise",
    },
    {
      client: "NeuralFlow",
      niche: "AI Analytics Platform",
      result: "54% CAC Reduction",
      metric: "20+ Enterprise Demos / Mo",
      link: "/case-studies/ai-saas-platform",
    },
  ];

  return (
    <section className="py-24 text-left bg-background">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl space-y-16">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs font-mono text-platinum uppercase tracking-wider block">
              Verified Track Record
            </span>
            <h2 className="text-3xl sm:text-5xl font-luxury text-white">
              Proven Pipeline Case Studies
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-modern max-w-xl">
              Real high-ticket B2B outcomes generated through the ChroniqAI Gravity client acquisition engine.
            </p>
          </div>

          <Link to="/case-studies">
            <LuxuryButton variant="outline" size="sm" className="flex items-center gap-2">
              <span>View All Case Studies</span>
              <ArrowRight size={14} />
            </LuxuryButton>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {studies.map((item, idx) => (
            <Link
              key={idx}
              to={item.link}
              className="p-7 rounded-2xl border border-glass-border bg-card/75 hover:border-primary/50 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-emerald-400 font-semibold px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    {item.niche}
                  </span>
                  <ArrowUpRight size={16} className="text-slate-400 group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-2xl font-luxury text-white group-hover:text-platinum transition-colors">
                  {item.client}
                </h3>

                <div className="space-y-1 pt-2 border-t border-border/40">
                  <div className="text-xs text-muted-foreground font-mono">Delivered Outcome:</div>
                  <div className="text-xl font-luxury text-white font-semibold">{item.result}</div>
                  <div className="text-xs font-mono text-platinum">{item.metric}</div>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-border/30 text-xs text-platinum font-mono flex items-center gap-1 group-hover:underline">
                Read full case study breakdown →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- PHILOSOPHY STRIP ---
function PhilosophyHighlightSection() {
  return (
    <section className="py-20 bg-secondary/20 border-y border-border/50 text-left">
      <div className="container mx-auto px-6 lg:px-8 max-w-5xl space-y-10">
        <div className="text-center space-y-4">
          <span className="text-xs font-mono text-platinum uppercase tracking-wider block">
            Our Principles
          </span>
          <h2 className="text-3xl sm:text-4xl font-luxury text-white">
            Why We Build Acquisition Systems As Assets
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-300 font-modern">
          <div className="p-6 rounded-2xl bg-card/70 border border-border/50 space-y-3">
            <h4 className="text-lg font-luxury text-white">No Temporary Retainers</h4>
            <p className="leading-relaxed text-xs sm:text-sm">
              Agencies sell fleeting campaigns that vanish the moment you stop paying. We build permanent, repeatable acquisition infrastructure you own.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card/70 border border-border/50 space-y-3">
            <h4 className="text-lg font-luxury text-white">Authentic Executive Voice</h4>
            <p className="leading-relaxed text-xs sm:text-sm">
              C-suite buyers reject template spam. ChroniqAI calibrates every message to your genuine executive voice so outreach reads like thoughtful peer dialogue.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card/70 border border-border/50 space-y-3">
            <h4 className="text-lg font-luxury text-white">Timing Precedes Volume</h4>
            <p className="leading-relaxed text-xs sm:text-sm">
              Outbound succeeds when timing is right. We track active buyer signals—hiring appointments, funding rounds, and technical changes—before initiating contact.
            </p>
          </div>
        </div>

        <div className="text-center pt-2">
          <Link to="/how-we-think" className="text-xs font-mono text-platinum hover:text-white inline-flex items-center gap-1.5 underline underline-offset-4">
            Explore our complete philosophy breakdown →
          </Link>
        </div>
      </div>
    </section>
  );
}

// --- FAQ SECTION ---
function OfficialFAQSection() {
  const faqs = [
    {
      q: "What is ChroniqAI Gravity?",
      a: "ChroniqAI Gravity is an AI-powered B2B client acquisition system. It discovers high-intent buyer accounts, conducts deep context research, and books sales-ready executive meetings directly onto your calendar.",
    },
    {
      q: "How does ChroniqAI protect outreach accounts?",
      a: "We implement gradual warm-up routines, daily activity thresholds, and human-like pacing across 2+ team profiles to ensure complete account safety.",
    },
    {
      q: "What results can we expect from Gravity?",
      a: "Clients typically see 6-10 qualified meetings in the first month as a minimum, scaling to 24-30 meetings per month depending on niche and ticket size.",
    },
    {
      q: "What is your performance guarantee?",
      a: "If we do not deliver the agreed monthly minimum meetings, the following month is free until the remaining meetings are delivered.",
    },
    {
      q: "How does the 14-day Gravity trial work?",
      a: "Week 1 is dedicated to setup and account warm-up. Days 8-21 run as the 14-day trial where you see real conversations and meetings booked before making a long-term commitment.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-background text-left">
      <div className="container mx-auto px-6 lg:px-8 max-w-4xl space-y-12">
        <div className="text-center space-y-4">
          <span className="text-xs font-mono text-platinum uppercase tracking-wider block">
            Clear Answers
          </span>
          <h2 className="text-3xl sm:text-5xl font-luxury text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto leading-relaxed font-modern">
            Everything you need to know about ChroniqAI, the Gravity system, and our engagement terms.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-card/75 border border-glass-border space-y-2 hover:border-primary/40 transition-colors"
            >
              <h3 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2.5">
                <HelpCircle size={18} className="text-platinum shrink-0" />
                {faq.q}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed pl-7 font-modern">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- FINAL CTA ---
function OfficialFinalCTASection({ onOpenAudit }: { onOpenAudit: () => void }) {
  return (
    <section className="py-24 text-left relative overflow-hidden bg-secondary/10 border-t border-border/50">
      <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
        <div className="p-10 md:p-16 rounded-3xl border border-glass-border bg-gradient-card text-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary border border-primary/25 text-xs font-medium text-platinum">
            <Sparkles size={14} className="text-platinum-glow" />
            Limited Monthly Cohorts
          </div>

          <h2 className="text-3xl sm:text-5xl font-luxury text-white tracking-tight">
            Ready to Build a Predictable Acquisition Engine?
          </h2>

          <p className="text-base sm:text-lg text-slate-200 max-w-xl mx-auto leading-relaxed font-modern">
            Apply for the 14-day Gravity trial. We will review your offer, define your target ICP, and show you how to generate qualified executive pipeline.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <LuxuryButton
              variant="platinum"
              size="lg"
              onClick={onOpenAudit}
              className="flex items-center justify-center gap-2"
            >
              <span>Apply for 14-Day Gravity Trial</span>
              <ArrowRight size={18} />
            </LuxuryButton>

            <Link to="/gravity">
              <LuxuryButton variant="outline" size="lg">
                <span>View Gravity by Chroniq</span>
              </LuxuryButton>
            </Link>
          </div>

          <p className="text-xs font-mono text-platinum/80 pt-2">
            By application only • We review each application within 24 hours.
          </p>
        </div>
      </div>
    </section>
  );
}

// --- MAIN OFFICIAL HOMEPAGE COMPONENT ---
export default function Index() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  return (
    <PageLayout>
      <SEOHead
        title="ChroniqAI | AI Revenue Infrastructure & Client Acquisition"
        description="ChroniqAI builds predictable sales pipeline with the Gravity client acquisition system through buyer intent discovery, deep account research, and personalized executive messaging."
        canonical="https://chroniqai.com/"
      />
      <OrganizationSchema />
      <WebsiteSchema />

      <OfficialHeroSection onOpenAudit={() => setIsAuditModalOpen(true)} />
      <OfficialStatsSection />
      <OutboundSystemPillarsSection onOpenAudit={() => setIsAuditModalOpen(true)} />
      <GravitySpotlightBanner />
      <CaseStudiesHighlightSection />
      <PhilosophyHighlightSection />
      <OfficialFAQSection />
      <OfficialFinalCTASection onOpenAudit={() => setIsAuditModalOpen(true)} />

      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
      />
    </PageLayout>
  );
}
