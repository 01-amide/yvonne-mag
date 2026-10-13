import type { ReactNode } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";

// Full screen on phones, a centered phone-sized frame on desktop.
export default function PhoneShell({ children }: { children: ReactNode }) {
  const isDesktop = useMediaQuery("(min-width: 600px)");

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-deep)",
      }}
    >
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          width: isDesktop ? 390 : "100%",
          height: isDesktop ? "min(844px, 94dvh)" : "100dvh",
          borderRadius: isDesktop ? 44 : 0,
          border: isDesktop ? "1px solid var(--border)" : "none",
          boxShadow: isDesktop
            ? "0 40px 120px rgba(0,0,0,0.6), 0 0 80px rgba(var(--accent-rgb), 0.15)"
            : "none",
          background: "var(--bg)",
        }}
      >
        {children}
      </div>
    </div>
  );
}