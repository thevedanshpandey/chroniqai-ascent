import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, Building2, TrendingUp, DollarSign, Calendar, Quote, Shield } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { ArticleSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { AuditModal } from "@/components/modals/AuditModal";

export default function ScaleMetricsCaseStudy() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  return (
    <PageLayout>
      <SEOHead
        title="ScaleMetrics Case Study: $1.4M ARR Pipeline Created via AI Outbound | ChroniqAI"
        description="How ScaleMetrics generated 22 qualified enterprise meetings/month and $1.4M ARR pipeline in 90 days using ChroniqAI IRONMAN Outbound Infrastructure."
        canonical="https://chroniqai.com/case-studies/scalemetrics-devops"
        keywords="ScaleMetrics case study, B2B AI outbound results, DevOps pipeline generation, IRONMAN case study"
      />
      <ArticleSchema
        title="ScaleMetrics DevOps Case Study: $1.4M ARR Pipeline via AI Revenue Infrastructure"
        description="Detailed case study examining how an enterprise DevOps platform achieved 19.2% cold outreach reply rate and $1.4M ARR created pipeline."
        url="https://chroniqai.com/case-studies/scalemetrics-devops"
        datePublished="2026-06-15"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://chroniqai.com" },
          { name: "Case Studies", url: "https://chroniqai.com/case-studies" },
          { name: "ScaleMetrics DevOps", url: "https://chroniqai.com/case-studies/scalemetrics-devops" }
        ]}
      />

      <section className="relative pt-32 pb-20 text-left">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 text-xs font-mono text-platinum hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft size={14} /> Back to All Case Studies
          </Link>

          {/* HEADER */}
          <div className="space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-secondary text-xs font-mono text-emerald-400 border border-emerald-500/20">
              DevOps & Enterprise SaaS
            </div>

            <h1 className="text-3xl sm:text-5xl font-luxury text-white tracking-tight leading-[1.1]">
              How ScaleMetrics Generated $1.4M Pipeline & 22 Qualified Meetings / Month
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground font-modern leading-relaxed">
              Replacing fragmented SDR agencies with IRONMAN™ AI Outbound Infrastructure delivered 19.2% cold response rates and $48,000 ACV deal velocity.
            </p>
          </div>

          {/* METRICS HIGHLIGHT GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl border border-glass-border bg-card/70 mb-12">
            <div className="space-y-1">
              <div className="text-xs font-mono text-muted-foreground uppercase">Pipeline Created</div>
              <div className="text-2xl font-luxury text-emerald-400">$1.4M ARR</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono text-muted-foreground uppercase">Qualified Meetings</div>
              <div className="text-2xl font-luxury text-white">22 / Month</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono text-muted-foreground uppercase">Cold Response Rate</div>
              <div className="text-2xl font-luxury text-white">19.2%</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono text-muted-foreground uppercase">Time To First Deal</div>
              <div className="text-2xl font-luxury text-white">34 Days</div>
            </div>
          </div>

          {/* CASE STUDY CONTENT BODY */}
          <div className="space-y-10 text-sm text-muted-foreground leading-relaxed font-modern">
            <div className="space-y-3">
              <h2 className="text-2xl font-luxury text-white">The Challenge</h2>
              <p>
                ScaleMetrics provides AI-driven Kubernetes telemetry for Fortune 500 engineering teams. Before working with ChroniqAI, they relied on a legacy outsourced lead generation agency spending $12,000/month. The agency dispatched generic template emails to unverified lists, resulting in burned domain deliverability, &lt;1.5% reply rates, and unqualified meetings that wasted AE time.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-luxury text-white">The AI Infrastructure Solution</h2>
              <p>
                ChroniqAI deployed **IRONMAN™ Outbound Infrastructure** configured for enterprise DevOps decision-makers (VP Engineering, CTO, Head of Infrastructure):
              </p>
              <ul className="space-y-2 font-mono text-xs text-platinum pl-4 border-l-2 border-primary/40">
                <li>• **Financial & Growth Signal Analysis**: Scanned quarterly announcements and hiring spikes for companies expanding infrastructure teams.</li>
                <li>• **Deep Account Context**: Reviewed public executive priorities and interviews to extract relevant talking points.</li>
                <li>• **Dedicated Secondary Domains**: Configured isolated sending domains with automated inbox deliverability protection.</li>
                <li>• **Direct Calendar Scheduling**: Placed qualified VP-level prospects directly into sales team calendars.</li>
              </ul>
            </div>

            {/* QUOTE BLOCK */}
            <div className="p-6 rounded-xl bg-secondary/80 border border-primary/30 space-y-3 my-8">
              <Quote size={28} className="text-platinum-glow opacity-60" />
              <p className="text-base font-luxury text-white italic">
                &ldquo;ChroniqAI didn&apos;t give us a list of leads. They built a permanent engine that books 20+ qualified VPs of Engineering on our AE calendars every single month. Our SDR cost per acquisition dropped by 65%.&rdquo;
              </p>
              <div className="text-xs font-mono text-platinum">
                — Marcus Thorne, VP Revenue at ScaleMetrics
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-luxury text-white">The 90-Day Results</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-card border border-border/50 space-y-1">
                  <span className="text-xs font-mono text-emerald-400">Result 01</span>
                  <div className="text-white font-semibold">19.2% Cold Response Rate</div>
                  <p className="text-xs text-muted-foreground">Up from 1.4% with the legacy outsourced SDR agency.</p>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border/50 space-y-1">
                  <span className="text-xs font-mono text-emerald-400">Result 02</span>
                  <div className="text-white font-semibold">66 Total Qualified Meetings</div>
                  <p className="text-xs text-muted-foreground">Booked across 90 days with $48,000 average contract value.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA BAR */}
          <div className="mt-16 p-8 rounded-2xl border border-primary/40 bg-gradient-to-br from-card to-secondary/80 text-center space-y-4">
            <h3 className="text-2xl font-luxury text-white">Ready to Build Similar Pipeline In Your Category?</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Get a free 90-day Revenue System Audit tailored to your B2B offer and target ICP.
            </p>
            <LuxuryButton
              variant="platinum"
              size="lg"
              onClick={() => setIsAuditModalOpen(true)}
              className="inline-flex items-center gap-2"
            >
              <span>Get Free System Audit</span>
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
