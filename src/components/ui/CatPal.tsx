import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { playMeow } from "../../lib/meow";

const SOUNDS = ["meow", "mrrp", "prrr", "mew?", "meeeow"];

type Props = {
  style?: React.CSSProperties;
  emoji?: string;
  photo?: string;
  video?: string;
  name?: string;
  size?: number;
  pitch?: number;
  onPet?: () => void;
  framed?: boolean;
};

export default function CatPal({
  style,
  emoji = "🐱",
  photo,
  video,
  name,
  size = 46,
  pitch,
  onPet,
  framed = false,
}: Props) {
  const [bubble, setBubble] = useState<{ id: number; text: string } | null>(
    null
  );
  const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);
  const [count, setCount] = useState(0);

  const poke = () => {
    const id = count + 1;
    setCount(id);

    playMeow(pitch ?? 0.9 + Math.random() * 0.3);
    setBubble({ id, text: SOUNDS[Math.floor(Math.random() * SOUNDS.length)] });
    setHearts((h) => [...h, { id, x: Math.random() * 30 - 15 }]);

    setTimeout(
      () => setBubble((b) => (b && b.id === id ? null : b)),
      1200
    );

    onPet?.();
  };

  const mediaSize = size * 1.3;

  return (
    <div
      onPointerDown={(e) => e.stopPropagation()}
      style={{
        position: "absolute",
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        ...style,
      }}
    >
      <AnimatePresence>
        {bubble && (
          <motion.span
            key={bubble.id}
            initial={{ opacity: 0, y: 6, scale: 0.8 }}
            animate={{ opacity: 1, y: -4, scale: 1 }}
            exit={{ opacity: 0, y: -12 }}
            style={{
              position: "absolute",
              bottom: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
              padding: "6px 12px",
              borderRadius: 14,
              fontSize: 13,
              fontWeight: 700,
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              color: "var(--text)",
              fontFamily: "var(--font-sans)",
              zIndex: 2,
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
          onAnimationComplete={() =>
            setHearts((arr) => arr.filter((x) => x.id !== h.id))
          }
          style={{
            position: "absolute",
            top: 0,
            fontSize: 18,
            pointerEvents: "none",
          }}
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
        style={{
          background: "none",
          border: "none",
          fontSize: size,
          lineHeight: 1,
          cursor: "pointer",
          padding: framed ? 0 : 4,
          width: framed ? CAT_SIZE(size) : undefined,
          height: framed ? CAT_SIZE(size) : undefined,
          borderRadius: framed ? "50%" : undefined,
          overflow: framed ? "hidden" : undefined,
          boxSizing: "border-box",
          backgroundColor: framed ? "var(--surface)" : "transparent",
          borderStyle: framed ? "solid" : "none",
          borderWidth: framed ? 2 : 0,
          borderColor: framed
            ? "rgba(var(--accent-rgb), 0.5)"
            : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {video ? (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              pointerEvents: "none",
            }}
          />
        ) : photo ? (
          <img
            src={photo}
            alt={name ?? "cat"}
            draggable={false}
            style={{
              width: framed ? "100%" : mediaSize,
              height: framed ? "100%" : mediaSize,
              borderRadius: framed ? 0 : "50%",
              objectFit: "cover",
              border: framed ? "none" : "2px solid var(--accent-light)",
              display: "block",
              pointerEvents: "none",
            }}
          />
        ) : (
          emoji
        )}
      </motion.button>

      {name && (
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.08em",
            color: "var(--muted)",
          }}
        >
          {name}
        </span>
      )}
    </div>
  );
}

function CAT_SIZE(size: number) {
  return size * 1.3;
}
