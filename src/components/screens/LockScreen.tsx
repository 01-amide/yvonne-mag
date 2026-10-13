import { useEffect, useState } from "react";
import { motion, type PanInfo } from "framer-motion";
import { content } from "../../content";

type Props = { onUnlock: () => void };

const UNLOCK_DISTANCE = 120; // px dragged up
const UNLOCK_VELOCITY = 500; // px/s flick

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

const wallpaperStyle = content.wallpaper
  ? `linear-gradient(rgba(12,6,20,0.35), rgba(12,6,20,0.8)), url(${content.wallpaper}) center/cover`
  : `radial-gradient(ellipse at 25% 15%, rgba(var(--accent-rgb), 0.5), transparent 60%),
     radial-gradient(ellipse at 85% 85%, rgba(226,194,122,0.18), transparent 55%),
     var(--bg-deep)`;

function RoundButton({ children }: { children: string }) {
  return (
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.12)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 20,
      }}
    >
      {children}
    </div>
  );
}

export default function LockScreen({ onUnlock }: Props) {
  const now = useClock();
  const [unlocking, setUnlocking] = useState(false);

  const unlock = () => {
    if (unlocking) return;
    setUnlocking(true);
    onUnlock();
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y < -UNLOCK_DISTANCE || info.velocity.y < -UNLOCK_VELOCITY) {
      unlock();
    }
  };

  const time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: false });
  const date = now.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });

  return (
    <motion.div
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0.5, bottom: 0 }}
      onDragEnd={handleDragEnd}
      exit={{ y: "-100%", transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 50,
        background: wallpaperStyle,
        touchAction: "none",
        userSelect: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "calc(env(safe-area-inset-top, 0px) + 28px) 16px calc(env(safe-area-inset-bottom, 0px) + 12px)",
        color: "var(--text)",
        fontFamily: "var(--font-sans)",
      }}
    >
      {/* Padlock */}
      <svg width="16" height="20" viewBox="0 0 16 20" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ opacity: 0.8 }}>
        <rect x="2" y="8.5" width="12" height="9.5" rx="2.5" fill="currentColor" stroke="none" />
        <path d="M4.5 8.5V6a3.5 3.5 0 0 1 7 0v2.5" strokeLinecap="round" />
      </svg>

      {/* Date + time */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ textAlign: "center", marginTop: 12 }}
      >
        <p style={{ margin: 0, fontSize: "clamp(15px, 4vw, 18px)", fontWeight: 600, color: "var(--subtext)" }}>
          {date}
        </p>
        <p
          style={{
            margin: "2px 0 0",
            fontSize: "clamp(76px, 24vw, 104px)",
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {time}
        </p>
      </motion.div>

      {/* Notifications */}
      <div style={{ width: "100%", maxWidth: 380, marginTop: 28, display: "flex", flexDirection: "column", gap: 10 }}>
        {content.notifications.map((n, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.9 + i * 0.7, type: "spring", stiffness: 220, damping: 20 }}
            style={{
              display: "flex",
              gap: 12,
              padding: "12px 14px",
              borderRadius: 20,
              background: "rgba(30,18,48,0.55)",
              border: "1px solid var(--border)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                flexShrink: 0,
                borderRadius: 9,
                background: "linear-gradient(135deg, var(--accent), var(--accent-deep))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
              }}
            >
              {n.icon}
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 700 }}>{n.title}</span>
                <span style={{ fontSize: 12, color: "var(--muted)" }}>{n.time}</span>
              </div>
              <p style={{ margin: "2px 0 0", fontSize: 13.5, lineHeight: 1.35, color: "var(--subtext)" }}>{n.body}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom area */}
      <div style={{ marginTop: "auto", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
        <div style={{ width: "100%", maxWidth: 380, display: "flex", justifyContent: "space-between", padding: "0 12px" }}>
          <RoundButton>🔦</RoundButton>
          <RoundButton>📷</RoundButton>
        </div>

        {/* Tap works too: also the fallback if a swipe doesn't count as a user gesture for audio */}
        <motion.button
          onClick={unlock}
          animate={{ y: [0, -6, 0], opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: "none",
            border: "none",
            color: "var(--text)",
            fontFamily: "var(--font-sans)",
            fontSize: 13,
            letterSpacing: "0.08em",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            padding: 8,
          }}
        >
          <span>swipe up to open</span>
          <span style={{ width: 120, height: 5, borderRadius: 3, background: "rgba(255,255,255,0.85)" }} />
        </motion.button>
      </div>
    </motion.div>
  );
}