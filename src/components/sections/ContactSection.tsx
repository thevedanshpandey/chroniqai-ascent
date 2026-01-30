import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight, Calendar, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CALENDLY_URL = "https://calendly.com/vedanshpandey222161/30min?utm_source=ig&utm_medium=social&utm_content=link_in_bio";

export function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Message Received",
      description: "We'll get back to you within 24 hours.",
    });

    // Reset form after delay
    setTimeout(() => {
      setFormData({ name: "", email: "", company: "", message: "" });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute right-0 bottom-0 w-[600px] h-[600px] bg-platinum/3 blur-[150px] rounded-full" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="Get Started"
          title="Book a Strategy Call"
          description="Ready to architect your AI advantage? Let's discuss your automation infrastructure."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <GlassCard className="h-fit">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-luxury text-xl font-semibold text-foreground mb-6">
                Send a Message
              </h3>

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle className="w-16 h-16 text-platinum mb-4" />
                  <h4 className="font-luxury text-xl text-foreground mb-2">
                    Message Sent
                  </h4>
                  <p className="font-modern text-sm text-muted-foreground">
                    We'll be in touch within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="font-modern text-sm text-muted-foreground">
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-background/50 border-border/50 focus:border-platinum/50"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-modern text-sm text-muted-foreground">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-background/50 border-border/50 focus:border-platinum/50"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company" className="font-modern text-sm text-muted-foreground">
                      Company
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="bg-background/50 border-border/50 focus:border-platinum/50"
                      placeholder="Your company name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-modern text-sm text-muted-foreground">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="bg-background/50 border-border/50 focus:border-platinum/50 resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <LuxuryButton
                    type="submit"
                    variant="primary"
                    size="default"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </LuxuryButton>
                </form>
              )}
            </motion.div>
          </GlassCard>

          {/* Calendly Booking */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            <GlassCard className="h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-platinum/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-platinum" />
                </div>
                <div>
                  <h3 className="font-luxury text-xl font-semibold text-foreground">
                    Schedule Directly
                  </h3>
                  <p className="font-modern text-sm text-muted-foreground">
                    Book a 30-minute strategy call
                  </p>
                </div>
              </div>

              <p className="font-modern text-muted-foreground text-sm leading-relaxed mb-8 flex-grow">
                Prefer to book directly? Schedule a strategy session to discuss your 
                AI automation infrastructure needs. We'll analyze your current systems 
                and map out a path to autonomous operations.
              </p>

              <div className="space-y-4">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <LuxuryButton variant="platinum" size="lg" className="w-full">
                    Book a Strategy Call
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </LuxuryButton>
                </a>

                <p className="font-modern text-xs text-muted-foreground text-center">
                  30-minute consultation • No obligation
                </p>
              </div>

              {/* Trust Signals */}
              <div className="mt-8 pt-6 border-t border-border/30">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="font-luxury text-xl text-platinum">5-10X</p>
                    <p className="font-modern text-xs text-muted-foreground">Growth Target</p>
                  </div>
                  <div>
                    <p className="font-luxury text-xl text-platinum">24h</p>
                    <p className="font-modern text-xs text-muted-foreground">Response Time</p>
                  </div>
                  <div>
                    <p className="font-luxury text-xl text-platinum">100%</p>
                    <p className="font-modern text-xs text-muted-foreground">Confidential</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
