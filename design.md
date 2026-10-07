# ChroniqAI Design System & UI/UX Specification

> **Master Guide for Landing Pages & New Feature Views**  
> This specification documents every design token, typographic rule, layout pattern, micro-interaction, component template, and copywriting guideline required to build new landing pages and features with 100% aesthetic consistency with the ChroniqAI website.

---

## 1. Aesthetic Archetype & Design Philosophy

ChroniqAI's visual language is **Ultra-Luxury B2B Systems Architecture** ("Quiet Luxury" meets "Quantitative Infrastructure"). It communicates immense technical rigor, institutional trust, and high-ticket B2B authority.

### Core Visual Principles
1. **Obsidian & Platinum Palette:** Deep dark, noise-free space with brushed metallic platinum gradients rather than oversaturated neon colors.
2. **Dual-Font Typography Hierarchy:** High-contrast pairing of an editorial serif (`Playfair Display`) for authority headlines and quotes, combined with ultra-clean sans-serif (`Inter`) for body copy and dense monospace (`font-mono`) for telemetry, logs, and metrics.
3. **Glassmorphic Depth:** Subtle semi-transparent dark containers (`backdrop-blur-xl`, `bg-card/70`, `border-glass-border`) layered over subtle radial ambient glows.
4. **Anti-Slop Guardrails:**
   - ❌ **No neon purple-to-blue gradients** or cartoon illustrations.
   - ❌ **No generic SaaS verbs** like "Supercharge your pipeline" or "Unleash the power of AI".
   - ❌ **No nested card soup** (cards inside cards inside cards).
   - ❌ **No low-contrast gray text** on dark backgrounds.
   - ✅ **Yes to factual telemetry:** Timestamps, vector extraction citations, live system health percentages, 10-K SEC filing references, and verified metrics.

---

## 2. Color System & Design Tokens

Tailwind is configured to use HSL color tokens defined in `src/index.css` and mapped in `tailwind.config.ts`.

### Core Color Palette

| Token | Class | HSL Value | Hex Equivalent | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Obsidian (Background)** | `bg-background` / `bg-obsidian` | `220 20% 4%` | `#080b11` | Primary screen canvas |
| **Card Surface (L1)** | `bg-card` | `220 15% 8%` | `#11151c` | Major section cards & containers |
| **Secondary Surface (L2)**| `bg-secondary` | `220 15% 12%` | `#1a1f29` | Stat boxes, input fields, badges |
| **Charcoal Surface (L3)** | `bg-charcoal` | `220 15% 15%` | `#202633` | Sub-panels & active controls |
| **Borders & Dividers** | `border-border` / `border-glass-border` | `220 15% 15%` / `220 10% 25% / 0.3` | `#202633` | Crisp 1px structure lines |
| **Platinum (Accent)** | `text-platinum` / `bg-primary` | `220 10% 75%` | `#bcc0c7` | Primary metallic brand accent |
| **Platinum Glow** | `text-platinum-glow` | `220 15% 85%` | `#d5d9e0` | Hover states, glowing icons |
| **Silver Mist** | `text-silver-mist` | `220 10% 60%` | `#9296a0` | Secondary subtle accents |
| **Text Foreground** | `text-foreground` / `text-white` | `0 0% 95%` | `#f2f2f2` | Primary headings & high-contrast text |
| **Muted Foreground** | `text-muted-foreground` | `220 10% 55%` | `#828894` | Body copy, descriptions, captions |

### Status & Telemetry Accents

| State | Tailwind Classes | Usage |
| :--- | :--- | :--- |
| **Live / Positive / Verified** | `text-emerald-400`, `bg-emerald-500/10`, `border-emerald-500/20` | System Health 99.98%, verified metrics, positive ROI, checkmarks |
| **Warning / Caution** | `text-amber-400`, `bg-amber-500/10`, `border-amber-500/20` | Threshold alerts, high volume caps, deliverability limits |
| **Negative / Legacy Risk** | `text-rose-400`, `bg-rose-500/10`, `border-rose-500/20` | Human SDR burn, 1% reply rates, domain penalties |

