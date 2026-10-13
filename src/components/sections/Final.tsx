import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export default function SurpriseEnvelope() {
  const [opened, setOpened] = useState(false);
  const [photoVisible, setPhotoVisible] = useState(false);
  const isNarrow = useMediaQuery("(max-width: 640px)");

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    setTimeout(() => setPhotoVisible(true), 800);
  };

  return (
    <section
      style={{
        background: "var(--bg-deep)",
        minHeight: photoVisible && isNarrow ? "85vh" : "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(48px, 8vw, 80px) clamp(24px, 5vw, 64px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grain */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Top label */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          fontFamily: "var(--font-sans)", fontStyle: "italic",
          fontSize: "clamp(11px, 1.4vw, 13px)", color: "var(--accent)",
          letterSpacing: "0.3em", textTransform: "uppercase",
          marginBottom: "8px", zIndex: 1, position: "relative",
        }}
      >
        ✦ &nbsp; one last thing &nbsp; ✦
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          fontFamily: "var(--font-sans)", fontStyle: "italic",
          fontSize: "clamp(13px, 1.7vw, 16px)",
          color: "rgba(255,255,255,0.35)",
          margin: "0 0 clamp(32px, 5vw, 56px) 0",
          zIndex: 1, position: "relative",
        }}
      >
        something's waiting for you in here...
      </motion.p>

      {/* Envelope */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Envelope body */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          onClick={handleOpen}
          style={{
            position: "relative",
            width: "clamp(260px, 36vw, 380px)",
            cursor: opened ? "default" : "pointer",
          }}
        >
          {/* Envelope body */}
          <div style={{
            background: "linear-gradient(160deg, #2a1f1a, #1e1510)",
            border: "1px solid rgba(var(--accent-rgb), 0.2)",
            borderRadius: "4px 4px 8px 8px",
            width: "100%",
            paddingTop: "60%",
            position: "relative",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(var(--accent-rgb), 0.08)",
            overflow: "hidden",
          }}>
            {/* Envelope bottom fold lines */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              height: "55%",
              background: "linear-gradient(160deg, #251a14, #1e1510)",
              clipPath: "polygon(0% 100%, 50% 0%, 100% 100%)",
              borderTop: "1px solid rgba(var(--accent-rgb), 0.1)",
            }} />
            <div style={{
              position: "absolute", bottom: 0, left: 0,
              width: "52%", height: "55%",
              background: "linear-gradient(135deg, #2d2018, #1e1510)",
              clipPath: "polygon(0% 100%, 100% 100%, 0% 0%)",
            }} />
            <div style={{
              position: "absolute", bottom: 0, right: 0,
              width: "52%", height: "55%",
              background: "linear-gradient(225deg, #2d2018, #1e1510)",
              clipPath: "polygon(100% 100%, 0% 100%, 100% 0%)",
            }} />

            {/* Wax seal */}
            {!opened && (
              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  bottom: "18%", left: "50%",
                  transform: "translateX(-50%)",
                  width: "44px", height: "44px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 40% 35%, var(--accent-light), var(--accent) 50%, var(--accent-deep))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 4px 16px rgba(var(--accent-rgb), 0.4)",
                  fontSize: "18px",
                  zIndex: 2,
                }}
              >
                🤍
              </motion.div>
            )}
          </div>

          {/* Envelope flap */}
          <motion.div
            animate={opened ? { rotateX: -180, zIndex: -10 } : { rotateX: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              top: 0, left: 0, right: 0,
              height: "50%",
              background: "linear-gradient(160deg, #2d2018, #241810)",
              border: "1px solid rgba(var(--accent-rgb), 0.15)",
              borderBottom: "none",
              borderRadius: "4px 4px 0 0",
              clipPath: "polygon(0% 0%, 50% 100%, 100% 0%)",
              transformOrigin: "top center",
              transformStyle: "preserve-3d",
              zIndex: opened ? 10 : 3,
            }}
          />
        </motion.div>

        {/* Click prompt */}
        {!opened && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            onClick={handleOpen}
            style={{
              fontFamily: "var(--font-sans)", fontStyle: "italic",
              fontSize: "13px", color: "var(--accent)",
              marginTop: "16px", cursor: "pointer",
              letterSpacing: "0.1em",
            }}
          >
            tap to open ↑
          </motion.p>
        )}

        {/* Photo sliding out */}
        <AnimatePresence>
          {photoVisible && (
            <motion.div
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: isNarrow ? -64 : -120, opacity: 1 }}
              transition={{ type: "spring", stiffness: 80, damping: 14, delay: 0.1 }}
              style={{
                position: "absolute",
                top: "10%",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 5,
              }}
            >
              {/* Polaroid frame */}
              <motion.div
                animate={{ rotate: [0, -3, 3, -2, 0] }}
                transition={{ duration: 0.6, delay: 0.8 }}
                style={{
                  background: "#ffffff",
                  padding: "8px 8px 44px 8px",
                  borderRadius: "2px",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                  width: "clamp(180px, 24vw, 240px)",
                //   position: "absolute",
                //   zIndex: 100,
                //   transform: "translateZ(1px)"
                }}
              >
                {/* image */}
                  <img src="/baby_silvia.PNG" alt="" 
                   style={{ width: "100%",
                    aspectRatio: "1",
                    background: "linear-gradient(135deg, #fce4ec, #f8bbd0)",
                    display: "flex", alignItems: "center",
                    justifyContent: "center", borderRadius: "1px",
                    fontSize: "48px",}}/>

                <p style={{
                  fontFamily: "var(--font-sans)", fontStyle: "italic",
                  fontSize: "11px", color: "var(--muted)",
                  textAlign: "center", margin: "10px 0 0 0",
                  letterSpacing: "0.05em",
                }}>
                  Eyaa see little silvia💗🤣
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer credit */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{
          fontFamily: "var(--font-sans)", fontStyle: "italic",
          fontSize: "11px", color: "rgba(255,255,255,0.2)",
          marginTop: "clamp(48px, 8vw, 80px)",
          letterSpacing: "0.2em", textTransform: "uppercase",
          zIndex: 1, position: "relative",
        }}
      >
        made with love ✦ happy 19th silvia
      </motion.p>
    </section>
  );
}