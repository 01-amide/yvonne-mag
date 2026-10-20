import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { content } from "../../content";

type Props = { onNext: () => void };

const pad = (n: number) => String(n).padStart(2, "0");

function useRecTimer() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return `${pad(Math.floor(seconds / 3600))}:${pad(Math.floor((seconds % 3600) / 60))}:${pad(seconds % 60)}`;
}

const mono: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  letterSpacing: "0.08em",
};

function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const size = 22;
  const base: React.CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    borderColor: "rgba(255,255,255,0.85)",
    borderStyle: "solid",
    borderWidth: 0,
  };
  const inset = 14;
  const map = {
    tl: { top: inset, left: inset, borderTopWidth: 2, borderLeftWidth: 2, borderTopLeftRadius: 6 },
    tr: { top: inset, right: inset, borderTopWidth: 2, borderRightWidth: 2, borderTopRightRadius: 6 },
    bl: { bottom: inset, left: inset, borderBottomWidth: 2, borderLeftWidth: 2, borderBottomLeftRadius: 6 },
    br: { bottom: inset, right: inset, borderBottomWidth: 2, borderRightWidth: 2, borderBottomRightRadius: 6 },
  } as const;
  return <div style={{ ...base, ...map[pos] }} />;
}

export default function Viewfinder({ onNext }: Props) {
  const time = useRecTimer();
  const [capturing, setCapturing] = useState(false);
  const { media, mediaType, thumb, label } = content.camera;

  const shoot = () => {
    if (capturing) return;
    setCapturing(true);
    setTimeout(onNext, 650);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: "var(--bg-deep)",
        color: "#fff",
        fontFamily: "var(--font-sans)",
        userSelect: "none",
      }}
    >
      {/* Live "feed" */}
      {media && mediaType === "video" && (
        <video src={media} autoPlay muted loop playsInline
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      )}
      {media && mediaType === "image" && (
        <img src={media} alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      )}
      {!media && (
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at 30% 25%, rgba(var(--accent-rgb),0.45), transparent 60%),
                       radial-gradient(ellipse at 80% 80%, rgba(226,194,122,0.15), transparent 55%), var(--bg-deep)`,
        }} />
      )}

      {/* Readability gradients */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 22%, transparent 55%, rgba(0,0,0,0.75) 100%)",
      }} />

      {/* Rule-of-thirds grid */}
      {[33.33, 66.66].map((p) => (
        <div key={`v${p}`} style={{ position: "absolute", top: 0, bottom: 0, left: `${p}%`, width: 1, background: "rgba(255,255,255,0.1)" }} />
      ))}
      {[33.33, 66.66].map((p) => (
        <div key={`h${p}`} style={{ position: "absolute", left: 0, right: 0, top: `${p}%`, height: 1, background: "rgba(255,255,255,0.1)" }} />
      ))}

      {/* Corner brackets */}
      <Corner pos="tl" /><Corner pos="tr" /><Corner pos="bl" /><Corner pos="br" />

      {/* Focus box */}
      <motion.div
        initial={{ opacity: 0, scale: 1.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "absolute", top: "42%", left: "50%", transform: "translate(-50%, -50%)" }}
      >
        <motion.div
          animate={{ opacity: [1, 0.55, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: 84, height: 84, border: "1.5px solid var(--gold)", borderRadius: 4, position: "relative" }}
        >
          <span style={{ ...mono, position: "absolute", top: -20, left: 0, fontSize: 10, color: "var(--gold)", whiteSpace: "nowrap" }}>
            AE/AF LOCK
          </span>
        </motion.div>
      </motion.div>

      {/* Top bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        padding: "calc(env(safe-area-inset-top, 0px) + 30px) 34px 0",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <motion.span
            animate={{ opacity: [1, 0.1, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--rec)", boxShadow: "0 0 10px var(--rec)" }}
          />
          <span style={{ ...mono, fontSize: 13, fontWeight: 500 }}>REC</span>
          <span style={{ ...mono, fontSize: 13, color: "rgba(255,255,255,0.8)", fontVariantNumeric: "tabular-nums" }}>{time}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ ...mono, fontSize: 11, color: "rgba(255,255,255,0.7)" }}>4K 60</span>
          <span style={{ ...mono, fontSize: 11 }}>100%</span>
          <span style={{ width: 22, height: 11, border: "1.5px solid #fff", borderRadius: 3, padding: 1.5, display: "block" }}>
            <span style={{ display: "block", width: "100%", height: "100%", background: "#fff", borderRadius: 1 }} />
          </span>
        </div>
      </div>

      {/* Caption */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.7 }}
        style={{ position: "absolute", left: 34, right: 34, bottom: "calc(env(safe-area-inset-bottom, 0px) + 232px)" }}
      >
        <p style={{ ...mono, margin: "0 0 6px", fontSize: 11, color: "var(--gold)" }}>● NOW RECORDING</p>
        <p style={{ margin: 0, fontSize: "clamp(26px, 8vw, 34px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
          {content.name}'s
          <br />
          <span style={{ color: "var(--accent-light)" }}>{label}</span>
        </p>
      </motion.div>

      {/* Bottom controls */}
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0,
        padding: "0 24px calc(env(safe-area-inset-bottom, 0px) + 24px)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
      }}>
        {/* Zoom pills */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", background: "rgba(0,0,0,0.35)", borderRadius: 999, padding: 4 }}>
          {[".5", "1x", "2"].map((z) => (
            <span key={z} style={{
              ...mono, fontSize: 11, width: 32, height: 32, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: z === "1x" ? "rgba(0,0,0,0.5)" : "transparent",
              color: z === "1x" ? "var(--gold)" : "rgba(255,255,255,0.8)",
            }}>{z}</span>
          ))}
        </div>

        {/* Mode selector */}
        <div style={{ display: "flex", gap: 20, ...mono, fontSize: 11 }}>
          {["TIME-LAPSE", "VIDEO", "PHOTO", "PORTRAIT"].map((m) => (
            <span key={m} style={{ color: m === "VIDEO" ? "var(--gold)" : "rgba(255,255,255,0.65)", fontWeight: m === "VIDEO" ? 600 : 400 }}>{m}</span>
          ))}
        </div>

        {/* Thumbnail / shutter / flip */}
        <div style={{ width: "100%", maxWidth: 340, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{
            width: 46, height: 46, borderRadius: 10, border: "1.5px solid rgba(255,255,255,0.7)",
            background: thumb ? `url(${thumb}) center/cover` : "linear-gradient(135deg, var(--accent), var(--accent-deep))",
          }} />

          <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ ...mono, position: "absolute", top: -26, fontSize: 11, whiteSpace: "nowrap", color: "var(--accent-light)" }}
            >
              tap to capture
            </motion.span>
            <motion.button
              onClick={shoot}
              whileTap={{ scale: 0.9 }}
              aria-label="Capture"
              style={{
                width: 76, height: 76, borderRadius: "50%", background: "transparent",
                border: "4px solid #fff", padding: 5, cursor: "pointer",
              }}
            >
              <motion.span
                animate={capturing ? { scale: 0.8 } : { scale: [1, 0.92, 1] }}
                transition={capturing ? { duration: 0.15 } : { duration: 1.8, repeat: Infinity }}
                style={{ display: "block", width: "100%", height: "100%", borderRadius: "50%", background: "var(--rec)" }}
              />
            </motion.button>
          </div>

          <div style={{
            width: 46, height: 46, borderRadius: "50%", background: "rgba(255,255,255,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
          }}>🔄</div>
        </div>
      </div>

      {/* Shutter flash */}
      <motion.div
        initial={false}
        animate={{ opacity: capturing ? [0, 0.95, 0] : 0 }}
        transition={{ duration: 0.6, times: [0, 0.25, 1] }}
        style={{ position: "absolute", inset: 0, background: "#fff", pointerEvents: "none", zIndex: 10 }}
      />
    </motion.div>
  );
}