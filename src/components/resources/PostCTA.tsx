import React, { useState, useId } from "react";
import { Link } from "react-router-dom";
import {
  Download,
  CheckCircle2,
  ArrowRight,
  ArrowDown,
  Calendar,
  Sparkles,
  ExternalLink,
  AlertCircle,
  Loader2,
  Lock,
} from "lucide-react";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { toast } from "sonner";
import {
  submitLeadCapture,
  saveUnlockedResource,
  isValidEmail,
  isValidWebsite,
} from "@/services/leadCapture";

interface PostCTAProps {
  variant?: "mid-article" | "end-of-article" | "top-gate";
  postTitle: string;
  resourceSlug: string;
  unlockedLink: string | null;
  onUnlocked: (link: string) => void;
  onBookCallClick: () => void;
  onScrollToArticle?: () => void;
  allowSkip?: boolean;
}

export function PostCTA({
  variant = "end-of-article",
  postTitle,
  resourceSlug,
  unlockedLink,
  onUnlocked,
  onBookCallClick,
  onScrollToArticle,
  allowSkip = false,
}: PostCTAProps) {
  const isMid = variant === "mid-article";
  const isTopGate = variant === "top-gate";
  const nameId = useId();
  const emailId = useId();
  const websiteId = useId();

  // Form State
  const [isOpenInline, setIsOpenInline] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [hp, setHp] = useState("");

  // Validation & Error State
  const [touched, setTouched] = useState<{
    name?: boolean;
    email?: boolean;
    website?: boolean;
  }>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Field validation rules
  const nameError = touched.name && !name.trim() ? "Full name is required." : null;
  const emailError =
    touched.email && (!email.trim() || !isValidEmail(email))
      ? "Please enter a valid work email address (e.g. name@company.com)."
      : null;
  const websiteError =
    touched.website && (!website.trim() || !isValidWebsite(website))
      ? "Please enter a valid company website (e.g. company.com or https://company.com)."
      : null;

  const isFormValid =
    name.trim().length > 0 &&
    isValidEmail(email) &&
    isValidWebsite(website);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all touched
    setTouched({ name: true, email: true, website: true });
    setServerError(null);

    // Honeypot check
    if (hp.trim().length > 0) {
      setServerError("Bot submission detected. Please refresh and try again.");
      return;
    }

    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid work email address.");
      return;
    }

    if (!isValidWebsite(website)) {
      toast.error("Please enter a valid company website (e.g. company.com).");
      return;
    }

    setIsSubmitting(true);

    try {
      const safeSlug = decodeURIComponent(resourceSlug || "").trim();
      const response = await submitLeadCapture({
        name: name.trim(),
        email: email.trim(),
        website: website.trim(),
        resource_slug: safeSlug,
        hp,
      });

      if (response.ok && response.link) {
        saveUnlockedResource(safeSlug, response.link);
        onUnlocked(response.link);
        toast.success("Resource unlocked! Click below to access your guide.");
      } else {
        const errorMsg =
          response.error || "Unable to unlock this resource right now. Please try again.";
        setServerError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Network error. Please check your connection and retry.";
      setServerError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleScrollToArticle = () => {
    if (onScrollToArticle) {
      onScrollToArticle();
      return;
    }
    const target = document.getElementById("article-content");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <aside
      aria-label={
        isTopGate
          ? `Free resource: ${postTitle || "Resource Guide"}`
          : `Get the free ${postTitle || "Resource Guide"}`
      }
      className={`rounded-2xl border bg-gradient-to-b from-card/95 via-card/75 to-card/95 backdrop-blur-xl p-6 sm:p-8 md:p-10 relative overflow-hidden text-left shadow-2xl transition-all ${
        isTopGate ? "mb-12" : "my-12"
      } ${
        unlockedLink
          ? "border-emerald-500/40 ring-1 ring-emerald-500/20"
          : isTopGate
          ? "border-primary/50 ring-1 ring-primary/30"
          : isMid
          ? "border-primary/40 ring-1 ring-primary/20"
          : "border-platinum/40 ring-1 ring-platinum/20"
      }`}
    >
      {/* Background glow effects */}
      <div
        className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none -z-10 ${
          unlockedLink ? "bg-emerald-500/10" : "bg-primary/10"
        }`}
      />

      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
        {/* Left Column: Context & Copy */}
        <div className="max-w-xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-primary/20 text-xs font-mono text-platinum">
            {unlockedLink ? (
              <>
                <CheckCircle2 size={12} className="text-emerald-400" />
                <span className="text-emerald-300">Access Granted</span>
              </>
            ) : (
              <>
                <Sparkles size={12} className="text-platinum-glow" />
                <span>
                  {isTopGate
                    ? "Free resource"
                    : isMid
                    ? "Mid-Article Resource"
                    : "Executive System Guide"}
                </span>
              </>
            )}
          </div>

          <h3 className="text-2xl sm:text-3xl font-luxury text-white tracking-tight leading-snug">
            {unlockedLink
              ? "Thanks, here's your resource"
              : isTopGate
              ? postTitle || "Resource Guide"
              : `Get the free ${postTitle || "Resource Guide"}`}
          </h3>

          <p className="text-sm text-muted-foreground leading-relaxed font-modern">
            {unlockedLink
              ? "Your direct link has been unlocked. Click the button to view the uncompressed playbook in a new tab."
              : isTopGate
              ? "Download the complete framework, trigger checklists, and daily outreach safety caps formatted for your team."
              : isMid
              ? "Download the complete framework, trigger checklists, and daily outreach safety caps formatted for your team."
              : "Access the full resource instantly. Then let ChroniqAI Gravity deploy the verified infrastructure, warmup routines, and high-ticket pipeline for you."}
          </p>

          {/* Soft links to Gravity and Strategy Call */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono">
            <Link
              to="/gravity"
              className="text-platinum hover:text-white underline underline-offset-4 flex items-center gap-1.5 transition-colors"
            >
              <span>Explore Gravity System</span>
              <ArrowRight size={12} />
            </Link>
            <span className="text-muted-foreground/40">•</span>
            <button
              type="button"
              onClick={onBookCallClick}
              className="text-muted-foreground hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Calendar size={12} />
              <span>Book Strategy Call</span>
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Form or Unlocked Action */}
        <div className="w-full lg:w-96 shrink-0">
          {unlockedLink ? (
            /* STATE A: Resource Unlocked */
            <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 size={24} />
              </div>

              <div>
                <div className="text-base font-luxury text-white">
                  Thanks, here's your resource
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Ready to read or download. Opens in a new tab.
                </p>
              </div>

              <a
                href={unlockedLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider hover:opacity-95 shadow-lg shadow-emerald-500/20 transition-all"
              >
                <span>Open Resource</span>
                <ExternalLink size={14} />
              </a>

              <div className="pt-2 border-t border-emerald-500/20 space-y-2">
                {isTopGate && (
                  <button
                    type="button"
                    onClick={handleScrollToArticle}
                    className="text-xs font-mono text-platinum hover:text-white flex items-center justify-center gap-1.5 mx-auto transition-colors cursor-pointer"
                  >
                    <span>Continue to article</span>
                    <ArrowDown size={12} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={onBookCallClick}
                  className="text-xs text-muted-foreground hover:text-white flex items-center justify-center gap-1 mx-auto transition-colors cursor-pointer"
                >
                  <span>Need help scaling this? Apply for 14-Day Trial</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ) : (
            /* STATE B: Lead Capture Form */
            <div className="rounded-xl bg-secondary/60 border border-border/70 p-5 sm:p-6 backdrop-blur-md shadow-inner text-left">
              <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-border/50">
                <div className="flex items-center gap-2 text-xs font-mono text-platinum font-semibold uppercase tracking-wider">
                  <Lock size={12} className="text-platinum-glow" />
                  <span>Free Resource Access</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400/90 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Instant Access
                </span>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
                {/* Honeypot field - must stay empty, invisible to humans */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    opacity: 0,
                    zIndex: -1,
                    pointerEvents: "none",
                    height: 0,
                    width: 0,
                    overflow: "hidden",
                  }}
                >
                  <label htmlFor={`hp_${nameId}`}>Do not fill this</label>
                  <input
                    id={`hp_${nameId}`}
                    type="text"
                    name="hp"
                    value={hp}
                    onChange={(e) => setHp(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Name Field */}
                <div>
                  <label
                    htmlFor={nameId}
                    className="block text-xs font-mono text-muted-foreground mb-1 font-medium"
                  >
                    Your Name <span className="text-primary">*</span>
                  </label>
                  <input
                    id={nameId}
                    type="text"
                    required
                    disabled={isSubmitting}
                    placeholder="e.g. Alex Vance"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                    className={`w-full px-3.5 py-2.5 text-xs rounded-lg bg-background/80 border text-foreground placeholder:text-muted-foreground/60 focus:outline-none transition-colors ${
                      nameError
                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/40"
                        : "border-border/80 focus:border-platinum focus:ring-1 focus:ring-platinum/30"
                    }`}
                  />
                  {nameError && (
                    <p className="text-[11px] text-red-400 mt-1 font-mono flex items-center gap-1">
                      <AlertCircle size={11} className="shrink-0" />
                      <span>{nameError}</span>
                    </p>
                  )}
                </div>

                {/* Work Email Field */}
                <div>
                  <label
                    htmlFor={emailId}
                    className="block text-xs font-mono text-muted-foreground mb-1 font-medium"
                  >
                    Work Email <span className="text-primary">*</span>
                  </label>
                  <input
                    id={emailId}
                    type="email"
                    required
                    disabled={isSubmitting}
                    placeholder="alex@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                    className={`w-full px-3.5 py-2.5 text-xs rounded-lg bg-background/80 border text-foreground placeholder:text-muted-foreground/60 focus:outline-none transition-colors ${
                      emailError
                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/40"
                        : "border-border/80 focus:border-platinum focus:ring-1 focus:ring-platinum/30"
                    }`}
                  />
                  {emailError && (
                    <p className="text-[11px] text-red-400 mt-1 font-mono flex items-center gap-1">
                      <AlertCircle size={11} className="shrink-0" />
                      <span>{emailError}</span>
                    </p>
                  )}
                </div>

                {/* Company Website Field */}
                <div>
                  <label
                    htmlFor={websiteId}
                    className="block text-xs font-mono text-muted-foreground mb-1 font-medium"
                  >
                    Company Website <span className="text-primary">*</span>
                  </label>
                  <input
                    id={websiteId}
                    type="text"
                    required
                    disabled={isSubmitting}
                    placeholder="company.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, website: true }))}
                    className={`w-full px-3.5 py-2.5 text-xs rounded-lg bg-background/80 border text-foreground placeholder:text-muted-foreground/60 focus:outline-none transition-colors ${
                      websiteError
                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/40"
                        : "border-border/80 focus:border-platinum focus:ring-1 focus:ring-platinum/30"
                    }`}
                  />
                  {websiteError && (
                    <p className="text-[11px] text-red-400 mt-1 font-mono flex items-center gap-1">
                      <AlertCircle size={11} className="shrink-0" />
                      <span>{websiteError}</span>
                    </p>
                  )}
                </div>

                {/* Server Error Message */}
                {serverError && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono space-y-1">
                    <div className="flex items-start gap-1.5">
                      <AlertCircle size={13} className="shrink-0 mt-0.5 text-red-400" />
                      <span>{serverError}</span>
                    </div>
                    <p className="text-[10px] text-red-300/80 pl-4">
                      Please check the inputs and click submit to retry.
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <LuxuryButton
                  type="submit"
                  variant="platinum"
                  size="sm"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-2.5"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin text-white" />
                      <span>Unlocking Resource...</span>
                    </>
                  ) : (
                    <>
                      <Download size={14} />
                      <span>Get Free Resource</span>
                    </>
                  )}
                </LuxuryButton>

                {/* Required Disclaimer Line */}
                <p className="text-[11px] text-muted-foreground/80 text-center leading-relaxed font-modern pt-1">
                  We'll send you the resource and occasionally email you about client acquisition. Unsubscribe anytime.
                </p>

                {/* Skip to article link for top-gate variant if explicitly allowed */}
                {isTopGate && allowSkip && (
                  <div className="pt-2 text-center border-t border-border/40 mt-3">
                    <button
                      type="button"
                      onClick={handleScrollToArticle}
                      className="text-xs font-mono text-muted-foreground hover:text-white transition-colors underline underline-offset-4 cursor-pointer"
                    >
                      Skip to article &darr;
                    </button>
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
