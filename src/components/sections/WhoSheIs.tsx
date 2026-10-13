import Section from "../layout/Section";
import { motion } from "framer-motion";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const cardStyle: React.CSSProperties = {
  background: "#ffffff",
  padding: "10px 10px 52px 10px",
  borderRadius: "4px",
  boxShadow: "0 15px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "column",
};

const mediaStyle: React.CSSProperties = {
  width: "100%",
  height: "clamp(220px, 55vw, 350px)",
  objectFit: "cover",
  borderRadius: "2px",
};

export default function WhoSheIs() {
  const isNarrow = useMediaQuery("(max-width: 768px)");

  return (
    <Section bg="transparent">

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", marginBottom: "48px" }}
      >
        <p style={{
          fontFamily: "var(--font-sans)",
          fontStyle: "italic",
          fontSize: "clamp(11px, 1.4vw, 13px)",
          color: "var(--accent)",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          margin: "0 0 10px 0",
        }}>
          ✦ &nbsp; cover story &nbsp; ✦
        </p>
        <h2 style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 700,
          fontSize: "clamp(36px, 6vw, 72px)",
          color: "var(--text)",
          margin: 0,
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}>
          Who is{" "}
          <span style={{ fontStyle: "italic", color: "var(--accent)" }}>Silvia?</span>
        </h2>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "12px", marginTop: "16px",
        }}>
          <div style={{ height: "1px", width: "60px", background: "var(--accent)" }} />
          <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--accent)" }} />
          <div style={{ height: "1px", width: "60px", background: "var(--accent)" }} />
        </div>
      </motion.div>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isNarrow ? "1fr" : "repeat(2, 1fr)",
        gap: "clamp(24px, 4vw, 32px)",
        alignItems: "center",
      }}>

        {/* CARD 1 */}
        <motion.div
          initial={{ opacity: 0, rotate: -5 }}
          whileInView={{ opacity: 1, rotate: -3 }}
          whileHover={{ rotate: 0, scale: 1.02 }}
          transition={{ duration: 0.5 }}
          style={cardStyle}
        >
          <video src="/black.MOV" autoPlay playsInline muted loop style={mediaStyle} />
        </motion.div>

        {/* TEXT 1 */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p style={{
            fontFamily: "var(--font-sans)",
            fontStyle: "italic",
            fontSize: "clamp(11px, 1.3vw, 13px)",
            color: "var(--accent)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            margin: "0 0 12px 0",
          }}>
            Chapter One
          </p>
          <p style={{
            fontFamily: "var(--font-sans)",
            fontStyle: "italic",
            fontSize: "clamp(22px, 3.5vw, 36px)",
            color: "var(--text)",
            lineHeight: 1.35,
            margin: "0 0 16px 0",
            fontWeight: 700,
          }}>
            "The most loving but annoying friend you could ask for."
          </p>
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(13px, 1.6vw, 16px)",
            color: "var(--subtext)",
            lineHeight: 1.75,
            margin: 0,
          }}>
            You'll learn to get used to it.
          </p>
        </motion.div>

        {/* TEXT 2 */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: isNarrow ? "left" : "right" }}
        >
          <p style={{
            fontFamily: "var(--font-sans)",
            fontStyle: "italic",
            fontSize: "clamp(11px, 1.3vw, 13px)",
            color: "var(--accent)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            margin: "0 0 12px 0",
          }}>
            Chapter Two
          </p>
          <p style={{
            fontFamily: "var(--font-sans)",
            fontStyle: "italic",
            fontSize: "clamp(22px, 3.5vw, 36px)",
            color: "var(--text)",
            lineHeight: 1.35,
            margin: "0 0 16px 0",
            fontWeight: 700,
          }}>
            "The most intersting yapper ever,
            her life is hilarious"
          </p>
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(13px, 1.6vw, 16px)",
            color: "var(--subtext)",
            lineHeight: 1.75,
            margin: 0,
          }}>
            Give her the attention she deserves (or she'll insult you).
          </p>
        </motion.div>

        {/* CARD 2 */}
        <motion.div
          initial={{ opacity: 0, rotate: 5 }}
          whileInView={{ opacity: 1, rotate: 2 }}
          whileHover={{ rotate: 0, scale: 1.02 }}
          transition={{ duration: 0.5 }}
          style={cardStyle}
        >
          <video src="/sleeveless.MP4" autoPlay playsInline muted loop style={mediaStyle} />
        </motion.div>

        {/* CARD 3 */}
        <motion.div
          initial={{ opacity: 0, rotate: -2 }}
          whileInView={{ opacity: 1, rotate: 1 }}
          whileHover={{ rotate: 0, scale: 1.02 }}
          transition={{ duration: 0.5 }}
          style={cardStyle}
        >
          <video
            src="/blackwhite.MOV"
            autoPlay playsInline muted loop
            style={{ ...mediaStyle, objectPosition: "90% 15%", objectFit: "fill" }}
          />
        </motion.div>

        {/* TEXT 3 */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p style={{
            fontFamily: "var(--font-sans)",
            fontStyle: "italic",
            fontSize: "clamp(11px, 1.3vw, 13px)",
            color: "var(--accent)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            margin: "0 0 12px 0",
          }}>
            Chapter Three
          </p>
          <p style={{
            fontFamily: "var(--font-sans)",
            fontStyle: "italic",
            fontSize: "clamp(22px, 3.5vw, 36px)",
            color: "var(--text)",
            lineHeight: 1.35,
            margin: "0 0 16px 0",
            fontWeight: 700,
          }}>
            "Wanted to call her a great listener,
            but does she ever listen to me?"
          </p>
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(13px, 1.6vw, 16px)",
            color: "var(--subtext)",
            lineHeight: 1.75,
            margin: 0,
          }}>
            she doesn't.
          </p>
        </motion.div>

      </div>
    </Section>
  );
}