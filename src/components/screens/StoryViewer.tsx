import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, type PanInfo } from "framer-motion";
import type { Story } from "../../content";
import { posterOf, warmItem } from "../../lib/media";

type Props = {
  story: Story;
  hasPrevStory: boolean;
  onClose: () => void;
  onNextStory: () => void;
  onPrevStory: () => void;
};

const IMAGE_DURATION = 5000; // ms per photo
const CLOSE_DISTANCE = 110; // px dragged down to close
const CLOSE_VELOCITY = 600; // px/s flick down to close
let hintShown = false; // show "swipe down to close" once per visit
const mono: React.CSSProperties = { fontFamily: "var(--font-mono)", letterSpacing: "0.06em" };

export default function StoryViewer({ story, hasPrevStory, onClose, onNextStory, onPrevStory }: Props) {
  const [idx, setIdx] = useState(0);
  const [progress, setProgress] = useState(0); // 0..1 for the current item
  const [paused, setPaused] = useState(false);
  const [restart, setRestart] = useState(0); // bump to restart the current item
  const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pausedRef = useRef(false);
  const pressAt = useRef(0);
  const dragEndAt = useRef(0);
  const [showHint] = useState(() => {
    const show = !hintShown;
    hintShown = true;
    return show;
  });

  // Drag-down-to-close: the card follows the finger, shrinks and rounds off, the backdrop fades
  const y = useMotionValue(0);
  const scale = useTransform(y, [0, 320], [1, 0.8]);
  const radius = useTransform(y, [0, 120], [0, 32]);
  const backdrop = useTransform(y, [0, 300], ["rgba(0,0,0,1)", "rgba(0,0,0,0)"]);
  const heartId = useRef(0);

  const item = story.items[idx];
  const isVideo = item.type === "video" && !!item.src;
  const isImage = item.type === "image" && !!item.src;

  // Start downloading the next item while this one plays
  useEffect(() => {
    warmItem(story.items[idx + 1]);
  }, [story, idx]);

  const next = useCallback(() => {
    if (idx < story.items.length - 1) {
      setIdx((i) => i + 1);
      setProgress(0);
    } else {
      onNextStory();
    }
  }, [idx, story.items.length, onNextStory]);

  const prev = useCallback(() => {
    if (idx > 0) {
      setIdx((i) => i - 1);
      setProgress(0);
    } else if (hasPrevStory) {
      onPrevStory();
    } else {
      setProgress(0);
      setRestart((k) => k + 1);
    }
  }, [idx, hasPrevStory, onPrevStory]);

  // Keep the latest next/paused available to the animation loop
  const nextRef = useRef(next);
  useEffect(() => {
    nextRef.current = next;
    pausedRef.current = paused;
  });

  // Timer for photos / placeholders (videos drive their own progress).
  // Restarts per item; holding to pause just stops the clock.
  useEffect(() => {
    if (isVideo) return;
    let p = 0;
    let raf = 0;
    let last = performance.now();
    const tick = (t: number) => {
      if (!pausedRef.current) p += (t - last) / IMAGE_DURATION;
      last = t;
      setProgress(Math.min(p, 1));
      if (p >= 1) {
        nextRef.current();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [idx, isVideo, restart]);

  // Hold to pause also pauses videos
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (paused) v.pause();
    else v.play().catch(() => {});
  }, [paused]);

  const onPointerDown = () => {
    pressAt.current = Date.now();
    setPaused(true);
  };
  const onPointerUp = () => setPaused(false);

  const zone = (dir: "prev" | "next") => () => {
    if (Date.now() - pressAt.current > 250) return; // it was a hold, not a tap
    if (Date.now() - dragEndAt.current < 400) return; // it was the end of a drag
    if (dir === "prev") prev();
    else next();
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    dragEndAt.current = Date.now();
    setPaused(false);
    if (info.offset.y > CLOSE_DISTANCE || info.velocity.y > CLOSE_VELOCITY) onClose();
  };

  // Escape closes (desktop)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const sendHeart = () => {
    const id = heartId.current++;
    setHearts((h) => [...h, { id, x: Math.random() * 60 - 30 }]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{ position: "absolute", inset: 0, zIndex: 40, background: backdrop }}
    >
    <motion.div
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0, bottom: 0.9 }}
      dragSnapToOrigin
      onDragStart={() => setPaused(true)}
      onDragEnd={handleDragEnd}
      style={{
        y, scale, borderRadius: radius,
        position: "absolute", inset: 0, background: "#000", color: "#fff",
        fontFamily: "var(--font-sans)", overflow: "hidden", userSelect: "none", touchAction: "none",
      }}
    >
      {/* Media */}
      {isVideo && (
        <video
          key={`${story.id}-${idx}`}
          ref={videoRef}
          src={item.src}
          poster={posterOf(item.src)}
          autoPlay
          muted
          playsInline
          onTimeUpdate={(e) => {
            const v = e.currentTarget;
            if (v.duration) setProgress(v.currentTime / v.duration);
          }}
          onEnded={next}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
      {isImage && (
        <img src={item.src} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      )}
      {!isVideo && !isImage && (
        <div style={{
          position: "absolute", inset: 0, display: "grid", placeItems: "center", fontSize: 96,
          background: `radial-gradient(ellipse at 30% 20%, rgba(var(--accent-rgb),0.55), transparent 60%),
                       radial-gradient(ellipse at 80% 85%, rgba(226,194,122,0.2), transparent 55%), var(--bg-deep)`,
        }}>
          {story.emoji}
        </div>
      )}

      {/* Readability gradients */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(to bottom, rgba(0,0,0,0.55), transparent 22%, transparent 65%, rgba(0,0,0,0.65))",
      }} />

      {/* Tap zones: left third = back, rest = forward. Hold anywhere to pause. */}
      <div
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{ position: "absolute", inset: 0, display: "flex", zIndex: 2 }}
      >
        <div onClick={zone("prev")} style={{ flex: 1 }} />
        <div onClick={zone("next")} style={{ flex: 2 }} />
      </div>

      {/* Progress bars */}
      <div style={{
        position: "absolute", top: "calc(env(safe-area-inset-top, 0px) + 12px)", left: 12, right: 12,
        display: "flex", gap: 4, zIndex: 5, pointerEvents: "none",
      }}>
        {story.items.map((_, i) => (
          <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: "rgba(255,255,255,0.3)", overflow: "hidden" }}>
            <div style={{
              height: "100%", background: "#fff",
              width: `${i < idx ? 100 : i === idx ? Math.min(progress, 1) * 100 : 0}%`,
            }} />
          </div>
        ))}
      </div>

      {/* Header */}
      <div style={{
        position: "absolute", top: "calc(env(safe-area-inset-top, 0px) + 28px)", left: 14, right: 14,
        display: "flex", alignItems: "center", gap: 10, zIndex: 5,
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: "50%", display: "grid", placeItems: "center", fontSize: 16,
          background: story.cover ? `url(${story.cover}) center/cover` : "linear-gradient(135deg, var(--accent), var(--accent-deep))",
        }}>
          {!story.cover && story.emoji}
        </div>
        <span style={{ fontSize: 14, fontWeight: 700 }}>{story.title}</span>
        <span style={{ ...mono, fontSize: 11, color: "rgba(255,255,255,0.6)" }}>now</span>
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            marginLeft: "auto", width: 44, height: 44, display: "grid", placeItems: "center", marginRight: -8,
            background: "rgba(0,0,0,0.25)", border: "none", borderRadius: "50%", color: "#fff", fontSize: 20, cursor: "pointer",
          }}
        >
          ✕
        </button>
      </div>

      {/* Caption */}
      {item.caption && (
        <motion.div
          key={`${story.id}-${idx}-cap`}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{
            position: "absolute", left: 20, right: 20, bottom: "calc(env(safe-area-inset-bottom, 0px) + 84px)",
            zIndex: 3, display: "flex", justifyContent: "center", pointerEvents: "none",
          }}
        >
          <span style={{
            padding: "10px 16px", borderRadius: 14, textAlign: "center", fontSize: 16, fontWeight: 600, lineHeight: 1.35,
            background: "rgba(20,11,31,0.6)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
            border: "1px solid var(--border)",
          }}>
            {item.caption}
          </span>
        </motion.div>
      )}

      {/* Heart button + floating hearts */}
      <div style={{
        position: "absolute", right: 20, bottom: "calc(env(safe-area-inset-bottom, 0px) + 22px)", zIndex: 6,
      }}>
        {hearts.map((h) => (
          <motion.span
            key={h.id}
            initial={{ opacity: 1, y: 0, x: h.x, scale: 0.8 }}
            animate={{ opacity: 0, y: -220, scale: 1.4 }}
            transition={{ duration: 1.3, ease: "easeOut" }}
            onAnimationComplete={() => setHearts((arr) => arr.filter((x) => x.id !== h.id))}
            style={{ position: "absolute", right: 6, bottom: 0, fontSize: 28, pointerEvents: "none" }}
          >
            💜
          </motion.span>
        ))}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={sendHeart}
          aria-label="Send a heart"
          style={{
            width: 48, height: 48, borderRadius: "50%", border: "1px solid var(--border)", fontSize: 22,
            background: "rgba(20,11,31,0.55)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", cursor: "pointer",
          }}
        >
          🤍
        </motion.button>
      </div>

      {/* One-time hint */}
      {showHint && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ delay: 0.7, duration: 3.4, times: [0, 0.12, 0.8, 1] }}
          style={{
            position: "absolute", left: 0, right: 0, bottom: "calc(env(safe-area-inset-bottom, 0px) + 34px)",
            display: "flex", justifyContent: "center", pointerEvents: "none", zIndex: 6,
          }}
        >
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.06em", padding: "7px 14px", borderRadius: 999,
            background: "rgba(20,11,31,0.7)", border: "1px solid var(--border)",
          }}>
            swipe down to close ⌄
          </span>
        </motion.div>
      )}
    </motion.div>
    </motion.div>
  );
}