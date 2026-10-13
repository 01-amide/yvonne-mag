import { useEffect, useRef } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const loves = [
  {
    id: 1,
    title: "Lip Gloss",
    description: "Her lip combos actually look amazing when she does them",
    emoji: "💄",
    image: "https://m.media-amazon.com/images/I/61L8T9IureL._AC_UF350,350_QL80_.jpg",
  },
  {
    id: 2,
    title: "iPad",
    description: "Not sure if this is her second phone or her phone is her second iPad",
    emoji: "📱",
    image: "https://www.apple.com/newsroom/images/product/ipad/standard/Apple-iPad-10th-gen-hero-221018.jpg.landing-big_2x.jpg",
  },
  {
    id: 3,
    title: "Hand Bags",
    description: "Girls love bags, no explanation needed really.",
    emoji: "👜",
    image: "https://2.imimg.com/data2/TP/KX/MY-3057545/designerbags-250x250.jpg",
  },
  {
    id: 4,
    title: "Food",
    description: "Bro is always hungry",
    emoji: "🍜",
    image: "https://img.freepik.com/premium-photo/concept-fast-food-white-background_185193-47667.jpg",
  },
  {
    id: 5,
    title: "AirPods",
    description: "She lost her beloved airpods and hasnt been the same since.",
    emoji: "🎧",
    image: "https://media.istockphoto.com/id/1208634599/photo/apple-airpods-pro-on-a-white-background.jpg?s=170667a&w=0&k=20&c=YBmuAUHb5JhhjFwoppKKO5puBeiZrplxAvlUrypzmas=",
  },
  {
    id: 6,
    title: "Money",
    description: "Babe no go like money ke",
    emoji: "💸",
    image: "https://img.freepik.com/premium-photo/3d-stack-1000-nigerian-naira-notes-isolated-white-background_584365-113.jpg",
  },
  {
    id: 7,
    title: "Clothes",
    description: "'i need more clothes', like she doesn't have a hundred pieces",
    emoji: "👗",
    image: "https://img.freepik.com/premium-vector/clothes-accessories-hanging-hanger_169241-5504.jpg",
  },
  {
    id: 8,
    title: "Camera",
    description: "She doesn't actually have one but boy does she love taking videos. Not complaining though, love seeing them.",
    emoji: "📷",
    image: "https://www.shutterstock.com/image-photo/old-film-camera-isolated-on-600nw-2485706319.jpg",
  },
  {
    id: 9,
    title: "Skincare",
    description: "All the skincare but somehow still breaks out more than me",
    emoji: "✨",
    image: "https://i0.wp.com/buybetter.ng/wp-content/uploads/2024/09/Untitled-design-optimized.png?fit=480%2C257&ssl=1",
  },
];

// Layout: [col, row-start] for a scattered magazine feel
const positions = [
  { left: "4%",  top: "8%"  }, // 1
  { left: "34%", top: "4%"  }, // 2
  { left: "64%", top: "6%"  }, // 3
  { left: "6%",  top: "36%" }, // 4
  { left: "36%", top: "38%" }, // 5
  { left: "66%", top: "34%" }, // 6
  { left: "10%", top: "65%" }, // 7
  { left: "38%", top: "68%" }, // 8
  { left: "68%", top: "63%" }, // 9
];

const rotations = ["-2deg", "1.5deg", "-1deg", "2deg", "-1.5deg", "1deg", "-2.5deg", "1deg", "2deg"];

