import { motion } from "framer-motion";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const items = [
  { id: 1, type: "video" as const, src: "/bluewhite.MP4",       shape: "circle",   width: 280, height: 280, top: "5%",  left: "4%",  rotate: -8,  zIndex: 4, borderRadius: "50%"  },
  { id: 2, type: "photo" as const, src: "/peace_kiss.jpeg",     shape: "squircle", width: 220, height: 270, top: "3%",  left: "36%", rotate: 6,   zIndex: 3, borderRadius: "30px" },
  { id: 3, type: "video" as const, src: "/mirror.MOV",  shape: "heart",    width: 280, height: 280, top: "2%",  left: "66%", rotate: 8,   zIndex: 2, borderRadius: "0"    },
  { id: 4, type: "photo" as const, src: "/closeface.jpeg",     shape: "heart",    width: 260, height: 260, top: "42%", left: "2%",  rotate: -10, zIndex: 5, borderRadius: "0"    },
  { id: 5, type: "video" as const, src: "/camo.mp4",  shape: "squircle", width: 260, height: 300, top: "38%", left: "34%", rotate: -5,  zIndex: 6, borderRadius: "32px" },
  { id: 6, type: "photo" as const, src: "/purple.jpeg",     shape: "circle",   width: 210, height: 210, top: "44%", left: "70%", rotate: -6,  zIndex: 3, borderRadius: "50%"  },
];

const decoratives = [
  { emoji: "🌸", top: "2%",  left: "32%", rotate: 15,  size: 32, delay: 0.3 },
  { emoji: "💋", top: "8%",  left: "58%", rotate: -20, size: 28, delay: 0.5 },
  { emoji: "❤️", top: "18%", left: "88%", rotate: 10,  size: 35, delay: 0.4 },
  { emoji: "🌺", top: "30%", left: "24%", rotate: -12, size: 30, delay: 0.6 },
  { emoji: "❤️", top: "35%", left: "62%", rotate: 18,  size: 24, delay: 0.7 },
  { emoji: "💋", top: "48%", left: "22%", rotate: -8,  size: 25, delay: 0.5 },
  { emoji: "🌸", top: "52%", left: "56%", rotate: 22,  size: 28, delay: 0.8 },
  { emoji: "💋", top: "58%", left: "82%", rotate: -15, size: 32, delay: 0.4 },
  { emoji: "🌺", top: "68%", left: "6%",  rotate: 8,   size: 34, delay: 0.6 },
  { emoji: "❤️", top: "72%", left: "44%", rotate: -18, size: 35, delay: 0.9 },
  { emoji: "🌸", top: "78%", left: "72%", rotate: 12,  size: 30, delay: 0.5 },
  { emoji: "💋", top: "85%", left: "30%", rotate: -10, size: 28, delay: 0.7 },
  { emoji: "🌺", top: "88%", left: "88%", rotate: 20,  size: 32, delay: 0.6 },
  { emoji: "❤️", top: "14%", left: "1%", rotate: -6,  size: 30, delay: 0.3 },
];

// Proper SVG bezier heart path using objectBoundingBox units (0–1)
const HEART_SVG_PATH =
  "M0.5,0.85 C0.2,0.65 0.02,0.45 0.02,0.28 C0.02,0.12 0.14,0.05 0.28,0.05 C0.38,0.05 0.46,0.1 0.5,0.18 C0.54,0.1 0.62,0.05 0.72,0.05 C0.86,0.05 0.98,0.12 0.98,0.28 C0.98,0.45 0.8,0.65 0.5,0.85 Z";

function MediaItem({ item }: { item: typeof items[0] }) {
  const media =
    item.type === "video" ? (
      <video src={item.src} autoPlay muted loop playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    ) : (
      <img src={item.src} alt=""
        style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    );

  const overlay = (
    <div style={{
      position: "absolute", inset: 0,
      background: "linear-gradient(135deg, rgba(var(--accent-rgb), 0.08) 0%, transparent 60%)",
      pointerEvents: "none",
    }} />
  );

  if (item.shape === "heart") {
    const clipId = `heart-clip-${item.id}`;
    return (
      <>
        {/* Hidden SVG defs for clip path */}
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <clipPath id={clipId} clipPathUnits="objectBoundingBox">
              <path d={HEART_SVG_PATH} />
            </clipPath>
          </defs>
        </svg>

        {/* Clipped media container */}
        <div style={{
          width: "100%", height: "100%",
          clipPath: `url(#${clipId})`,
          position: "relative",
        }}>
          {media}
          {overlay}
        </div>
      </>
    );
  }

  return (
    <>
      {media}
      {overlay}
    </>
  );
}

