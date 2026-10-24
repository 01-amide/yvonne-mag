import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { content } from "../../content";

/**
 * Last screen: voice note -> fake "uploading" bar -> artwork reveal.
 * Deliberately switches to a serif font: the phone UI drops away for the sincere part.
 * Files go in /public (paths are set in content.final).
 */

const serif = "'Georgia', serif";
const CARD = "var(--surface)";
const ACCENT = "var(--accent-light)";
const GOLD = "var(--gold)";
const TEXT = "#f3ecfa";
const MUTED = "rgba(243,236,250,0.55)";
const EDGE = "1px solid rgba(var(--accent-rgb), 0.28)";

const BARS = [8, 14, 22, 12, 28, 18, 10, 26, 16, 30, 12, 20, 8, 24, 14, 28, 10, 18, 26, 12, 22, 16, 30, 10, 20, 14, 24, 8, 18, 12];

type Stage = "note" | "uploading" | "posted";
type Props = { onRestart?: () => void };

export default function FinalScreen({ onRestart }: Props) {
  const f = content.final;
  const [stage, setStage] = useState<Stage>("note");
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1
  const [upload, setUpload] = useState(0); // 0..100
  const [zoom, setZoom] = useState(false);
  const [toast, setToast] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) a.play().catch(() => {});
    else a.pause();
  };

  const startUpload = useCallback(() => {
    audioRef.current?.pause();
    setStage("uploading");
  }, []);

  // Fake upload bar, then reveal
  useEffect(() => {
    if (stage !== "uploading") return;
    let u = 0;
    let done: ReturnType<typeof setTimeout> | undefined;
    const id = setInterval(() => {
      u = Math.min(100, u + 4 + Math.random() * 7);
      setUpload(u);
      if (u >= 100) {
        clearInterval(id);
        done = setTimeout(() => setStage("posted"), 450);
      }
    }, 120);
    return () => {
      clearInterval(id);
      if (done) clearTimeout(done);
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
      style={{
        position: "absolute", inset: 0, background: "var(--bg-deep)", color: TEXT, fontFamily: serif, overflowY: "auto",
      }}
    >
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 50% 0%, rgba(var(--accent-rgb),0.2), transparent 60%)" }} />

      <audio
        ref={audioRef}
        src={f.voiceNote}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => {
          const a = e.currentTarget;
          if (a.duration) setProgress(a.currentTime / a.duration);
        }}
        onEnded={() => {
          setPlaying(false);
          setTimeout(startUpload, 900);
        }}
      />

      <div style={{
        position: "relative", minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "calc(env(safe-area-inset-top, 0px) + 40px) 22px calc(env(safe-area-inset-bottom, 0px) + 40px)",
      }}>
        <AnimatePresence mode="wait">
          {/* 1. VOICE NOTE */}
          {stage === "note" && (
            <motion.div
              key="note"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ width: "100%", maxWidth: 380, textAlign: "center" }}
            >
              <p style={{ fontStyle: "italic", color: MUTED, margin: "0 0 6px", fontSize: 14 }}>new voice message</p>
              <h2 style={{ fontSize: "clamp(30px, 8vw, 40px)", margin: "0 0 28px", lineHeight: 1.1, fontWeight: 700 }}>
                {f.heading}, {content.name}
              </h2>

              <div style={{
                background: CARD, borderRadius: 22, padding: "16px 18px", display: "flex", alignItems: "center", gap: 14, border: EDGE,
              }}>
                <button
                  onClick={togglePlay}
                  aria-label={playing ? "Pause voice message" : "Play voice message"}
                  style={{
                    width: 46, height: 46, borderRadius: "50%", border: "none", background: ACCENT, color: "#1a0f24",
                    fontSize: 18, cursor: "pointer", flexShrink: 0,
                  }}
                >
                  {playing ? "❚❚" : "▶"}
                </button>
                <div style={{ display: "flex", alignItems: "center", gap: 3, height: 34, flex: 1 }}>
                  {BARS.map((h, i) => (
                    <div
                      key={i}
                      style={{
                        width: 3, height: h, borderRadius: 2, transition: "background 0.2s",
                        background: i / BARS.length < progress ? GOLD : "rgba(243,236,250,0.25)",
                      }}
                    />
                  ))}
                </div>
              </div>

              <p style={{ color: MUTED, fontSize: 13, margin: "16px 0 0", fontStyle: "italic" }}>{f.hint}</p>
              <button
                onClick={startUpload}
                style={{
                  marginTop: 18, background: "none", border: "none", color: MUTED, fontFamily: serif, fontSize: 12,
                  textDecoration: "underline", cursor: "pointer",
                }}
              >
                {f.skipLabel}
              </button>
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