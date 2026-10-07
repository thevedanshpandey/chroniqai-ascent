import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Send, Database, Terminal, CheckCircle2 } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { TechArticleSchema, FAQPageSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { AuditModal } from "@/components/modals/AuditModal";

export default function B2bAiOutboundGuide() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  return (
    <PageLayout>
      <SEOHead
        title="B2B AI Outbound Systems Guide: Signal Intent & 10-K Vector Search | ChroniqAI"
        description="Engineering playbook for signal-driven B2B outbound: SEC filing vector search, intent hiring triggers, secondary domain isolation, and automated calendar routing."
        canonical="https://chroniqai.com/guides/b2b-ai-outbound-guide"
        keywords="B2B AI outbound guide, signal intent triggers, 10-K SEC vector search, cold outreach deliverability"
      />
      <TechArticleSchema
        title="B2B AI Outbound Systems Guide: Signal Intent & 10-K Vector Search"
        description="Technical engineering documentation on building signal-driven cold outbound pipelines with vector search and secondary domain deliverability."
        url="https://chroniqai.com/guides/b2b-ai-outbound-guide"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://chroniqai.com" },
          { name: "AI Guides", url: "https://chroniqai.com/guides" },
          { name: "B2B AI Outbound Systems Guide", url: "https://chroniqai.com/guides/b2b-ai-outbound-guide" }
        ]}
      />

      <section className="relative pt-32 pb-20 text-left">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          <Link
            to="/guides"
            className="inline-flex items-center gap-2 text-xs font-mono text-platinum hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft size={14} /> Back to All AI Guides
          </Link>

          <div className="space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-secondary text-xs font-mono text-emerald-400 border border-emerald-500/20">
              Outbound Systems Engineering
            </div>

            <h1 className="text-3xl sm:text-5xl font-luxury text-white tracking-tight leading-[1.1]">
              B2B AI Outbound Systems: Signal Intent & Vector Search Architecture
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground font-modern leading-relaxed">
              Cold email isn&apos;t dead—generic spray-and-pray is. Here is the technical architecture behind signal-based outbound that consistently achieves 18.4% cold reply rates.
            </p>
          </div>

          <div className="space-y-8 text-sm text-muted-foreground leading-relaxed font-modern">
            <div className="space-y-3">
              <h2 className="text-2xl font-luxury text-white">1. Signal Intent Triggers vs Static Scraped Lists</h2>
              <p>
                Legacy outbound relies on buying flat email databases from Apollo or ZoomInfo and emailing every VP of Sales simultaneously. **Signal-driven outbound** monitors active buying triggers:
              </p>
              <ul className="space-y-2 font-mono text-xs text-platinum pl-4 border-l-2 border-primary/40">
                <li>• **Hiring Spikes**: An account posting 3+ openings for AI Infrastructure Engineers.</li>
                <li>• **Executive Funding & SEC Filings**: Quarterly 10-K filings explicitly detailing enterprise AI adoption mandates.</li>
                <li>• **Tech Stack Changes**: Detection of new DNS records, Segment, or Snowflake deployments.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-luxury text-white">2. Domain Health & Deliverability Infrastructure</h2>
              <p>
                Outbound messages are useless if they land in the spam folder. IRONMAN enforces **Domain Health Protection**:
              </p>
              <ul className="space-y-2 font-mono text-xs text-platinum pl-4 border-l-2 border-primary/40">
                <li>• Isolated secondary domains (e.g. `getchroniq.com`, `chroniqsystems.com`) protecting the primary brand domain.</li>
                <li>• Hourly dispatch limits capped at 25 emails per mailbox per day.</li>
                <li>• Automated SPF/DKIM/DMARC records and daily bounce rate throttling (&lt;1.2%).</li>
              </ul>
            </div>
          </div>

          <div className="mt-16 p-8 rounded-2xl border border-primary/40 bg-gradient-to-br from-card to-secondary/80 text-center space-y-4">
            <h3 className="text-2xl font-luxury text-white">Audit Your Outbound Infrastructure</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Schedule a 45-minute audit to inspect your domain health, messaging copy, and intent signals.
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
