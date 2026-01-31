import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { SEOHead } from "@/components/seo/SEOHead";
import { PersonSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";
import { ArrowRight, Linkedin, Target, Cpu, TrendingUp } from "lucide-react";

const leaders = [
  {
    name: "Vedansh Pandey",
    role: "Founder & CEO",
    tagline: "AI Automation & Solutions",
    bio: [
      "Vedansh Pandey is the visionary behind ChroniqAI, leading the company's mission to transform how businesses leverage artificial intelligence for revenue growth.",
      "As Co-Founder of 1stRankQ, he brings deep expertise in solving complex business problems through intelligent automation infrastructure, helping organizations achieve 5-10X growth.",
      "His approach combines strategic thinking with hands-on technical implementation, ensuring every system built delivers measurable business impact."
    ],
    expertise: ["AI Strategy", "Revenue Automation", "Business Scaling", "Systems Architecture"],
    linkedin: "https://www.linkedin.com/in/vedansh-pandey",
  },
  {
    name: "Abhay Rawat",
    role: "Co-Founder & Revenue Systems Architect",
    tagline: "Creator of IRONMAN System",
    bio: [
      "Abhay Rawat is the mastermind behind ChroniqAI's proprietary IRONMAN System—an AI-powered acquisition framework that transforms how high-ticket businesses acquire clients.",
      "Based in Delhi, India, he specializes in helping agency owners and coaches build predictable sales pipelines through Speed-to-Lead automation and intelligent AI agents.",
      "His philosophy centers on liberating founders from 'owner-operator' burnout, enabling them to become true business owners through strategic automation of repetitive tasks."
    ],
    expertise: ["Speed-to-Lead Automation", "AI Agents for SMBs", "Sales Pipeline Optimization", "Backend Systems"],
    achievements: [
      { metric: "40% → 80%", label: "Close Rate Improvement" },
      { metric: "100%", label: "Results-Based Model" },
    ],
    philosophy: "Moving founders from 'owner-operator' burnout to true business ownership through intelligent automation.",
  },
];

const companyValues = [
  {
    icon: Target,
    title: "Precision Over Volume",
    description: "We build fewer systems that work flawlessly, rather than many that need constant attention.",
  },
  {
    icon: Cpu,
    title: "Infrastructure Thinking",
    description: "Every solution is designed as foundational infrastructure—built to scale and compound over time.",
  },
  {
    icon: TrendingUp,
    title: "Revenue-First Design",
    description: "Technology serves business outcomes. Every system is measured by its impact on the bottom line.",
  },
];

function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-platinum/5 blur-[100px] rounded-full" />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="font-luxury text-sm text-platinum/70 tracking-[0.3em] uppercase mb-6">
            About ChroniqAI
          </p>
          <h1 className="font-luxury text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight mb-6">
            The Architects of{" "}
            <span className="text-platinum-gradient">Autonomous Revenue</span>
          </h1>
          <p className="font-modern text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            We are builders of intelligence infrastructure—systems that transform how businesses 
            generate revenue, establish authority, and dominate their markets.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function MissionSection() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-platinum/3 blur-[120px] rounded-full" />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            eyebrow="Our Mission"
            title="Building the Intelligence Layer"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 space-y-6"
          >
            <p className="font-modern text-lg text-muted-foreground leading-relaxed text-center">
              In an era where artificial intelligence is reshaping every industry, most businesses 
              are still operating with yesterday's infrastructure. They patch together tools, hire 
              more people, and hope to keep pace with competitors who have already made the shift.
            </p>
            <p className="font-modern text-lg text-muted-foreground leading-relaxed text-center">
              <span className="font-luxury text-platinum">ChroniqAI</span> exists to close that gap. 
              We don't sell software or services—we architect the intelligence layer that becomes 
              the foundation of modern business operations. Our systems don't just automate tasks; 
              they transform how organizations think about growth, efficiency, and competitive advantage.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function LeadershipSection() {
  return (
    <section className="py-24 lg:py-32 border-t border-border/30">
      <div className="container mx-auto px-6 lg:px-8">
        <SectionHeading
          eyebrow="Leadership"
          title="The Team Behind the Vision"
          description="Industry veterans building the future of autonomous business operations."
        />

        <div className="mt-16 space-y-16">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard className="overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Profile Header */}
                  <div className="lg:col-span-1">
                    <div className="flex flex-col h-full">
                      <div className="mb-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-platinum/20 to-platinum/5 flex items-center justify-center mb-4 border border-platinum/20">
                          <span className="font-luxury text-2xl text-platinum">
                            {leader.name.split(" ").map(n => n[0]).join("")}
                          </span>
                        </div>
                        <h3 className="font-luxury text-2xl font-semibold text-foreground">
                          {leader.name}
                        </h3>
                        <p className="font-modern text-platinum text-sm tracking-wide uppercase mt-1">
                          {leader.role}
                        </p>
                        <p className="font-modern text-muted-foreground text-sm mt-2">
                          {leader.tagline}
                        </p>
                      </div>

                      {leader.linkedin && (
                        <a
                          href={leader.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-platinum transition-colors duration-300 mt-auto"
                        >
                          <Linkedin className="w-4 h-4" />
                          Connect on LinkedIn
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Bio & Details */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="space-y-4">
                      {leader.bio.map((paragraph, i) => (
                        <p key={i} className="font-modern text-muted-foreground leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {leader.philosophy && (
                      <div className="border-l-2 border-platinum/40 pl-6 py-2">
                        <p className="font-luxury text-platinum/90 italic">
                          "{leader.philosophy}"
                        </p>
                      </div>
                    )}

                    {/* Expertise Tags */}
                    <div className="pt-4">
                      <p className="font-modern text-xs text-muted-foreground uppercase tracking-wider mb-3">
                        Areas of Expertise
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {leader.expertise.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1.5 text-xs font-modern text-platinum/80 border border-platinum/20 rounded-full bg-platinum/5"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    {leader.achievements && (
                      <div className="pt-4 border-t border-border/30">
                        <div className="grid grid-cols-2 gap-6">
                          {leader.achievements.map((achievement) => (
                            <div key={achievement.label}>
                              <p className="font-luxury text-2xl text-platinum">
                                {achievement.metric}
                              </p>
                              <p className="font-modern text-xs text-muted-foreground">
                                {achievement.label}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ValuesSection() {
  return (
    <section className="py-24 lg:py-32 border-t border-border/30">
      <div className="container mx-auto px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Values"
          title="Principles That Guide Us"
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {companyValues.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <value.icon className="w-10 h-10 text-platinum mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="font-luxury text-xl font-semibold text-foreground mb-3">
                {value.title}
              </h3>
              <p className="font-modern text-sm text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
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
            Ready to Begin?
          </p>
          <h2 className="font-luxury text-3xl md:text-4xl font-semibold text-foreground mb-8">
            Let's Build Your <span className="text-platinum-gradient">Intelligence Layer</span>
          </h2>
          <Link to="/contact">
            <LuxuryButton variant="platinum" size="lg">
              Book a Strategy Call
              <ArrowRight className="ml-2 h-5 w-5" />
            </LuxuryButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <PageLayout>
      <SEOHead
        title="About ChroniqAI - Vedansh Pandey & Abhay Rawat | Leadership"
        description="Meet the founders of ChroniqAI: Vedansh Pandey (CEO) and Abhay Rawat (Co-Founder & Creator of IRONMAN System). Building autonomous AI infrastructure for revenue, authority, and visibility."
        canonical="https://chroniqai.com/about"
        keywords="Vedansh Pandey, Abhay Rawat, ChroniqAI founders, IRONMAN System, AI automation founders, revenue systems architect, ChroniqAI leadership"
      />
      <PersonSchema
        id="vedansh-pandey"
        name="Vedansh Pandey"
        jobTitle="Founder & CEO"
        description="Vedansh Pandey is the visionary founder and CEO of ChroniqAI, leading the company's mission to transform how businesses leverage artificial intelligence for revenue growth."
        expertise={["AI Strategy", "Revenue Automation", "Business Scaling", "Systems Architecture"]}
        linkedIn="https://www.linkedin.com/in/vedansh-pandey"
      />
      <PersonSchema
        id="abhay-rawat"
        name="Abhay Rawat"
        jobTitle="Co-Founder & Revenue Systems Architect"
        description="Abhay Rawat is Co-Founder of ChroniqAI and creator of the IRONMAN System—an AI-powered acquisition framework that transforms how high-ticket businesses acquire clients through Speed-to-Lead automation."
        expertise={["Speed-to-Lead Automation", "AI Agents for SMBs", "Sales Pipeline Optimization", "Backend Systems", "IRONMAN System"]}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://chroniqai.com" },
          { name: "About", url: "https://chroniqai.com/about" }
        ]}
      />
      <HeroSection />
      <MissionSection />
      <LeadershipSection />
      <ValuesSection />
      <CTASection />
    </PageLayout>
  );
}
