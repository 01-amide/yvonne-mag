import type { ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  children: ReactNode;
  onNext: () => void;
  nextLabel?: string;
  bg?: string; // background behind the old section
};

// Wraps an old scroll-style section (from the Silvia build) so it works as a screen here:
// fills the phone frame, scrolls inside it, and has a floating "Next" pill.
export default function LegacyScreen({ children, onNext, nextLabel = "Next →", bg = "var(--bg)" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35 } }}
      style={{ position: "absolute", inset: 0, background: bg, color: "var(--text)", fontFamily: "var(--font-sans)", overflow: "hidden" }}
    >
      <div
        style={{
          height: "100%", overflowY: "auto", overflowX: "hidden",
          paddingTop: "env(safe-area-inset-top, 0px)",
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 96px)",
        }}
      >
        {children}
      </div>

      <div style={{
        position: "absolute", left: 0, right: 0, bottom: "calc(env(safe-area-inset-bottom, 0px) + 20px)",
        display: "flex", justifyContent: "center", pointerEvents: "none", zIndex: 25,
      }}>
        <motion.button
          onClick={onNext}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          whileTap={{ scale: 0.96 }}
          style={{
            pointerEvents: "auto", padding: "13px 26px", borderRadius: 999, border: "1px solid var(--gold)",
            background: "rgba(20,11,31,0.85)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
            color: "var(--gold)", fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 700, cursor: "pointer",
          }}
        >
          {nextLabel}
        </motion.button>
      </div>
    </motion.div>
  );
}
