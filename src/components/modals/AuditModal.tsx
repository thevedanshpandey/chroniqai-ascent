import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ArrowRight, Shield, Sparkles, Building2, Mail, User, Target } from "lucide-react";
import { LuxuryButton } from "@/components/ui/luxury-button";

// [FORM_LINK] Placeholder for Google Form URL
export const FORM_LINK = "https://docs.google.com/forms/d/e/1FAIpQLSc-placeholder/viewform"; // [FORM_LINK]

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
    offerTicketSize: "$2,500 - $10,000",
    linkedinAccounts: "2 Accounts (Recommended)",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep("success");
    }, 700);
  };

  const handleReset = () => {
    setStep("form");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/85 backdrop-blur-md">
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
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/90 border border-primary/20 mb-3 text-xs font-medium text-platinum">
                  <Sparkles size={13} className="text-platinum-glow" />
                  ChroniqAI Gravity • 14-Day Trial Application
                </div>
                <h3 className="text-2xl md:text-3xl font-luxury text-white mb-2">
                  Apply for the 14-Day Gravity Trial
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  By application only. We take on a limited number of founders to ensure dedicated focus, account safety, and guaranteed meeting delivery.
                </p>

                {initialScore && (
                  <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Your Pipeline Readiness Score:</span>
                    <span className="font-mono font-bold text-platinum text-sm">{initialScore}/100 — High Fit</span>
                  </div>
                )}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-foreground/80 mb-1">
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
                    <label className="block text-xs font-medium text-foreground/80 mb-1">
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
                    <label className="block text-xs font-medium text-foreground/80 mb-1">
                      Company Name / Website
                    </label>
                    <div className="relative">
                      <Building2 size={16} className="absolute left-3 top-3 text-muted-foreground" />
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Acme Corp (acme.com)"
                        className="w-full bg-secondary/40 border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-foreground/80 mb-1">
                      High-Ticket Offer Size (Deal Value)
                    </label>
                    <select
                      value={formData.offerTicketSize}
                      onChange={(e) => setFormData({ ...formData, offerTicketSize: e.target.value })}
                      className="w-full bg-secondary/40 border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/60 transition-colors"
                    >
                      <option value="$2,500 - $5,000">$2,500 - $5,000</option>
                      <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                      <option value="$15,000 - $50,000">$15,000 - $50,000</option>
                      <option value="$50,000+">$50,000+ Enterprise ACV</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground/80 mb-1">
                    Available LinkedIn Accounts for Team (At least 2 required)
                  </label>
                  <div className="relative">
                    <Target size={16} className="absolute left-3 top-3 text-muted-foreground" />
                    <select
                      value={formData.linkedinAccounts}
                      onChange={(e) => setFormData({ ...formData, linkedinAccounts: e.target.value })}
                      className="w-full bg-secondary/40 border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary/60 transition-colors"
                    >
                      <option value="2 Accounts (Recommended)">2 LinkedIn Accounts (Standard Safe Volume)</option>
                      <option value="3-4 Accounts">3-4 LinkedIn Accounts (Accelerated Scale)</option>
                      <option value="5+ Accounts">5+ LinkedIn Accounts (Enterprise Team Volume)</option>
                    </select>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Using 2+ accounts allows human-like pacing and daily safety caps while booking 6-10+ meetings/month.
                  </p>
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
                        Submitting Application...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Submit 14-Day Gravity Trial Application
                        <ArrowRight size={18} />
                      </span>
                    )}
                  </LuxuryButton>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1 text-[11px]">
                    <Shield size={12} className="text-emerald-400" />
                    100% confidential. No spam, human review only.
                  </span>
                  <a
                    href={FORM_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-platinum hover:text-white underline font-mono"
                  >
                    Or open Google Form directly [FORM_LINK] →
                  </a>
                </div>
              </form>
            </div>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-2xl font-luxury text-white">Application Received</h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-foreground font-semibold">{formData.name}</span>. Vedansh Pandey and the Gravity team are personally reviewing your offer and market fit for <span className="text-foreground font-semibold">{formData.company}</span>.
              </p>
              <p className="text-xs text-muted-foreground/90 max-w-sm mx-auto">
                We will email <span className="text-platinum font-mono font-semibold">{formData.email}</span> within 24 hours with our review and next steps.
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
