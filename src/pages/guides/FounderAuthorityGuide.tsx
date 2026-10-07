import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Sparkles, Quote, CheckCircle2 } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { TechArticleSchema, FAQPageSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { AuditModal } from "@/components/modals/AuditModal";

export default function FounderAuthorityGuide() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  return (
    <PageLayout>
      <SEOHead
        title="The B2B Founder Authority Playbook: Engineering Executive Trust | ChroniqAI"
        description="How high-ticket B2B founders turn raw technical knowledge into systematic authority across LinkedIn and industry channels to drive 3.8x outbound reply lift."
        canonical="https://chroniqai.com/guides/founder-authority-guide"
        keywords="founder authority playbook, B2B personal branding, CEO thought leadership, outbound reply lift"
      />
      <TechArticleSchema
        title="The B2B Founder Authority Playbook: Engineering Executive Trust"
        description="Systems framework detailing how B2B founders build category dominance and founder authority to multiply cold outbound response rates."
        url="https://chroniqai.com/guides/founder-authority-guide"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://chroniqai.com" },
          { name: "AI Guides", url: "https://chroniqai.com/guides" },
          { name: "Founder Authority Playbook", url: "https://chroniqai.com/guides/founder-authority-guide" }
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
              Executive Authority Playbook
            </div>

            <h1 className="text-3xl sm:text-5xl font-luxury text-white tracking-tight leading-[1.1]">
              The Founder Authority Playbook: Engineering Trust at Scale
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground font-modern leading-relaxed">
              When an enterprise CISO or VP of Engineering receives a cold email, their first action is to search the sender&apos;s LinkedIn. Here is how founder authority multiplies outbound conversion by 3.8x.
            </p>
          </div>

          <div className="space-y-8 text-sm text-muted-foreground leading-relaxed font-modern">
            <div className="space-y-3">
              <h2 className="text-2xl font-luxury text-white">1. The Verification Gap in High-Ticket B2B</h2>
              <p>
                In high-ticket deals ($30,000 to $250,000+ ACV), buyers do not purchase from anonymous SDRs. They purchase from domain experts. When a prospect opens an outbound email, they perform a **5-second credibility check**:
              </p>
              <ul className="space-y-2 font-mono text-xs text-platinum pl-4 border-l-2 border-primary/40">
                <li>• Does this founder post insightful breakdowns about my specific industry problem?</li>
                <li>• Is there proof of engineering rigor, case studies, or original benchmarking research?</li>
                <li>• Is this an established category voice or a generic lead-generation company?</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-luxury text-white">2. Systematizing Founder Thought Leadership</h2>
              <p>
                Founders do not have 10 hours a week to write social posts. **IRONMAN™ Authority Module** extracts 20 minutes of raw founder voice notes weekly and transforms them into structured technical breakdowns, framework infographics, and executive newsletter editions.
              </p>
            </div>
          </div>

          <div className="mt-16 p-8 rounded-2xl border border-primary/40 bg-gradient-to-br from-card to-secondary/80 text-center space-y-4">
            <h3 className="text-2xl font-luxury text-white">Build Your Founder Authority Infrastructure</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Schedule an audit to review how founder authority can elevate your team&apos;s outbound response rates.
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
