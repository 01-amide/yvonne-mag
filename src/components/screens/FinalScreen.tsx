import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { content } from "../../content";

/**
 * Last screen: a letter that appears line by line -> fake "uploading" bar -> artwork reveal.
 * Deliberately switches to a serif font: the phone UI drops away for the sincere part.
 * Everything you write lives in content.final (src/content.ts).
 */

const serif = "'Georgia', serif";
const CARD = "var(--surface)";
const ACCENT = "var(--accent-light)";
const GOLD = "var(--gold)";
const TEXT = "#f3ecfa";
const MUTED = "rgba(243,236,250,0.55)";
const EDGE = "1px solid rgba(var(--accent-rgb), 0.28)";

type Stage = "letter" | "uploading" | "posted";
type Props = { onRestart?: () => void };
type Line = { text: string; kind: "salutation" | "body" | "signoff" };

export default function FinalScreen({ onRestart }: Props) {
  const f = content.final;
  const lines: Line[] = [
    { text: f.salutation, kind: "salutation" },
    ...f.paragraphs.map((text) => ({ text, kind: "body" as const })),
    { text: f.signoff, kind: "signoff" },
  ];

  const [stage, setStage] = useState<Stage>("letter");
  const [shown, setShown] = useState(0); // how many lines are visible
  const [upload, setUpload] = useState(0); // 0..100
  const [zoom, setZoom] = useState(false);
  const [toast, setToast] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const done = shown >= lines.length;

  // Reveal the letter one line at a time; the wait depends on how long the previous line is
  useEffect(() => {
    if (stage !== "letter" || done) return;
    const prevWords = shown === 0 ? 0 : lines[shown - 1].text.split(/\s+/).length;
    const wait = shown === 0 ? 1200 : 900 + prevWords * 200;
    const t = setTimeout(() => setShown((n) => n + 1), wait);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, shown, done]);

  // Keep the newest line in view
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [shown]);

  // Fake upload bar, then reveal
  useEffect(() => {
    if (stage !== "uploading") return;
    let u = 0;
    let finish: ReturnType<typeof setTimeout> | undefined;
    const id = setInterval(() => {
      u = Math.min(100, u + 4 + Math.random() * 7);
      setUpload(u);
      if (u >= 100) {
        clearInterval(id);
        finish = setTimeout(() => setStage("posted"), 450);
      }
    }, 120);
    return () => {
      clearInterval(id);
      if (finish) clearTimeout(finish);
    };
  }, [stage]);

  // Escape closes the zoom (desktop)
  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setZoom(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoom]);

  const shareToStory = () => {
    setToast(true);
    setTimeout(() => setToast(false), 2400);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35 } }}
      style={{ position: "absolute", inset: 0, background: "var(--bg-deep)", color: TEXT, fontFamily: serif, overflow: "hidden" }}
    >
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 50% 0%, rgba(var(--accent-rgb),0.2), transparent 60%)" }} />

      <div
        ref={scrollRef}
        style={{ position: "absolute", inset: 0, overflowY: "auto" }}
      >
        <div style={{
          position: "relative", minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          padding: "calc(env(safe-area-inset-top, 0px) + 48px) 26px calc(env(safe-area-inset-bottom, 0px) + 56px)",
        }}>
          <AnimatePresence mode="wait">
            {/* 1. THE LETTER */}
            {stage === "letter" && (
              <motion.div
                key="letter"
                exit={{ opacity: 0, y: -12, transition: { duration: 0.4 } }}
                style={{ width: "100%", maxWidth: 340 }}
              >
                {lines.slice(0, shown).map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      margin: line.kind === "signoff" ? "26px 0 0" : "0 0 20px",
                      whiteSpace: "pre-line",
                      lineHeight: line.kind === "salutation" ? 1.2 : 1.75,
                      fontSize:
                        line.kind === "salutation" ? "clamp(28px, 8vw, 36px)" : line.kind === "signoff" ? 16 : "clamp(16px, 4.4vw, 19px)",
                      fontWeight: line.kind === "salutation" ? 700 : 400,
                      fontStyle: line.kind === "signoff" ? "italic" : "normal",
                      color: line.kind === "signoff" ? GOLD : TEXT,
                    }}
                  >
                    {line.text}
                  </motion.p>
                ))}

                <div style={{ minHeight: 64, marginTop: 28, textAlign: "center" }}>
                  <AnimatePresence>
                    {done && (
                      <motion.button
                        key="more"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.7 }}
                        onClick={() => setStage("uploading")}
                        whileTap={{ scale: 0.96 }}
                        style={{
                          padding: "13px 28px", borderRadius: 999, border: "1px solid var(--gold)", background: "rgba(226,194,122,0.1)",
                          color: GOLD, fontFamily: serif, fontSize: 15, fontStyle: "italic", cursor: "pointer",
                        }}
                      >
                        {f.buttonLabel}
                      </motion.button>
                    )}
                  </AnimatePresence>
                  {!done && (
                    <button
                      onClick={() => setShown(lines.length)}
                      style={{
                        background: "none", border: "none", color: MUTED, fontFamily: serif, fontSize: 12,
                        textDecoration: "underline", cursor: "pointer", opacity: shown > 0 ? 1 : 0,
                      }}
                    >
                      show it all
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {/* 2. UPLOADING */}
            {stage === "uploading" && (
              <motion.div
                key="uploading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{ width: "100%", maxWidth: 320, textAlign: "center" }}
              >
                <p style={{ fontSize: 18, margin: "0 0 18px" }}>Uploading your post…</p>
                <div style={{ height: 6, borderRadius: 3, background: "rgba(243,236,250,0.15)", overflow: "hidden" }}>
                  <div style={{
                    height: "100%", width: `${upload}%`, transition: "width 0.12s linear",
                    background: "linear-gradient(90deg, var(--accent), var(--gold))",
                  }} />
                </div>
                <p style={{ color: MUTED, fontSize: 13, margin: "12px 0 0" }}>{Math.round(upload)}%</p>
              </motion.div>
            )}

            {/* 3. POSTED */}
            {stage === "posted" && (
              <motion.div
                key="posted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{ width: "100%", maxWidth: 400 }}
              >
                <p style={{ textAlign: "center", color: GOLD, margin: "0 0 14px", fontSize: 14 }}>Posted ✓</p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                  style={{ background: CARD, borderRadius: 18, padding: 10, boxShadow: "0 24px 70px rgba(0,0,0,0.55)", border: EDGE }}
                >
                  <img
                    src={f.collage}
                    alt={f.artworkAlt}
                    onClick={() => setZoom(true)}
                    style={{ width: "100%", display: "block", borderRadius: 10, cursor: "zoom-in" }}
                  />
                  <div style={{ padding: "12px 6px 4px" }}>
                    <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5 }}>
                      <strong>{f.captionUser}</strong> {f.caption}
                    </p>
                    <p style={{ margin: "4px 0 0", color: MUTED, fontSize: 12 }}>tap the drawing to zoom in</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 20 }}
                >
                  <a
                    href={f.collage}
                    download={`${content.name.toLowerCase()}-collage.png`}
                    style={{
                      background: ACCENT, color: "#1a0f24", padding: "10px 18px", borderRadius: 999, fontSize: 14,
                      textDecoration: "none", fontFamily: serif,
                    }}
                  >
                    Save to my phone
                  </a>
                  <button
                    onClick={shareToStory}
                    style={{
                      background: "none", color: TEXT, border: "1px solid rgba(243,236,250,0.3)", padding: "10px 18px",
                      borderRadius: 999, fontSize: 14, fontFamily: serif, cursor: "pointer",
                    }}
                  >
                    Share to story
                  </button>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6 }}
                  style={{ textAlign: "center", color: MUTED, fontSize: 13, margin: "36px 0 0", fontStyle: "italic" }}
                >
                  {f.closing}
                </motion.p>

                {onRestart && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }} style={{ textAlign: "center", marginTop: 18 }}>
                    <button
                      onClick={onRestart}
                      style={{
                        background: "none", border: "none", color: MUTED, fontFamily: serif, fontSize: 12,
                        textDecoration: "underline", cursor: "pointer",
                      }}
                    >
                      watch it again from the start
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Toast (replaces the old alert()) */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{
              position: "absolute", left: 20, right: 20, bottom: "calc(env(safe-area-inset-bottom, 0px) + 28px)", zIndex: 70,
              padding: "12px 16px", borderRadius: 16, textAlign: "center", fontSize: 14,
              background: "rgba(30,18,48,0.95)", border: EDGE,
            }}
          >
            {f.shareToast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Zoom overlay */}
      <AnimatePresence>
        {zoom && (
          <motion.div
            key="zoom"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoom(false)}
            style={{
              position: "absolute", inset: 0, zIndex: 60, background: "rgba(10,5,16,0.95)",
              display: "flex", alignItems: "center", justifyContent: "center", padding: 12, cursor: "zoom-out",
            }}
          >
            <img src={f.collage} alt={`${f.artworkAlt}, enlarged`} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: 6 }} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
