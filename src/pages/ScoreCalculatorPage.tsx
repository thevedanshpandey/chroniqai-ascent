import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { RevenueScoreCalculator } from "@/components/revenue/RevenueScoreCalculator";
import { AuditModal } from "@/components/modals/AuditModal";

export default function ScoreCalculatorPage() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [auditScore, setAuditScore] = useState<number | undefined>(undefined);

  const handleOpenAudit = (score?: number) => {
    setAuditScore(score);
    setIsAuditModalOpen(true);
  };

  return (
    <PageLayout>
      <SEOHead
        title="Revenue System Score Calculator — ChroniqAI"
        description="Calculate your B2B revenue infrastructure score out of 100 and identify hidden pipeline bottlenecks."
      />

      <div className="pt-32 pb-24 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] hero-gradient pointer-events-none -z-10" />

        <div className="container mx-auto px-6 lg:px-8">
          <RevenueScoreCalculator onOpenAudit={handleOpenAudit} />
        </div>
      </div>

      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        initialScore={auditScore}
      />
    </PageLayout>
  );
}
