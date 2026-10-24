import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { content, type Post } from "../../content";
import PostViewer from "./PostViewer";
import { useCountUp } from "../../hooks/useCountUp";

type Props = { onNext: () => void };

const fmt = (n: number) => new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n);
const mono: React.CSSProperties = { fontFamily: "var(--font-mono)", letterSpacing: "0.06em" };

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ margin: 0, fontSize: 18, fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>{value}</p>
      <p style={{ margin: "2px 0 0", fontSize: 12, color: "var(--muted)" }}>{label}</p>
    </div>
  );
}

export default function ProfileScreen({ onNext }: Props) {
  const { handle, avatar, bio, followers, following } = content.profile;
  const [isFollowing, setIsFollowing] = useState(true);
  const [openPost, setOpenPost] = useState<Post | null>(null);
  const followerCount = useCountUp(followers);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35 } }}
      style={{ position: "absolute", inset: 0, background: "var(--bg)", color: "var(--text)", fontFamily: "var(--font-sans)", overflow: "hidden" }}
    >
      <div style={{ height: "100%", overflowY: "auto", paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 96px)" }}>
        {/* Top bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "calc(env(safe-area-inset-top, 0px) + 22px) 18px 8px",
        }}>
          <span style={{ fontSize: 18, fontWeight: 800 }}>{handle} <span style={{ color: "var(--accent-light)", fontSize: 14 }}>✔</span></span>
          <span style={{ letterSpacing: 3, fontSize: 18, color: "var(--subtext)" }}>•••</span>
        </div>

        {/* Avatar + stats */}
        <div style={{ display: "flex", alignItems: "center", gap: 22, padding: "10px 18px" }}>
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 160, damping: 14, delay: 0.1 }}
            style={{ width: 92, height: 92, borderRadius: "50%", padding: 3, flexShrink: 0,
              background: "linear-gradient(45deg, var(--gold), var(--accent), var(--accent-deep))" }}
          >
            <div style={{ width: "100%", height: "100%", borderRadius: "50%", padding: 3, background: "var(--bg)" }}>
              <div style={{
                width: "100%", height: "100%", borderRadius: "50%", display: "grid", placeItems: "center", fontSize: 34, fontWeight: 800,
                background: avatar ? `url(${avatar}) center/cover` : "linear-gradient(135deg, var(--accent), var(--accent-deep))",
              }}>
                {!avatar && content.name.charAt(0)}
              </div>
            </div>
          </motion.div>

          <div style={{ flex: 1, display: "flex", justifyContent: "space-around" }}>
            <Stat value={String(content.posts.length)} label="posts" />
            <Stat value={fmt(followerCount + (isFollowing ? 0 : -1))} label="followers" />
            <Stat value={String(following)} label="following" />
          </div>
        </div>

        {/* Bio */}
        <div style={{ padding: "6px 18px 0" }}>
          <p style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>{content.name}</p>
          {bio.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.15 }}
              style={{ margin: "2px 0 0", fontSize: 14, lineHeight: 1.4, color: "var(--subtext)" }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 8, padding: "14px 18px" }}>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setIsFollowing((f) => !f)}
            style={{
              flex: 1, padding: "9px 0", borderRadius: 10, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 700,
              background: isFollowing ? "var(--surface-2)" : "var(--accent)", color: "#fff",
            }}
          >
            {isFollowing ? "Following ✓" : "Follow"}
          </motion.button>
          <div style={{
            ...mono, flex: 1, padding: "9px 0", borderRadius: 10, textAlign: "center", fontSize: 12, display: "grid", placeItems: "center",
            background: "rgba(226,194,122,0.12)", border: "1px solid rgba(226,194,122,0.4)", color: "var(--gold)",
          }}>
            🎂 BIRTHDAY TODAY
          </div>
        </div>

        {/* Grid */}
        <div style={{ borderTop: "1px solid var(--border)", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, paddingTop: 2 }}>
          {content.posts.map((post, i) => (
            <motion.button
              key={post.id}
              onClick={() => setOpenPost(post)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.06, duration: 0.4 }}
              whileTap={{ scale: 0.96 }}
              style={{
                position: "relative", aspectRatio: "1 / 1", border: "none", padding: 0, cursor: "pointer", overflow: "hidden",
                background: "var(--surface)", display: "grid", placeItems: "center", fontSize: 38,
              }}
            >
              {post.src && post.type === "image" && (
                <img src={post.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              )}
              {post.src && post.type === "video" && (
                <video src={post.src} muted playsInline preload="metadata" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              )}
              {!post.src && (
                <div style={{
                  width: "100%", height: "100%", display: "grid", placeItems: "center",
                  background: "radial-gradient(ellipse at 30% 25%, rgba(var(--accent-rgb),0.35), transparent 70%), var(--surface)",
                }}>
                  {post.emoji}
                </div>
              )}
              {post.type === "video" && (
                <span style={{ position: "absolute", top: 6, right: 6, fontSize: 12, color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}>▶</span>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Next screen pill */}
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: "calc(env(safe-area-inset-bottom, 0px) + 20px)",
        display: "flex", justifyContent: "center", pointerEvents: "none",
      }}>
        <motion.button
          onClick={onNext}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          whileTap={{ scale: 0.96 }}
          style={{
            pointerEvents: "auto", padding: "13px 26px", borderRadius: 999, border: "1px solid var(--gold)",
            background: "rgba(20,11,31,0.85)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
            color: "var(--gold)", fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 700, cursor: "pointer",
          }}
        >
          Next: Birthday Bank →
        </motion.button>
      </div>

      <AnimatePresence>
        {openPost && <PostViewer key={openPost.id} post={openPost} onClose={() => setOpenPost(null)} />}
      </AnimatePresence>
    </motion.div>
  );
}