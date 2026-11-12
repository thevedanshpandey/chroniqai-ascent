import { Link } from "react-router-dom";
import { BRAND_ASSETS } from "@/lib/brandAssets";

const footerLinks = {
  platform: [
    { name: "Gravity by Chroniq", href: "/gravity" },
    { name: "System Pillars", href: "/#system-pillars" },
    { name: "Why Gravity", href: "/gravity#why-gravity" },
    { name: "How It Works", href: "/gravity#how-it-works" },
  ],
  company: [
    { name: "Resources & Playbooks", href: "/resources" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "How We Think", href: "/how-we-think" },
    { name: "Score Calculator", href: "/score-calculator" },
    { name: "Engineering Journal", href: "/journal" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background text-left">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <img
                src={BRAND_ASSETS.footerLogo}
                alt="ChroniqAI"
                className="h-8 sm:h-9 w-auto object-contain shrink-0"
              />
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-secondary border border-primary/20 text-platinum shrink-0">
                Gravity
              </span>
            </Link>
            <p className="font-modern text-muted-foreground text-sm leading-relaxed max-w-md">
              ChroniqAI Gravity — AI-Powered LinkedIn Client Acquisition for High-Ticket B2B Founders.
            </p>
            <p className="font-luxury text-sm text-platinum italic font-medium tracking-wide">
              &ldquo;Stop chasing clients. Let them fall into your calendar.&rdquo;
            </p>
          </div>

          {/* Gravity System */}
          <div>
            <h4 className="font-modern text-xs font-semibold text-white mb-4 tracking-wider uppercase">
              System
            </h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-modern text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-modern text-xs font-semibold text-white mb-4 tracking-wider uppercase">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="font-modern text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-modern text-xs text-muted-foreground">
            © {new Date().getFullYear()} ChroniqAI Inc. All rights reserved. ChroniqAI Gravity.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="font-modern text-xs text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="font-modern text-xs text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
