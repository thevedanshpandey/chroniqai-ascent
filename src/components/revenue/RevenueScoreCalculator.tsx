import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, BarChart2, ShieldAlert, Sparkles, Building2, Users, Target, Send, MessageSquare } from "lucide-react";
import { LuxuryButton } from "@/components/ui/luxury-button";

interface QuestionOption {
  label: string;
  sublabel?: string;
  points: number;
  weaknessFlag?: string;
}

interface Question {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  options: QuestionOption[];
}

const questions: Question[] = [
  {
    id: "industry",
    title: "Primary Industry & Target Market",
    subtitle: "What sector does your company sell into?",
    icon: Building2,
    options: [
      { label: "B2B SaaS / Software", points: 15 },
      { label: "FinTech & Financial Infrastructure", points: 15 },
      { label: "Enterprise Tech / Cyber / Cloud", points: 15 },
      { label: "Professional B2B Services / Agency", points: 10, weaknessFlag: "Service Scaling Constraints" },
      { label: "Other B2B Sector", points: 10 },
    ],
  },
  {
    id: "revenue",
    title: "Annual Recurring Revenue (ARR)",
    subtitle: "Select your current revenue scale",
    icon: BarChart2,
    options: [
      { label: "< $1M ARR", points: 10, weaknessFlag: "Early Stage Infrastructure Gap" },
      { label: "$1M - $5M ARR", points: 15 },
      { label: "$5M - $20M ARR", points: 20 },
      { label: "$20M+ ARR", points: 20 },
    ],
  },
  {
    id: "team",
    title: "Sales & SDR Team Size",
    subtitle: "How many dedicated sales/outreach headcount do you employ?",
    icon: Users,
    options: [
      { label: "0-1 (Founders sell manually)", points: 5, weaknessFlag: "Founder Time Bottleneck" },
      { label: "2-5 SDRs/AEs", points: 12, weaknessFlag: "High Manual SDR Overhead" },
      { label: "6-15 SDRs/AEs", points: 15 },
      { label: "15+ SDRs/AEs", points: 15 },
    ],
  },
  {
    id: "outbound",
    title: "Current Outbound Channel Mix",
    subtitle: "How do you currently acquire outbound pipeline?",
    icon: Send,
    options: [
      { label: "Automated Multi-Channel (Email + LinkedIn + Intent)", points: 20 },
      { label: "Basic Cold Email blasts (Unpersonalized)", points: 8, weaknessFlag: "Outbound Deliverability & Fatigue" },
      { label: "Manual LinkedIn messaging & cold calls", points: 10, weaknessFlag: "Manual Follow-up Decay" },
      { label: "Mostly Inbound / Referrals (No predictable outbound)", points: 5, weaknessFlag: "Pipeline Unpredictability" },
    ],
  },
  {
    id: "crm",
    title: "CRM & Workflow Integration Level",
    subtitle: "How integrated are your CRM and sales operations?",
    icon: Target,
    options: [
      { label: "Fully Automated (Real-time enrichment, CRM sync & attribution)", points: 20 },
      { label: "Semi-Automated (Manual lead imports & periodic CRM updates)", points: 10, weaknessFlag: "CRM & Attribution Leakage" },
      { label: "Siloed spreadsheets & disconnected tools", points: 5, weaknessFlag: "Disconnected Tool Waste" },
    ],
  },
  {
    id: "founderContent",
    title: "Executive & Founder Authority Presence",
    subtitle: "How active are executive founders on LinkedIn and industry channels?",
    icon: MessageSquare,
    options: [
      { label: "Systematized weekly thought leadership & authority engine", points: 15 },
      { label: "Occasional irregular posts when time permits", points: 7, weaknessFlag: "Founder Authority Deficit" },
      { label: "Inactive / Minimal executive visibility", points: 3, weaknessFlag: "Founder Authority Deficit" },
    ],
  },
];

interface RevenueScoreCalculatorProps {
  onOpenAudit: (score?: number) => void;
}

