import { motion } from "framer-motion";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export default function Hero() {
  const isNarrow = useMediaQuery("(max-width: 768px)");

  return (
    <section
      style={{
        height: "100vh",
        minHeight: "600px",
        position: "relative",
        overflow: "hidden",
        background: "var(--bg-deep)",
      }}
    >
      {/* Blurred background */}
      <img
        src="/redtop.jpeg"
        alt=""
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "blur(28px) brightness(0.35) saturate(0.8)",
          transform: "scale(1.2)",
        }}
      />

      {/* Grain texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.4,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Gradient vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.10) 100%)",
          zIndex: 1,
        }}
      />

      {/* Foreground image */}
      <div
        style={{
          position: "absolute",
          ...(isNarrow
            ? {
                inset: 0,
                width: "100%",
                height: "100%",
              }
            : {
                right: 0,
                top: 0,
                height: "100%",
                width: "45%",
              }),
          zIndex: 2,
        }}
      >
        <motion.img
          src="/redtop.jpeg"
          alt="Silvia"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            opacity: isNarrow ? 0.35 : 1,
          }}
        />
        {/* Fade image into background on left edge */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: isNarrow
              ? "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.65) 100%)"
              : "linear-gradient(to right, rgba(0,0,0,0.9) 0%, transparent 35%)",
          }}
        />
      </div>

      {/* Text content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "clamp(24px, 5vw, 56px)",
        }}
      >
        {/* Top bar */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontStyle: "italic",
              fontSize: "clamp(12px, 1.5vw, 15px)",
              color: "var(--accent)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Est. {new Date().getFullYear()}
          </span>
          <div style={{ height: "1px", width: "48px", background: "#e5989b88" }} />
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(11px, 1.4vw, 14px)",
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            Special Edition
          </span>
        </motion.div>

        {/* Center main text */}
        <div style={{ maxWidth: isNarrow ? "100%" : "min(620px, 55%)", width: "100%" }}>
          {/* Issue label */}
          <motion.p
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(10px, 1.3vw, 13px)",
              color: "var(--accent)",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              margin: "0 0 16px 0",
            }}
          >
            ✦ &nbsp; Birthday Edition &nbsp; ✦
          </motion.p>

          {/* BIRTHDAY headline */}
          <div style={{ overflow: "hidden", whiteSpace: "normal", lineHeight: 0.88,}}>
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: "clamp(52px, 11vw, 140px)",
                lineHeight: 0.88,
                margin: 0,
                color: "#ffffff",
                letterSpacing: "-0.03em",
              }}
            >
              BIRTH
              <br />
              <span style={{ color: "var(--accent)", fontStyle: "italic" }}>DAY</span>
            </motion.h1>
          </div>

          {/* MAGAZINE subheading */}
          <div style={{ overflow: "hidden" }}>
            <motion.p
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "var(--font-sans)",
                fontStyle: "italic",
                fontSize: "clamp(18px, 3.5vw, 46px)",
                color: "rgba(255,255,255,0.6)",
                margin: "4px 0 0 4px",
                letterSpacing: "0.12em",
              }}
            >
              Magazine
            </motion.p>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              margin: "28px 0",
              transformOrigin: "left",
            }}
          >
            <div style={{ height: "1px", width: "80px", background: "var(--accent)" }} />
            <div
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "var(--accent)",
              }}
            />
          </motion.div>

          {/* Pull quote */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            style={{
              fontFamily: "var(--font-sans)",
              fontStyle: "italic",
              fontSize: "clamp(13px, 1.8vw, 19px)",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.65,
              margin: 0,
              maxWidth: "420px",
            }}
          >
            All you need to know about the one and only,
            <br />as she celebrates her 19th
          </motion.p>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >

          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontStyle: "italic",
              fontSize: "clamp(11px, 1.4vw, 14px)",
              color: "var(--accent)",
            }}
          >
            Silvia ✦
          </span>
        </motion.div>
      </div>
    </section>
  );
}