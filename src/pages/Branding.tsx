import { motion } from "framer-motion";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { ServiceSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";
import { ArrowRight, Mic, Video, PenTool, Sparkles, Clock, Globe } from "lucide-react";

function BrandingHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[400px] bg-platinum/5 blur-[120px] rounded-full animate-glow-pulse" />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-luxury text-sm md:text-base text-platinum/70 tracking-[0.3em] uppercase mb-8"
          >
            AI Personal Branding Infrastructure
          </motion.p>

          <h1 className="font-luxury text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-[1.1] mb-6">
            Autonomous <span className="power-keyword">AI</span> Presence for{" "}
            <span className="text-platinum-gradient">Founders</span>
          </h1>

          <p className="font-modern text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
            Your <span className="power-keyword text-foreground">authority</span> engine runs 24/7. Fully <span className="power-keyword text-foreground">AI</span>-generated realistic content—you never record a thing.
          </p>

          <LuxuryButton variant="platinum" size="lg">
            Book a Strategy Call
            <ArrowRight className="ml-2 h-5 w-5" />
          </LuxuryButton>
        </motion.div>
      </div>
    </section>
  );
}

function PresenceSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        <SectionHeading
          eyebrow="The System"
          title="Always-On Authority Engine"
          description="Your digital presence operates autonomously—building credibility, engaging audiences, and establishing thought leadership without your daily involvement."
        />

        <div className="mt-16 max-w-4xl mx-auto">
          <GlassCard className="p-10 lg:p-14" hover={false}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h3 className="font-luxury text-2xl font-semibold text-foreground mb-4">
                  What You Don't Do
                </h3>
                <ul className="space-y-3 font-modern text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-platinum/50 rounded-full" />
                    Record videos or podcasts
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-platinum/50 rounded-full" />
                    Write daily content
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-platinum/50 rounded-full" />
                    Manage social accounts
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-platinum/50 rounded-full" />
                    Coordinate content calendars
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-luxury text-2xl font-semibold text-platinum mb-4">
                  What The System Does
                </h3>
                <ul className="space-y-3 font-modern text-foreground">
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-platinum rounded-full" />
                    Generates realistic AI content
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-platinum rounded-full" />
                    Maintains your authentic voice
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-platinum rounded-full" />
                    Deploys across all platforms
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-platinum rounded-full" />
                    Builds compounding authority
                  </li>
                </ul>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

function CapabilitiesSection() {
  const capabilities = [
    {
      icon: Video,
      title: "AI Video Generation",
      description: "Photorealistic video content featuring your likeness—created entirely by AI systems.",
    },
    {
      icon: Mic,
      title: "AI Voice Synthesis",
      description: "Your voice, replicated with precision for podcasts, commentary, and audio content.",
    },
    {
      icon: PenTool,
      title: "AI Written Content",
      description: "Articles, posts, and thought pieces that capture your unique perspective and expertise.",
    },
    {
      icon: Sparkles,
      title: "AI Creative Direction",
      description: "Visual assets and creative concepts aligned with your personal brand identity.",
    },
    {
      icon: Clock,
      title: "Always-On Publishing",
      description: "Content deployed on schedule, optimized for engagement across every platform.",
    },
    {
      icon: Globe,
      title: "Multi-Platform Presence",
      description: "Unified authority across LinkedIn, Twitter, YouTube, and emerging channels.",
    },
  ];

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-platinum/3 blur-[150px] rounded-full" />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="Capabilities"
          title="Full-Spectrum Content Infrastructure"
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 border border-border/50 rounded-xl hover:border-platinum/30 transition-colors duration-300"
            >
              <capability.icon className="w-8 h-8 text-platinum mb-4" strokeWidth={1.5} />
              <h3 className="font-luxury text-lg font-semibold text-foreground mb-2">
                {capability.title}
              </h3>
              <p className="font-modern text-sm text-muted-foreground leading-relaxed">
                {capability.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandingCTA() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        <GlassCard className="text-center py-16 lg:py-20" hover={false}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-luxury text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Deploy Your <span className="power-keyword text-platinum-gradient">Authority</span> Engine
            </h2>
            <p className="font-modern text-lg text-muted-foreground max-w-xl mx-auto mb-10">
              Build compounding personal presence without trading your time for content.
            </p>
            <LuxuryButton variant="platinum" size="lg">
              Book a Strategy Call
              <ArrowRight className="ml-2 h-5 w-5" />
            </LuxuryButton>
          </motion.div>
        </GlassCard>
      </div>
    </section>
  );
}

export default function Branding() {
  return (
    <PageLayout>
      <SEOHead
        title="AI Personal Branding Infrastructure | ChroniqAI"
        description="Autonomous AI presence for founders. Fully AI-generated realistic content—video, voice, and written—that builds authority 24/7 without you recording anything."
        canonical="https://chroniqai.com/branding"
        keywords="AI personal branding, AI content generation, founder branding, AI video generation, AI voice synthesis, thought leadership automation, ChroniqAI"
      />
      <ServiceSchema
        name="AI Personal Branding Infrastructure"
        description="Fully AI-generated autonomous presence infrastructure for founders—always-on authority engine"
        url="https://chroniqai.com/branding"
        features={["AI Video Generation", "AI Voice Synthesis", "AI Written Content", "AI Creative Direction", "Always-On Publishing", "Multi-Platform Presence"]}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://chroniqai.com" },
          { name: "AI Personal Branding", url: "https://chroniqai.com/branding" }
        ]}
      />
      <BrandingHero />
      <PresenceSection />
      <CapabilitiesSection />
      <BrandingCTA />
    </PageLayout>
  );
}
