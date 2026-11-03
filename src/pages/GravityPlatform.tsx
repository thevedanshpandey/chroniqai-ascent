import { useState } from "react";
import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { SoftwareApplicationSchema, FAQPageSchema } from "@/components/seo/StructuredData";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { AuditModal, FORM_LINK } from "@/components/modals/AuditModal";
import { InteractiveGravityDashboard } from "@/components/revenue/InteractiveGravityDashboard";
import { BlackHoleCanvas } from "@/components/visuals/BlackHoleCanvas";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  HelpCircle,
  Lock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

// --- HERO SECTION ---
function GravityHeroSection({ onOpenApply }: { onOpenApply: () => void }) {
  const scrollToProcess = () => {
    const el = document.getElementById("how-it-works");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden text-left">
      {/* Background radial gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] hero-gradient pointer-events-none -z-10" />

      {/* Hero Black Hole Animation Canvas (Right Side Subtle Cosmic Backdrop) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] lg:w-[680px] h-[340px] sm:h-[500px] lg:h-[680px] pointer-events-none -z-10 opacity-75 md:opacity-90">
        <BlackHoleCanvas size="hero" className="w-full h-full" />
      </div>

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
              <span>Gravity by Chroniq • AI Client Acquisition for High-Ticket B2B</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-luxury text-white tracking-tight leading-[1.12]">
              Stop chasing clients. <br />
              <span className="text-platinum-gradient">Let them fall into your calendar.</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 font-modern leading-relaxed max-w-xl">
              Gravity is an AI-powered LinkedIn client acquisition system for B2B founders with high-ticket offers. We find your ideal clients, start the right conversations, and book qualified, sales-ready meetings directly on your calendar.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={FORM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (FORM_LINK.includes("placeholder")) {
                    e.preventDefault();
                    onOpenApply();
                  }
                }}
              >
                <LuxuryButton
                  variant="platinum"
                  size="lg"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 text-sm"
                >
                  <span>Apply for the 14-Day Gravity Trial</span>
                  <ArrowRight size={17} />
                </LuxuryButton>
              </a>

              <LuxuryButton
                variant="outline"
                size="lg"
                onClick={scrollToProcess}
                className="flex items-center justify-center gap-2 text-sm"
              >
                <span>See how Gravity works</span>
              </LuxuryButton>
            </div>

            {/* Application Note */}
            <p className="text-xs font-mono text-platinum/85 tracking-wide">
              By application only. We take on a limited number of founders.
            </p>

            {/* Trust Points */}
            <div className="pt-4 border-t border-border/50">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-slate-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-400" /> LinkedIn Account Safety
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-400" /> Research-Led 1-to-1 Messaging
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-400" /> Meetings Guarantee
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Live Dashboard Mockup */}
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

// --- SECTION 2: STATS & GUARANTEE STRIP ---
function GravityStatsAndGuaranteeSection() {
  return (
    <section className="py-16 border-y border-border/50 bg-secondary/30 text-left relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Main Verified Stat Card */}
          <div className="md:col-span-5 p-6 rounded-2xl bg-card/80 border border-primary/30 shadow-xl relative overflow-hidden">
            <div className="text-xs font-mono text-platinum uppercase tracking-wider mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Primary System Track Record
            </div>
            <div className="text-4xl sm:text-5xl font-luxury font-bold text-white tracking-tight my-2">
              1,000+
            </div>
            <div className="text-base font-semibold text-platinum font-modern">
              Qualified, sales-ready meetings booked
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Consistently booked on founder and AE calendars through AI-powered LinkedIn client acquisition.
            </p>
          </div>

          {/* Guarantee & Minimum Volume Claim */}
          <div className="md:col-span-7 space-y-4 p-6 rounded-2xl bg-secondary/40 border border-glass-border">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 font-semibold">
              <ShieldCheck size={14} />
              The ChroniqAI Gravity Commitment
            </div>

            <h3 className="text-xl sm:text-2xl font-luxury text-white">
              Typically 6-10 qualified meetings per month as a minimum, scaling to 24-30 depending on your niche and industry.
            </h3>

            <div className="p-4 rounded-xl bg-card/60 border border-emerald-500/30 text-xs text-slate-200 leading-relaxed font-modern">
              <span className="font-semibold text-emerald-400 font-mono block mb-1 uppercase tracking-wider">
                Our Guarantee:
              </span>
              If we don&apos;t deliver the agreed monthly minimum, the next month is free until the remaining meetings are delivered.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- SECTION 3: BLACK HOLE STORY SECTION ---
function GravityBlackHoleStorySection() {
  return (
    <section id="why-gravity" className="py-24 text-left relative overflow-hidden bg-background">
      {/* Background second smaller black hole effect */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] pointer-events-none -z-10 opacity-40">
        <BlackHoleCanvas size="story" className="w-full h-full" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 max-w-5xl relative z-10 space-y-12">
        {/* Block 1: Why we call it Gravity */}
        <div className="p-8 md:p-12 rounded-3xl border border-glass-border bg-card/85 backdrop-blur-xl relative overflow-hidden shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary border border-primary/20 text-xs font-mono text-platinum mb-4">
            <span className="w-2 h-2 rounded-full bg-platinum-glow" />
            Core Philosophy
          </div>

          <h2 className="text-3xl sm:text-5xl font-luxury text-white mb-6">
            Why we call it Gravity
          </h2>

          <p className="text-base sm:text-lg text-slate-200 font-modern leading-relaxed max-w-3xl">
            A black hole doesn&apos;t chase anything. It&apos;s so strong that everything is drawn toward it. That&apos;s the principle behind every system we build: make your outreach, your offer, and your positioning strong enough that high-ticket clients are pulled straight into your calendar.
          </p>
        </div>

        {/* Block 2: Built by a founder who had the same problem */}
        <div className="p-8 md:p-12 rounded-3xl border border-glass-border bg-secondary/35 backdrop-blur-xl relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Story Text */}
            <div className="md:col-span-8 space-y-4">
              <span className="text-xs font-mono text-platinum uppercase tracking-wider block">
                Origin Story
              </span>

              <h3 className="text-2xl sm:text-4xl font-luxury text-white">
                Built by a founder who had the same problem
              </h3>

              <p className="text-base text-slate-200 font-modern leading-relaxed">
                &ldquo;I&apos;m Ved. I had a great offer but no clients, so I built a system for myself, and it booked 300+ calls before I ever sold it to anyone. Gravity is that system, now built for founders like you.&rdquo;
              </p>

              <div className="pt-2 flex items-center gap-3">
                <div className="text-xs font-mono text-platinum font-semibold">
                  Vedansh Pandey
                </div>
                <span className="text-border">|</span>
                <div className="text-xs text-slate-400">
                  Founder & CEO, ChroniqAI
                </div>
              </div>
            </div>

            {/* Founder Photo / Placeholder */}
            <div className="md:col-span-4 flex flex-col items-center justify-center">
              <div className="w-44 h-48 sm:w-48 sm:h-52 rounded-2xl border-2 border-primary/40 bg-gradient-to-b from-card to-secondary/80 p-4 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-xl group">
                <div className="w-16 h-16 rounded-full bg-secondary border border-border flex items-center justify-center text-platinum font-luxury text-2xl font-bold mb-3 shadow-inner">
                  VP
                </div>
                <div className="text-xs font-mono text-emerald-400 font-bold mb-1">
                  [FOUNDER_PHOTO]
                </div>
                <div className="text-xs font-semibold text-white">
                  Vedansh Pandey
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Founder & CEO
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- SECTION 4: PROCESS (HOW IT WORKS 4-STEP TIMELINE) ---
function GravityProcessSection() {
  const steps = [
    {
      timeframe: "Week 1",
      name: "Setup",
      desc: "We warm up your LinkedIn accounts, build your offer positioning, research your market, and create your ideal client lead list.",
    },
    {
      timeframe: "Days 8-21",
      name: "14-Day Gravity Trial",
      desc: "We launch outreach and test the system on your offer and niche. You see real conversations and real meetings before committing.",
    },
    {
      timeframe: "Day 22",
      name: "Decision",
      desc: "If the system works for you, we move forward together. If it doesn't, we part ways.",
    },
    {
      timeframe: "Months 3-12",
      name: "Scale",
      desc: "A long-term engagement with ongoing optimization, reporting, and a steady flow of qualified meetings.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-secondary/15 border-y border-border/50 text-left">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-primary/20 text-xs font-medium text-platinum">
            <Clock size={13} className="text-platinum-glow" />
            Structured Deployment Timeline
          </div>
          <h2 className="text-3xl sm:text-5xl font-luxury text-white">
            How it works
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            A transparent 4-stage engagement engineered around real conversations, verified account safety, and measurable meeting velocity.
          </p>
        </div>

        {/* 4-Step Horizontal Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-card/75 border border-glass-border relative flex flex-col justify-between group hover:border-primary/50 transition-colors shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-emerald-400 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    {step.timeframe}
                  </span>
                  <span className="font-mono text-xs text-platinum/70">
                    Stage 0{idx + 1}
                  </span>
                </div>
                <h3 className="text-xl font-luxury text-white mb-2">{step.name}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-modern">{step.desc}</p>
              </div>

              <div className="mt-6 pt-3 border-t border-border/40 text-[11px] font-mono text-platinum/80 flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-400" /> Phase 0{idx + 1} Milestone
              </div>
            </div>
          ))}
        </div>

        {/* Requirement Note Under Timeline */}
        <div className="mt-12 p-6 rounded-2xl bg-secondary/40 border border-primary/30 max-w-4xl mx-auto flex items-start gap-3.5">
          <Lock size={18} className="text-platinum-glow shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-modern">
            <strong className="text-white">Requirement:</strong> At least 2 LinkedIn accounts from your team to start. This lets us run safely at volume while protecting your accounts with daily limits and human-like pacing.
          </p>
        </div>
      </div>
    </section>
  );
}

// --- SECTION 5: COMPARISON TABLE (GRAVITY VS. THE USUAL APPROACH) ---
function GravityComparisonSection() {
  const matrix = [
    {
      dimension: "Approach",
      usual: "Generic template blasts to scraped lists",
      gravity: "Research-led, personalized conversations",
    },
    {
      dimension: "Personalization",
      usual: "Low-effort automation and canned replies",
      gravity: "1-to-1 messaging in your genuine executive voice",
    },
    {
      dimension: "Account Safety",
      usual: "Risky bulk tools that trigger LinkedIn bans",
      gravity: "Warm-up, daily limits, human-like pacing",
    },
    {
      dimension: "Meetings",
      usual: "Unclear reporting and unqualified calls",
      gravity: "Qualified meetings booked straight to your calendar",
    },
    {
      dimension: "Accountability",
      usual: "No guarantee — retainers charged regardless",
      gravity: "Monthly meetings guarantee (next month free if unmet)",
    },
  ];

  return (
    <section className="py-24 bg-background text-left">
      <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-mono text-platinum uppercase tracking-wider block">
            The Difference
          </span>
          <h2 className="text-3xl sm:text-5xl font-luxury text-white">
            Gravity vs. the usual approach
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Why traditional outsourced lead generation fails high-ticket B2B founders, and how Gravity fixes it.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-glass-border bg-card/80 backdrop-blur-xl shadow-2xl">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-secondary/50 text-xs font-mono uppercase text-muted-foreground">
                <th className="p-4 md:p-6 text-platinum">Dimension</th>
                <th className="p-4 md:p-6 text-slate-400">The Usual Approach</th>
                <th className="p-4 md:p-6 text-white font-bold bg-primary/10">ChroniqAI Gravity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {matrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-secondary/20 transition-colors">
                  <td className="p-4 md:p-6 font-semibold text-white">{row.dimension}</td>
                  <td className="p-4 md:p-6 text-slate-400">{row.usual}</td>
                  <td className="p-4 md:p-6 font-semibold text-white bg-primary/5 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    {row.gravity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// --- SECTION 6: RESULTS & CASE STUDY SECTION ---
function GravityResultsCaseStudySection({ onOpenApply }: { onOpenApply: () => void }) {
  return (
    <section id="results" className="py-24 bg-secondary/20 border-y border-border/50 text-left">
      <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-mono text-platinum uppercase tracking-wider block">
            Real Proof & Standards
          </span>
          <h2 className="text-3xl sm:text-5xl font-luxury text-white">
            Client Results & Case Study
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            We hold ourselves strictly to outcome-led delivery for high-ticket offers.
          </p>
        </div>

        {/* Real Case Study Card Placeholder */}
        <div className="p-8 md:p-12 rounded-3xl border border-glass-border bg-card/90 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border/50">
            <div className="space-y-1">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                [REAL_CASE_STUDY]
              </span>
              <h3 className="text-2xl font-luxury text-white">
                Client Profile: High-Ticket B2B Founder Case Study
              </h3>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded bg-secondary border border-border text-platinum">
              Verified LinkedIn Outreach
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300 font-modern">
            <div className="p-5 rounded-xl bg-secondary/40 border border-border/50 space-y-2">
              <strong className="text-white block font-mono text-xs uppercase tracking-wider text-rose-300">
                Problem Faced:
              </strong>
              <p>
                [REAL_CASE_STUDY: High-ticket B2B founder with $5k-$20k offer was unable to get qualified C-suite prospects to respond on LinkedIn through manual efforts.]
              </p>
            </div>

            <div className="p-5 rounded-xl bg-secondary/40 border border-border/50 space-y-2">
              <strong className="text-white block font-mono text-xs uppercase tracking-wider text-emerald-300">
                Gravity Solution Deployed:
              </strong>
              <p>
                [REAL_CASE_STUDY: Configured offer positioning, warmed 2 team LinkedIn accounts, initiated personalized 1-to-1 conversations with verified decision-makers.]
              </p>
            </div>
          </div>

          {/* Metric Highlight Box */}
          <div className="p-6 rounded-2xl bg-secondary/50 border border-primary/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-platinum uppercase tracking-wider">
                Delivered Outcome
              </div>
              <div className="text-xl sm:text-2xl font-luxury text-white mt-1">
                [REAL_CASE_STUDY: 6-10+ Sales-Ready Meetings Delivered in First 30 Days]
              </div>
            </div>

            <LuxuryButton
              variant="platinum"
              size="sm"
              onClick={onOpenApply}
              className="shrink-0"
            >
              Apply for Your 14-Day Trial
            </LuxuryButton>
          </div>

          <div className="pt-2 text-xs font-mono text-slate-400 italic">
            * Case study data updated upon client authorization. Client confidential information protected.
          </div>
        </div>
      </div>
    </section>
  );
}

// --- SECTION 7: FAQ SECTION ---
function GravityFAQSection() {
  const faqs = [
    {
      q: "Who is Gravity for?",
      a: "B2B founders and business owners with a high-ticket offer (ticket size $2,500+), a proven case study, and ideal clients active on LinkedIn.",
    },
    {
      q: "Who is it NOT for?",
      a: "Businesses with low-ticket offers, no proven results, or audiences who aren't on LinkedIn.",
    },
    {
      q: "How long before I see meetings?",
      a: "Week 1 is setup. Your 14-day trial starts after that, and meetings begin during the trial.",
    },
    {
      q: "How many meetings can I expect?",
      a: "A minimum of 6-10 per month, and up to 24-30 depending on your niche.",
    },
    {
      q: "Is my LinkedIn account safe?",
      a: "We use warm-up, daily limits, and human-like pacing to protect your accounts. We need at least 2 accounts to start.",
    },
    {
      q: "How much time do I need to invest?",
      a: "About 30 minutes a week for feedback and sales calls.",
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
          <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Everything you need to know about ChroniqAI Gravity and the 14-day trial.
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

// --- SECTION 8: FINAL CTA SECTION ---
function GravityFinalCTASection({ onOpenApply }: { onOpenApply: () => void }) {
  return (
    <section className="py-24 text-left relative overflow-hidden bg-secondary/10 border-t border-border/50">
      <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
        <div className="p-10 md:p-16 rounded-3xl border border-glass-border bg-gradient-card text-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary border border-primary/25 text-xs font-medium text-platinum">
            <Sparkles size={14} className="text-platinum-glow" />
            Limited Monthly Capacity
          </div>

          <h2 className="text-3xl sm:text-5xl font-luxury text-white tracking-tight">
            Ready to be the one who gets chased?
          </h2>

          <p className="text-base sm:text-lg text-slate-200 max-w-xl mx-auto leading-relaxed font-modern">
            Apply for the 14-day trial. We&apos;ll personally review your application and tell you whether Gravity is a fit.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={FORM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (FORM_LINK.includes("placeholder")) {
                  e.preventDefault();
                  onOpenApply();
                }
              }}
            >
              <LuxuryButton
                variant="platinum"
                size="lg"
                className="flex items-center justify-center gap-2"
              >
                <span>Apply for the 14-Day Gravity Trial</span>
                <ArrowRight size={18} />
              </LuxuryButton>
            </a>
          </div>

          <p className="text-xs font-mono text-platinum/80 pt-2">
            By application only • We review each application within 24 hours.
          </p>
        </div>
      </div>
    </section>
  );
}

// --- MAIN GRAVITY PAGE COMPONENT ---
export default function GravityPlatform() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const gravityFaqs = [
    {
      question: "Who is Gravity for?",
      answer: "B2B founders and business owners with a high-ticket offer (ticket size $2,500+), a proven case study, and ideal clients active on LinkedIn."
    },
    {
      question: "Who is it NOT for?",
      answer: "Businesses with low-ticket offers, no proven results, or audiences who aren't on LinkedIn."
    },
    {
      question: "How long before I see meetings?",
      answer: "Week 1 is setup. Your 14-day trial starts after that, and meetings begin during the trial."
    },
    {
      question: "How many meetings can I expect?",
      answer: "A minimum of 6-10 per month, and up to 24-30 depending on your niche."
    },
    {
      question: "Is my LinkedIn account safe?",
      answer: "We use warm-up, daily limits, and human-like pacing to protect your accounts. We need at least 2 accounts to start."
    },
    {
      question: "How much time do I need to invest?",
      answer: "About 30 minutes a week for feedback and sales calls."
    }
  ];

  return (
    <PageLayout>
      <SEOHead
        title="ChroniqAI Gravity | AI Client Acquisition for B2B Founders"
        description="Stop chasing clients. Let them fall into your calendar. ChroniqAI Gravity is an AI-powered LinkedIn client acquisition system for B2B founders with high-ticket offers."
        canonical="https://chroniqai.com/gravity"
        keywords="ChroniqAI Gravity, LinkedIn client acquisition, B2B sales meetings, high-ticket offers, 14-day trial"
      />
      <SoftwareApplicationSchema />
      <FAQPageSchema faqs={gravityFaqs} />

      <GravityHeroSection onOpenApply={() => setIsApplyModalOpen(true)} />
      <GravityStatsAndGuaranteeSection />
      <GravityBlackHoleStorySection />
      <GravityProcessSection />
      <GravityComparisonSection />
      <GravityResultsCaseStudySection onOpenApply={() => setIsApplyModalOpen(true)} />
      <GravityFAQSection />
      <GravityFinalCTASection onOpenApply={() => setIsApplyModalOpen(true)} />

      <AuditModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </PageLayout>
  );
}
