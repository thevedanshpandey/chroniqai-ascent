import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { OrganizationSchema, WebsiteSchema } from "@/components/seo/StructuredData";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { AuditModal } from "@/components/modals/AuditModal";
import { IronmanDemoModal } from "@/components/modals/IronmanDemoModal";
import { InteractiveIronmanDashboard } from "@/components/revenue/InteractiveIronmanDashboard";
import { IronmanPipelineWorkflow } from "@/components/revenue/IronmanPipelineWorkflow";
import { RevenueScoreCalculator } from "@/components/revenue/RevenueScoreCalculator";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Clock,
  Eye,
  HelpCircle,
  Infinity as InfinityIcon,
  Layers,
  Play,
  Quote,
  RefreshCw,
  Search,
  Send,
  Shield,
  ShieldAlert,
  Sparkles,
  Target,
  TrendingUp,
  User,
  Users,
  Zap,
} from "lucide-react";

// --- HERO SECTION ---
function HeroSection({ onOpenAudit, onOpenDemo }: { onOpenAudit: () => void; onOpenDemo: () => void }) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden text-left">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] hero-gradient pointer-events-none -z-10" />

      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 border border-primary/20 text-xs font-medium text-platinum">
              <Sparkles size={14} className="text-platinum-glow" />
              <span>AI Outbound System for High-Ticket B2B</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-luxury text-white tracking-tight leading-[1.1]">
              Build Predictable Outbound Pipeline. <br />
              <span className="text-platinum-gradient">Not More Manual Work.</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground font-modern leading-relaxed max-w-xl">
              We build and manage the IRONMAN™ Outbound System: an automated AI engine that tracks verified buyer signals, conducts deep account research, and crafts personalized executive messages that book qualified meetings directly on your sales calendar.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <LuxuryButton
                variant="platinum"
                size="lg"
                onClick={onOpenAudit}
                className="flex items-center justify-center gap-2"
              >
                <span>Get Free System Audit</span>
                <ArrowRight size={18} />
              </LuxuryButton>

              <LuxuryButton
                variant="outline"
                size="lg"
                onClick={onOpenDemo}
                className="flex items-center justify-center gap-2"
              >
                <Play size={16} className="text-platinum-glow fill-platinum-glow" />
                <span>Watch How IRONMAN Works (2 min)</span>
              </LuxuryButton>
            </div>

            {/* Self-qualification ICP indicator */}
            <div className="pt-3 border-t border-border/40">
              <div className="text-[11px] font-mono text-platinum/90 uppercase tracking-wider mb-2">
                Built for High-Ticket B2B:
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-muted-foreground">
                <span className="flex items-center gap-1"><CheckCircle2 size={13} className="text-emerald-400" /> SaaS</span>
                <span className="flex items-center gap-1"><CheckCircle2 size={13} className="text-emerald-400" /> Cybersecurity</span>
                <span className="flex items-center gap-1"><CheckCircle2 size={13} className="text-emerald-400" /> IT Services</span>
                <span className="flex items-center gap-1"><CheckCircle2 size={13} className="text-emerald-400" /> AI & Dev Tools</span>
                <span className="flex items-center gap-1"><CheckCircle2 size={13} className="text-emerald-400" /> Consulting</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Live Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6"
          >
            <InteractiveIronmanDashboard compact={false} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// --- SECTION 2: SOCIAL PROOF / HARD METRICS ---