### Gradients & Ambient Shaders

```css
/* Platinum Gradient Text */
.text-platinum-gradient {
  background: linear-gradient(135deg, hsl(220 10% 75%) 0%, hsl(220 15% 60%) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Hero Ambient Glow (Positioned centered behind Hero) */
.hero-gradient {
  background: radial-gradient(ellipse 80% 50% at 50% -20%, hsl(220 15% 20% / 0.3) 0%, transparent 100%);
}

/* Glassmorphism Surface */
.glass-card {
  background: hsl(220 15% 10% / 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid hsl(220 10% 25% / 0.3);
  box-shadow: 0 25px 50px -12px hsl(220 20% 2% / 0.5);
}

/* Subtle Platinum Glow */
.glow-platinum {
  box-shadow: 0 0 60px -15px hsl(220 10% 50% / 0.3);
}
```

---

## 3. Typography Hierarchy

The typographic system pairs three specialized fonts:

| Font Family | Tailwind Class | Font Stack | Usage |
| :--- | :--- | :--- | :--- |
| **Luxury Display** | `font-luxury` | `'Playfair Display', serif` | Main H1/H2 headlines, brand name, hero numbers, executive quotes |
| **Modern Body** | `font-modern` | `'Inter', system-ui, sans-serif` | Body paragraphs, button labels, UI controls, navigation |
| **Telemetry Monospace** | `font-mono` | `ui-monospace, monospace` | Timestamps, ICP badges, metrics, system logs, code snippets |

### Typographic Scales & Guidelines

1. **Page Hero H1:**
   ```tsx
   <h1 className="text-4xl sm:text-5xl lg:text-6xl font-luxury text-white tracking-tight leading-[1.1]">
     Meet IRONMAN™. <br />
     <span className="text-platinum-gradient">The AI Revenue Platform.</span>
   </h1>
   ```
2. **Section Heading H2:**
   ```tsx
   <h2 className="text-3xl sm:text-5xl font-luxury text-white tracking-tight">
     The 4 Interconnected Engines
   </h2>
   ```
3. **Eyebrow Badge (Sub-header pill):**
   ```tsx
   <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 border border-primary/20 text-xs font-medium text-platinum">
     <Cpu size={14} className="text-platinum-glow" />
     <span>Proprietary Operating System v2.1</span>
   </div>
   ```
4. **Body Text:**
   ```tsx
   <p className="text-base sm:text-lg text-muted-foreground font-modern leading-relaxed max-w-2xl">
     High-precision signal intelligence, executive personalization, and automated CRM meeting placement.
   </p>
   ```
5. **Telemetry / Label Text:**
   ```tsx
   <div className="text-[10px] sm:text-xs font-mono text-muted-foreground uppercase tracking-wider">
     Average Cold Reply Rate
   </div>
   ```

---

## 4. Component Catalog & Code Patterns

### 4.1 Buttons (`LuxuryButton`)
Located in `@/components/ui/luxury-button`.

```tsx
import { LuxuryButton } from "@/components/ui/luxury-button";
import { ArrowRight, Play } from "lucide-react";

// Primary High-Conversion CTA
<LuxuryButton
  variant="platinum"
  size="lg"
  onClick={() => setIsAuditModalOpen(true)}
  className="flex items-center gap-2"
>
  <span>Audit Your Revenue Infrastructure</span>
  <ArrowRight size={18} />
</LuxuryButton>

// Secondary Outline Button
<LuxuryButton
  variant="outline"
  size="lg"
  onClick={() => setIsDemoModalOpen(true)}
  className="flex items-center gap-2"
>
  <Play size={16} className="text-platinum-glow fill-platinum-glow" />
  <span>Watch How IRONMAN Works</span>
</LuxuryButton>

// Ghost / Minimalist Action
<LuxuryButton variant="ghost" size="sm">
  Learn More
</LuxuryButton>
```

