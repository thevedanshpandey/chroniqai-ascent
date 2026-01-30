import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { Linkedin, ExternalLink } from "lucide-react";

const leaders = [
  {
    name: "Vedansh Pandey",
    role: "Founder & CEO",
    description:
      "AI Automation & Solutions specialist driving 5-10X growth for businesses. Co-Founder of 1stRankQ, focused on solving complex business problems through intelligent automation infrastructure.",
    focus: ["AI Automation", "Business Scaling", "Revenue Systems"],
    linkedin: "https://www.linkedin.com/in/vedansh-pandey",
  },
  {
    name: "Abhay Rawat",
    role: "Architect, IRONMAN System",
    description:
      "Revenue Systems Architect specializing in helping high-ticket agency owners and coaches automate client acquisition to build predictable sales pipelines. Creator of the IRONMAN System—an AI-powered acquisition framework that books sales-ready meetings on autopilot.",
    focus: ["Speed-to-Lead Automation", "AI Agents for SMBs", "Backend Systems"],
    philosophy:
      "Moving founders from 'owner-operator' burnout to true business ownership through intelligent automation.",
  },
];

export function LeadershipSection() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute left-0 top-1/3 w-[500px] h-[500px] bg-platinum/3 blur-[150px] rounded-full" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="Leadership"
          title="The Architects Behind ChroniqAI"
          description="Visionaries building the intelligence layer for modern enterprises."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {leaders.map((leader, index) => (
            <GlassCard key={leader.name} delay={index * 0.15} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col h-full"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="font-luxury text-2xl font-semibold text-foreground mb-1">
                      {leader.name}
                    </h3>
                    <p className="font-modern text-sm text-platinum tracking-wide uppercase">
                      {leader.role}
                    </p>
                  </div>
                  {leader.linkedin && (
                    <a
                      href={leader.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-platinum transition-colors duration-300"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                </div>

                {/* Description */}
                <p className="font-modern text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                  {leader.description}
                </p>

                {/* Philosophy Quote (if exists) */}
                {leader.philosophy && (
                  <div className="border-l-2 border-platinum/40 pl-4 mb-6">
                    <p className="font-luxury text-sm text-platinum/80 italic">
                      "{leader.philosophy}"
                    </p>
                  </div>
                )}

                {/* Focus Areas */}
                <div className="flex flex-wrap gap-2">
                  {leader.focus.map((area) => (
                    <span
                      key={area}
                      className="px-3 py-1 text-xs font-modern text-platinum/70 border border-platinum/20 rounded-full bg-platinum/5"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </motion.div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
