import { motion } from "framer-motion";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { ServiceSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";
import { ArrowRight, Cpu, Calendar, Headphones, Bot, Workflow, BarChart3 } from "lucide-react";

function AutomationHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-platinum/5 blur-[120px] rounded-full animate-glow-pulse" />
      
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
            AI Automation Infrastructure
          </motion.p>

          <h1 className="font-luxury text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-[1.1] mb-6">
            <span className="power-keyword">AI</span> Automation That <span className="power-keyword">Scales</span>{" "}
            <span className="text-platinum-gradient">Revenue</span>
          </h1>

          <p className="font-modern text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
            Not an agency. Not a tool. <span className="power-keyword text-foreground">Infrastructure</span>—autonomous systems that qualify, convert, and operate at enterprise scale.
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

function SystemsSection() {
  const systems = [
    {
      icon: Bot,
      title: "AI Lead Qualification",
      description: "Autonomous systems that engage, score, and qualify prospects 24/7—routing only high-intent leads to your team.",
    },
    {
      icon: Calendar,
      title: "AI Appointment Booking",
      description: "Intelligent scheduling infrastructure that converts conversations into booked meetings without human intervention.",
    },
    {
      icon: Headphones,
      title: "AI Customer Operations",
      description: "Post-sale automation that handles support, onboarding, and retention—scaling customer success without headcount.",
    },
  ];

  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        <SectionHeading
          eyebrow="Core Systems"
          title="Autonomous Revenue Architecture"
          description="Three interconnected systems that remove human bottlenecks from your revenue engine."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {systems.map((system, index) => (
            <GlassCard key={system.title} delay={index * 0.1}>
              <system.icon className="w-10 h-10 text-platinum mb-6" strokeWidth={1.5} />
              <h3 className="font-luxury text-xl font-semibold text-foreground mb-4">
                {system.title}
              </h3>
              <p className="font-modern text-muted-foreground text-sm leading-relaxed">
                {system.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArchitectureSection() {
  const features = [
    {
      icon: Workflow,
      title: "Orchestration Layer",
      description: "Central intelligence that coordinates all automation flows, learning and optimizing in real-time.",
    },
    {
      icon: Cpu,
      title: "Processing Engine",
      description: "High-throughput AI processing that handles thousands of simultaneous interactions without degradation.",
    },
    {
      icon: BarChart3,
      title: "Analytics Core",
      description: "Deep visibility into automation performance with actionable insights for continuous optimization.",
    },
  ];

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-platinum/3 blur-[150px] rounded-full" />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="Architecture"
          title="System Design"
        />

        <div className="mt-16 max-w-3xl mx-auto space-y-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-6 p-6 glass-card rounded-xl"
            >
              <feature.icon className="w-8 h-8 text-platinum flex-shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <h3 className="font-luxury text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="font-modern text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AutomationCTA() {
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
              Build Your <span className="power-keyword text-platinum-gradient">Revenue</span> Infrastructure
            </h2>
            <p className="font-modern text-lg text-muted-foreground max-w-xl mx-auto mb-10">
              Deploy autonomous systems that scale with demand—no additional headcount required.
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

export default function Automation() {
  return (
    <PageLayout>
      <SEOHead
        title="AI Automation Infrastructure | ChroniqAI"
        description="Autonomous AI systems that qualify leads, book appointments, and handle customer operations at scale. ChroniqAI AI Automation removes human bottlenecks from your revenue engine."
        canonical="https://chroniqai.com/automation"
        keywords="AI automation, lead qualification AI, AI appointment booking, customer operations automation, revenue automation, ChroniqAI"
      />
      <ServiceSchema
        name="AI Automation Infrastructure"
        description="Autonomous systems that qualify, convert, and operate at enterprise scale without human bottlenecks"
        url="https://chroniqai.com/automation"
        features={["AI Lead Qualification", "AI Appointment Booking", "AI Customer Operations", "Orchestration Layer", "Processing Engine", "Analytics Core"]}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://chroniqai.com" },
          { name: "AI Automation", url: "https://chroniqai.com/automation" }
        ]}
      />
      <AutomationHero />
      <SystemsSection />
      <ArchitectureSection />
      <AutomationCTA />
    </PageLayout>
  );
}
