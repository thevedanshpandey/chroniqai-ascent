import { useState, useEffect } from "react";
import { Activity, ArrowUpRight, Calendar, CheckCircle2, Eye, EyeOff, MessageSquare, RefreshCw, TrendingUp } from "lucide-react";

interface InteractiveGravityDashboardProps {
  compact?: boolean;
}

const initialFeed = [
  { id: 1, time: "Just now", type: "Meeting Booked", text: "VP Engineering at ScaleTech ($42k deal) • LinkedIn Meeting", status: "Success" },
  { id: 2, time: "3m ago", type: "Conversation Started", text: "CTO at Enterprise Cloud replied to personalized message", status: "Active" },
  { id: 3, time: "7m ago", type: "Sales-Ready Call", text: "Managing Director confirmed calendar booking for Thursday", status: "Confirmed" },
  { id: 4, time: "11m ago", type: "Account Safety Check", text: "Daily pacing limit active • LinkedIn account safety 100%", status: "Protected" },
  { id: 5, time: "16m ago", type: "Target Lead Verified", text: "Added 24 verified founders matching high-ticket ICP", status: "Enriched" },
];

export function InteractiveGravityDashboard({ compact = false }: InteractiveGravityDashboardProps) {
  const [isDataBlurred, setIsDataBlurred] = useState(false);
  const [liveMetrics, setLiveMetrics] = useState({
    todayMeetings: 8,
    positiveReplies: 34,
    pipelineGenerated: 145000,
    replyRate: 21.6,
  });

  // Subtle live pulse effect
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics((prev) => ({
        ...prev,
        positiveReplies: prev.positiveReplies + (Math.random() > 0.7 ? 1 : 0),
        pipelineGenerated: prev.pipelineGenerated + (Math.random() > 0.85 ? 2500 : 0),
      }));
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full rounded-2xl border border-glass-border bg-card/90 shadow-2xl backdrop-blur-xl overflow-hidden text-left relative">
      {/* Dashboard Top Header Bar */}
      <div className="p-4 md:p-5 border-b border-border/60 bg-secondary/40 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Gravity OS
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono">
              Demo view
            </span>
          </div>
          <span className="hidden sm:inline-block text-border">|</span>
          <span className="hidden sm:inline-block font-mono text-xs text-platinum/90 font-medium">
            Demo Account
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Privacy Blur Toggle */}
          <button
            onClick={() => setIsDataBlurred(!isDataBlurred)}
            className="px-2.5 py-1 rounded-md bg-secondary border border-border text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
            title="Toggle client privacy blurring"
          >
            {isDataBlurred ? <EyeOff size={13} /> : <Eye size={13} />}
            <span className="text-xs font-mono hidden xs:inline">
              {isDataBlurred ? "Data Blurred" : "Blur Data"}
            </span>
          </button>

          <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-semibold">
            Status: Active
          </span>
        </div>
      </div>

      {/* Control Tabs: Single Live Activity Feed */}
      {!compact && (
        <div className="px-5 pt-3 border-b border-border/40 flex items-center justify-between text-xs font-medium">
          <div className="pb-3 border-b-2 border-primary text-white flex items-center gap-2 font-medium">
            <Activity size={14} className="text-emerald-400" /> Live Activity Feed
          </div>
          <div className="pb-3 text-xs font-mono text-platinum/80 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Updates
          </div>
        </div>
      )}

      {/* Main Stats Grid */}
      <div className="p-5 md:p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {/* Today's Meetings */}
          <div className="p-4 rounded-xl bg-secondary/40 border border-border/60 relative overflow-hidden group hover:border-primary/40 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-foreground/80 font-medium">Today&apos;s Meetings</span>
              <Calendar size={16} className="text-platinum-glow" />
            </div>
            <div className={`text-2xl sm:text-3xl font-luxury font-bold text-white ${isDataBlurred ? "blur-sm select-none" : ""}`}>
              {liveMetrics.todayMeetings}
            </div>
            <div className="text-xs text-emerald-400 flex items-center gap-1 mt-1.5 font-mono font-medium">
              <ArrowUpRight size={12} /> +2 booked today
            </div>
          </div>

          {/* Positive Replies */}
          <div className="p-4 rounded-xl bg-secondary/40 border border-border/60 relative overflow-hidden group hover:border-primary/40 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-foreground/80 font-medium">Active Conversations</span>
              <MessageSquare size={16} className="text-platinum-glow" />
            </div>
            <div className={`text-2xl sm:text-3xl font-luxury font-bold text-white ${isDataBlurred ? "blur-sm select-none" : ""}`}>
              {liveMetrics.positiveReplies}
            </div>
            <div className="text-xs text-emerald-400 flex items-center gap-1 mt-1.5 font-mono font-medium">
              <TrendingUp size={12} /> Qualified responses
            </div>
          </div>

          {/* Pipeline Generated - Font sized properly to never cut off */}
          <div className="p-4 rounded-xl bg-secondary/40 border border-border/60 relative overflow-hidden group hover:border-primary/40 transition-colors col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-foreground/80 font-medium">Pipeline Value</span>
              <TrendingUp size={16} className="text-platinum-glow" />
            </div>
            <div className={`text-xl sm:text-2xl font-luxury font-bold text-platinum-gradient truncate ${isDataBlurred ? "blur-sm select-none" : ""}`}>
              ${liveMetrics.pipelineGenerated.toLocaleString()}
            </div>
            <div className="text-xs text-platinum/90 flex items-center gap-1 mt-1.5 font-mono font-medium">
              Qualified B2B Pipeline
            </div>
          </div>

          {/* System Status */}
          <div className="p-4 rounded-xl bg-secondary/40 border border-border/60 relative overflow-hidden group hover:border-primary/40 transition-colors col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-foreground/80 font-medium">System Status</span>
              <RefreshCw size={16} className="text-emerald-400 animate-spin" style={{ animationDuration: "12s" }} />
            </div>
            <div className="text-xl sm:text-2xl font-luxury font-bold text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Active
            </div>
            <div className="text-xs text-platinum/80 flex items-center gap-1 mt-1.5 font-mono font-medium">
              LinkedIn Safety Protected
            </div>
          </div>
        </div>

        {/* Live Activity Feed Content */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-background/60 border border-border/50">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                <Activity size={14} className="text-platinum-glow" />
                Live Client Acquisition Stream
              </span>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-medium">
                Auto-synced
              </span>
            </div>

            <div className="space-y-2.5">
              {initialFeed.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-lg bg-secondary/30 border border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                    <span className={`font-medium text-foreground ${isDataBlurred ? "blur-xs select-none" : ""}`}>
                      {item.text}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 font-mono text-xs text-platinum/80">
                    <span className="px-2 py-0.5 rounded bg-secondary border border-border/50 text-platinum font-semibold">
                      {item.type}
                    </span>
                    <span className="text-muted-foreground">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



