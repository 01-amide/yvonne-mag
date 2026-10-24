import { useState } from "react";
import { motion } from "framer-motion";
import { content } from "../../content";
import CatPal from "../ui/CatPal";

type Props = { onNext: () => void };

const mono: React.CSSProperties = { fontFamily: "var(--font-mono)", letterSpacing: "0.08em" };

const RANKS = [
  { at: 0, title: "Cat Rookie" },
  { at: 5, title: "Cat Whisperer" },
  { at: 15, title: "Certified Cat Mom" },
  { at: 30, title: "Cat Royalty 👑" },
];

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
const CAT_BOX = 62; // px footprint of a cat, used to centre it on its position

export default function CatCorner({ onNext }: Props) {
  const [pets, setPets] = useState(0);
  const [target, setTarget] = useState({ x: 50, y: 78 });
  const [dot, setDot] = useState<{ id: number; x: number; y: number } | null>(null);

  const rank = [...RANKS].reverse().find((r) => pets >= r.at)!.title;

  const chase = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = clamp(((e.clientX - rect.left) / rect.width) * 100, 10, 90);
    const y = clamp(((e.clientY - rect.top) / rect.height) * 100, 14, 88);
    setTarget({ x, y });
    setDot((d) => ({ id: (d?.id ?? 0) + 1, x, y }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35 } }}
      style={{
        position: "absolute", inset: 0, background: "var(--bg)", color: "var(--text)", fontFamily: "var(--font-sans)", overflow: "hidden",
        display: "flex", flexDirection: "column", alignItems: "center",
        padding: "calc(env(safe-area-inset-top, 0px) + 40px) 18px calc(env(safe-area-inset-bottom, 0px) + 84px)",
      }}
    >
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 50% 0%, rgba(var(--accent-rgb),0.22), transparent 60%)" }} />

      <p style={{ ...mono, margin: 0, fontSize: 11, color: "var(--gold)", position: "relative" }}>✦ PURR-SONAL SPACE ✦</p>
      <h2 style={{ margin: "8px 0 4px", fontSize: "clamp(28px, 8vw, 36px)", fontWeight: 800, letterSpacing: "-0.02em", position: "relative" }}>
        Cat <span style={{ color: "var(--accent-light)" }}>Corner</span> 🐾
      </h2>
      <p style={{ margin: 0, fontSize: 13, color: "var(--muted)", textAlign: "center", position: "relative" }}>
        pet the cats · tap the floor and watch what happens
      </p>

      {/* Counter */}
      <div style={{
        ...mono, margin: "14px 0 10px", padding: "7px 14px", borderRadius: 999, fontSize: 11, position: "relative",
        background: "rgba(226,194,122,0.1)", border: "1px solid rgba(226,194,122,0.35)", color: "var(--gold)",
      }}>
        🐾 {pets} {pets === 1 ? "pet" : "pets"} · {rank}
      </div>

      {/* Play area */}
      <div
        onPointerDown={chase}
        style={{
          position: "relative", flex: 1, width: "100%", maxWidth: 380, minHeight: 280, borderRadius: 28, overflow: "hidden",
          background: "radial-gradient(ellipse at 50% 60%, rgba(var(--accent-rgb),0.2), transparent 70%), var(--surface)",
          border: "1.5px dashed rgba(var(--accent-rgb),0.4)", touchAction: "manipulation", cursor: "crosshair",
        }}
      >
        {/* Laser dot */}
        {dot && (
          <motion.span
            key={dot.id}
            initial={{ opacity: 1, scale: 0.4 }}
            animate={{ opacity: [1, 1, 0], scale: [0.4, 1, 1] }}
            transition={{ duration: 1.6, times: [0, 0.2, 1] }}
            style={{
              position: "absolute", left: `${dot.x}%`, top: `${dot.y}%`, width: 14, height: 14, marginLeft: -7, marginTop: -7,
              borderRadius: "50%", background: "var(--rec)", boxShadow: "0 0 14px 4px var(--rec)", pointerEvents: "none",
            }}
          />
        )}

        {/* The cats you can pet */}
        {content.cats.map((c) => (
          <CatPal
            key={c.name}
            name={c.name}
            emoji={c.emoji}
            photo={c.photo}
            pitch={c.pitch}
            size={48}
            onPet={() => setPets((n) => n + 1)}
            style={{ left: `${c.x}%`, top: `${c.y}%`, marginLeft: -CAT_BOX / 2, marginTop: -CAT_BOX / 2 }}
          />
        ))}

        {/* The chaser: runs to wherever she taps */}
        <motion.div
          animate={{ left: `${target.x}%`, top: `${target.y}%` }}
          transition={{ type: "spring", stiffness: 55, damping: 11 }}
          style={{ position: "absolute", width: CAT_BOX, marginLeft: -CAT_BOX / 2, marginTop: -CAT_BOX / 2, zIndex: 15 }}
        >
          <CatPal
            name="Zoomie"
            emoji="😼"
            size={48}
            pitch={1.1}
            onPet={() => setPets((n) => n + 1)}
            style={{ position: "relative" }}
          />
        </motion.div>
      </div>

      <div style={{
        position: "absolute", left: 0, right: 0, bottom: "calc(env(safe-area-inset-bottom, 0px) + 20px)",
        display: "flex", justifyContent: "center", pointerEvents: "none", zIndex: 25,
      }}>
        <motion.button
          onClick={onNext}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          whileTap={{ scale: 0.96 }}
          style={{
            pointerEvents: "auto", padding: "13px 26px", borderRadius: 999, border: "1px solid var(--gold)",
            background: "rgba(20,11,31,0.85)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
            color: "var(--gold)", fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 700, cursor: "pointer",
          }}
        >
          One last thing →
        </motion.button>
      </div>
    </motion.div>
  );
}
