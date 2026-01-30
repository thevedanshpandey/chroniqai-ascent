import { Link } from "react-router-dom";

const footerLinks = {
  infrastructure: [
    { name: "AI Automation", href: "/automation" },
    { name: "AI Branding", href: "/branding" },
    { name: "AI SEO", href: "/seo" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Philosophy", href: "/philosophy" },
    { name: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="font-luxury text-2xl font-semibold text-foreground">
                Chroniq<span className="text-platinum-gradient">AI</span>
              </span>
            </Link>
            <p className="font-modern text-muted-foreground text-sm leading-relaxed max-w-sm mb-4">
              Infrastructure-grade AI systems powering automation, authority, and AI-native visibility.
            </p>
            <p className="font-luxury text-sm text-platinum italic">
              Automate. Scale. Dominate.
            </p>
          </div>

          {/* Infrastructure Links */}
          <div>
            <h4 className="font-modern text-sm font-semibold text-foreground mb-4 tracking-wide uppercase">
              Infrastructure
            </h4>
            <ul className="space-y-3">
              {footerLinks.infrastructure.map((link) => (
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

          {/* Company Links */}
          <div>
            <h4 className="font-modern text-sm font-semibold text-foreground mb-4 tracking-wide uppercase">
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
            © {new Date().getFullYear()} ChroniqAI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="font-modern text-xs text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="font-modern text-xs text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
