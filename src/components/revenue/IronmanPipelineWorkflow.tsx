import { useState } from "react";
import { motion } from "framer-motion";
import { Database, Bot, Sparkles, Send, RefreshCw, CalendarCheck, BarChart3, CheckCircle2, ArrowRight } from "lucide-react";

const workflowNodes = [
  {
    id: "prospect",
    title: "Prospecting",
    subtitle: "Signal Intent Engine",
    icon: Database,
    description: "Identifies hyper-targeted B2B accounts matching exact ICP signals and active buying triggers.",
    metric: "4,200 ICP prospects/wk",
  },
  {
    id: "research",
    title: "AI Research",
    subtitle: "Deep Intelligence",
    icon: Bot,
    description: "Reviews executive interviews, company announcements, funding updates, and key business priorities.",
    metric: "100% automated research",
  },
  {
    id: "personalization",
    title: "Personalization",
    subtitle: "Executive Voice",
    icon: Sparkles,
    description: "Generates bespoke 1-to-1 executive messaging crafted in the founder's authentic tone.",
    metric: "18.4% average reply rate",
  },
  {
    id: "outreach",
    title: "Multi-Channel",
    subtitle: "Email & LinkedIn",
    icon: Send,
    description: "Coordinates cold email infrastructure and LinkedIn executive touchpoints without spam.",
    metric: "99% deliverability rate",
  },
  {
    id: "followup",
    title: "Follow-Up",
    subtitle: "Conversation Engine",
    icon: RefreshCw,
    description: "Contextual follow-ups that address questions intelligently and keep deals warm.",
    metric: "Zero manual SDR effort",
  },
  {
    id: "crm",
    title: "CRM & Calendar",
    subtitle: "HubSpot / Salesforce",
    icon: CalendarCheck,
    description: "Automatically qualifies positive replies and places confirmed meetings directly on AE calendars.",
    metric: "12+ meetings/wk",
  },
  {
    id: "dashboard",
    title: "Reporting",
    subtitle: "Real-Time Pipeline",
    icon: BarChart3,
    description: "Full attribution tracking, response analytics, and campaign health dashboards.",
    metric: "$138k pipeline/mo",
  },
];

export function IronmanPipelineWorkflow() {
  const [selectedNode, setSelectedNode] = useState(workflowNodes[0]);

  return (
    <div className="w-full rounded-2xl border border-glass-border bg-card/90 p-6 md:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
      <div className="mb-8">
        <div className="text-xs font-mono text-platinum mb-2 uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          The Outbound Pipeline Workflow
        </div>
        <h3 className="text-2xl md:text-3xl font-luxury text-white">
          How the IRONMAN™ Outbound System Operates
        </h3>
        <p className="text-muted-foreground text-sm mt-1 max-w-xl">
          Not agency retainer work. A repeatable, automated platform connecting every step of lead discovery, personalization, and meeting placement.
        </p>
      </div>

      {/* Horizontal Interactive Pipeline Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 mb-8">
        {workflowNodes.map((node, idx) => {
          const Icon = node.icon;
          const isSelected = selectedNode.id === node.id;
          return (
            <button
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={`p-3 rounded-xl border text-left transition-all duration-200 relative group ${
                isSelected
                  ? "bg-primary/10 border-primary text-white shadow-lg shadow-primary/10"
                  : "bg-secondary/30 border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon size={18} className={isSelected ? "text-platinum-glow" : "text-muted-foreground"} />
                <span className="text-[10px] font-mono text-muted-foreground/60">0{idx + 1}</span>
              </div>
              <div className="text-xs font-semibold truncate">{node.title}</div>
              <div className="text-[10px] text-muted-foreground/80 truncate">{node.subtitle}</div>

              {isSelected && (
                <motion.div
                  layoutId="activeGlow"
                  className="absolute inset-0 rounded-xl border-2 border-primary pointer-events-none"
                  transition={{ duration: 0.2 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Node Detail Spotlight */}
      <div className="p-6 rounded-xl bg-secondary/40 border border-glass-border relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-platinum-glow">
              <selectedNode.icon size={24} />
            </div>
            <div>
              <span className="text-xs font-mono text-platinum uppercase tracking-wider">
                Pipeline Stage
              </span>
              <h4 className="text-xl font-semibold text-white">
                {selectedNode.title} — {selectedNode.subtitle}
              </h4>
            </div>
          </div>

          <div className="px-3.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-semibold self-start md:self-auto">
            {selectedNode.metric}
          </div>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed mb-4 max-w-2xl">
          {selectedNode.description}
        </p>

        <div className="flex items-center gap-2 text-xs text-foreground/90 font-mono">
          <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
          <span>Fully integrated into IRONMAN Outbound & Operations Modules</span>
        </div>
      </div>
    </div>
  );
}
