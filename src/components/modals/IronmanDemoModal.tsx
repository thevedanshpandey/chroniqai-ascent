import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, CheckCircle, ArrowRight, Database, Bot, Sparkles, Send, RefreshCw, BarChart3, Layers } from "lucide-react";
import { LuxuryButton } from "@/components/ui/luxury-button";

interface IronmanDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAudit: () => void;
}

const pipelineSteps = [
  {
    id: "prospect",
    title: "1. Signal-Based Prospecting",
    icon: Database,
    description: "Monitors buying intent signals across job boards, tech stack additions, funding rounds, and executive hires.",
    metric: "4,200 ICP prospects identified/wk",
    detail: "Filtering out non-buyers to maintain domain reputation and 99%+ deliverability.",
  },
  {
    id: "research",
    title: "2. Deep Account Intelligence",
    icon: Bot,
    description: "Reviews recent company announcements, executive interviews, and business priorities for every target account.",
    metric: "100% automated research context",
    detail: "Identifies precise pain points, strategic goals, and technology priorities.",
  },
  {
    id: "personalization",
    title: "3. Hyper-Personalized Messaging",
    icon: Sparkles,
    description: "Generates bespoke 1-to-1 executive messaging tailored to individual priorities, avoiding generic template spam.",
    metric: "18.4% average response rate",
    detail: "Crafted in the founder's authentic voice with contextual relevance.",
  },
  {
    id: "outreach",
    title: "4. Multi-Channel Execution",
    icon: Send,
    description: "Coordinates personalized emails, inbox deliverability protection, and executive touchpoints in tandem.",
    metric: "Zero manual prospecting effort required",
    detail: "Automated follow-ups that answer questions and maintain high domain health.",
  },
  {
    id: "crm",
    title: "5. Real-Time CRM & Calendar Sync",
    icon: RefreshCw,
    description: "Qualifies positive responses automatically, updates your CRM (HubSpot/Salesforce), and places meetings directly on AE calendars.",
    metric: "12+ qualified meetings/wk",
    detail: "Full attribution tracking and real-time dashboard analytics.",
  },
];

export function IronmanDemoModal({ isOpen, onClose, onOpenAudit }: IronmanDemoModalProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen) return null;

  const currentStep = pipelineSteps[activeStepIndex];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-glass-border bg-card/95 p-6 md:p-8 shadow-2xl backdrop-blur-xl"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors z-10"
          >
            <X size={20} />
          </button>

          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-primary/20 mb-2 text-xs font-medium text-platinum">
              <Layers size={13} className="text-platinum-glow" />
              IRONMAN™ Outbound System Architecture
            </div>
            <h3 className="text-2xl md:text-3xl font-luxury text-white">
              How IRONMAN™ Converts Signal into Pipeline
            </h3>
            <p className="text-muted-foreground text-sm mt-1">
              Explore the 5-stage automated pipeline engine powering top-tier B2B revenue teams.
            </p>
          </div>

          {/* Interactive Pipeline Navigation */}
          <div className="grid grid-cols-5 gap-2 mb-6">
            {pipelineSteps.map((stepItem, idx) => {
              const Icon = stepItem.icon;
              const isActive = idx === activeStepIndex;
              return (
                <button
                  key={stepItem.id}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isActive
                      ? "bg-primary/10 border-primary text-white shadow-lg shadow-primary/10"
                      : "bg-secondary/30 border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <Icon size={16} className={isActive ? "text-platinum-glow" : "text-muted-foreground"} />
                    <span className="text-[10px] font-mono text-muted-foreground/70">0{idx + 1}</span>
                  </div>
                  <div className="text-xs font-semibold truncate">{stepItem.title.split(". ")[1]}</div>
                </button>
              );
            })}
          </div>

          {/* Step Detail Card */}
          <div className="p-6 rounded-xl bg-secondary/40 border border-glass-border relative overflow-hidden mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <div className="text-xs font-mono text-platinum mb-1 uppercase tracking-wider">
                  Stage {activeStepIndex + 1} of 5
                </div>
                <h4 className="text-xl font-semibold text-white flex items-center gap-2">
                  {currentStep.title}
                </h4>
              </div>

              <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-semibold self-start md:self-auto">
                {currentStep.metric}
              </div>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {currentStep.description}
            </p>

            <div className="p-3 rounded-lg bg-background/60 border border-border/50 text-xs text-foreground/90 font-mono flex items-center gap-2">
              <CheckCircle size={14} className="text-emerald-400 shrink-0" />
              <span>{currentStep.detail}</span>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-border/50">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <BarChart3 size={14} className="text-platinum" />
              <span>Tested across $14.2M+ in generated pipeline</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <LuxuryButton
                variant="outline"
                size="sm"
                onClick={() => {
                  setActiveStepIndex((prev) => (prev + 1) % pipelineSteps.length);
                }}
              >
                Next Stage →
              </LuxuryButton>

              <LuxuryButton
                variant="platinum"
                size="sm"
                onClick={() => {
                  onClose();
                  onOpenAudit();
                }}
              >
                Get Free Outbound Audit
              </LuxuryButton>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