### 4.2 Telemetry & Stat Highlight Grid
Used in hero sections, case studies, and architecture breakdowns:

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <div className="p-4 rounded-xl bg-secondary/60 border border-border/40">
    <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
      Intent Signals Tracked
    </div>
    <div className="text-2xl sm:text-3xl font-luxury text-white mt-1">
      14,280 / Wk
    </div>
    <div className="text-[11px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
      <span>↑ 24% vs last month</span>
    </div>
  </div>
</div>
```

### 4.3 Terminal / CLI Live Activity Log
Shows real-time software execution:

```tsx
<div className="p-4 rounded-xl bg-black/40 border border-border/60 font-mono text-xs text-muted-foreground space-y-2 overflow-x-auto">
  <div className="text-emerald-400 flex items-center gap-2">
    <Terminal size={14} /> [08:14:22 UTC] SIGNAL_RADAR: High-intent hiring spike detected at Datadog.
  </div>
  <div className="text-platinum flex items-center gap-2">
    <Database size={14} /> [08:14:25 UTC] VECTOR_EXTRACT: 10-K SEC Filing snippet extracted for VP Sales target.
  </div>
  <div className="text-emerald-400 flex items-center gap-2">
    <Bot size={14} /> [08:14:29 UTC] SYNTHESIZER: Generated bespoke executive email artifact (Score: 98/100).
  </div>
</div>
```

### 4.4 Feature / Engine Architecture Card

```tsx
<div className="p-8 rounded-2xl border border-glass-border bg-card/60 backdrop-blur-xl space-y-4 hover:border-primary/40 transition-colors">
  <div className="p-3 w-fit rounded-xl bg-secondary border border-border text-platinum-glow">
    <Send size={24} />
  </div>
  <h3 className="text-2xl font-luxury text-white">1. IRONMAN Outbound Engine</h3>
  <p className="text-muted-foreground text-sm leading-relaxed">
    Monitors buying-intent signals across job boards, SEC filings, and podcast transcripts to trigger hyper-personalized executive outreach.
  </p>
  <ul className="text-xs font-mono text-muted-foreground space-y-2 pt-2">
    <li className="flex items-center gap-2">
      <CheckCircle2 size={14} className="text-emerald-400" /> Vector search across 10-K SEC filings
    </li>
    <li className="flex items-center gap-2">
      <CheckCircle2 size={14} className="text-emerald-400" /> 18.4% average response rate
    </li>
  </ul>
</div>
```

### 4.5 Executive Testimonial Quote Card

```tsx
<div className="p-6 sm:p-8 rounded-2xl bg-secondary/80 border border-primary/30 space-y-4 my-8">
  <Quote size={28} className="text-platinum-glow opacity-60" />
  <p className="text-base sm:text-lg font-luxury text-white italic leading-relaxed">
    &ldquo;ChroniqAI didn't just give us a list of leads. They built a permanent engine that books 20+ qualified VPs of Engineering on our AE calendars every single month.&rdquo;
  </p>
  <div className="text-xs font-mono text-platinum">
    <span className="font-bold text-white">Marcus Thorne</span> — VP Revenue at ScaleMetrics
  </div>
</div>
```

### 4.6 Bottom Conversion Banner (Standard Call to Action)

```tsx
<div className="mt-16 p-8 sm:p-12 rounded-2xl border border-primary/40 bg-gradient-to-br from-card to-secondary/80 text-center space-y-4">
  <h3 className="text-2xl sm:text-3xl font-luxury text-white">
    Ready to Build Predictable Pipeline in Your Category?
  </h3>
  <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
    Get a 45-minute technical Revenue System Audit tailored to your B2B offer and target ICP.
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
```

---

## 5. Complete Landing Page Boilerplate Template

Use this React structure when generating any new landing page (e.g. `src/pages/solutions/YourPage.tsx`):

```tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Terminal,
  Database,
  Cpu
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { BreadcrumbSchema, FAQPageSchema } from "@/components/seo/StructuredData";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { AuditModal } from "@/components/modals/AuditModal";

