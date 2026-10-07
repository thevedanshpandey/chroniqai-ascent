import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Quote, Shield, CheckCircle2 } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { ArticleSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { AuditModal } from "@/components/modals/AuditModal";

export default function CybersecurityCaseStudy() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  return (
    <PageLayout>
      <SEOHead
        title="Cybersecurity Case Study: 18 Qualified CISO Meetings / Month | ChroniqAI"
        description="How an enterprise cybersecurity vendor booked 18 CISO meetings monthly with $120k ACV deals using the IRONMAN Outbound System."
        canonical="https://chroniqai.com/case-studies/cybersecurity-enterprise"
        keywords="cybersecurity case study, CISO cold outbound, B2B sales pipeline, IRONMAN outbound"
      />
      <ArticleSchema
        title="Cybersecurity Case Study: Booking 18 CISO Meetings / Month via AI Outbound"
        description="Case study demonstrating how a zero-trust cybersecurity vendor reached enterprise CISOs using signal-based outbound."
        url="https://chroniqai.com/case-studies/cybersecurity-enterprise"
        datePublished="2026-06-20"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://chroniqai.com" },
          { name: "Case Studies", url: "https://chroniqai.com/case-studies" },
          { name: "Cybersecurity Enterprise", url: "https://chroniqai.com/case-studies/cybersecurity-enterprise" }
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

          <div className="space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-secondary text-xs font-mono text-emerald-400 border border-emerald-500/20">
              Enterprise Cybersecurity
            </div>

            <h1 className="text-3xl sm:text-5xl font-luxury text-white tracking-tight leading-[1.1]">
              Reaching CISOs: How Aegis Security Booked 18 Meetings/Mo At $120k ACV
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground font-modern leading-relaxed">
              CISOs reject 99% of generic cold emails. The IRONMAN Outbound System combined verified hiring triggers with authentic peer-to-peer executive messaging to achieve an 18.4% response rate.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl border border-glass-border bg-card/70 mb-12">
            <div className="space-y-1">
              <div className="text-xs font-mono text-muted-foreground uppercase">CISO Meetings</div>
              <div className="text-2xl font-luxury text-emerald-400">18 / Month</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono text-muted-foreground uppercase">Average ACV</div>
              <div className="text-2xl font-luxury text-white">$120,000</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono text-muted-foreground uppercase">Cold Response Rate</div>
              <div className="text-2xl font-luxury text-white">18.4%</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono text-muted-foreground uppercase">Outbound Lift</div>
              <div className="text-2xl font-luxury text-white">3.8x Reply Rate</div>
            </div>
          </div>

          <div className="space-y-10 text-sm text-muted-foreground leading-relaxed font-modern">
            <div className="space-y-3">
              <h2 className="text-2xl font-luxury text-white">The Challenge</h2>
              <p>
                Chief Information Security Officers (CISOs) receive over 100 cold sales emails every week. Generic pitch templates get deleted immediately. Aegis Security needed a way to reach enterprise security leaders with genuine relevance rather than aggressive sales tactics.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-luxury text-white">The Outbound Solution</h2>
              <p>
                ChroniqAI deployed the **IRONMAN Outbound System**:
              </p>
              <ul className="space-y-2 font-mono text-xs text-platinum pl-4 border-l-2 border-primary/40">
                <li>• **Compliance & Hiring Triggers**: Reached target companies specifically when they posted job openings for security and compliance leaders.</li>
                <li>• **Deep Account Context**: Reviewed public infrastructure initiatives to craft relevant, peer-level observations.</li>
                <li>• **Executive Peer Outreach**: Formatted emails as brief, direct peer inquiries rather than generic sales pitches.</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-secondary/80 border border-primary/30 space-y-3 my-8">
              <Quote size={28} className="text-platinum-glow opacity-60" />
              <p className="text-base font-luxury text-white italic">
                &ldquo;Before ChroniqAI, getting enterprise CISOs on a call felt impossible. IRONMAN aligned our outreach with real hiring signals and authentic executive tone. We closed two $120k ARR accounts in our second month.&rdquo;
              </p>
              <div className="text-xs font-mono text-platinum">
                — Elena Rostova, CEO at Aegis Security
              </div>
            </div>
          </div>

          <div className="mt-16 p-8 rounded-2xl border border-primary/40 bg-gradient-to-br from-card to-secondary/80 text-center space-y-4">
            <h3 className="text-2xl font-luxury text-white">Need To Reach Senior Enterprise Decision-Makers?</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Schedule a free outbound system audit to analyze how signal-based outreach can unlock your target market.
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