function SocialProofSection() {
  const metrics = [
    { value: "1,000+", label: "Qualified Meetings Booked", note: "Verified B2B Decision-Makers" },
    { value: "$14.2M", label: "Pipeline Generated", note: "Across Enterprise SaaS & Cyber" },
    { value: "48", label: "B2B Companies Scaled", note: "Active System Deployments" },
    { value: "18.4%", label: "Average Reply Rate", note: "6x Higher Than Industry Standard" },
  ];

  return (
    <section className="py-16 border-y border-border/50 bg-secondary/20 text-left">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left mb-12">
          {metrics.map((m, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-card/40 border border-border/40">
              <div className="text-3xl sm:text-4xl font-luxury font-bold text-white tracking-tight mb-1">
                {m.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-platinum font-modern">
                {m.label}
              </div>
              <div className="text-[11px] text-muted-foreground font-mono mt-0.5">
                {m.note}
              </div>
            </div>
          ))}
        </div>

        {/* Client Logo Marquee Bar */}
        <div className="pt-4 border-t border-border/40 flex flex-wrap items-center justify-between gap-8 text-xs font-mono text-muted-foreground/60 uppercase tracking-widest">
          <span>Trusted by B2B Revenue Leaders</span>
          <span className="text-muted-foreground font-semibold">SUPABASE</span>
          <span className="text-muted-foreground font-semibold">LINEAR</span>
          <span className="text-muted-foreground font-semibold">VERCEL</span>
          <span className="text-muted-foreground font-semibold">RETOOL</span>
          <span className="text-muted-foreground font-semibold">RAMP</span>
        </div>
      </div>
    </section>
  );
}

// --- SECTION 3: THE PROBLEM ---
function ProblemSection() {
  const problemSteps = [
    { title: "Manual Outreach", text: "Reps spend 25+ hours each week copy-pasting generic emails to unvetted lists." },
    { title: "Ignored Messages", text: "Senior decision-makers delete impersonal cold pitches within seconds." },
    { title: "Missed Follow-Ups", text: "Warm prospects slip away because reps lack automated conversation workflows." },
    { title: "High Team Turnover", text: "Sales rep turnover every 9-12 months constantly resets your pipeline." },
    { title: "Disconnected Tools", text: "Scattered data across multiple tools makes pipeline unpredictable." },
  ];

  return (
    <section className="py-24 text-left relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-mono text-rose-400 uppercase tracking-wider block">
            The B2B Pipeline Bottleneck
          </span>
          <h2 className="text-3xl sm:text-5xl font-luxury text-white">
            Most Companies Don&apos;t Have a Sales Problem. <br />
            <span className="text-platinum-gradient">They Have an Outbound System Problem.</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            When sales rely on brute-force manual effort, growth hits an immediate wall. Here is why traditional outbound sales break down:
          </p>
        </div>

        {/* Horizontal Progression Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          {problemSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-card/60 border border-rose-500/20 relative flex flex-col justify-between group hover:border-rose-500/40 transition-colors"
            >
              <div>
                <span className="font-mono text-xs text-rose-400 block mb-2">0{idx + 1}.</span>
                <h3 className="text-sm font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.text}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-border/30 text-[10px] font-mono text-rose-400/80">
                Friction Point
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-secondary/40 border border-glass-border text-center">
          <p className="text-sm sm:text-base text-white font-luxury italic">
            &ldquo;The outcome of fragmented tools and manual sales rep work isn&apos;t just higher customer acquisition cost—it is completely unpredictable pipeline.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}

// --- SECTION 4: MEET IRONMAN™ ---
function MeetIronmanSection() {
  return (
    <section className="py-24 bg-secondary/10 border-y border-border/50 text-left">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-primary/20 text-xs font-medium text-platinum">
            <Layers size={13} className="text-platinum-glow" />
            Automated Outbound Pipeline
          </div>
          <h2 className="text-3xl sm:text-5xl font-luxury text-white">
            Imagine Your Sales Team Waking Up to Booked Calls.
          </h2>
          <p className="text-base sm:text-lg text-platinum font-luxury italic">
            Before your team opens their laptops, the IRONMAN Outbound System has already done the heavy lifting.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto pt-4 text-left">
            <div className="p-4 rounded-xl bg-card/60 border border-border/50 text-xs space-y-2">
              <span className="font-mono text-emerald-400 font-bold block">01. Buyer Intent Discovery</span>
              <p className="text-muted-foreground leading-relaxed">Identified qualified target accounts showing active hiring, expansion, and tech growth signals.</p>
            </div>
            <div className="p-4 rounded-xl bg-card/60 border border-border/50 text-xs space-y-2">
              <span className="font-mono text-emerald-400 font-bold block">02. Deep Account Research</span>
              <p className="text-muted-foreground leading-relaxed">Reviewed recent company announcements, strategic initiatives, and executive interviews for context.</p>
            </div>
            <div className="p-4 rounded-xl bg-card/60 border border-border/50 text-xs space-y-2">
              <span className="font-mono text-emerald-400 font-bold block">03. Confirmed Calendar Bookings</span>
              <p className="text-muted-foreground leading-relaxed">Sent personalized executive messages and placed qualified meetings directly on your sales calendar.</p>
            </div>
          </div>
        </div>

        <IronmanPipelineWorkflow />
      </div>
    </section>
  );
}

// --- SECTION 5: THE IRONMAN OUTBOUND SYSTEM ---
function OutboundSystemPillarsSection({ onOpenAudit }: { onOpenAudit: () => void }) {
  const pillars = [
    {
      step: "01",
      title: "Buyer Intent Discovery",
      desc: "Identifies accounts actively hiring, raising capital, or expanding leadership teams so your outreach reaches buyers at the exact right moment.",
      benefit: "No cold list fatigue",
      icon: Target,
    },
    {
      step: "02",
      title: "Deep Account Research",
      desc: "Reviews recent company announcements, strategic priorities, and executive interviews to understand what prospects genuinely care about.",
      benefit: "100% relevant context",
      icon: Search,
    },
    {
      step: "03",
      title: "Personalized Executive Messaging",
      desc: "Writes authentic 1-to-1 emails in your natural voice that decision-makers actually read, answer, and forward to internal champions.",
      benefit: "18.4% average response rate",
      icon: Send,
    },
    {
      step: "04",
      title: "Inbox Protection & Calendar Booking",
      desc: "Maintains dedicated sending domains to ensure primary inbox delivery, automatically handling scheduling directly on your sales calendar.",
      benefit: "12-25+ meetings / month",
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="py-24 text-left">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-mono text-platinum uppercase tracking-wider block">
            System Architecture
          </span>
          <h2 className="text-3xl sm:text-5xl font-luxury text-white">
            The IRONMAN™ Outbound System
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Four core capabilities working together to eliminate manual prospecting and deliver consistent sales meetings.
          </p>
        </div>

        {/* Flagship Hero Card */}
        <div className="mb-10 p-8 md:p-10 rounded-2xl border-2 border-primary/50 bg-gradient-to-br from-card to-secondary/80 backdrop-blur-xl relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="p-3 w-fit rounded-xl bg-secondary border border-border text-platinum-glow">
                <Send size={24} />
              </div>
              <h3 className="text-3xl font-luxury text-white">Dedicated Outbound Pipeline Machine</h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Replaces manual SDR prospecting with verified buyer signals, in-depth account research, and authentic executive messaging that consistently books meetings with qualified decision-makers.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-emerald-400 pt-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  ✓ 12-25+ Qualified Meetings / Mo
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  ✓ 18.4% Average Response Rate
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  ✓ Zero Manual Prospecting Required
                </span>
              </div>
            </div>
            <div className="lg:col-span-4 flex flex-col justify-center gap-3">
              <LuxuryButton
                variant="platinum"
                size="default"
                onClick={onOpenAudit}
                className="w-full flex items-center justify-center gap-2"
              >
                <span>Audit Your Outbound Setup</span>
                <ArrowRight size={16} />
              </LuxuryButton>
              <Link to="/ironman" className="text-center text-xs text-muted-foreground hover:text-white transition-colors">
                View Full Outbound System Details →
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.step} className="p-6 rounded-xl border border-glass-border bg-card/60 space-y-3 flex flex-col justify-between hover:border-primary/40 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-platinum font-bold">Pillar {p.step}</span>
                    <Icon size={18} className="text-platinum-glow" />
                  </div>
                  <h4 className="text-lg font-luxury text-white mb-2">{p.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {p.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-border/30">
                  <span className="text-[11px] font-mono text-emerald-400">
                    {p.benefit}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// --- SECTION 6: CASE STUDIES ---
function CaseStudiesSection({ onOpenAudit }: { onOpenAudit: () => void }) {
  return (
    <section className="py-24 bg-secondary/10 border-y border-border/50 text-left">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs font-mono text-platinum uppercase tracking-wider block mb-2">
              Outcome-Led Proof
            </span>
            <h2 className="text-3xl sm:text-5xl font-luxury text-white">
              Measurable Revenue Results
            </h2>
          </div>

          <Link to="/case-studies">
            <LuxuryButton variant="outline" size="sm" className="shrink-0">
              View All Case Studies →
            </LuxuryButton>
          </Link>
        </div>

        {/* Featured Case Study Card */}
        <div className="p-8 md:p-12 rounded-2xl border border-glass-border bg-card/80 backdrop-blur-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                DevOps & Enterprise SaaS Case Study
              </span>

              <h3 className="text-2xl sm:text-4xl font-luxury text-white">
                ScaleMetrics: $310k Pipeline in 45 Days
              </h3>

              <div className="space-y-3 text-sm text-muted-foreground">
                <div>
                  <strong className="text-white">Problem:</strong> SDR team was spending 30 hours/week manually messaging with sub-1% reply rates.
                </div>
                <div>
                  <strong className="text-white">System Built:</strong> IRONMAN Outbound + Operations with 10-K research intent triggers.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-secondary/50 border border-border/60 text-xs font-luxury italic text-white/90">
                &ldquo;ChroniqAI didn&apos;t just give us leads; they built a revenue engine that books VP-level meetings every single week.&rdquo;
                <div className="font-mono not-italic text-platinum font-bold mt-1 text-[11px]">
                  — Marcus Vance, VP Revenue
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-xl bg-secondary/40 border border-border/60 space-y-4">
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                Key Metrics Achieved
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-background/60 border border-border/40 flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">New Pipeline Generated</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">$310,000</span>
                </div>
                <div className="p-3 rounded-lg bg-background/60 border border-border/40 flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">VP Meetings Booked</span>
                  <span className="font-mono font-bold text-white text-sm">24 Meetings / 45 Days</span>
                </div>
                <div className="p-3 rounded-lg bg-background/60 border border-border/40 flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Cold Response Rate</span>
                  <span className="font-mono font-bold text-platinum text-sm">18.4%</span>
                </div>
              </div>

              <LuxuryButton
                variant="platinum"
                size="sm"
                onClick={onOpenAudit}
                className="w-full flex items-center justify-center gap-2 mt-2"
              >
                Build Similar Infrastructure
                <ArrowRight size={14} />
              </LuxuryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- SECTION 7: HOW WE WORK (DEPLOYMENT PROCESS) ---
function HowWeWorkSection() {
  const steps = [
    { num: "01", name: "Audit", desc: "45-minute review of your target market, buyer profile, and current outbound outreach." },
    { num: "02", name: "Strategy", desc: "Mapping your buyer triggers, ideal company profile, and messaging angles." },
    { num: "03", name: "Setup", desc: "Setting up protected email domains, automated research pipelines, and CRM syncing." },
    { num: "04", name: "Launch", desc: "Testing initial outreach, reviewing executive responses, and refining targeting." },
    { num: "05", name: "Scale", desc: "Predictable, ongoing meeting bookings delivered straight to your sales calendar." },
  ];

  return (
    <section className="py-24 text-left">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-mono text-platinum uppercase tracking-wider block">
            Deployment Process
          </span>
          <h2 className="text-3xl sm:text-5xl font-luxury text-white">
            How We Work
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            No endless discovery calls or monthly agency fluff. A clean, proven 5-step outbound deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map((step) => (
            <div
              key={step.num}
              className="p-6 rounded-xl bg-card/60 border border-glass-border relative flex flex-col justify-between group hover:border-primary/50 transition-colors"
            >
              <div>
                <span className="font-mono text-xs font-bold text-platinum block mb-3">
                  Step {step.num}
                </span>
                <h3 className="text-xl font-luxury text-white mb-2">{step.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- SECTION 8: WHY CHRONIQAI (COMPARISON MATRIX) ---
function WhyChroniqAISection() {
  const matrix = [
    { feature: "Primary Approach", agency: "Sends generic template blasts", chroniq: "Researches real buyer intent & company context" },
    { feature: "Personalization", agency: "Low-effort automated templates", chroniq: "1-to-1 executive messaging in founder voice" },
    { feature: "Domain Health", agency: "Burned domains & high spam rates", chroniq: "Dedicated secondary domains with inbox protection" },
    { feature: "Meeting Scheduling", agency: "Manual spreadsheet logs", chroniq: "Confirmed meetings booked straight to AE calendars" },
    { feature: "Long-Term Value", agency: "Temporary agency retainer", chroniq: "Permanent outbound system your company owns" },
  ];

  return (
    <section className="py-24 bg-secondary/10 border-y border-border/50 text-left">
      <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-mono text-platinum uppercase tracking-wider block">
            Clear Distinction
          </span>
          <h2 className="text-3xl sm:text-5xl font-luxury text-white">
            Why We Don&apos;t Call Ourselves An Agency
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Agencies sell temporary labor and email blasts. We build an automated outbound engine that consistently books sales meetings.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-glass-border bg-card/80 backdrop-blur-xl">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-secondary/40 text-xs font-mono uppercase text-muted-foreground">
                <th className="p-4 md:p-6">Dimension</th>
                <th className="p-4 md:p-6 text-muted-foreground">Traditional Agency</th>
                <th className="p-4 md:p-6 text-platinum font-bold">IRONMAN Outbound System</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {matrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-secondary/20 transition-colors">
                  <td className="p-4 md:p-6 font-semibold text-white">{row.feature}</td>
                  <td className="p-4 md:p-6 text-muted-foreground">{row.agency}</td>
                  <td className="p-4 md:p-6 font-semibold text-platinum flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    {row.chroniq}
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

// --- SECTION 9: LIVE DASHBOARD PREVIEW ---
function LiveDashboardSection() {
  return (
    <section className="py-24 text-left relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live Client Dashboard
          </div>
          <h2 className="text-3xl sm:text-5xl font-luxury text-white">
            Real-Time Pipeline Visibility
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Unlike agencies that send vague monthly updates, IRONMAN gives you full live visibility into meetings booked, positive response rates, and pipeline value.
          </p>
        </div>

        <InteractiveIronmanDashboard compact={false} />
      </div>
    </section>
  );
}

// --- SECTION 10: MEET THE FOUNDERS ---
function MeetFoundersSection() {
  return (
    <section className="py-24 bg-secondary/10 border-y border-border/50 text-left">
      <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-mono text-platinum uppercase tracking-wider block">
            The Builders
          </span>
          <h2 className="text-3xl sm:text-5xl font-luxury text-white">
            Built by Outbound Specialists
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            We built ChroniqAI because we were exhausted by manual sales workflows, burned email domains, and fragile agency retainers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Founder 1 */}
          <div className="p-8 rounded-2xl border border-glass-border bg-card/70 backdrop-blur-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-secondary border border-border flex items-center justify-center text-platinum font-luxury font-bold text-xl">
                A
              </div>
              <div>
                <h3 className="text-2xl font-luxury text-white">Abhay</h3>
                <span className="text-xs font-mono text-platinum">Outbound Strategy & Client Growth</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Obsessed with one thing: helping B2B companies build predictable sales pipeline. Now our clients don&apos;t worry about outbound prospecting—they focus on closing qualified deals.
            </p>
          </div>

          {/* Founder 2 */}
          <div className="p-8 rounded-2xl border border-glass-border bg-card/70 backdrop-blur-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-secondary border border-border flex items-center justify-center text-platinum font-luxury font-bold text-xl">
                V
              </div>
              <div>
                <h3 className="text-2xl font-luxury text-white">Ved</h3>
                <span className="text-xs font-mono text-platinum">AI Outbound Architecture</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Focused on automating repetitive outbound workflows without sacrificing message relevance or deliverability. Designed the core engine behind IRONMAN Outbound.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- SECTION 11: REVENUE SCORE CALCULATOR ---
function RevenueScoreSection({ onOpenAudit }: { onOpenAudit: (score?: number) => void }) {
  return (
    <section className="py-24 text-left relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        <RevenueScoreCalculator onOpenAudit={onOpenAudit} />
      </div>
    </section>
  );
}

// --- SECTION 12: RESEARCH LAB ---
function ResearchLabSection() {
  const researchItems = [
    { title: "2026 B2B Outbound Deliverability & Response Benchmarks", type: "Benchmark Report" },
    { title: "The Executive Outbound Personalization Playbook", type: "Playbook" },
    { title: "Buyer Intent Signals & Account Trigger Guide", type: "Research Guide" },
  ];

  return (
    <section className="py-20 bg-secondary/10 border-y border-border/50 text-left">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono text-platinum uppercase tracking-wider block mb-2">
              Outbound Research & Data
            </span>
            <h2 className="text-3xl font-luxury text-white">
              ChroniqAI Research Lab
            </h2>
          </div>

          <Link to="/resources">
            <LuxuryButton variant="outline" size="sm">
              Explore All Research →
            </LuxuryButton>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {researchItems.map((r, idx) => (
            <div key={idx} className="p-6 rounded-xl bg-card/60 border border-glass-border flex flex-col justify-between space-y-4 hover:border-primary/40 transition-colors">
              <div>
                <span className="text-[10px] font-mono text-platinum uppercase px-2.5 py-0.5 rounded bg-secondary">
                  {r.type}
                </span>
                <h3 className="text-lg font-luxury text-white mt-3">{r.title}</h3>
              </div>
              <Link to="/resources" className="text-xs text-platinum hover:text-white flex items-center gap-1 font-semibold">
                Access Documentation <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- SECTION 13: FAQ & FINAL CTA ---
function FAQAndFinalCTASection({ onOpenAudit }: { onOpenAudit: () => void }) {
  const faqs = [
    {
      q: "Can this replace manual sales prospecting?",
      a: "Yes. The IRONMAN Outbound System takes over account identification, deep research, and email outreach, allowing your Account Executives to focus entirely on running high-intent sales calls.",
    },
    {
      q: "How soon do we see qualified meetings?",
      a: "Domain setup and buyer signal calibration take 10-14 days. First qualified meeting bookings typically begin landing between day 18 and day 25.",
    },
    {
      q: "How do you protect our main email domain from being marked as spam?",
      a: "We never send cold outreach from your primary domain. We configure dedicated secondary domains, enforce strict sending caps, and warm inboxes systematically to guarantee high deliverability.",
    },
    {
      q: "Who is NOT a fit for ChroniqAI?",
      a: "B2C brands, low-ticket products under $5k deal size, or companies looking for one-off mass spam blasts. We build high-precision B2B outbound systems for enterprise companies.",
    },
    {
      q: "How much founder or team involvement is needed?",
      a: "Initial onboarding takes about 2 hours to calibrate target accounts and messaging voice. Ongoing involvement is under 30 minutes per week.",
    },
  ];

  return (
    <section className="py-24 text-left">
      <div className="container mx-auto px-6 lg:px-8 max-w-4xl space-y-20">
        {/* FAQ Accordion */}
        <div>
          <div className="text-center space-y-4 mb-12">
            <span className="text-xs font-mono text-platinum uppercase tracking-wider block">
              Clear Answers
            </span>
            <h2 className="text-3xl sm:text-4xl font-luxury text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-card/60 border border-glass-border space-y-2">
                <h3 className="text-base font-semibold text-white flex items-center gap-2">
                  <HelpCircle size={18} className="text-platinum shrink-0" />
                  {faq.q}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final Call to Action */}
        <div className="p-10 md:p-16 rounded-2xl border border-glass-border bg-gradient-card text-center space-y-6 relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary border border-primary/20 text-xs font-medium text-platinum">
            <Sparkles size={14} className="text-platinum-glow" />
            No Sales Pitch • 100% Actionable Outbound Blueprint
          </div>

          <h2 className="text-3xl sm:text-5xl font-luxury text-white tracking-tight">
            Ready to Build Your Outbound Pipeline Engine?
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed font-modern">
            Schedule a 45-minute Free Outbound System Audit to review your ideal buyer profile, messaging angles, and email deliverability.
          </p>

          <div className="pt-4">
            <LuxuryButton
              variant="platinum"
              size="lg"
              onClick={onOpenAudit}
              className="flex items-center justify-center gap-2 mx-auto"
            >
              <span>Get My Free Outbound Audit</span>
              <ArrowRight size={18} />
            </LuxuryButton>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- MAIN INDEX PAGE COMPONENT ---
export default function Index() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [auditScore, setAuditScore] = useState<number | undefined>(undefined);

  const handleOpenAudit = (score?: number) => {
    setAuditScore(score);
    setIsAuditModalOpen(true);
  };

  return (
    <PageLayout>
      <SEOHead
        title="AI Outbound System for High-Ticket B2B | ChroniqAI"
        description="ChroniqAI builds the IRONMAN Outbound System for high-ticket B2B companies. Generate predictable sales pipeline through buyer intent signals, deep account research, and personalized executive messaging."
        canonical="https://chroniqai.com/"
      />
      <OrganizationSchema />
      <WebsiteSchema />

      <HeroSection onOpenAudit={() => handleOpenAudit()} onOpenDemo={() => setIsDemoModalOpen(true)} />
      <SocialProofSection />
      <ProblemSection />
      <MeetIronmanSection />
      <OutboundSystemPillarsSection onOpenAudit={() => handleOpenAudit()} />
      <CaseStudiesSection onOpenAudit={() => handleOpenAudit()} />
      <HowWeWorkSection />
      <WhyChroniqAISection />
      <LiveDashboardSection />
      <MeetFoundersSection />
      <RevenueScoreSection onOpenAudit={handleOpenAudit} />
      <ResearchLabSection />
      <FAQAndFinalCTASection onOpenAudit={() => handleOpenAudit()} />

      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        initialScore={auditScore}
      />

      <IronmanDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onOpenAudit={() => handleOpenAudit()}
      />
    </PageLayout>
  );
}
