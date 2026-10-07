import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import CaseStudies from "./pages/CaseStudies";
import HowWeThink from "./pages/HowWeThink";
import ScoreCalculatorPage from "./pages/ScoreCalculatorPage";
import Resources from "./pages/Resources";
import EngineeringJournal from "./pages/EngineeringJournal";
import IronmanPlatform from "./pages/IronmanPlatform";
import ScaleMetricsCaseStudy from "./pages/case-studies/ScaleMetricsCaseStudy";
import CybersecurityCaseStudy from "./pages/case-studies/CybersecurityCaseStudy";
import AiSaasCaseStudy from "./pages/case-studies/AiSaasCaseStudy";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ironman" element={<IronmanPlatform />} />
          <Route path="/platform" element={<Navigate to="/ironman" replace />} />
          <Route path="/solutions" element={<Navigate to="/ironman" replace />} />
          <Route path="/modules" element={<Navigate to="/ironman" replace />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-studies/scalemetrics-devops" element={<ScaleMetricsCaseStudy />} />
          <Route path="/case-studies/cybersecurity-enterprise" element={<CybersecurityCaseStudy />} />
          <Route path="/case-studies/ai-saas-platform" element={<AiSaasCaseStudy />} />
          <Route path="/how-we-think" element={<HowWeThink />} />
          <Route path="/score-calculator" element={<ScoreCalculatorPage />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/journal" element={<EngineeringJournal />} />
          <Route path="/engineering-journal" element={<EngineeringJournal />} />

          {/* Removed guides and changelog routes redirected cleanly */}
          <Route path="/guides" element={<Navigate to="/" replace />} />
          <Route path="/guides/*" element={<Navigate to="/" replace />} />
          <Route path="/changelog" element={<Navigate to="/" replace />} />

          {/* Compatibility and redirect routes */}
          <Route path="/automation" element={<Navigate to="/ironman" replace />} />
          <Route path="/branding" element={<Navigate to="/ironman" replace />} />
          <Route path="/seo" element={<Navigate to="/ironman" replace />} />
          <Route path="/philosophy" element={<Navigate to="/how-we-think" replace />} />
          <Route path="/about" element={<Navigate to="/how-we-think" replace />} />
          <Route path="/contact" element={<Navigate to="/score-calculator" replace />} />

          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          {/* CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
