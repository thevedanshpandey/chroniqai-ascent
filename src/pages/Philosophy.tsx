import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { ArrowRight, Layers, Zap, Shield, Target, Clock, Infinity } from "lucide-react";

const principles = [
  {
    icon: Layers,
    title: "Infrastructure Over Services",
    description: "We don't offer services—we build infrastructure. The difference is permanence. Services end when contracts expire. Infrastructure compounds value over decades.",
    insight: "Every system we architect becomes a permanent asset in your business—not a dependency on external providers.",
  },
  {
    icon: Zap,
    title: "Automation as Liberation",
    description: "True automation doesn't just save time—it liberates human potential. When systems handle the repetitive, people can focus on the strategic.",
    insight: "Our goal is to make founders obsolete in day-to-day operations, so they can focus on vision and growth.",
  },
  {
    icon: Shield,
    title: "Privacy by Architecture",
    description: "Privacy isn't a feature we add—it's how we build. Your data, your intelligence, your competitive advantage stays yours.",
    insight: "We architect systems where your proprietary data never leaves your infrastructure.",
  },
  {
    icon: Target,
    title: "Precision Over Volume",
    description: "We build fewer, better systems. Each one engineered for reliability, not just functionality. Quality compounds; quantity dilutes.",
    insight: "A single well-architected system outperforms a dozen patched-together tools.",
  },
  {
    icon: Clock,
    title: "Speed-to-Value",
    description: "Theory without implementation is entertainment. Every engagement is designed to deliver measurable value within weeks, not months.",
    insight: "We believe in rapid deployment with continuous refinement—not endless planning cycles.",
  },
  {
    icon: Infinity,
    title: "Long-Term Thinking",
    description: "We optimize for decade-scale outcomes. Every decision weighs short-term convenience against long-term strategic advantage.",
    insight: "The systems we build today should still be delivering value in 2035.",
  },
];

const beliefs = [
  {
    title: "On AI",
    statement: "Artificial intelligence is not a product category—it's a fundamental shift in how value is created. Businesses that treat AI as a tool will be outpaced by those who treat it as infrastructure.",
  },
  {
    title: "On Growth",
    statement: "Sustainable growth comes from systems, not heroics. When revenue depends on individual effort, it's fragile. When it flows from intelligent infrastructure, it's inevitable.",
  },
  {
    title: "On Competition",
    statement: "The goal isn't to compete better—it's to make competition irrelevant. Proprietary systems create moats that marketing budgets cannot cross.",
  },
  {
    title: "On Simplicity",
    statement: "Complexity is the enemy of reliability. The most sophisticated systems are those that appear simple to their users while handling immense complexity beneath the surface.",
  },
];

function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[300px] bg-platinum/5 blur-[100px] rounded-full" />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="font-luxury text-sm text-platinum/70 tracking-[0.3em] uppercase mb-6">
            Our Philosophy
          </p>
          <h1 className="font-luxury text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight mb-6">
            Principles That{" "}
            <span className="text-platinum-gradient">Define Us</span>
          </h1>
          <p className="font-modern text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            In a world of shortcuts and quick fixes, we choose depth. These principles 
            guide every decision we make and every system we build.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function PrinciplesSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        <SectionHeading
          eyebrow="Core Principles"
          title="How We Think"
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {principles.map((principle, index) => (
            <GlassCard key={principle.title} delay={index * 0.1}>
              <principle.icon className="w-10 h-10 text-platinum mb-6" strokeWidth={1.5} />
              <h3 className="font-luxury text-xl font-semibold text-foreground mb-4">
                {principle.title}
              </h3>
              <p className="font-modern text-muted-foreground leading-relaxed mb-4">
                {principle.description}
              </p>
              <div className="border-l-2 border-platinum/30 pl-4">
                <p className="font-modern text-sm text-platinum/80 italic">
                  {principle.insight}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function BeliefsSection() {
  return (
    <section className="py-24 lg:py-32 border-t border-border/30">
      <div className="container mx-auto px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Beliefs"
          title="What We Stand For"
        />

        <div className="mt-16 max-w-4xl mx-auto space-y-12">
          {beliefs.map((belief, index) => (
            <motion.div
              key={belief.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border-l-2 border-platinum/40 pl-8"
            >
              <h3 className="font-luxury text-lg font-semibold text-platinum mb-3">
                {belief.title}
              </h3>
              <p className="font-modern text-lg text-muted-foreground leading-relaxed">
                {belief.statement}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ManifestoSection() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-graphite/30 to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-luxury text-sm text-platinum/70 tracking-[0.3em] uppercase mb-8">
              The ChroniqAI Manifesto
            </p>
            
            <div className="space-y-6 font-luxury text-xl md:text-2xl text-foreground leading-relaxed">
              <p>We believe in building systems, not dependencies.</p>
              <p>We believe in automation that liberates, not complicates.</p>
              <p>We believe in infrastructure that compounds advantage over time.</p>
              <p className="text-platinum">We believe the future belongs to the autonomous.</p>
            </div>

            <p className="font-luxury text-2xl md:text-3xl text-platinum mt-12 tracking-wide">
              Automate. Scale. Dominate.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
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
            Aligned with Our Vision?
          </p>
          <h2 className="font-luxury text-3xl md:text-4xl font-semibold text-foreground mb-8">
            Let's Build Something <span className="text-platinum-gradient">Extraordinary</span>
          </h2>
          <Link to="/contact">
            <LuxuryButton variant="platinum" size="lg">
              Start the Conversation
              <ArrowRight className="ml-2 h-5 w-5" />
            </LuxuryButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function Philosophy() {
  return (
    <PageLayout>
      <HeroSection />
      <PrinciplesSection />
      <BeliefsSection />
      <ManifestoSection />
      <CTASection />
    </PageLayout>
  );
}
