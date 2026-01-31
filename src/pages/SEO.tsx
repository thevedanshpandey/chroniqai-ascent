import { motion } from "framer-motion";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { PageLayout } from "@/components/layout/PageLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { ServiceSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";
import { ArrowRight, Brain, Network, Database, Target, Layers, Rocket } from "lucide-react";

function SEOHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[400px] bg-platinum/5 blur-[120px] rounded-full animate-glow-pulse" />
      
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
            AI SEO Infrastructure
          </motion.p>

          <h1 className="font-luxury text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-[1.1] mb-6">
            <span className="power-keyword">AI</span>-Native Visibility{" "}
            <span className="text-platinum-gradient">Infrastructure</span>
          </h1>

          <p className="font-modern text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
            Ranking on <span className="power-keyword text-foreground">AI</span> platforms—not just Google. Optimized for GPT, Gemini, Grok, and the next wave of <span className="power-keyword text-foreground">intelligence</span> interfaces.
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

function PlatformSection() {
  const platforms = [
    {
      name: "ChatGPT / GPT",
      description: "Optimize for OpenAI's recommendation engine and conversational discovery.",
    },
    {
      name: "Gemini",
      description: "Position within Google's AI ecosystem for next-gen search visibility.",
    },
    {
      name: "Grok",
      description: "Establish presence in X's AI layer for real-time intelligence queries.",
    },
    {
      name: "Perplexity",
      description: "Rank in AI-powered research and answer engines.",
    },
  ];

  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        <SectionHeading
          eyebrow="AI Platforms"
          title="Beyond Traditional Search"
          description="The discovery layer is shifting. AI platforms are becoming the primary interface for information retrieval—and they require a fundamentally different optimization approach."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {platforms.map((platform, index) => (
            <GlassCard key={platform.name} delay={index * 0.1} className="p-6">
              <h3 className="font-luxury text-xl font-semibold text-foreground mb-2">
                {platform.name}
              </h3>
              <p className="font-modern text-sm text-muted-foreground">
                {platform.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function MethodologySection() {
  const methods = [
    {
      icon: Brain,
      title: "Entity Architecture",
      description: "Establish your brand as a recognized entity within AI knowledge graphs—the foundation of AI-native visibility.",
    },
    {
      icon: Network,
      title: "Knowledge Graph Positioning",
      description: "Strategic placement within interconnected knowledge structures that AI systems use for information retrieval.",
    },
    {
      icon: Database,
      title: "Training Data Optimization",
      description: "Ensure your content influences how AI models understand and represent your domain expertise.",
    },
    {
      icon: Target,
      title: "Query Intent Mapping",
      description: "Align your content with the specific queries AI users are asking—not just keywords.",
    },
    {
      icon: Layers,
      title: "Multi-Layer Presence",
      description: "Distributed visibility across AI platforms, traditional search, and emerging discovery interfaces.",
    },
    {
      icon: Rocket,
      title: "Velocity Architecture",
      description: "Systems designed to capture emerging topics and trends as AI platforms index new information.",
    },
  ];

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-platinum/3 blur-[150px] rounded-full" />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="Methodology"
          title="AI-Native Optimization"
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {methods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <method.icon className="w-8 h-8 text-platinum mb-4 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
              <h3 className="font-luxury text-lg font-semibold text-foreground mb-2">
                {method.title}
              </h3>
              <p className="font-modern text-sm text-muted-foreground leading-relaxed">
                {method.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FutureSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-modern text-sm font-medium text-platinum tracking-widest uppercase mb-4 block">
              The Shift
            </span>
            <h2 className="font-luxury text-3xl md:text-4xl font-semibold text-foreground mb-6">
              Google Was The Beginning. <span className="power-keyword text-platinum-gradient">AI</span> Is The Future.
            </h2>
            <p className="font-modern text-lg text-muted-foreground leading-relaxed">
              Traditional SEO optimizes for crawlers. <span className="power-keyword text-foreground">AI</span> SEO optimizes for intelligence. 
              The businesses that establish entity authority now will <span className="power-keyword text-foreground">dominate</span> the next decade of discovery.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SEOCTA() {
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
              Architect Your <span className="power-keyword text-platinum-gradient">AI</span> Visibility
            </h2>
            <p className="font-modern text-lg text-muted-foreground max-w-xl mx-auto mb-10">
              Position your brand where the next generation of discovery happens.
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

export default function SEO() {
  return (
    <PageLayout>
      <SEOHead
        title="AI SEO & GEO - AI-Native Visibility Infrastructure | ChroniqAI"
        description="Ranking on AI platforms, not just Google. ChroniqAI specializes in GPT, Gemini, Grok optimization through entity architecture and knowledge graph positioning."
        canonical="https://chroniqai.com/seo"
        keywords="AI SEO, GEO, generative engine optimization, ChatGPT ranking, Gemini optimization, Grok SEO, knowledge graph, entity SEO, AI visibility, ChroniqAI"
      />
      <ServiceSchema
        name="AI SEO & GEO - AI-Native Visibility Infrastructure"
        description="Ranking on AI platforms like GPT, Gemini, Grok via entity architecture and knowledge graph positioning"
        url="https://chroniqai.com/seo"
        features={["Entity Architecture", "Knowledge Graph Positioning", "Training Data Optimization", "Query Intent Mapping", "Multi-Layer Presence", "Velocity Architecture"]}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://chroniqai.com" },
          { name: "AI SEO & GEO", url: "https://chroniqai.com/seo" }
        ]}
      />
      <SEOHero />
      <PlatformSection />
      <MethodologySection />
      <FutureSection />
      <SEOCTA />
    </PageLayout>
  );
}