export default function ScatteredGallery() {
  /** Laptop+ — original 3-across scattered collage */
  const isLaptopCollage = useMediaQuery("(min-width: 1024px)");
  /** Tablet — 2 items per row */
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");

  return (
    <section style={{
      background: "var(--bg-deep)",
      minHeight: "110vh",
      position: "relative",
      overflow: "hidden",
      padding: "clamp(48px, 8vw, 80px) clamp(16px, 4vw, 48px)",
    }}>
      {/* Grain overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ textAlign: "center", position: "relative", zIndex: 10, marginBottom: "clamp(32px, 5vw, 56px)" }}
      >
        <p style={{
          fontFamily: "var(--font-sans)", fontStyle: "italic",
          fontSize: "clamp(11px, 1.4vw, 13px)", color: "var(--accent)",
          letterSpacing: "0.3em", textTransform: "uppercase", margin: "0 0 10px 0",
        }}>
          ✦ &nbsp; a little collection &nbsp; ✦
        </p>
        <h2 style={{
          fontFamily: "var(--font-sans)", fontWeight: 700,
          fontSize: "clamp(36px, 6vw, 72px)", color: "#ffffff",
          margin: 0, lineHeight: 1, letterSpacing: "-0.02em",
        }}>
          just <span style={{ fontStyle: "italic", color: "var(--accent)" }}>her</span>
        </h2>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginTop: "16px" }}>
          <div style={{ height: "1px", width: "60px", background: "rgba(var(--accent-rgb), 0.4)" }} />
          <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--accent)" }} />
          <div style={{ height: "1px", width: "60px", background: "rgba(var(--accent-rgb), 0.4)" }} />
        </div>

        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontStyle: "italic",
            fontSize: "clamp(12px, 1.5vw, 14px)",
            color: "var(--muted)",
            margin: "12px 0 0 0",
          }}
        >
          A deserved section to appreciate the prettiest ever
        </p>
      </motion.div>

      {/* Scattered shapes — laptop collage / tablet 2-col / phone 1-col */}
      <div
        style={{
          position: "relative",
          width: "100%",
          zIndex: 1,
          ...(isLaptopCollage
            ? { height: "min(900px, 118vw)" }
            : isTablet
              ? {
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "clamp(16px, 3vw, 28px)",
                  maxWidth: 920,
                  margin: "0 auto",
                  paddingBottom: 24,
                  alignItems: "start",
                }
              : {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "clamp(20px, 5vw, 32px)",
                  paddingBottom: 24,
                }),
        }}
      >

        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.5, rotate: item.rotate - 10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: isLaptopCollage ? item.rotate : 0 }}
            whileHover={{ scale: 1.06, zIndex: 20, rotate: 0 }}
            transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: isLaptopCollage ? "absolute" : "relative",
              ...(isLaptopCollage
                ? {
                    top: item.top,
                    left: item.left,
                    width: item.width,
                    height: item.height,
                  }
                : isTablet
                  ? {
                      top: "auto",
                      left: "auto",
                      width: "100%",
                      maxWidth: 420,
                      margin: "0 auto",
                      aspectRatio: `${item.width} / ${item.height}`,
                      height: "auto",
                    }
                  : {
                      top: "auto",
                      left: "auto",
                      width: "min(92vw, 340px)",
                      aspectRatio: `${item.width} / ${item.height}`,
                      height: "auto",
                    }),
              zIndex: item.zIndex,
              borderRadius: item.shape === "heart" ? undefined : item.borderRadius,
              overflow: item.shape === "heart" ? "visible" : "hidden",
              boxShadow: item.shape === "heart"
                ? "none"
                : "0 20px 60px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3)",
              cursor: "default",
              willChange: "transform",
            }}
          >
            <MediaItem item={item} />
          </motion.div>
        ))}

        {isLaptopCollage && (
          <>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.8 }}
          style={{
            position: "absolute", top: "28%", left: "56%",
            fontFamily: "var(--font-sans)", fontStyle: "italic",
            fontSize: "clamp(11px, 1.3vw, 13px)", color: "rgba(var(--accent-rgb), 0.5)",
            letterSpacing: "0.2em", textTransform: "uppercase",
            transform: "rotate(90deg)", transformOrigin: "left center", whiteSpace: "nowrap",
          }}>
          that girl ✦
        </motion.p>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1 }}
          style={{
            position: "absolute", top: "62%", left: "58%",
            fontFamily: "var(--font-sans)", fontStyle: "italic",
            fontSize: "clamp(11px, 1.3vw, 13px)", color: "rgba(var(--accent-rgb), 0.5)",
            letterSpacing: "0.2em", textTransform: "uppercase",
            transform: "rotate(-12deg)", whiteSpace: "nowrap",
          }}>
          always her ✦
        </motion.p>
          </>
        )}

        {isLaptopCollage &&
        decoratives.map((d, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0, rotate: d.rotate - 15 }}
            whileInView={{ opacity: 1, scale: 1, rotate: d.rotate }}
            transition={{ delay: d.delay, type: "spring", stiffness: 150, damping: 12 }}
            style={{
              position: "absolute", top: d.top, left: d.left,
              fontSize: d.size, lineHeight: 1,
              pointerEvents: "none", userSelect: "none",
              filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.3))",
              zIndex: 8,
            }}
          >
            {d.emoji}
          </motion.span>
        ))}
      </div>
    </section>
  );
}