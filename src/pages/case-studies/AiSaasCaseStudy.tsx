import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Quote, Sparkles } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { ArticleSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { AuditModal } from "@/components/modals/AuditModal";

export default function AiSaasCaseStudy() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  return (
    <PageLayout>
      <SEOHead
        title="AI SaaS Case Study: $1.2M Pipeline in 60 Days | ChroniqAI"
        description="How NeuralFlow generated 20+ enterprise demos monthly and $1.2M in qualified pipeline using the ChroniqAI IRONMAN Outbound System."
        canonical="https://chroniqai.com/case-studies/ai-saas-platform"
        keywords="AI SaaS case study, B2B outbound pipeline, enterprise sales meetings, IRONMAN outbound"
      />
      <ArticleSchema
        title="AI SaaS Case Study: Booking 20+ Enterprise Demos Monthly via AI Outbound"
        description="Detailed examination of how an AI analytics platform scaled outbound meeting generation using buyer signals and executive personalization."
        url="https://chroniqai.com/case-studies/ai-saas-platform"
        datePublished="2026-07-02"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://chroniqai.com" },
          { name: "Case Studies", url: "https://chroniqai.com/case-studies" },
          { name: "AI SaaS Platform", url: "https://chroniqai.com/case-studies/ai-saas-platform" }
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
              Enterprise AI Analytics
            </div>

            <h1 className="text-3xl sm:text-5xl font-luxury text-white tracking-tight leading-[1.1]">
              Scaling Enterprise Demos: How NeuralFlow Generated $1.2M Pipeline in 60 Days
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground font-modern leading-relaxed">
              Replacing manual SDR outreach with the IRONMAN™ Outbound System delivered 20+ enterprise demos per month and reduced customer acquisition cost by 54%.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl border border-glass-border bg-card/70 mb-12">
            <div className="space-y-1">
              <div className="text-xs font-mono text-muted-foreground uppercase">Enterprise Demos</div>
              <div className="text-2xl font-luxury text-emerald-400">20+ / Month</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono text-muted-foreground uppercase">New Pipeline</div>
              <div className="text-2xl font-luxury text-white">$1.2M in 60d</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono text-muted-foreground uppercase">Response Rate</div>
              <div className="text-2xl font-luxury text-white">17.8%</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono text-muted-foreground uppercase">CAC Reduction</div>
              <div className="text-2xl font-luxury text-white">54% Savings</div>
            </div>
          </div>

          <div className="space-y-10 text-sm text-muted-foreground leading-relaxed font-modern">
            <div className="space-y-3">
              <h2 className="text-2xl font-luxury text-white">The Challenge</h2>
              <p>
                NeuralFlow had an exceptional enterprise analytics platform, but manual outbound prospecting was too slow and untargeted. Reps were spending dozens of hours each week building cold lists, resulting in sub-1% reply rates and high customer acquisition costs.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-luxury text-white">The Outbound Solution</h2>
              <p>
                ChroniqAI deployed the **IRONMAN Outbound System**:
              </p>
              <ul className="space-y-2 font-mono text-xs text-platinum pl-4 border-l-2 border-primary/40">
                <li>• **Technology & Growth Triggers**: Identified target accounts specifically when companies expanded their data engineering teams or raised new funding rounds.</li>
                <li>• **Executive Role Research**: Mapped outreach directly to VP of Data and Head of E-commerce priorities.</li>
                <li>• **Personalized 1-to-1 Emails**: Drafted authentic, concise executive emails that addressed specific business outcomes.</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-secondary/80 border border-primary/30 space-y-3 my-8">
              <Quote size={28} className="text-platinum-glow opacity-60" />
              <p className="text-base font-luxury text-white italic">
                &ldquo;IRONMAN helped us reach decision-makers right when they were expanding their data teams. Our sales reps now spend their days talking to qualified prospects rather than manually looking up contact lists.&rdquo;
              </p>
              <div className="text-xs font-mono text-platinum">
                — Devashish S., Co-Founder at NeuralFlow
              </div>
            </div>
          </div>

          <div className="mt-16 p-8 rounded-2xl border border-primary/40 bg-gradient-to-br from-card to-secondary/80 text-center space-y-4">
            <h3 className="text-2xl font-luxury text-white">Ready to Scale Outbound Sales Meetings?</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Get a free outbound system audit to see how intent-based prospecting can generate qualified pipeline for your company.
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
