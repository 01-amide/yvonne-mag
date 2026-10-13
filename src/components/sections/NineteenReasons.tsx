import { motion } from "framer-motion";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const reasons = [
  { id: 1,  text: "she always has something interesting to say" },
  { id: 2,  text: "she has a contagiuos laugh that makes the most serious moments funny" },
  { id: 3,  text: "the way she enjoys arguing, i've learnt to love the banter as well" },
  { id: 4,  text: "her terrible decision making that keeps everything entertaining" },
  { id: 5,  text: "she's extremely dramatic for no reason" },
  { id: 6,  text: "she's a lover girl, even though she tries to act like a thug" },
  { id: 7,  text: "the fact we have nothing in common but we're still so close" },
  { id: 8,  text: "the way she shows up, even from far away" },
  { id: 9,  text: "she's obsessed with me (obviously)" },
  { id: 10, text: "her glasses, they're so cute on her" },
  { id: 11, text: "the faces she makes when she's trying not to laugh" },
  { id: 12, text: "how she likes getting my opinion on almost everything" },
  { id: 13, text: "how delusional she becomes when she likes something" },
  { id: 14, text: "how she randomly starts singing on calls (she can't sing)" },
  { id: 15, text: "the way she says your name when she's excited about something" },
  { id: 16, text: "she's actually funny (not more than me though)" },
  { id: 17, text: "she has money she wants to use to take us to Paris" },
  { id: 18, text: "she spoils me with cute videos of herself" },
  { id: 19, text: "HER - as a whole, with all the good and bad" },
];

const alignments = ["left","center","left","right","left","center","right","left","center","right","left","right","center","left","right","center","left","right","center"];
const sizes = ["lg","sm","md","lg","sm","lg","md","lg","sm","md","lg","sm","md","lg","sm","lg","md","sm","lg"];
const fontSizeMap = { sm: "clamp(14px, 1.8vw, 18px)", md: "clamp(16px, 2.2vw, 22px)", lg: "clamp(20px, 3vw, 30px)" };
const maxWidthMap = { sm: "min(420px, 100%)", md: "min(520px, 100%)", lg: "min(660px, 100%)" };

export default function NineteenReasons() {
  const isNarrow = useMediaQuery("(max-width: 640px)");

  return (
    <section style={{
      background: "var(--bg)",
      minHeight: "100vh",
      position: "relative",
      overflow: "hidden",
      padding: "clamp(48px, 8vw, 80px) clamp(24px, 8vw, 120px)",
    }}>
      {/* Faint ruled lines */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(var(--accent-rgb), 0.1) 60px)",
        pointerEvents: "none",
      }} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ textAlign: "center", marginBottom: "clamp(40px, 7vw, 80px)", position: "relative", zIndex: 1 }}
      >
        <p style={{
          fontFamily: "var(--font-sans)", fontStyle: "italic",
          fontSize: "clamp(11px, 1.4vw, 13px)", color: "var(--accent)",
          letterSpacing: "0.3em", textTransform: "uppercase", margin: "0 0 10px 0",
        }}>
          ✦ &nbsp; a love letter in list form &nbsp; ✦
        </p>
        <h2 style={{
          fontFamily: "var(--font-sans)", fontWeight: 700,
          fontSize: "clamp(36px, 6vw, 72px)", color: "var(--text)",
          margin: 0, lineHeight: 1, letterSpacing: "-0.02em",
        }}>
          19 reasons{" "}
          <span style={{ fontStyle: "italic", color: "var(--accent)" }}>why</span>
        </h2>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "12px", marginTop: "16px",
        }}>
          <div style={{ height: "1px", width: "60px", background: "var(--accent)" }} />
          <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--accent)" }} />
          <div style={{ height: "1px", width: "60px", background: "var(--accent)" }} />
        </div>
        <p style={{
          fontFamily: "var(--font-sans)", fontStyle: "italic",
          fontSize: "clamp(13px, 1.7vw, 16px)", color: "var(--muted)",
          margin: "14px 0 0 0",
        }}>
          because 19 years of her deserves at least this many reasons
        </p>
      </motion.div>

      {/* Reasons */}
      <div style={{
        position: "relative", zIndex: 1,
        display: "flex", flexDirection: "column",
        gap: "clamp(20px, 3vw, 32px)",
      }}>
        {reasons.map((reason, i) => {
          const align = alignments[i] as "left" | "center" | "right";
          const size = sizes[i] as "sm" | "md" | "lg";
          const effectiveAlign = isNarrow ? "left" : align;
          const isCenter = effectiveAlign === "center";
          const isRight = effectiveAlign === "right";

          return (
            <motion.div
              key={reason.id}
              initial={{ opacity: 0, x: isNarrow ? 0 : isRight ? 40 : isCenter ? 0 : -40, y: isCenter ? 20 : 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: isCenter ? "center" : isRight ? "flex-end" : "flex-start",
                maxWidth: maxWidthMap[size],
                width: "100%",
                marginLeft: isRight ? "auto" : isCenter ? "auto" : undefined,
                marginRight: isRight ? undefined : isCenter ? "auto" : undefined,
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px", width: "100%" }}>
                <span style={{
                  fontFamily: "var(--font-sans)", fontStyle: "italic",
                  fontSize: "clamp(11px, 1.3vw, 13px)", color: "var(--accent)",
                  letterSpacing: "0.1em", flexShrink: 0, opacity: 0.8,
                }}>
                  {String(reason.id).padStart(2, "0")}
                </span>
                <p style={{
                  fontFamily: "var(--font-sans)",
                  fontStyle: size === "lg" ? "italic" : "normal",
                  fontWeight: size === "lg" ? 700 : 400,
                  fontSize: fontSizeMap[size],
                  color: size === "lg" ? "var(--text)" : "var(--subtext)",
                  margin: 0, lineHeight: 1.4,
                  textAlign: isNarrow ? "left" : isCenter ? "center" : isRight ? "right" : "left",
                }}>
                  {reason.text}
                </p>
              </div>

              {size === "lg" && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: i * 0.04 + 0.3, duration: 0.5 }}
                  style={{
                    height: "1px", width: "100%",
                    background: "linear-gradient(to right, #e5989b44, transparent)",
                    marginTop: "8px",
                    transformOrigin: isNarrow ? "left" : isRight ? "right" : "left",
                  }}
                />
              )}
            </motion.div>
          );
        })}

        {/* Closing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{ textAlign: "center", marginTop: "clamp(24px, 4vw, 48px)" }}
        >
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: "12px", marginBottom: "16px",
          }}>
            <div style={{ height: "1px", width: "80px", background: "var(--accent)" }} />
            <span style={{ fontSize: "18px" }}>💗</span>
            <div style={{ height: "1px", width: "80px", background: "var(--accent)" }} />
          </div>
          <p style={{
            fontFamily: "var(--font-sans)", fontStyle: "italic",
            fontSize: "clamp(13px, 1.8vw, 17px)", color: "var(--muted)",
            margin: 0, lineHeight: 1.7,
          }}>
            happy 19th, Silvia. here's to a hundred more reasons.
          </p>
        </motion.div>
      </div>
    </section>
  );
}