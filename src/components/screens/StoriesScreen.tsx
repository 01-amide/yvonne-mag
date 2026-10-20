import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { content } from "../../content";
import StoryViewer from "./StoryViewer";

type Props = { onNext: () => void };

const stories = content.stories;
const mono: React.CSSProperties = { fontFamily: "var(--font-mono)", letterSpacing: "0.08em" };

export default function StoriesScreen({ onNext }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [viewed, setViewed] = useState<Set<string>>(new Set());

  const open = (i: number) => {
    setOpenIdx(i);
    setViewed((v) => new Set(v).add(stories[i].id));
  };

  const goToStory = (i: number) => {
    if (i < 0) return;
    if (i >= stories.length) setOpenIdx(null);
    else open(i);
  };

  const allViewed = viewed.size === stories.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35 } }}
      style={{
        position: "absolute", inset: 0, overflow: "hidden", background: "var(--bg)",
        color: "var(--text)", fontFamily: "var(--font-sans)",
      }}
    >
      {/* soft glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 50% 0%, rgba(var(--accent-rgb),0.25), transparent 60%)",
      }} />

      <div style={{
        position: "relative", height: "100%", display: "flex", flexDirection: "column", alignItems: "center",
        padding: "calc(env(safe-area-inset-top, 0px) + 48px) 24px calc(env(safe-area-inset-bottom, 0px) + 28px)",
      }}>
        <p style={{ ...mono, margin: 0, fontSize: 11, color: "var(--gold)" }}>✦ HIGHLIGHTS ✦</p>
        <h2 style={{ margin: "10px 0 6px", fontSize: "clamp(28px, 8vw, 36px)", fontWeight: 800, letterSpacing: "-0.02em", textAlign: "center" }}>
          {content.name}'s <span style={{ color: "var(--accent-light)" }}>stories</span>
        </h2>
        <p style={{ margin: 0, fontSize: 14, color: "var(--muted)" }}>tap a circle to watch</p>

        {/* Story circles */}
        <div style={{
          flex: 1, display: "flex", flexWrap: "wrap", justifyContent: "center", alignContent: "center",
          gap: "28px 24px", maxWidth: 340,
        }}>
          {stories.map((s, i) => {
            const seen = viewed.has(s.id);
            return (
              <motion.button
                key={s.id}
                onClick={() => open(i)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
                whileTap={{ scale: 0.94 }}
                style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", fontFamily: "inherit", padding: 0 }}
              >
                <div style={{
                  width: 96, height: 96, borderRadius: "50%", padding: 3,
                  background: seen ? "rgba(255,255,255,0.22)" : "linear-gradient(45deg, var(--gold), var(--accent), var(--accent-deep))",
                  transition: "background 0.4s",
                }}>
                  <div style={{ width: "100%", height: "100%", borderRadius: "50%", padding: 3, background: "var(--bg)" }}>
                    <div style={{
                      width: "100%", height: "100%", borderRadius: "50%", display: "grid", placeItems: "center", fontSize: 34,
                      background: s.cover ? `url(${s.cover}) center/cover` : "linear-gradient(135deg, var(--surface-2), var(--surface))",
                    }}>
                      {!s.cover && s.emoji}
                    </div>
                  </div>
                </div>
                <p style={{ margin: "8px 0 0", fontSize: 13, fontWeight: 600, color: seen ? "var(--muted)" : "var(--text)" }}>{s.title}</p>
              </motion.button>
            );
          })}
        </div>

        {/* Footer: progress + continue */}
        <div style={{ height: 76, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", gap: 10 }}>
          <AnimatePresence mode="wait">
            {allViewed ? (
              <motion.button
                key="continue"
                onClick={onNext}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, scale: [1, 1.04, 1] }}
                transition={{ scale: { duration: 1.8, repeat: Infinity }, duration: 0.4 }}
                style={{
                  padding: "14px 32px", borderRadius: 999, border: "1px solid var(--gold)", background: "rgba(226,194,122,0.12)",
                  color: "var(--gold)", fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 700, cursor: "pointer",
                }}
              >
                Continue →
              </motion.button>
            ) : (
              <motion.p key="count" exit={{ opacity: 0 }} style={{ ...mono, margin: 0, fontSize: 12, color: "var(--muted)" }}>
                {viewed.size} / {stories.length} viewed
              </motion.p>
            )}
          </AnimatePresence>
          {!allViewed && (
            <button
              onClick={onNext}
              style={{ background: "none", border: "none", color: "var(--muted)", fontSize: 12, cursor: "pointer", textDecoration: "underline", fontFamily: "var(--font-sans)" }}
            >
              skip
            </button>
          )}
        </div>
      </div>

      {/* Full-screen viewer */}
      <AnimatePresence>
        {openIdx !== null && (
          <StoryViewer
            key={stories[openIdx].id}
            story={stories[openIdx]}
            hasPrevStory={openIdx > 0}
            onClose={() => setOpenIdx(null)}
            onNextStory={() => goToStory(openIdx + 1)}
            onPrevStory={() => goToStory(openIdx - 1)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}