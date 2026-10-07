import { useState, useEffect } from "react";
import { Activity, ArrowUpRight, Calendar, CheckCircle2, Eye, EyeOff, MessageSquare, RefreshCw, TrendingUp } from "lucide-react";

interface InteractiveIronmanDashboardProps {
  compact?: boolean;
}

const initialFeed = [
  { id: 1, time: "Just now", type: "Meeting Booked", text: "VP Engineering at ScaleTech ($42k ARR)", status: "Success" },
  { id: 2, time: "2m ago", type: "Buyer Intent Signal", text: "CTO at Enterprise Cloud expanding sales leadership", status: "Detected" },
  { id: 3, time: "5m ago", type: "Positive Reply", text: "Chief Revenue Officer requested calendar link for demo", status: "Active" },
  { id: 4, time: "8m ago", type: "Account Researched", text: "Executive priorities extracted for FinTech Corp", status: "Researched" },
  { id: 5, time: "12m ago", type: "CRM Sync Complete", text: "HubSpot pipeline updated with confirmed meeting attribution", status: "Synced" },
];

export function InteractiveIronmanDashboard({ compact = false }: InteractiveIronmanDashboardProps) {
  const [isDataBlurred, setIsDataBlurred] = useState(false);
  const [liveMetrics, setLiveMetrics] = useState({
    todayMeetings: 12,
    positiveReplies: 41,
    pipelineGenerated: 138000,
    replyRate: 18.4,
  });

  // Subtle live pulse effect
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics((prev) => ({
        ...prev,
        positiveReplies: prev.positiveReplies + (Math.random() > 0.6 ? 1 : 0),
        pipelineGenerated: prev.pipelineGenerated + (Math.random() > 0.8 ? 2500 : 0),
      }));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full rounded-2xl border border-glass-border bg-card/90 shadow-2xl backdrop-blur-xl overflow-hidden text-left relative">
      {/* Dashboard Top Header Bar */}
      <div className="p-4 md:p-5 border-b border-border/60 bg-secondary/40 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              IRONMAN™ OS Live
            </span>
          </div>
          <span className="hidden sm:inline-block text-border">|</span>
          <span className="hidden sm:inline-block font-mono text-xs text-muted-foreground">
            Tenant: Enterprise-Alpha
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
            <span className="text-[11px] font-mono hidden xs:inline">
              {isDataBlurred ? "Data Blurred" : "Blur Data"}
            </span>
          </button>

          <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[11px] font-semibold">
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
          <div className="pb-3 text-[11px] font-mono text-muted-foreground flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Updates
          </div>
        </div>
      )}

      {/* Main Stats Grid */}
      <div className="p-5 md:p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {/* Today's Meetings */}
          <div className="p-4 rounded-xl bg-secondary/30 border border-border/50 relative overflow-hidden group hover:border-primary/40 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground font-medium">Today&apos;s Meetings</span>
              <Calendar size={16} className="text-platinum-glow" />
            </div>
            <div className={`text-2xl md:text-3xl font-luxury font-bold text-white ${isDataBlurred ? "blur-sm select-none" : ""}`}>
              {liveMetrics.todayMeetings}
            </div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-mono">
              <ArrowUpRight size={12} /> +3 booked today
            </div>
          </div>

          {/* Positive Replies */}
          <div className="p-4 rounded-xl bg-secondary/30 border border-border/50 relative overflow-hidden group hover:border-primary/40 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground font-medium">Positive Replies</span>
              <MessageSquare size={16} className="text-platinum-glow" />
            </div>
            <div className={`text-2xl md:text-3xl font-luxury font-bold text-white ${isDataBlurred ? "blur-sm select-none" : ""}`}>
              {liveMetrics.positiveReplies}
            </div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-mono">
              <TrendingUp size={12} /> {liveMetrics.replyRate}% reply rate
            </div>
          </div>

          {/* Pipeline Generated */}
          <div className="p-4 rounded-xl bg-secondary/30 border border-border/50 relative overflow-hidden group hover:border-primary/40 transition-colors col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground font-medium">Pipeline Value</span>
              <TrendingUp size={16} className="text-platinum-glow" />
            </div>
            <div className={`text-2xl md:text-3xl font-luxury font-bold text-platinum-gradient ${isDataBlurred ? "blur-sm select-none" : ""}`}>
              ${liveMetrics.pipelineGenerated.toLocaleString()}
            </div>
            <div className="text-[11px] text-platinum flex items-center gap-1 mt-1 font-mono">
              Qualified B2B Pipeline
            </div>
          </div>

          {/* Campaign Status */}
          <div className="p-4 rounded-xl bg-secondary/30 border border-border/50 relative overflow-hidden group hover:border-primary/40 transition-colors col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground font-medium">System Status</span>
              <RefreshCw size={16} className="text-emerald-400 animate-spin" style={{ animationDuration: "12s" }} />
            </div>
            <div className="text-xl md:text-2xl font-luxury font-bold text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Active
            </div>
            <div className="text-[11px] text-muted-foreground flex items-center gap-1 mt-1 font-mono">
              Outbound Running
            </div>
          </div>
        </div>

        {/* Live Activity Feed Content */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-background/50 border border-border/40">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                <Activity size={14} className="text-platinum-glow" />
                Live Outbound Activity Stream
              </span>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                Auto-synced
              </span>
            </div>

            <div className="space-y-2">
              {initialFeed.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-lg bg-secondary/20 border border-border/30 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                    <span className={`font-medium text-foreground truncate ${isDataBlurred ? "blur-xs select-none" : ""}`}>
                      {item.text}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 font-mono text-[11px] text-muted-foreground">
                    <span className="px-2 py-0.5 rounded bg-secondary text-platinum">
                      {item.type}
                    </span>
                    <span>{item.time}</span>
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
