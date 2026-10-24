import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useDragControls, useMotionValue, useTransform, type PanInfo } from "framer-motion";
import { content, type Post } from "../../content";

type Props = { post: Post; onClose: () => void };

const CLOSE_DISTANCE = 110; // px dragged down to close
const CLOSE_VELOCITY = 600; // px/s flick down to close

const fmt = (n: number) => new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n);

export default function PostViewer({ post, onClose }: Props) {
  const [liked, setLiked] = useState(false);
  const [burst, setBurst] = useState(0);
  const lastTap = useRef(0);

  // Drag-down-to-close from the handle/header: the sheet follows the finger and the backdrop fades
  const controls = useDragControls();
  const y = useMotionValue(0);
  const backdrop = useTransform(y, [0, 420], ["rgba(0,0,0,0.65)", "rgba(0,0,0,0)"]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > CLOSE_DISTANCE || info.velocity.y > CLOSE_VELOCITY) onClose();
  };

  // Escape closes (desktop)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  const { handle, avatar } = content.profile;

  const onMediaTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 320) {
      setLiked(true);
      setBurst((b) => b + 1);
    }
    lastTap.current = now;
  };

  const toggleLike = () => {
    setLiked((l) => !l);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: "absolute", inset: 0, zIndex: 40, background: backdrop }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        drag="y"
        dragListener={false}
        dragControls={controls}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.7 }}
        dragSnapToOrigin
        onDragEnd={handleDragEnd}
        style={{
          y,
          position: "absolute", left: 0, right: 0, bottom: 0, height: "92%",
          background: "var(--bg)", borderRadius: "24px 24px 0 0", overflowY: "auto",
          border: "1px solid var(--border)", borderBottom: "none", color: "var(--text)", fontFamily: "var(--font-sans)",
        }}
      >
        {/* Grab handle + header: drag down from here to close */}
        <div onPointerDown={(e) => controls.start(e)} style={{ touchAction: "none", cursor: "grab" }}>
          <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 6px" }}>
            <div style={{ width: 44, height: 5, borderRadius: 3, background: "rgba(255,255,255,0.3)" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 14px 10px" }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 14,
              background: avatar ? `url(${avatar}) center/cover` : "linear-gradient(135deg, var(--accent), var(--accent-deep))",
            }}>
              {!avatar && content.name.charAt(0)}
            </div>
            <span style={{ fontSize: 14, fontWeight: 700 }}>{handle}</span>
            <button
              onClick={onClose}
              onPointerDown={(e) => e.stopPropagation()}
              aria-label="Close"
              style={{
                marginLeft: "auto", width: 44, height: 44, display: "grid", placeItems: "center", marginRight: -8,
                background: "rgba(255,255,255,0.08)", border: "none", borderRadius: "50%", color: "#fff", fontSize: 18, cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Media (double-tap to like) */}
        <div onClick={onMediaTap} style={{ position: "relative", width: "100%", aspectRatio: "1 / 1", background: "var(--surface)", overflow: "hidden" }}>
          {post.src && post.type === "video" && (
            <video src={post.src} autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          )}
          {post.src && post.type === "image" && (
            <img src={post.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          )}
          {!post.src && (
            <div style={{
              width: "100%", height: "100%", display: "grid", placeItems: "center", fontSize: 88,
              background: "radial-gradient(ellipse at 30% 25%, rgba(var(--accent-rgb),0.5), transparent 65%), var(--surface)",
            }}>
              {post.emoji}
            </div>
          )}
          <AnimatePresence>
            {burst > 0 && (
              <motion.span
                key={burst}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: [0, 1.3, 1], opacity: [1, 1, 0] }}
                transition={{ duration: 0.9, times: [0, 0.4, 1] }}
                style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", fontSize: 96, pointerEvents: "none" }}
              >
                💜
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Actions + info */}
        <div style={{ padding: "12px 14px 28px" }}>
          <div style={{ display: "flex", gap: 16, fontSize: 24, alignItems: "center" }}>
            <motion.button whileTap={{ scale: 0.8 }} onClick={toggleLike} aria-label="Like"
              style={{ background: "none", border: "none", fontSize: 26, cursor: "pointer", padding: 0 }}>
              {liked ? "💜" : "🤍"}
            </motion.button>
            <span>💬</span>
            <span>✈️</span>
          </div>
          <p style={{ margin: "10px 0 6px", fontSize: 14, fontWeight: 700 }}>{fmt(post.likes + (liked ? 1 : 0))} likes</p>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.45 }}>
            <b>{handle}</b> {post.caption}
          </p>
          {post.comments.length > 0 && (
            <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
              {post.comments.map((c, i) => (
                <p key={i} style={{ margin: 0, fontSize: 14, lineHeight: 1.45, color: "var(--subtext)" }}>
                  <b style={{ color: "var(--text)" }}>{c.user}</b> {c.text}
                </p>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}