export default function WhatSheLoves() {
  const isNarrow = useMediaQuery("(max-width: 768px)");
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform =
              (entry.target as HTMLElement).dataset.transform || "rotate(0deg)";
          }
        });
      },
      { threshold: 0.1 }
    );
    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, [isNarrow]);

  return (
    <section
      style={{
        background: "var(--bg)",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        fontFamily: "var(--font-sans)",
        padding: "0 0 clamp(48px, 10vw, 80px) 0",
      }}
    >
      {/* Decorative background texture lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(var(--accent-rgb), 0.12) 60px)",
          pointerEvents: "none",
        }}
      />

      {/* Center spine line */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "5%",
          bottom: "5%",
          width: "1px",
          background: "linear-gradient(to bottom, transparent, #e5989b88, transparent)",
          transform: "translateX(-50%)",
          pointerEvents: "none",
          opacity: isNarrow ? 0 : 1,
        }}
      />

      {/* Heading */}
      <div
        style={{
          textAlign: "center",
          paddingTop: "48px",
          paddingBottom: "24px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(13px, 2vw, 16px)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--muted)",
            margin: "0 0 6px 0",
          }}
        >
          a special feature
        </p>
        <h2
          style={{
            margin: 0,
            lineHeight: 1,
            color: "var(--text)",
          }}
        >
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: "clamp(36px, 7vw, 80px)",
              letterSpacing: "-0.01em",
            }}
          >
            what
          </span>
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-sans)",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: "clamp(44px, 9vw, 100px)",
              color: "var(--accent)",
              marginTop: "-10px",
              letterSpacing: "-0.02em",
            }}
          >
            Silvia
          </span>
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: "clamp(36px, 7vw, 80px)",
              marginTop: "-8px",
              letterSpacing: "-0.01em",
            }}
          >
            loves
          </span>
        </h2>
        {/* Decorative rule */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            marginTop: "16px",
          }}
        >
          <div style={{ height: "1px", width: "60px", background: "var(--accent)" }} />
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "var(--accent)",
            }}
          />
          <div style={{ height: "1px", width: "60px", background: "var(--accent)" }} />
        </div>
      </div>

      {/* Cards — stacked on small screens, scattered on larger */}
      <div
        style={
          isNarrow
            ? {
                position: "relative",
                maxWidth: 520,
                width: "100%",
                margin: "0 auto",
                padding: "0 clamp(12px, 4vw, 20px) 8px",
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }
            : {
                position: "relative",
                maxWidth: 960,
                margin: "0 auto",
                height: "min(900px, 210vw)",
                minHeight: 520,
              }
        }
      >
        {loves.map((item, i) => {
          const pos = positions[i];
          const rot = rotations[i];
          const delay = `${i * 80}ms`;
          const listTransform = "rotate(0deg)";

          return (
            <div
              key={item.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              data-transform={isNarrow ? listTransform : `rotate(${rot})`}
              style={{
                position: isNarrow ? "relative" : "absolute",
                ...(isNarrow
                  ? {
                      left: "auto",
                      top: "auto",
                      width: "100%",
                    }
                  : {
                      left: pos.left,
                      top: pos.top,
                      width: "clamp(200px, 26%, 260px)",
                    }),
                background: "rgba(255,255,255,0.72)",
                backdropFilter: "blur(6px)",
                borderRadius: "4px",
                boxShadow: "0 4px 20px rgba(61,43,43,0.10), 0 1px 4px rgba(var(--accent-rgb), 0.18)",
                padding: "18px",
                opacity: 0,
                transform: isNarrow ? "translateY(16px)" : `rotate(0deg) translateY(20px)`,
                transition: `opacity 0.6s ease ${delay}, transform 0.6s ease ${delay}`,
                cursor: "default",
                border: "1px solid rgba(var(--accent-rgb), 0.25)",
              }}
              onMouseEnter={(e) => {
                if (isNarrow) return;
                (e.currentTarget as HTMLElement).style.transform = `rotate(0deg) translateY(-4px)`;
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 12px 36px rgba(61,43,43,0.15), 0 2px 8px rgba(var(--accent-rgb), 0.3)";
                (e.currentTarget as HTMLElement).style.zIndex = "20";
              }}
              onMouseLeave={(e) => {
                if (isNarrow) return;
                (e.currentTarget as HTMLElement).style.transform = `rotate(${rot})`;
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 4px 20px rgba(61,43,43,0.10), 0 1px 4px rgba(var(--accent-rgb), 0.18)";
                (e.currentTarget as HTMLElement).style.zIndex = "1";
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-14px",
                  left: "-10px",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "var(--accent)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-sans)",
                  fontStyle: "italic",
                  fontWeight: 700,
                  fontSize: "15px",
                  boxShadow: "0 2px 8px rgba(var(--accent-rgb), 0.4)",
                }}
              >
                {item.id}
              </div>

              {item.image ? (
                <img src={item.image} style={imgStyle} alt={item.title} />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "120px",
                    borderRadius: "3px",
                    background: "linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "42px",
                    marginBottom: "12px",
                  }}
                >
                  {item.emoji}
                </div>
              )}

              <h3
                style={{
                  margin: "0 0 4px 0",
                  fontFamily: "var(--font-sans)",
                  fontStyle: "italic",
                  fontSize: "clamp(15px, 4vw, 17px)",
                  color: "var(--text)",
                  fontWeight: 700,
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(12px, 3.4vw, 14px)",
                  lineHeight: 1.55,
                  color: "var(--subtext)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Footer flourish */}
      <div
        style={{
          textAlign: "center",
          paddingTop: "20px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontStyle: "italic",
            fontSize: "13px",
            color: "var(--muted)",
            letterSpacing: "0.1em",
          }}
        >
          ✦ just a few of her favorite things ✦
        </p>
      </div>
    </section>
  );
}

const imgStyle: React.CSSProperties = {
  width: "100%",
  height: "120px",
  objectFit: "contain",
  mixBlendMode: "multiply",  // ← this is the magic
  marginBottom: "12px"
};