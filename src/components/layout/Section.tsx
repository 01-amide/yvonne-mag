import type { ReactNode } from "react";
import { motion } from "framer-motion";

type SectionProps = { children: ReactNode; bg?: string };

export default function Section({ children, bg }: SectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      style={{
        padding: "clamp(48px, 10vw, 100px) clamp(16px, 4vw, 28px)",
        background: bg || "transparent",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
        {children}
      </div>
    </motion.section>
  );
}