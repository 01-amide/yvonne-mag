import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const COLORS = [
  "#e5989b", "#f4a4a7", "#d4849a",
  "#f2b5a0", "#e8a0bf", "#c9747a",
  "#f7c5cc", "#e5989b", "#d4849a",
  "#f4a4a7", "#e8a0bf", "#f2b5a0",
];

const LINE1 = "HAPPY";
const LINE2 = "BIRTHDAY";
const LINE3 = "SILVIA";

function BalloonLetter({
  char,
  color,
  delay,
  size = 100,
}: {
  char: string;
  color: string;
  delay: number;
  size?: number;
}) {
  if (char === " ") return <div style={{ width: size * 0.4 }} />;

  const floatDuration = 2.4 + Math.random() * 1.2;
  const floatAmount = 6 + Math.random() * 6;
  const rotateDeg = -4 + Math.random() * 8;

  return (
    <motion.div
      initial={{ y: 80, opacity: 0, scale: 0.4 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 120, damping: 10 }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0px" }}
    >
      {/* Balloon body */}
      <motion.div
        animate={{
          y: [-floatAmount / 2, floatAmount / 2, -floatAmount / 2],
          rotate: [rotateDeg, -rotateDeg, rotateDeg],
        }}
        transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "relative",
          width: size,
          height: size * 1.15,
          borderRadius: "50%",
          background: `radial-gradient(circle at 35% 30%, ${lighten(color)}, ${color} 55%, ${darken(color)} 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `inset -4px -6px 12px rgba(0,0,0,0.18), inset 4px 4px 10px rgba(255,255,255,0.35), 0 8px 24px rgba(0,0,0,0.15)`,
          cursor: "default",
          userSelect: "none",
          willChange: "transform",
        }}
      >
        {/* Shine highlight */}
        <div style={{
          position: "absolute", top: "14%", left: "22%",
          width: "28%", height: "18%", borderRadius: "50%",
          background: "rgba(255,255,255,0.55)", transform: "rotate(-30deg)",
        }} />
        {/* Small secondary shine */}
        <div style={{
          position: "absolute", top: "26%", left: "18%",
          width: "12%", height: "8%", borderRadius: "50%",
          background: "rgba(255,255,255,0.35)", transform: "rotate(-20deg)",
        }} />

        {/* Letter */}
        <span style={{
          fontFamily: "'Georgia', serif",
          fontWeight: 900,
          fontSize: size * 0.52,
          color: "rgba(255,255,255,0.92)",
          textShadow: `0 2px 6px rgba(0,0,0,0.25)`,
          lineHeight: 1,
          zIndex: 1,
          letterSpacing: "-0.02em",
        }}>
          {char}
        </span>

        {/* Knot at bottom */}
        <div style={{
          position: "absolute", bottom: "-6px", left: "50%",
          transform: "translateX(-50%)",
          width: "10px", height: "10px",
          borderRadius: "50% 50% 40% 40%",
          background: darken(color),
        }} />
      </motion.div>

      {/* String */}
      {/* // Replace the motion.svg + motion.path entirely with just a static line */}
<svg width="10" height="32" viewBox="0 0 10 32" style={{ overflow: "visible", marginTop: "-2px" }}>
  <line x1="5" y1="0" x2="5" y2="32" stroke={darken(color)} strokeWidth="1.5" strokeLinecap="round" />
</svg>
    </motion.div>
  );
}

function lighten(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${Math.min(255, r + 60)}, ${Math.min(255, g + 50)}, ${Math.min(255, b + 50)})`;
}

function darken(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${Math.max(0, r - 40)}, ${Math.max(0, g - 40)}, ${Math.max(0, b - 40)})`;
}

function BalloonRow({
  text, baseDelay, size, colorOffset = 0,
}: {
  text: string; baseDelay: number; size: number; colorOffset?: number;
}) {
  return (
    <div style={{
      display: "flex", alignItems: "flex-end",
      justifyContent: "center", gap: "6px", flexWrap: "wrap",
    }}>
      {text.split("").map((char, i) => (
        <BalloonLetter
          key={i} char={char}
          color={COLORS[(i + colorOffset) % COLORS.length]}
          delay={baseDelay + i * 0.07}
          size={size}
        />
      ))}
    </div>
  );
}

export default function HappyBirthday() {
  const isSmall = useMediaQuery("(max-width: 480px)");
  const isMedium = useMediaQuery("(max-width: 768px)");
  const line1Size = isSmall ? 48 : isMedium ? 62 : 80;
  const line2Size = isSmall ? 44 : isMedium ? 56 : 72;
  const line3Size = isSmall ? 52 : isMedium ? 70 : 88;

  const [confetti, setConfetti] = useState<
    { id: number; x: number; color: string; delay: number; size: number }[]
  >([]);

  useEffect(() => {
    setConfetti(
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: COLORS[i % COLORS.length],
        delay: Math.random() * 3,
        size: 6 + Math.random() * 8,
      }))
    );
  }, []);

  return (
    <section style={{
      background: "#ecdfcc",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "clamp(40px, 8vw, 80px) clamp(16px, 4vw, 40px)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Falling confetti */}
      {confetti.map((c) => (
        <motion.div
          key={c.id}
          animate={{ y: ["0vh", "110vh"], rotate: [0, 360], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 5 + Math.random() * 4, delay: c.delay, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute", left: `${c.x}%`, top: "-20px",
            width: c.size, height: c.size * (Math.random() > 0.5 ? 1 : 2.5),
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            background: c.color, opacity: 0.7, pointerEvents: "none", zIndex: 0,
          }}
        />
      ))}

      {/* Label */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          fontFamily: "'Georgia', serif", fontStyle: "italic",
          fontSize: "clamp(12px, 1.6vw, 15px)", color: "#b07a7d",
          letterSpacing: "0.25em", textTransform: "uppercase",
          marginBottom: "clamp(20px, 4vw, 40px)", zIndex: 1,
        }}
      >
        ✦ &nbsp; Today is that day &nbsp; ✦
      </motion.p>

      {/* Balloon rows */}
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: "clamp(8px, 2vw, 16px)", zIndex: 1,
      }}>
        <BalloonRow text={LINE1} baseDelay={0.3} size={line1Size} colorOffset={0} />
        <BalloonRow text={LINE2} baseDelay={0.8} size={line2Size} colorOffset={4} />
        <BalloonRow text={LINE3} baseDelay={1.5} size={line3Size} colorOffset={8} />
      </div>

      {/* Subtext */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.4, duration: 0.8 }}
        style={{ textAlign: "center", marginTop: "clamp(28px, 5vw, 52px)", zIndex: 1 }}
      >
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "12px", marginBottom: "16px",
        }}>
          <div style={{ height: "1px", width: "48px", background: "#e5989b" }} />
          <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#e5989b" }} />
          <div style={{ height: "1px", width: "48px", background: "#e5989b" }} />
        </div>
        <p style={{
          fontFamily: "'Georgia', serif", fontStyle: "italic",
          fontSize: "clamp(14px, 2vw, 18px)", color: "#7a5a5a",
          margin: 0, lineHeight: 1.7,
        }}>
          Today is officially about you…
          <br />
          <span style={{ opacity: 0.65, fontSize: "0.85em" }}>
            (as it should be every other day, but we'll let this one be special)
          </span>
        </p>
      </motion.div>
    </section>
  );
}