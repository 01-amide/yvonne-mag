import { motion } from "framer-motion";

export default function CreatorNote() {
  return (
    <section
      style={{
        background: "var(--bg)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(48px, 8vw, 80px) clamp(24px, 5vw, 64px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Faint ruled lines */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(var(--accent-rgb), 0.08) 60px)",
        pointerEvents: "none",
      }} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ textAlign: "center", marginBottom: "clamp(32px, 5vw, 56px)", zIndex: 1 }}
      >
        <p style={{
          fontFamily: "var(--font-sans)", fontStyle: "italic",
          fontSize: "clamp(11px, 1.4vw, 13px)", color: "var(--accent)",
          letterSpacing: "0.3em", textTransform: "uppercase", margin: "0 0 10px 0",
        }}>
          ✦ &nbsp; a note from the creator &nbsp; ✦
        </p>
        <h2 style={{
          fontFamily: "var(--font-sans)", fontWeight: 700,
          fontSize: "clamp(32px, 5vw, 60px)", color: "var(--text)",
          margin: 0, lineHeight: 1, letterSpacing: "-0.02em",
        }}>
          made with{" "}
          <span style={{ fontStyle: "italic", color: "var(--accent)" }}>love</span>
        </h2>
      </motion.div>

      {/* Main content — polaroid + note */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "clamp(32px, 6vw, 80px)",
        flexWrap: "wrap",
        zIndex: 1,
        position: "relative",
        maxWidth: "900px",
        width: "100%",
      }}>

        {/* Polaroid video frame */}
        <motion.div
          initial={{ opacity: 0, rotate: -8, y: 30 }}
          whileInView={{ opacity: 1, rotate: -5, y: 0 }}
          whileHover={{ rotate: 0, scale: 1.03 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: "#ffffff",
            padding: "10px 10px 56px 10px",
            borderRadius: "4px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.08)",
            flexShrink: 0,
            cursor: "default",
          }}
        >
          <video
            src="/IMG_9741.MOV"
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "clamp(220px, 28vw, 300px)",
              height: "clamp(280px, 36vw, 380px)",
              objectFit: "cover",
              borderRadius: "2px",
              display: "block",
            }}
          />
          {/* Polaroid caption */}
          <p style={{
            fontFamily: "var(--font-sans)", fontStyle: "italic",
            fontSize: "13px", color: "var(--muted)",
            textAlign: "center", margin: "14px 0 0 0",
            letterSpacing: "0.05em",
          }}>
            the mastermind ✦
          </p>
        </motion.div>

        {/* The note */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ maxWidth: "420px" }}
        >
          {/* Decorative quote mark */}
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(48px, 14vw, 80px)",
            color: "var(--accent)",
            opacity: 0.3,
            lineHeight: 0.8,
            margin: "0 0 8px 0",
          }}>
            "
          </p>

          <p style={{
            fontFamily: "var(--font-sans)",
            fontStyle: "italic",
            fontSize: "clamp(15px, 2vw, 19px)",
            color: "var(--text)",
            lineHeight: 1.85,
            margin: "0 0 24px 0",
          }}>
            I made this because you deserve something that actually tries to match how special you are.
            Not a text, not a voice note, something you can scroll through and feel.
            <br /><br />
            Also you know i gotta glaze myself in this cause creating ts was work.
            You go later talk say i no rate you, mtchewww
            <br /><br />
            Anyways, Happy birthday, Silvia. Nineteen looks good on you.
          </p>

          {/* Signature line */}
          <div style={{
            display: "flex", alignItems: "center", gap: "14px",
            marginBottom: "12px",
          }}>
            <div style={{ height: "1px", width: "40px", background: "var(--accent)" }} />
            <span style={{
              fontFamily: "var(--font-sans)", fontStyle: "italic",
              fontSize: "12px", color: "var(--muted)", letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}>
              with love
            </span>
          </div>

          <p style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            fontStyle: "italic",
            fontSize: "clamp(22px, 3vw, 32px)",
            color: "var(--accent)",
            margin: 0,
            letterSpacing: "-0.01em",
          }}>
            Ajikan 🤍
          </p>
        </motion.div>
      </div>
    </section>
  );
}