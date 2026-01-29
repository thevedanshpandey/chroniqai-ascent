import { motion } from "framer-motion";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { PageLayout } from "@/components/layout/PageLayout";
import { ArrowRight, Zap, User, Search, Shield, Lock, Infinity } from "lucide-react";

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-platinum/5 blur-[120px] rounded-full animate-glow-pulse" />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Motto */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-luxury text-sm md:text-base text-platinum/70 tracking-[0.3em] uppercase mb-8"
          >
            Automate. Scale. Dominate.
          </motion.p>

          {/* Main Headline */}
          <h1 className="font-luxury text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-[1.1] mb-6">
            <span className="text-platinum-gradient">ChroniqAI</span> — <span className="power-keyword">AI</span> That Scales{" "}
            <span className="power-keyword">Revenue</span>.
          </h1>

          {/* Subheadline */}
          <p className="font-modern text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
            <span className="power-keyword">Infrastructure</span>-grade <span className="power-keyword">AI</span> systems powering automation, authority, and <span className="power-keyword">AI</span>-native visibility.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <LuxuryButton variant="platinum" size="lg">
              Book a Strategy Call
              <ArrowRight className="ml-2 h-5 w-5" />
            </LuxuryButton>
            <LuxuryButton variant="ghost" size="lg">
              Explore the Infrastructure
            </LuxuryButton>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-platinum/30 rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="w-1 h-2 bg-platinum rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}

// Authority Manifesto Section
function ManifestoSection() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-graphite/50 to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            eyebrow="The Paradigm Shift"
            title="The Intelligence Layer"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 space-y-6"
          >
            <p className="font-modern text-lg text-muted-foreground leading-relaxed text-center">
              Traditional software solves tasks. <span className="power-keyword text-foreground">AI</span> systems solve problems at <span className="power-keyword text-foreground">scale</span>. 
              The shift from static tools to intelligent infrastructure is not an upgrade—it's an evolution of how businesses operate.
            </p>
            <p className="font-modern text-lg text-muted-foreground leading-relaxed text-center">
              <span className="font-luxury text-platinum">ChroniqAI</span> is not a service provider. We are the <span className="power-keyword text-foreground">intelligence</span> layer that 
              modern enterprises depend on—architecting autonomous systems that drive <span className="power-keyword text-foreground">revenue</span>, establish <span className="power-keyword text-foreground">authority</span>, and 
              secure visibility across the <span className="power-keyword text-foreground">AI</span>-native landscape.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Infrastructure Pillars Section
function PillarsSection() {
  const pillars = [
    {
      icon: Zap,
      title: "AI Automation Infrastructure",
      description: "Autonomous systems that qualify leads, book appointments, and handle customer operations without human bottlenecks.",
      href: "/automation",
    },
    {
      icon: User,
      title: "AI Identity & Presence Infrastructure",
      description: "Always-on authority engines that generate and deploy founder presence across platforms autonomously.",
      href: "/branding",
    },
    {
      icon: Search,
      title: "AI Knowledge & Visibility Infrastructure",
      description: "Native optimization for AI platforms—ensuring discoverability across GPT, Gemini, Grok, and beyond.",
      href: "/seo",
    },
  ];

  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        <SectionHeading
          eyebrow="Core Systems"
          title="Infrastructure Pillars"
          description="Three foundational layers of AI infrastructure that power modern enterprise operations."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <GlassCard key={pillar.title} delay={index * 0.1}>
              <pillar.icon className="w-10 h-10 text-platinum mb-6" strokeWidth={1.5} />
              <h3 className="font-luxury text-xl font-semibold text-foreground mb-4">
                {pillar.title}
              </h3>
              <p className="font-modern text-muted-foreground text-sm leading-relaxed mb-6">
                {pillar.description}
              </p>
              <a
                href={pillar.href}
                className="font-modern text-sm text-platinum hover:text-platinum-glow transition-colors duration-300 inline-flex items-center gap-2"
              >
                Explore <ArrowRight className="w-4 h-4" />
              </a>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// Capability Signals Section
function CapabilitiesSection() {
  const capabilities = [
    {
      title: "Revenue Without Bottlenecks",
      description: "AI systems that generate, qualify, and convert at scale—removing human constraints from your revenue engine.",
    },
    {
      title: "Autonomous Authority",
      description: "Personal presence infrastructure that builds and maintains thought leadership without constant founder involvement.",
    },
    {
      title: "AI-Native Visibility",
      description: "Optimized for the platforms that matter tomorrow—GPT, Gemini, Grok, and the next wave of AI interfaces.",
    },
  ];

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-platinum/3 blur-[150px] rounded-full" />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="Capability Architecture"
          title="Systems That Scale"
        />

        <div className="mt-16 max-w-3xl mx-auto space-y-8">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border-l-2 border-platinum/30 pl-8 py-4 hover:border-platinum transition-colors duration-300"
            >
              <h3 className="font-luxury text-xl font-semibold text-foreground mb-2">
                {capability.title}
              </h3>
              <p className="font-modern text-muted-foreground leading-relaxed">
                {capability.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Primary CTA Section
function CTASection() {
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
              Architect Your <span className="power-keyword text-platinum-gradient">AI</span> Advantage
            </h2>
            <p className="font-modern text-lg text-muted-foreground max-w-xl mx-auto mb-10">
              Transform your operations with infrastructure-grade AI systems designed for long-term dominance.
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

// Trust & Philosophy Section
function TrustSection() {
  const principles = [
    {
      icon: Shield,
      title: "Privacy-First Architecture",
      description: "Your data, your control. Systems built with enterprise-grade security and privacy at the core.",
    },
    {
      icon: Lock,
      title: "Proprietary Systems",
      description: "Custom-built infrastructure—not off-the-shelf tools. Engineered for competitive advantage.",
    },
    {
      icon: Infinity,
      title: "Long-Term Dominance",
      description: "Built for the decade ahead. Systems that compound advantage over time.",
    },
  ];

  return (
    <section className="py-24 lg:py-32 border-t border-border/50">
      <div className="container mx-auto px-6 lg:px-8">
        <SectionHeading
          eyebrow="Philosophy"
          title="Built for the Long Game"
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <principle.icon className="w-8 h-8 text-platinum mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="font-luxury text-lg font-semibold text-foreground mb-2">
                {principle.title}
              </h3>
              <p className="font-modern text-sm text-muted-foreground">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Final CTA Section
function FinalCTASection() {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-t from-graphite/50 to-transparent">
      <div className="container mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-luxury text-sm text-platinum/70 tracking-[0.3em] uppercase mb-6">
            Ready to Transform?
          </p>
          <h2 className="font-luxury text-3xl md:text-4xl font-semibold text-foreground mb-8">
            The Future of <span className="power-keyword text-platinum-gradient">Revenue</span> is Autonomous
          </h2>
          <LuxuryButton variant="platinum" size="lg">
            Book a Strategy Call
            <ArrowRight className="ml-2 h-5 w-5" />
          </LuxuryButton>
        </motion.div>
      </div>
    </section>
  );
}

// Main Index Page
export default function Index() {
  return (
    <PageLayout>
      <HeroSection />
      <ManifestoSection />
      <PillarsSection />
      <CapabilitiesSection />
      <CTASection />
      <TrustSection />
      <FinalCTASection />
    </PageLayout>
  );
}