export default function NewLandingPage() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  const pageFaqs = [
    {
      question: "What makes this system different from legacy alternatives?",
      answer: "ChroniqAI installs software-defined revenue infrastructure integrated directly into your CRM, rather than charging monthly agency labor retainers."
    }
  ];

  return (
    <PageLayout>
      {/* 1. SEO Head & Structured Data */}
      <SEOHead
        title="Page Title (Max 60 chars) | ChroniqAI"
        description="Comprehensive meta description explaining value proposition (150-160 chars)."
        canonical="https://chroniqai.com/your-route"
        keywords="key term 1, key term 2, key term 3"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://chroniqai.com" },
          { name: "Your Page", url: "https://chroniqai.com/your-route" }
        ]}
      />
      <FAQPageSchema faqs={pageFaqs} />

      {/* 2. Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden text-left">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] hero-gradient pointer-events-none -z-10" />

        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 border border-primary/20 text-xs font-medium text-platinum">
              <Sparkles size={14} className="text-platinum-glow" />
              <span>Category / Solution Subtitle</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl font-luxury text-white tracking-tight leading-[1.1]">
              Primary Value Proposition. <br />
              <span className="text-platinum-gradient">Secondary Impact Statement.</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-muted-foreground font-modern leading-relaxed max-w-2xl">
              High-ticket B2B description explaining the exact mechanism, mathematical advantage, and business outcome.
            </p>

            {/* CTA Group */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <LuxuryButton
                variant="platinum"
                size="lg"
                onClick={() => setIsAuditModalOpen(true)}
                className="flex items-center gap-2"
              >
                <span>Audit Your Revenue System</span>
                <ArrowRight size={18} />
              </LuxuryButton>

              <Link to="/ironman">
                <LuxuryButton variant="outline" size="lg">
                  Explore Architecture
                </LuxuryButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Metrics / Telemetry Strip */}
      <section className="py-12 border-y border-border/40 bg-secondary/20">
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-1">
              <div className="text-xs font-mono text-muted-foreground uppercase">Metric One</div>
              <div className="text-2xl sm:text-3xl font-luxury text-emerald-400">19.2%</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono text-muted-foreground uppercase">Metric Two</div>
              <div className="text-2xl sm:text-3xl font-luxury text-white">22 / Mo</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono text-muted-foreground uppercase">Metric Three</div>
              <div className="text-2xl sm:text-3xl font-luxury text-white">$1.4M ARR</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono text-muted-foreground uppercase">Metric Four</div>
              <div className="text-2xl sm:text-3xl font-luxury text-white">34 Days</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Features / Engines Grid */}
      <section className="py-20 text-left">
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          <div className="space-y-4 mb-12">
            <span className="text-xs font-mono text-platinum uppercase tracking-wider block">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-luxury text-white">
              System Specifications
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature Card 1 */}
            <div className="p-8 rounded-2xl border border-glass-border bg-card/60 backdrop-blur-xl space-y-4">
              <h3 className="text-2xl font-luxury text-white">Feature Name</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Detailed technical breakdown of how this capability delivers pipeline.
              </p>
            </div>
            {/* Feature Card 2 */}
            <div className="p-8 rounded-2xl border border-glass-border bg-card/60 backdrop-blur-xl space-y-4">
              <h3 className="text-2xl font-luxury text-white">Feature Name</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Detailed technical breakdown of how this capability delivers pipeline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ Section */}
      <section className="py-16 bg-secondary/30 text-left">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-luxury text-white mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {pageFaqs.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-xl border border-border/60 bg-card/70 space-y-2">
                <h3 className="text-base font-luxury text-white">{faq.question}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Bottom CTA Conversion Block */}
      <section className="py-20 text-left">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          <div className="p-8 sm:p-12 rounded-2xl border border-primary/40 bg-gradient-to-br from-card to-secondary/80 text-center space-y-4">
            <h3 className="text-2xl sm:text-3xl font-luxury text-white">
              Schedule Your Revenue Infrastructure Review
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Get an architectural audit of your outbound pipeline and TAM intent signals.
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

      {/* 7. Modal Injection */}
      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
      />
    </PageLayout>
  );
}
```

---

## 6. Micro-Interactions & Motion Tokens

We use `framer-motion` (or `motion/react`) for smooth, restrained animations. Never use chaotic or bounce transitions.

### Standard Fade-Up Variants
```tsx
// Hero / Section Header
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  ...
</motion.div>

