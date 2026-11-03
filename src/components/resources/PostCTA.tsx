import { useState } from "react";
import { Link } from "react-router-dom";
import { Download, CheckCircle2, ArrowRight, Calendar, Sparkles } from "lucide-react";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { toast } from "sonner";

interface PostCTAProps {
  variant?: "mid-article" | "end-of-article";
  postTitle: string;
  onBookCallClick: () => void;
}

export function PostCTA({ variant = "end-of-article", postTitle, onBookCallClick }: PostCTAProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Please provide both your name and email.");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast.success("Guide sent! Check your inbox or download directly below.");
    }, 600);
  };

  const isMid = variant === "mid-article";

  return (
    <aside
      aria-label="Guide download and client acquisition consultation"
      className={`my-12 rounded-2xl border border-glass-border bg-gradient-to-b from-card/90 via-card/60 to-card/90 backdrop-blur-xl p-8 md:p-10 relative overflow-hidden text-left shadow-2xl ${
        isMid ? "border-primary/30" : "border-platinum/30"
      }`}
    >
      {/* Background glow element */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        {/* Left Side: Copy */}
        <div className="max-w-xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-primary/20 text-xs font-mono text-platinum">
            <Sparkles size={12} className="text-platinum-glow" />
            <span>{isMid ? "Mid-Article Resource" : "Executive System Playbook"}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-luxury text-white">
            {isMid
              ? "Get This Complete Acquisition Guide in PDF"
              : "Ready to Stop Chasing B2B Clients?"}
          </h3>

          <p className="text-sm text-muted-foreground leading-relaxed font-modern">
            {isMid
              ? "Download the unabridged playbook, trigger detection checklists, and safe daily messaging caps formatted for your team."
              : "Gravity is an AI-powered LinkedIn client acquisition system for high-ticket B2B founders. We find your ideal clients, start genuine conversations, and book qualified sales meetings on your calendar."}
          </p>

          {/* Soft links */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono">
            <Link
              to="/gravity"
              className="text-platinum hover:text-white underline underline-offset-4 flex items-center gap-1 transition-colors"
            >
              <span>Explore Gravity System</span>
              <ArrowRight size={12} />
            </Link>
            <span className="text-muted-foreground/40">•</span>
            <button
              type="button"
              onClick={onBookCallClick}
              className="text-muted-foreground hover:text-white flex items-center gap-1 transition-colors"
            >
              <Calendar size={12} />
              <span>Book Strategy Call</span>
            </button>
          </div>
        </div>

        {/* Right Side: Form or Success */}
        <div className="w-full lg:w-80 shrink-0">
          {isSubmitted ? (
            <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3 animate-in fade-in duration-300">
              <CheckCircle2 size={32} className="text-emerald-400 mx-auto" />
              <div className="text-sm font-semibold text-white">Guide Unlocked!</div>
              <p className="text-xs text-muted-foreground">
                We sent a copy to <span className="text-white font-mono">{email}</span>.
              </p>
              <LuxuryButton
                variant="platinum"
                size="sm"
                onClick={onBookCallClick}
                className="w-full mt-2"
              >
                Apply for 14-Day Trial
                <ArrowRight size={14} className="ml-1.5" />
              </LuxuryButton>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-5 rounded-xl bg-secondary/50 border border-border/60 space-y-3">
              <div className="text-xs font-mono text-platinum uppercase tracking-wider font-semibold">
                Get this guide free
              </div>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-background/80 border border-border/80 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-platinum"
                required
              />
              <input
                type="email"
                placeholder="Work Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-background/80 border border-border/80 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-platinum"
                required
              />
              <LuxuryButton
                type="submit"
                variant="platinum"
                size="sm"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2"
              >
                <Download size={14} />
                <span>{isLoading ? "Preparing..." : "Send Me The Guide"}</span>
              </LuxuryButton>
              <p className="text-[10px] text-muted-foreground/70 text-center">
                100% spam-free. High-ticket B2B insights only.
              </p>
            </form>
          )}
        </div>
      </div>
    </aside>
  );
}
