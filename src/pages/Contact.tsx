import { useState } from "react";
import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SEOHead } from "@/components/seo/SEOHead";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";
import { Send, CheckCircle, MapPin, Mail, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: MapPin,
    title: "Location",
    details: "Delhi, India",
    subtext: "Serving clients globally",
  },
  {
    icon: Mail,
    title: "Email",
    details: "hello@chroniqai.com",
    subtext: "We respond within 24 hours",
  },
  {
    icon: Clock,
    title: "Availability",
    details: "Monday – Friday",
    subtext: "Flexible for global clients",
  },
];

function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[300px] bg-platinum/5 blur-[100px] rounded-full" />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="font-luxury text-sm text-platinum/70 tracking-[0.3em] uppercase mb-6">
            Get in Touch
          </p>
          <h1 className="font-luxury text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight mb-6">
            Let's Build Your{" "}
            <span className="text-platinum-gradient">AI Infrastructure</span>
          </h1>
          <p className="font-modern text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Ready to transform your operations? Share your vision, and we'll architect 
            the intelligence layer to make it reality.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    mobile_number: "",
    company_name: "",
    annual_revenue: "",
    project_description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.full_name.trim() || !formData.email.trim() || !formData.project_description.trim()) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Build form data for submission
      const submitData = new URLSearchParams();
      submitData.append("full_name", formData.full_name.trim());
      submitData.append("email", formData.email.trim());
      
      if (formData.mobile_number.trim()) {
        submitData.append("mobile_number", formData.mobile_number.trim());
      }
      if (formData.company_name.trim()) {
        submitData.append("company_name", formData.company_name.trim());
      }
      // Only send annual_revenue if a valid option is selected
      if (formData.annual_revenue && formData.annual_revenue !== "") {
        submitData.append("annual_revenue", formData.annual_revenue);
      }
      submitData.append("project_description", formData.project_description.trim());

      const response = await fetch("https://chroniqai.com/api/submit-form.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: submitData.toString(),
      });

      const result = await response.json();

      if (result.status === "success") {
        setIsSubmitted(true);
        toast({
          title: "Message Sent",
          description: "Thank you! We'll get back to you shortly.",
        });
        setTimeout(() => {
          setFormData({
            full_name: "",
            email: "",
            mobile_number: "",
            company_name: "",
            annual_revenue: "",
            project_description: "",
          });
          setIsSubmitted(false);
        }, 5000);
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <GlassCard className="h-fit">
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-16 text-center"
        >
          <CheckCircle className="w-20 h-20 text-platinum mb-6" />
          <h3 className="font-luxury text-2xl text-foreground mb-3">
            Message Sent Successfully
          </h3>
          <p className="font-modern text-muted-foreground max-w-sm">
            Thank you for reaching out. Our team will review your inquiry and respond within 24 hours.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="full_name" className="font-modern text-sm text-muted-foreground">
                Full Name *
              </Label>
              <Input
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                className="bg-background/50 border-border/50 focus:border-platinum/50 h-12"
                placeholder="Your name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="font-modern text-sm text-muted-foreground">
                Email Address *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-background/50 border-border/50 focus:border-platinum/50 h-12"
                placeholder="you@company.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobile_number" className="font-modern text-sm text-muted-foreground">
              Mobile Number
            </Label>
            <Input
              id="mobile_number"
              name="mobile_number"
              type="tel"
              value={formData.mobile_number}
              onChange={handleChange}
              className="bg-background/50 border-border/50 focus:border-platinum/50 h-12"
              placeholder="+91 98765 43210"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="company_name" className="font-modern text-sm text-muted-foreground">
                Company Name
              </Label>
              <Input
                id="company_name"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                className="bg-background/50 border-border/50 focus:border-platinum/50 h-12"
                placeholder="Your company"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="annual_revenue" className="font-modern text-sm text-muted-foreground">
                Annual Revenue
              </Label>
              <select
                id="annual_revenue"
                name="annual_revenue"
                value={formData.annual_revenue}
                onChange={handleChange}
                className="w-full h-12 px-3 rounded-md bg-background/50 border border-border/50 focus:border-platinum/50 text-foreground font-modern text-sm focus:outline-none focus:ring-1 focus:ring-platinum/30"
              >
                <option value="">Select range</option>
                <option value="Less than $500K">Less than $500K</option>
                <option value="$500K – $1M">$500K – $1M</option>
                <option value="$1M – $5M">$1M – $5M</option>
                <option value="$5M – $10M">$5M – $10M</option>
                <option value="$10M+">$10M+</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="project_description" className="font-modern text-sm text-muted-foreground">
              Tell Us About Your Project *
            </Label>
            <Textarea
              id="project_description"
              name="project_description"
              value={formData.project_description}
              onChange={handleChange}
              required
              rows={5}
              className="bg-background/50 border-border/50 focus:border-platinum/50 resize-none"
              placeholder="What challenges are you looking to solve? What does success look like?"
            />
          </div>

          <LuxuryButton
            type="submit"
            variant="platinum"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Sending..."
            ) : (
              <>
                Send Message
                <Send className="ml-2 h-5 w-5" />
              </>
            )}
          </LuxuryButton>

          <p className="font-modern text-xs text-muted-foreground text-center">
            By submitting, you agree to our{" "}
            <a href="/privacy" className="text-platinum hover:underline">Privacy Policy</a>
          </p>
        </form>
      )}
    </GlassCard>
  );
}

function ContactSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form - Takes more space */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-luxury text-2xl font-semibold text-foreground mb-2">
                Start the Conversation
              </h2>
              <p className="font-modern text-muted-foreground mb-8">
                Share your challenges and goals. We'll respond with a tailored approach.
              </p>
              <ContactForm />
            </motion.div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-luxury text-2xl font-semibold text-foreground mb-2">
                  Contact Information
                </h2>
                <p className="font-modern text-muted-foreground">
                  Reach out directly or fill out the form.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-platinum/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-platinum" />
                    </div>
                    <div>
                      <p className="font-modern text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        {info.title}
                      </p>
                      <p className="font-luxury text-lg text-foreground">
                        {info.details}
                      </p>
                      <p className="font-modern text-sm text-muted-foreground">
                        {info.subtext}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Trust Signals */}
              <GlassCard className="mt-8">
                <h3 className="font-luxury text-lg font-semibold text-foreground mb-4">
                  What to Expect
                </h3>
                <ul className="space-y-3 font-modern text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-platinum" />
                    Response within 24 hours
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-platinum" />
                    No-obligation consultation
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-platinum" />
                    Tailored strategy discussion
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-platinum" />
                    Complete confidentiality
                  </li>
                </ul>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Contact() {
  return (
    <PageLayout>
      <SEOHead
        title="Contact ChroniqAI - Book a Strategy Call"
        description="Ready to transform your operations with AI infrastructure? Contact ChroniqAI for a no-obligation consultation. We respond within 24 hours."
        canonical="https://chroniqai.com/contact"
        keywords="contact ChroniqAI, AI consultation, strategy call, AI automation inquiry, ChroniqAI contact"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://chroniqai.com" },
          { name: "Contact", url: "https://chroniqai.com/contact" }
        ]}
      />
      <HeroSection />
      <ContactSection />
    </PageLayout>
  );
}