export function RevenueScoreCalculator({ onOpenAudit }: RevenueScoreCalculatorProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, QuestionOption>>({});
  const [isCalculated, setIsCalculated] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleSelectOption = (option: QuestionOption) => {
    const updated = { ...answers, [currentQuestion.id]: option };
    setAnswers(updated);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsCalculated(true);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setIsCalculated(false);
  };

  // Calculate final score out of 100
  const calculateScore = () => {
    let totalPoints = 0;
    Object.values(answers).forEach((ans) => {
      totalPoints += ans.points;
    });
    return Math.min(Math.max(totalPoints, 28), 98);
  };

  // Extract detected weaknesses
  const getWeaknesses = () => {
    const weaknesses: string[] = [];
    Object.values(answers).forEach((ans) => {
      if (ans.weaknessFlag) {
        weaknesses.push(ans.weaknessFlag);
      }
    });

    if (weaknesses.length === 0) {
      weaknesses.push("AI Search Invisibility (ChatGPT/Perplexity)", "Sub-optimal Follow-up Sequencing");
    }

    return Array.from(new Set(weaknesses));
  };

  const score = calculateScore();
  const weaknesses = getWeaknesses();

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl border border-glass-border bg-card/90 p-6 md:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
      {/* Top Banner */}
      <div className="flex items-center justify-between gap-4 mb-8 pb-6 border-b border-border/50">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-primary/20 mb-2 text-xs font-medium text-platinum">
            <Sparkles size={13} className="text-platinum-glow" />
            Interactive Diagnostic Tool
          </div>
          <h3 className="text-2xl md:text-3xl font-luxury text-white">
            Revenue System Score Calculator
          </h3>
          <p className="text-muted-foreground text-sm mt-1">
            Evaluate your revenue infrastructure maturity across 6 key engineering dimensions.
          </p>
        </div>

        {isCalculated && (
          <LuxuryButton variant="outline" size="sm" onClick={handleReset} className="shrink-0">
            <RefreshCw size={14} className="mr-2" />
            Retake Audit
          </LuxuryButton>
        )}
      </div>

      {!isCalculated ? (
        <div>
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center text-xs text-muted-foreground mb-2">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span className="font-mono text-platinum">{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Complete</span>
            </div>
            <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-platinum"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div>
                <h4 className="text-xl font-semibold text-white flex items-center gap-3">
                  <currentQuestion.icon className="text-platinum-glow shrink-0" size={22} />
                  {currentQuestion.title}
                </h4>
                <p className="text-muted-foreground text-sm mt-1">{currentQuestion.subtitle}</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(option)}
                    className="p-4 rounded-xl border border-glass-border bg-secondary/30 hover:bg-secondary/70 hover:border-primary/50 text-left transition-all duration-200 group flex items-center justify-between"
                  >
                    <div>
                      <div className="text-sm font-medium text-foreground group-hover:text-white">
                        {option.label}
                      </div>
                      {option.sublabel && (
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {option.sublabel}
                        </div>
                      )}
                    </div>
                    <ArrowRight size={16} className="text-muted-foreground group-hover:text-platinum group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        /* Results View */
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          {/* Score Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center p-6 rounded-xl bg-secondary/40 border border-glass-border">
            <div className="text-center md:text-left">
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">
                Your Revenue Infrastructure Score
              </div>
              <div className="flex items-baseline gap-2 justify-center md:justify-start">
                <span className="text-5xl md:text-6xl font-luxury font-bold text-platinum-gradient">
                  {score}
                </span>
                <span className="text-xl text-muted-foreground font-mono">/100</span>
              </div>
            </div>

            <div className="md:col-span-2 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-sm">
                {score >= 80 ? (
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 size={18} /> Optimized Infrastructure
                  </span>
                ) : score >= 55 ? (
                  <span className="text-amber-400 flex items-center gap-1.5">
                    <AlertTriangle size={18} /> Sub-Optimal System Friction Detected
                  </span>
                ) : (
                  <span className="text-rose-400 flex items-center gap-1.5">
                    <ShieldAlert size={18} /> Severe Pipeline Bottlenecks Detected
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {score >= 80
                  ? "Your revenue engine has strong foundational elements. Implementing IRONMAN Outbound buyer intent discovery and personalized messaging will unlock an additional 20-30% pipeline scale."
                  : "Your current setup relies heavily on manual work, leaving pipeline volume fragmented and predictable growth unrealized. An automated outbound engine can double meeting yield within 45 days."}
              </p>
            </div>
          </div>

          {/* Weaknesses Identified */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <AlertTriangle size={16} className="text-amber-400" />
              Primary System Weaknesses Identified ({weaknesses.length})
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {weaknesses.map((w, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-secondary/30 border border-border/60 flex items-start gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-white">{w}</div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Causes friction in meeting velocity, dilutes executive trust, and increases sales rep overhead.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Box */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-secondary/80 to-card border border-primary/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-luxury text-white mb-1">
                Outbound Blueprint Ready
              </h4>
              <p className="text-xs text-muted-foreground max-w-md leading-relaxed">
                Schedule a 45-minute Free Outbound System Audit with our team to review your specific score breakdown and receive a customized deployment plan.
              </p>
            </div>

            <LuxuryButton
              variant="platinum"
              size="lg"
              onClick={() => onOpenAudit(score)}
              className="shrink-0 w-full md:w-auto"
            >
              Get Free Revenue System Audit
              <ArrowRight size={18} className="ml-2" />
            </LuxuryButton>
          </div>
        </motion.div>
      )}
    </div>
  );
}
