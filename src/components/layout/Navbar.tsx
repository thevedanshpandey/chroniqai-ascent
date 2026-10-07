import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { AuditModal } from "@/components/modals/AuditModal";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "IRONMAN™ Outbound", href: "/ironman" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "How We Think", href: "/how-we-think" },
  { name: "Score Calculator", href: "/score-calculator" },
  { name: "Research", href: "/resources" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          isScrolled
            ? "bg-background/85 backdrop-blur-xl border-b border-border/50 shadow-lg"
            : "bg-transparent"
        )}
      >
        <nav className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <span className="font-luxury text-2xl font-semibold text-white tracking-wide group-hover:text-platinum-gradient transition-colors duration-300">
                Chroniq<span className="text-platinum-gradient">AI</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "font-modern text-sm tracking-wide animated-underline transition-colors duration-300",
                    location.pathname === link.href
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <LuxuryButton
                variant="platinum"
                size="sm"
                onClick={() => setIsAuditModalOpen(true)}
                className="flex items-center gap-2"
              >
                <span>Get Free Audit</span>
                <ArrowRight size={14} />
              </LuxuryButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-foreground"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border"
            >
              <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "font-modern text-base py-2 transition-colors duration-300",
                      location.pathname === link.href
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
                <LuxuryButton
                  variant="platinum"
                  size="default"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAuditModalOpen(true);
                  }}
                  className="mt-4 w-full flex items-center justify-center gap-2"
                >
                  <span>Get Free Revenue System Audit</span>
                  <ArrowRight size={16} />
                </LuxuryButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
      />
    </>
  );
}
