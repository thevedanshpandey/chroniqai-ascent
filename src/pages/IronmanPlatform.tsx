import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Cpu,
  Send,
  Sparkles,
  Eye,
  RefreshCw,
  ArrowRight,
  CheckCircle2,
  Database,
  Search,
  Bot,
  Zap,
  ShieldCheck,
  Target,
  Terminal,
  Activity
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { SoftwareApplicationSchema, FAQPageSchema } from "@/components/seo/StructuredData";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { AuditModal } from "@/components/modals/AuditModal";

export default function IronmanPlatform() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  const ironmanFaqs = [
    {
      question: "What is the IRONMAN™ Outbound System?",
      answer: "IRONMAN is ChroniqAI's dedicated B2B Outbound System. Unlike manual sales prospecting or temporary agency retainers, IRONMAN operates as an automated engine that continuously tracks buyer intent signals, analyzes target accounts, writes personalized executive messages, and books qualified meetings directly on your sales calendar."
    },
    {
      question: "How is IRONMAN different from a lead generation agency?",
      answer: "Agencies charge high monthly labor retainers for generic email blasts that burn your brand and sender domains. We build an automated outbound engine customized for your company, focused on genuine buyer relevance and 1-to-1 personalization."
    },
    {
      question: "How do you protect email deliverability?",
      answer: "We configure dedicated secondary domains, strictly cap hourly sending volumes, and warm inboxes systematically so your emails land consistently in primary inboxes without risking your corporate domain."
    },
    {
      question: "How fast does the system begin booking meetings?",
      answer: "Initial setup, target account mapping, and domain warm-up take approximately 14 business days. Outbound campaigns begin dispatching in Week 3, with qualified meetings typically booking by Week 4."
    }
  ];

  return (
    <PageLayout>
      <SEOHead
        title="IRONMAN™ AI Outbound System | ChroniqAI"
        description="Explore the IRONMAN™ Outbound System: buyer intent discovery, deep account research, personalized executive outreach, and automated meeting booking."
        canonical="https://chroniqai.com/ironman"
        keywords="IRONMAN outbound, AI outbound system, B2B sales meetings, cold outbound, intent signals, executive email personalization"
      />
      <SoftwareApplicationSchema />
      <FAQPageSchema faqs={ironmanFaqs} />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 overflow-hidden text-left">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-8 max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 border border-primary/20 text-xs font-medium text-platinum">
              <Cpu size={14} className="text-platinum-glow" />
              <span>Dedicated B2B Outbound Engine</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-luxury text-white tracking-tight leading-[1.1]">
              Meet IRONMAN™. <br />
              <span className="text-platinum-gradient">The AI Outbound System.</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground font-modern leading-relaxed">
              Not temporary agency retainers. IRONMAN is a productized outbound system that replaces manual sales prospecting with verified buyer signals, in-depth account research, and authentic executive personalization that books sales calls.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <LuxuryButton
                variant="platinum"
                size="lg"
                onClick={() => setIsAuditModalOpen(true)}
                className="flex items-center gap-2"
              >
                <span>Audit Your Outbound Setup</span>
                <ArrowRight size={18} />
              </LuxuryButton>

              <Link to="/score-calculator">
                <LuxuryButton variant="outline" size="lg">
                  Calculate Pipeline Score
                </LuxuryButton>
              </Link>
            </div>
          </motion.div>

          {/* TELEMETRY DASHBOARD PREVIEW */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 p-6 sm:p-8 rounded-2xl border border-glass-border bg-card/70 backdrop-blur-xl shadow-2xl relative"
          >
            <div className="flex items-center justify-between pb-6 border-b border-border/50 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-xs text-white uppercase tracking-wider font-semibold">
                  IRONMAN Outbound Live Performance
                </span>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                System Status: Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-secondary/60 border border-border/40">
                <div className="text-[10px] font-mono text-muted-foreground uppercase">Buyer Signals Tracked</div>
                <div className="text-2xl font-luxury text-white mt-1">14,280 / Wk</div>
                <div className="text-[11px] font-mono text-emerald-400 mt-1">Active hiring & funding</div>
              </div>
              <div className="p-4 rounded-xl bg-secondary/60 border border-border/40">
                <div className="text-[10px] font-mono text-muted-foreground uppercase">Target Accounts Researched</div>
                <div className="text-2xl font-luxury text-white mt-1">3,410 Accounts</div>
                <div className="text-[11px] font-mono text-emerald-400 mt-1">Context verified</div>
              </div>
              <div className="p-4 rounded-xl bg-secondary/60 border border-border/40">
                <div className="text-[10px] font-mono text-muted-foreground uppercase">Average Response Rate</div>
                <div className="text-2xl font-luxury text-white mt-1">18.4%</div>
                <div className="text-[11px] font-mono text-emerald-400 mt-1">6x Industry Average</div>
              </div>
              <div className="p-4 rounded-xl bg-secondary/60 border border-border/40">
                <div className="text-[10px] font-mono text-muted-foreground uppercase">Qualified Meetings Placed</div>
                <div className="text-2xl font-luxury text-white mt-1">22 / Month</div>
                <div className="text-[11px] font-mono text-emerald-400 mt-1">Direct to AE Calendars</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-border/60 font-mono text-xs text-muted-foreground space-y-2 overflow-x-auto">
              <div className="text-emerald-400 flex items-center gap-2">
                <Terminal size={14} /> [08:14:22] BUYER_SIGNAL: Hiring expansion detected at Datadog (sales leadership growth).
              </div>
              <div className="text-platinum flex items-center gap-2">
                <Database size={14} /> [08:14:25] ACCOUNT_RESEARCH: Public strategic priorities extracted for target VP of Sales.
              </div>
              <div className="text-emerald-400 flex items-center gap-2">
                <Bot size={14} /> [08:14:29] OUTBOUND_MESSAGE: Personalized executive email drafted and verified for inbox delivery.
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CORE OUTBOUND PILLARS */}
      <section className="py-20 text-left">
        <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs font-mono text-platinum uppercase tracking-wider block">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-5xl font-luxury text-white">
              The 4 Pillars of IRONMAN™ Outbound
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Every stage of outbound prospecting engineered into a reliable, automated pipeline machine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl border border-glass-border bg-card/60 space-y-4">
              <div className="p-3 w-fit rounded-xl bg-secondary border border-border text-platinum-glow">
                <Target size={24} />
              </div>
              <h3 className="text-2xl font-luxury text-white">1. Buyer Intent Discovery</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Tracks real-time buying signals across job postings, executive leadership hires, funding rounds, and technology expansion to identify accounts ready to purchase.
              </p>
              <ul className="text-xs font-mono text-muted-foreground space-y-2 pt-2">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> Hiring spikes & new leadership alerts</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> Technology stack upgrades</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> Zero wasted outreach to dormant accounts</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl border border-glass-border bg-card/60 space-y-4">
              <div className="p-3 w-fit rounded-xl bg-secondary border border-border text-platinum-glow">
                <Search size={24} />
              </div>
              <h3 className="text-2xl font-luxury text-white">2. Deep Account Research</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Reviews company announcements, public filings, and executive interviews to understand specific business challenges before a single email is drafted.
              </p>
              <ul className="text-xs font-mono text-muted-foreground space-y-2 pt-2">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> Strategic initiatives & growth priorities</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> Executive role responsibilities</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> 100% contextual relevance</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl border border-glass-border bg-card/60 space-y-4">
              <div className="p-3 w-fit rounded-xl bg-secondary border border-border text-platinum-glow">
                <Send size={24} />
              </div>
              <h3 className="text-2xl font-luxury text-white">3. Personalized Executive Messaging</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Crafts authentic 1-to-1 emails written in your genuine executive voice. Messages read like thoughtful peer conversations rather than generic sales pitches.
              </p>
              <ul className="text-xs font-mono text-muted-foreground space-y-2 pt-2">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> 18.4% average response rate</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> Authentic founder voice calibration</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> Smart follow-up sequences that answer questions</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl border border-glass-border bg-card/60 space-y-4">
              <div className="p-3 w-fit rounded-xl bg-secondary border border-border text-platinum-glow">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-2xl font-luxury text-white">4. Inbox Protection & Direct Booking</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Protects your domain health with secondary sending domains, warms inboxes systematically, and routes confirmed calls straight to Account Executive calendars.
              </p>
              <ul className="text-xs font-mono text-muted-foreground space-y-2 pt-2">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> 99%+ inbox deliverability rate</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> Direct HubSpot & Salesforce calendar sync</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> 12-25+ confirmed meetings per month</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 bg-secondary/30 text-left">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          <div className="text-center space-y-4 mb-12">
            <span className="text-xs font-mono text-platinum uppercase tracking-wider block">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl font-luxury text-white">
              Understanding the IRONMAN Outbound System
            </h2>
          </div>

          <div className="space-y-6">
            {ironmanFaqs.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-xl border border-border/60 bg-card/70 space-y-2">
                <h3 className="text-lg font-luxury text-white">{faq.question}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <LuxuryButton
              variant="platinum"
              size="lg"
              onClick={() => setIsAuditModalOpen(true)}
              className="inline-flex items-center gap-2"
            >
              <span>Schedule Outbound System Review</span>
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
