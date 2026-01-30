import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";

const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect information necessary to provide our services effectively:

**Information You Provide:**
• Contact details (name, email, phone number, company name)
• Business information shared during consultations
• Communication records (emails, meeting notes)
• Payment and billing information

**Automatically Collected:**
• Website usage data (pages visited, time spent, interactions)
• Device and browser information
• IP address and approximate location
• Referral source

We do not collect sensitive personal information unless explicitly required for service delivery.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `Your information is used exclusively for:

• Providing and improving our AI infrastructure services
• Communicating about projects, updates, and inquiries
• Processing payments and maintaining financial records
• Analyzing service performance and client satisfaction
• Complying with legal obligations
• Protecting our rights and preventing fraud

We never sell, rent, or trade your personal information to third parties for marketing purposes.`,
  },
  {
    title: "3. Data Security",
    content: `Security is fundamental to our infrastructure:

• All data transmissions are encrypted using TLS 1.3
• Client systems are isolated and access-controlled
• We employ industry-standard security practices
• Regular security audits and vulnerability assessments
• Employee access is role-based and logged
• Incident response procedures are in place

While we implement robust security measures, no system is completely impervious. We promptly notify affected parties of any data breach as required by law.`,
  },
  {
    title: "4. Data Retention",
    content: `We retain information only as long as necessary:

• Active client data: Duration of engagement plus 7 years for legal/tax purposes
• Prospective client inquiries: 2 years unless consent is renewed
• Website analytics: 26 months
• Financial records: As required by applicable law

You may request deletion of your personal data, subject to legal retention requirements.`,
  },
  {
    title: "5. Third-Party Services",
    content: `We use carefully selected third-party services:

• Cloud infrastructure providers for hosting and computation
• Payment processors for secure transactions
• Analytics tools for website performance
• Communication platforms for client interactions

All third-party providers are vetted for security and privacy compliance. We maintain data processing agreements with all providers handling personal data.`,
  },
  {
    title: "6. Your Rights",
    content: `Depending on your jurisdiction, you may have the right to:

• Access the personal data we hold about you
• Correct inaccurate information
• Delete your personal data (subject to legal requirements)
• Restrict or object to certain processing
• Data portability (receive your data in a structured format)
• Withdraw consent where processing is consent-based

To exercise these rights, contact us at privacy@chroniqai.com.`,
  },
  {
    title: "7. Cookies and Tracking",
    content: `Our website uses cookies for:

• Essential functionality (session management, security)
• Analytics (understanding how visitors use our site)
• Preference storage (remembering your choices)

You can control cookies through your browser settings. Disabling cookies may affect website functionality.`,
  },
  {
    title: "8. International Data Transfers",
    content: `As a global service provider, data may be transferred to and processed in countries outside your residence. We ensure appropriate safeguards are in place, including:

• Standard contractual clauses approved by relevant authorities
• Data processing agreements with all international providers
• Adherence to applicable data protection frameworks`,
  },
  {
    title: "9. Children's Privacy",
    content: `Our services are designed for businesses and are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children.`,
  },
  {
    title: "10. Changes to This Policy",
    content: `We may update this privacy policy to reflect changes in our practices or legal requirements. Material changes will be communicated via email to active clients and posted on our website with an updated effective date.`,
  },
];

export default function Privacy() {
  return (
    <PageLayout>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <p className="font-luxury text-sm text-platinum/70 tracking-[0.3em] uppercase mb-6 text-center">
              Legal
            </p>
            <h1 className="font-luxury text-4xl md:text-5xl font-semibold text-foreground leading-tight mb-6 text-center">
              Privacy Policy
            </h1>
            <p className="font-modern text-muted-foreground text-center mb-4">
              Last updated: January 2026
            </p>
            <p className="font-modern text-muted-foreground text-center max-w-2xl mx-auto">
              Your privacy is fundamental to how we operate. This policy explains how 
              ChroniqAI collects, uses, and protects your information.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-12"
            >
              {sections.map((section) => (
                <div key={section.title} className="space-y-4">
                  <h2 className="font-luxury text-xl font-semibold text-foreground">
                    {section.title}
                  </h2>
                  <div className="font-modern text-muted-foreground leading-relaxed whitespace-pre-line prose prose-invert prose-sm max-w-none">
                    {section.content}
                  </div>
                </div>
              ))}

              <div className="pt-8 border-t border-border/30 space-y-4">
                <h2 className="font-luxury text-xl font-semibold text-foreground">
                  Contact Us
                </h2>
                <p className="font-modern text-muted-foreground">
                  For privacy-related inquiries or to exercise your rights:
                </p>
                <div className="font-modern text-muted-foreground">
                  <p>Email: <a href="mailto:privacy@chroniqai.com" className="text-platinum hover:underline">privacy@chroniqai.com</a></p>
                  <p>Address: Delhi, India</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
