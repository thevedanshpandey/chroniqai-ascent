import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing and using ChroniqAI's services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services.

These terms apply to all users, clients, and others who access or use our services, including AI automation infrastructure, branding systems, and SEO optimization platforms.`,
  },
  {
    title: "2. Description of Services",
    content: `ChroniqAI provides infrastructure-grade AI systems including but not limited to:

• AI Automation Infrastructure for lead qualification, appointment booking, and customer operations
• AI Identity & Presence Infrastructure for autonomous founder branding
• AI Knowledge & Visibility Infrastructure for AI-native SEO optimization

Our services are designed for businesses seeking to implement intelligent automation systems. Specific deliverables, timelines, and scope are defined in individual service agreements.`,
  },
  {
    title: "3. Client Responsibilities",
    content: `Clients engaging our services agree to:

• Provide accurate and complete information necessary for project execution
• Maintain timely communication and feedback during implementation
• Ensure proper authorization to share business data and access credentials
• Comply with all applicable laws regarding data use and business operations
• Not misuse our systems for illegal, fraudulent, or harmful purposes`,
  },
  {
    title: "4. Intellectual Property",
    content: `Upon full payment, clients receive ownership of custom-built systems and deliverables as specified in their service agreement. ChroniqAI retains ownership of:

• Proprietary methodologies, frameworks, and processes (including the IRONMAN System)
• Pre-existing tools, libraries, and code modules
• General knowledge and expertise developed during engagements

We may reference completed projects in our portfolio unless otherwise agreed in writing.`,
  },
  {
    title: "5. Confidentiality",
    content: `Both parties agree to maintain strict confidentiality regarding:

• Business strategies, processes, and proprietary information
• Technical specifications and system architectures
• Financial terms and pricing arrangements
• Any information marked or reasonably understood to be confidential

This obligation survives the termination of any service agreement.`,
  },
  {
    title: "6. Payment Terms",
    content: `Payment terms are established in individual service agreements. General policies include:

• Invoices are due within the timeframe specified in your agreement
• Late payments may incur additional fees and service suspension
• All fees are non-refundable unless otherwise stated
• Prices are subject to change with 30 days notice for ongoing services`,
  },
  {
    title: "7. Limitation of Liability",
    content: `ChroniqAI provides services "as is" and makes no guarantees regarding specific business outcomes, revenue increases, or performance metrics. Our liability is limited to the fees paid for services.

We are not liable for indirect, incidental, special, consequential, or punitive damages arising from use of our services, including loss of profits, data, or business opportunities.`,
  },
  {
    title: "8. Termination",
    content: `Either party may terminate services according to terms specified in the service agreement. Upon termination:

• Client receives all completed deliverables paid for
• Access to ChroniqAI systems and tools may be revoked
• Outstanding invoices become immediately due
• Confidentiality obligations remain in effect`,
  },
  {
    title: "9. Governing Law",
    content: `These terms are governed by the laws of India. Any disputes arising from these terms or our services shall be resolved through arbitration in Delhi, India, unless otherwise agreed in writing.`,
  },
  {
    title: "10. Changes to Terms",
    content: `We reserve the right to modify these terms at any time. Material changes will be communicated to active clients via email. Continued use of services after changes constitutes acceptance of modified terms.`,
  },
];

export default function Terms() {
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
              Terms of Service
            </h1>
            <p className="font-modern text-muted-foreground text-center mb-4">
              Last updated: January 2026
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
              {sections.map((section, index) => (
                <div key={section.title} className="space-y-4">
                  <h2 className="font-luxury text-xl font-semibold text-foreground">
                    {section.title}
                  </h2>
                  <div className="font-modern text-muted-foreground leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              ))}

              <div className="pt-8 border-t border-border/30">
                <p className="font-modern text-sm text-muted-foreground">
                  Questions about these terms? Contact us at{" "}
                  <a href="mailto:legal@chroniqai.com" className="text-platinum hover:underline">
                    legal@chroniqai.com
                  </a>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
