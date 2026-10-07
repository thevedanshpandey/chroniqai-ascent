import { Link } from "react-router-dom";

const footerLinks = {
  platform: [
    { name: "IRONMAN™ Outbound System", href: "/ironman" },
    { name: "Case Studies & Results", href: "/case-studies" },
    { name: "Revenue Score Calculator", href: "/score-calculator" },
  ],
  company: [
    { name: "How We Think", href: "/how-we-think" },
    { name: "Research Lab", href: "/resources" },
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
            <Link to="/" className="inline-block">
              <span className="font-luxury text-2xl font-semibold text-white">
                Chroniq<span className="text-platinum-gradient">AI</span>
              </span>
            </Link>
            <p className="font-modern text-muted-foreground text-sm leading-relaxed max-w-md">
              AI Outbound System for High-Ticket B2B Companies.
            </p>
            <p className="font-luxury text-sm text-platinum italic font-medium tracking-wide">
              &ldquo;Predictable pipeline should be engineered, not hoped for.&rdquo;
            </p>
          </div>

          {/* Outbound Platform */}
          <div>
            <h4 className="font-modern text-xs font-semibold text-white mb-4 tracking-wider uppercase">
              Platform
            </h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
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

          {/* Company */}
          <div>
            <h4 className="font-modern text-xs font-semibold text-white mb-4 tracking-wider uppercase">
              Company
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
            © {new Date().getFullYear()} ChroniqAI Inc. All rights reserved. IRONMAN™ Outbound System.
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
