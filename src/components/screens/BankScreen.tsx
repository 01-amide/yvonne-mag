import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { content } from "../../content";
import { useCountUp } from "../../hooks/useCountUp";
import CatPal from "../ui/CatPal";

type Props = { onNext: () => void };

const mono: React.CSSProperties = { fontFamily: "var(--font-mono)", letterSpacing: "0.08em" };
const RAIN = ["💸", "💜", "💰", "✨", "🤑"];

type Drop = { id: number; x: number; delay: number; emoji: string; size: number };

export default function BankScreen({ onNext }: Props) {
  const { currency, amount, alert, transactions } = content.bank;
  const balance = useCountUp(amount, 0.7, 2.6);
  const [showAlert, setShowAlert] = useState(false);
  const [drops, setDrops] = useState<Drop[]>([]);
  const [rainRound, setRainRound] = useState(0);

  // Credit alert slides in after the balance has finished counting
  useEffect(() => {
    const show = setTimeout(() => setShowAlert(true), 3600);
    const hide = setTimeout(() => setShowAlert(false), 7000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  const makeItRain = () => {
    const round = rainRound + 1;
    setRainRound(round);
    const fresh: Drop[] = Array.from({ length: 28 }, (_, i) => ({
      id: round * 100 + i,
      x: Math.random() * 100,
      delay: Math.random() * 0.8,
      emoji: RAIN[Math.floor(Math.random() * RAIN.length)],
      size: 20 + Math.random() * 18,
    }));
    setDrops((d) => [...d, ...fresh]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35 } }}
      style={{ position: "absolute", inset: 0, background: "var(--bg)", color: "var(--text)", fontFamily: "var(--font-sans)", overflow: "hidden" }}
    >
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 50% 0%, rgba(226,194,122,0.14), transparent 55%)" }} />

      {/* Credit alert toast */}
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ y: -90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -90, opacity: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            style={{
              position: "absolute", top: "calc(env(safe-area-inset-top, 0px) + 12px)", left: 14, right: 14, zIndex: 35,
              display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 18,
              background: "rgba(30,18,48,0.92)", border: "1px solid rgba(226,194,122,0.5)",
              backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
            }}
          >
            <span style={{ fontSize: 22 }}>💸</span>
            <span style={{ fontSize: 14, fontWeight: 600 }}>{alert}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{
        height: "100%", overflowY: "auto",
        padding: "calc(env(safe-area-inset-top, 0px) + 30px) 20px calc(env(safe-area-inset-bottom, 0px) + 100px)",
      }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <span style={{ fontSize: 18, fontWeight: 800 }}>💜 Birthday Bank</span>
          <span style={{ ...mono, fontSize: 11, color: "var(--gold)" }}>PREMIUM</span>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24, rotateX: 20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "relative", aspectRatio: "1.586 / 1", borderRadius: 20, padding: 20, overflow: "hidden",
            background: "linear-gradient(135deg, var(--accent-deep), #3a1f6e 55%, var(--bg-deep))",
            border: "1px solid rgba(255,255,255,0.14)", boxShadow: "0 20px 50px rgba(0,0,0,0.45), 0 0 40px rgba(var(--accent-rgb),0.2)",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
          }}
        >
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
            background: "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.1) 45%, transparent 60%)" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ width: 40, height: 30, borderRadius: 6, background: "linear-gradient(135deg, #f1d99a, var(--gold))" }} />
            <span style={{ ...mono, fontSize: 11, color: "rgba(255,255,255,0.75)" }}>BIRTHDAY BANK</span>
          </div>
          <div>
            <p style={{ ...mono, margin: 0, fontSize: 15, letterSpacing: "0.2em" }}>•••• •••• •••• ∞</p>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, ...mono, fontSize: 11, color: "rgba(255,255,255,0.8)" }}>
              <span>{content.name.toUpperCase()}</span>
              <span>VALID THRU ∞/∞</span>
            </div>
          </div>
        </motion.div>

        {/* Balance */}
        <div style={{ textAlign: "center", margin: "26px 0 14px" }}>
          <p style={{ ...mono, margin: 0, fontSize: 11, color: "var(--muted)" }}>AVAILABLE BALANCE</p>
          <p style={{ margin: "6px 0 0", fontSize: "clamp(30px, 9vw, 40px)", fontWeight: 800, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums", color: "var(--gold)" }}>
            {currency}{balance.toLocaleString("en-US")}
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 22 }}>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={makeItRain}
            style={{
              padding: "12px 22px", borderRadius: 999, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 700,
              background: "linear-gradient(135deg, var(--accent), var(--accent-deep))", color: "#fff",
            }}
          >
            Make it rain 💸
          </motion.button>
        </div>

        {/* Transactions */}
        <p style={{ ...mono, margin: "0 0 8px", fontSize: 11, color: "var(--muted)" }}>RECENT ACTIVITY</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {transactions.map((tx, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 + i * 0.25, duration: 0.5 }}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", borderRadius: 14, background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <div>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>{tx.title}</p>
                <p style={{ margin: "2px 0 0", fontSize: 12, color: "var(--muted)" }}>{tx.note}</p>
              </div>
              <span style={{ fontSize: 15, fontWeight: 800, color: tx.kind === "in" ? "#7be0a4" : "var(--muted)" }}>{tx.amount}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Falling money */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 30 }}>
        {drops.map((d) => (
          <motion.span
            key={d.id}
            initial={{ y: -50, opacity: 1, rotate: 0 }}
            animate={{ y: 1000, opacity: [1, 1, 0], rotate: 360 }}
            transition={{ duration: 2.4, delay: d.delay, ease: "easeIn" }}
            onAnimationComplete={() => setDrops((arr) => arr.filter((x) => x.id !== d.id))}
            style={{ position: "absolute", top: 0, left: `${d.x}%`, fontSize: d.size }}
          >
            {d.emoji}
          </motion.span>
        ))}
      </div>

      <CatPal style={{ right: 10, bottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)" }} />

      <div style={{
        position: "absolute", left: 0, right: 0, bottom: "calc(env(safe-area-inset-bottom, 0px) + 20px)",
        display: "flex", justifyContent: "center", pointerEvents: "none", zIndex: 25,
      }}>
        <motion.button
          onClick={onNext}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          whileTap={{ scale: 0.96 }}
          style={{
            pointerEvents: "auto", padding: "13px 26px", borderRadius: 999, border: "1px solid var(--gold)",
            background: "rgba(20,11,31,0.85)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
            color: "var(--gold)", fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 700, cursor: "pointer",
          }}
        >
          Next →
        </motion.button>
      </div>
    </motion.div>
  );
}
