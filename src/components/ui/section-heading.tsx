import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  center?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  center = true,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn(
        "max-w-3xl",
        center && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="font-modern text-sm font-medium text-platinum tracking-widest uppercase mb-4 block">
          {eyebrow}
        </span>
      )}
      <h2 className="font-luxury text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight mb-4">
        {title}
      </h2>
      {description && (
        <p className="font-modern text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
