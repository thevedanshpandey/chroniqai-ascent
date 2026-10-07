import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ArrowRight, Shield, Sparkles, Building2, Mail, User, Target } from "lucide-react";
import { LuxuryButton } from "@/components/ui/luxury-button";

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialScore?: number;
}

export function AuditModal({ isOpen, onClose, initialScore }: AuditModalProps) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    annualRevenue: "$1M - $5M",
    primaryGoal: "Predictable Outbound Pipeline",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep("success");
    }, 800);
  };

  const handleReset = () => {
    setStep("form");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-glass-border bg-card/95 p-6 md:p-8 shadow-2xl backdrop-blur-xl"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
          >
            <X size={20} />
          </button>

          {step === "form" ? (
            <div>
              {/* Header */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-primary/20 mb-3 text-xs font-medium text-platinum">
                  <Sparkles size={13} className="text-platinum-glow" />
                  Free 45-Minute Revenue Infrastructure Audit
                </div>
                <h3 className="text-2xl md:text-3xl font-luxury text-white mb-2">
                  Diagnose Your Outbound Engine
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  No sales pitch. You will leave with a custom blueprint detailing exact outbound bottlenecks across buyer targeting, email deliverability, and message personalization.
                </p>

                {initialScore && (
                  <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Your Initial System Score:</span>
                    <span className="font-mono font-bold text-platinum text-sm">{initialScore}/100 — Audit Recommended</span>
                  </div>
                )}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                      Your Full Name
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-3 text-muted-foreground" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className="w-full bg-secondary/40 border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                      Work Email
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-3 text-muted-foreground" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full bg-secondary/40 border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                      Company Name
                    </label>
                    <div className="relative">
                      <Building2 size={16} className="absolute left-3 top-3 text-muted-foreground" />
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Acme Corp"
                        className="w-full bg-secondary/40 border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                      Current ARR Band
                    </label>
                    <select
                      value={formData.annualRevenue}
                      onChange={(e) => setFormData({ ...formData, annualRevenue: e.target.value })}
                      className="w-full bg-secondary/40 border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/60 transition-colors"
                    >
                      <option value="< $1M">&lt; $1M ARR</option>
                      <option value="$1M - $5M">$1M - $5M ARR</option>
                      <option value="$5M - $20M">$5M - $20M ARR</option>
                      <option value="$20M+">$20M+ ARR</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Primary Outbound Objective
                  </label>
                  <div className="relative">
                    <Target size={16} className="absolute left-3 top-3 text-muted-foreground" />
                    <select
                      value={formData.primaryGoal}
                      onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })}
                      className="w-full bg-secondary/40 border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary/60 transition-colors"
                    >
                      <option value="Predictable Outbound Pipeline">Build Predictable Outbound System (15-25+ Meetings/Mo)</option>
                      <option value="Fix Email Deliverability">Fix Email Deliverability & Protected Domains</option>
                      <option value="Personalized Executive Messaging">Personalized Executive Messaging & High Response Rates</option>
                      <option value="Complete IRONMAN Outbound System">Complete IRONMAN™ Outbound System Deployment</option>
                    </select>
                  </div>
                </div>

                <div className="pt-3">
                  <LuxuryButton
                    type="submit"
                    variant="platinum"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin rounded-full h-4 w-4 border-2 border-obsidian border-t-transparent" />
                        Generating Audit Request...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Request Free Outbound System Audit
                        <ArrowRight size={18} />
                      </span>
                    )}
                  </LuxuryButton>
                </div>

                <p className="text-center text-[11px] text-muted-foreground/70 flex items-center justify-center gap-1 mt-2">
                  <Shield size={12} />
                  100% confidential. No spam, no aggressive sales calls. Pure outbound strategy.
                </p>
              </form>
            </div>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-2xl font-luxury text-white">Audit Request Confirmed</h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-foreground font-semibold">{formData.name}</span>. Our outbound systems team is reviewing <span className="text-foreground font-semibold">{formData.company}</span>&apos;s target market and buyer profile.
              </p>
              <p className="text-xs text-muted-foreground/80 max-w-sm mx-auto">
                We have sent an invitation to <span className="text-platinum">{formData.email}</span> with a link to confirm your 45-minute outbound audit session.
              </p>

              <div className="pt-4">
                <LuxuryButton variant="outline" size="sm" onClick={handleReset}>
                  Close & Return
                </LuxuryButton>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
