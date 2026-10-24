import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { playMeow } from "../../lib/meow";

const SOUNDS = ["meow", "mrrp", "prrr", "mew?", "meeeow"];

type Props = {
  style?: React.CSSProperties;
  emoji?: string;
  photo?: string; // round photo instead of the emoji
  name?: string; // small label under the cat
  size?: number; // emoji size in px
  pitch?: number; // fixed voice; omit for a random one each tap
  onPet?: () => void;
};

// A tappable cat that meows. Position it with `style` (it's absolutely positioned by default).
export default function CatPal({ style, emoji = "🐱", photo, name, size = 46, pitch, onPet }: Props) {
  const [bubble, setBubble] = useState<{ id: number; text: string } | null>(null);
  const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);
  const [count, setCount] = useState(0);

  const poke = () => {
    const id = count + 1;
    setCount(id);
    playMeow(pitch ?? 0.9 + Math.random() * 0.3);
    setBubble({ id, text: SOUNDS[Math.floor(Math.random() * SOUNDS.length)] });
    setHearts((h) => [...h, { id, x: Math.random() * 30 - 15 }]);
    setTimeout(() => setBubble((b) => (b && b.id === id ? null : b)), 1200);
    onPet?.();
  };

  return (
    <div
      onPointerDown={(e) => e.stopPropagation()}
      style={{ position: "absolute", zIndex: 20, display: "flex", flexDirection: "column", alignItems: "center", ...style }}
    >
      <AnimatePresence>
        {bubble && (
          <motion.span
            key={bubble.id}
            initial={{ opacity: 0, y: 6, scale: 0.8 }}
            animate={{ opacity: 1, y: -4, scale: 1 }}
            exit={{ opacity: 0, y: -12 }}
            style={{
              position: "absolute", bottom: "100%", left: "50%", transform: "translateX(-50%)",
              whiteSpace: "nowrap", padding: "6px 12px", borderRadius: 14, fontSize: 13, fontWeight: 700,
              background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--text)",
              fontFamily: "var(--font-sans)", zIndex: 2,
            }}
          >
            {bubble.text}
          </motion.span>
        )}
      </AnimatePresence>

      {hearts.map((h) => (
        <motion.span
          key={h.id}
          initial={{ opacity: 1, y: 0, x: h.x, scale: 0.8 }}
          animate={{ opacity: 0, y: -70, scale: 1.3 }}
          transition={{ duration: 1, ease: "easeOut" }}
          onAnimationComplete={() => setHearts((arr) => arr.filter((x) => x.id !== h.id))}
          style={{ position: "absolute", top: 0, fontSize: 18, pointerEvents: "none" }}
        >
          💜
        </motion.span>
      ))}

      <motion.button
        onClick={poke}
        aria-label={name ? `Pet ${name}` : "Pet the cat"}
        animate={{ rotate: [0, -6, 6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        whileTap={{ scale: 0.8, rotate: 0 }}
        style={{ background: "none", border: "none", fontSize: size, lineHeight: 1, cursor: "pointer", padding: 4 }}
      >
        {photo ? (
          <img
            src={photo}
            alt={name ?? "cat"}
            style={{ width: size * 1.3, height: size * 1.3, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--accent-light)", display: "block" }}
          />
        ) : (
          emoji
        )}
      </motion.button>

      {name && (
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", color: "var(--muted)" }}>{name}</span>
      )}
    </div>
  );
}
