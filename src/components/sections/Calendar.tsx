import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "../layout/Section";
import { content } from "../../content";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const { year: YEAR, month: MONTH, day: BIRTHDAY } = content.birthday;
const MONTH_NAME = new Date(YEAR, MONTH, 1).toLocaleString("en", { month: "long" });
const START_OFFSET = (new Date(YEAR, MONTH, 1).getDay() + 6) % 7; // weeks start on Monday
const TOTAL_DAYS = new Date(YEAR, MONTH + 1, 0).getDate();

export default function Calendar() {
  const [revealed, setRevealed] = useState(false);
  const [showBurst, setShowBurst] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          setTimeout(() => setShowBurst(true), 1200);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const dates = Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1);

  return (
    <Section bg="transparent">
      <div
        ref={sectionRef}
        style={{
          background: "#0d0d0d",
          borderRadius: "24px",
          padding: "clamp(32px, 6vw, 64px) clamp(24px, 5vw, 56px)",
          maxWidth: "min(450px, 100%)",
          margin: "0 auto",
          width: "100%",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(var(--accent-rgb), 0.1)",
        }}
      >
        {/* Background glow on birthday cell area */}
        <div
          style={{
            position: "absolute",
            top: "45%",
            left: "35%",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(var(--accent-rgb), 0.12) 0%, transparent 70%)",
            pointerEvents: "none",
            transition: "opacity 1s ease",
            opacity: showBurst ? 1 : 0,
          }}
        />

        {/* Grain overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
            pointerEvents: "none",
            borderRadius: "24px",
          }}
        />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "36px" }}
        >
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontStyle: "italic",
              fontSize: "clamp(11px, 1.4vw, 13px)",
              color: "var(--accent)",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              margin: "0 0 10px 0",
            }}
          >
            ✦ &nbsp; mark your calendars &nbsp; ✦
          </p>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: "clamp(42px, 8vw, 88px)",
              color: "#ffffff",
              margin: 0,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {MONTH_NAME}
          </h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              marginTop: "12px",
            }}
          >
            <div style={{ height: "1px", width: "48px", background: "rgba(var(--accent-rgb), 0.4)" }} />
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontStyle: "italic",
                fontSize: "13px",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              {YEAR}
            </span>
            <div style={{ height: "1px", width: "48px", background: "rgba(var(--accent-rgb), 0.4)" }} />
          </div>
        </motion.div>

        {/* Day headers */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "8px",
            marginBottom: "8px",
          }}
        >
          {DAYS.map((day, i) => (
            <motion.div
              key={day}
              initial={{ opacity: 0 }}
              animate={revealed ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.05 }}
              style={{
                textAlign: "center",
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(10px, 1.3vw, 12px)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                paddingBottom: "8px",
              }}
            >
              {day}
            </motion.div>
          ))}
        </div>

        {/* Date grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "8px",
          }}
        >
          {/* Empty offset cells */}
          {Array.from({ length: START_OFFSET }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {/* Date cells */}
          {dates.map((date, i) => {
            const isBirthday = date === BIRTHDAY;
            return (
              <motion.div
                key={date}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={revealed ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  delay: 0.4 + (i + START_OFFSET) * 0.025,
                  type: "spring",
                  stiffness: 200,
                  damping: 18,
                }}
                whileHover={{ scale: 1.12, zIndex: 10 }}
                style={{
                  position: "relative",
                  aspectRatio: "1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                  background: isBirthday
                    ? "linear-gradient(135deg, var(--accent), var(--accent-deep))"
                    : "rgba(255,255,255,0.05)",
                  border: isBirthday
                    ? "none"
                    : "1px solid rgba(255,255,255,0.06)",
                  cursor: "default",
                  boxShadow: isBirthday
                    ? "0 0 24px rgba(var(--accent-rgb), 0.5), 0 4px 16px rgba(var(--accent-rgb), 0.3)"
                    : "none",
                  zIndex: isBirthday ? 2 : 1,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(12px, 1.8vw, 16px)",
                    fontWeight: isBirthday ? 700 : 400,
                    color: isBirthday ? "#ffffff" : "var(--accent)",
                  }}
                >
                  {date}
                </span>

                {/* Birthday sparkle ring */}
                {isBirthday && (
                  <AnimatePresence>
                    {showBurst && (
                      <>
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0.8 }}
                          animate={{ scale: 2.2, opacity: 0 }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          style={{
                            position: "absolute",
                            inset: 0,
                            borderRadius: "10px",
                            border: "2px solid var(--accent)",
                            pointerEvents: "none",
                          }}
                        />
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0.6 }}
                          animate={{ scale: 2.8, opacity: 0 }}
                          transition={{ duration: 1.6, ease: "easeOut", delay: 0.2 }}
                          style={{
                            position: "absolute",
                            inset: 0,
                            borderRadius: "10px",
                            border: "1.5px solid var(--accent)",
                            pointerEvents: "none",
                          }}
                        />
                      </>
                    )}
                  </AnimatePresence>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Birthday label below grid */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={showBurst ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{
            textAlign: "center",
            marginTop: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          <div style={{ height: "1px", flex: 1, background: "rgba(var(--accent-rgb), 0.2)" }} />
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontStyle: "italic",
              fontSize: "clamp(13px, 1.8vw, 16px)",
              color: "var(--accent)",
              margin: 0,
              whiteSpace: "normal",
              textAlign: "center",
              paddingInline: 8,
            }}
          >
            {MONTH_NAME} {BIRTHDAY} — It's her day 🎀
          </p>
          <div style={{ height: "1px", flex: 1, background: "rgba(var(--accent-rgb), 0.2)" }} />
        </motion.div>
      </div>
    </Section>
  );
}