// Staggered Cards in Grid
{items.map((item, idx) => (
  <motion.div
    key={idx}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: idx * 0.1 }}
  >
    ...
  </motion.div>
))}
```

### Pulse & Status Indicators
```tsx
// Live Green Dot for Telemetry
<div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
```

---

## 7. Copywriting & Tone of Voice Guide

ChroniqAI writes like a **Principal Systems Architect** presenting to a B2B CEO, CRO, or CISO.

### Vocabulary Matrix

| ❌ Banned Cliché Words | ✅ Approved ChroniqAI Terminology |
| :--- | :--- |
| "Supercharge" / "Skyrocket" | "Systematize" / "Scale deterministically" |
| "AI Magic" / "Intelligent Robot" | "10-K SEC Vector Search" / "Buying-Intent Detection" |
| "Lead Gen Agency" | "Revenue Infrastructure Platform" |
| "Blast cold emails" | "Hyper-personalized executive outreach" |
| "Spam" / "Mass emails" | "Deliverability Guardian" / "Domain Isolation" |
| "Guaranteed millions" | "Verified benchmark" / "18.4% average cold reply rate" |

### Sentence Structure
- Keep sentences declarative and authoritative.
- State the mechanical reason **why** something works (e.g. *"Because we scan hiring signals and 10-K filings, outreach reads like peer-to-peer enterprise dialogue rather than sales spam"*).
- Contrast the **Legacy Cost** (human SDR burnout, agency retainers) against the **Infrastructure Paradigm** (permanent software asset).

---

## 8. Quality Checklist Before Publishing Any Page

When you create a new landing page or feature view, verify the following 10 items:

1. [ ] **PageLayout Wrapper:** Does the component wrap its body in `<PageLayout>`?
2. [ ] **SEO & Structured Data:** Are `<SEOHead>` (with unique title, description, and canonical) and relevant JSON-LD schemas included?
3. [ ] **Typography Match:** Are headlines in `font-luxury` with `tracking-tight` and selective `text-platinum-gradient`?
4. [ ] **Body Contrast:** Is body copy styled with `font-modern text-muted-foreground` and high legibility?
5. [ ] **Eyebrow Pills:** Does the top of each major block contain an eyebrow badge with an icon and `text-xs font-mono text-platinum`?
6. [ ] **Standard CTAs:** Are action buttons using `<LuxuryButton variant="platinum">` or `<LuxuryButton variant="outline">`?
7. [ ] **Audit Modal Connected:** Does clicking the primary CTA open the `<AuditModal>`?
8. [ ] **Responsive Padding:** Are container paddings responsive (`pt-32 pb-20 md:pt-40 md:pb-28`) and horizontally padded (`px-6 lg:px-8`)?
9. [ ] **Route & Sitemap Registration:** Is the new route added to `src/App.tsx` and `public/sitemap.xml`?
10. [ ] **Build Verification:** Does `npm run build` / `compile_applet` pass with 0 errors?
