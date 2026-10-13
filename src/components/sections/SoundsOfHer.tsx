import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

// const COLORS = ["#e5989b", "#d4849a", "#f2b5a0", "#e8a0bf"];

const songs = [
  {
    id: 1,
    title: "Jehovah",
    artist: "Nathaniel Bassey",
    duration: "6:17",
    color: "#e5989b",
    image: null,
    videoId: "Nrw7X-dfUOw",
    startTime: 75
  },
  {
    id: 2,
    title: "Nagode",
    artist: "Dunsin Oyekan",
    duration: "15:00",
    color: "#d4849a",
    image: null,
    videoId: "LJA_g-_xlCs",
    startTime: 0
  },
  {
    id: 3,
    title: "Amen",
    artist: "Dunsin Oyekan",
    duration: "9:09",
    color: "#f2b5a0",
    image: null,
    videoId: "9SAvVHpOrE0",
    startTime: 55
  },
  {
    id: 4,
    title: "Heaven on earth",
    artist: "Micah Stampley",
    duration: "4:44",
    color: "#e8a0bf",
    image: null,
    videoId: "y7D40LltlE0",
    startTime: 15
  },
];

function darken(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${Math.max(0, r - 50)}, ${Math.max(0, g - 50)}, ${Math.max(0, b - 50)})`;
}

const RECORD_SIZE = "clamp(112px, 32vw, 180px)";

function VinylRecord({
  song,
  isPlaying,
  onClick,
  index,
}: {
  song: typeof songs[0];
  isPlaying: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        gap: "clamp(10px, 2vw, 16px)",
        width: "100%",
        maxWidth: 200,
      }}
    >
      {/* Record + sleeve wrapper */}
      <div style={{ position: "relative", width: RECORD_SIZE, height: RECORD_SIZE, margin: "0 auto" }}>

        {/* Sleeve peeking behind */}
        <div
          style={{
            position: "absolute",
            top: "3.5%",
            left: "5.5%",
            width: "89%",
            height: "89%",
            borderRadius: "6px",
            background: isPlaying
              ? `linear-gradient(135deg, ${song.color}, ${darken(song.color)})`
              : "linear-gradient(135deg, #2a2a2a, #1a1a1a)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            transition: "background 0.4s ease",
          }}
        />

        {/* Vinyl record */}
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{
            duration: 3,
            repeat: isPlaying ? Infinity : 0,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: `
              radial-gradient(circle at 50% 50%,
                #f5f0eb 0%,
                #f5f0eb 14%,
                #1a1a1a 15%,
                #2d2d2d 22%,
                #1a1a1a 23%,
                #2d2d2d 32%,
                #1a1a1a 33%,
                #2d2d2d 44%,
                #1a1a1a 45%,
                #2d2d2d 58%,
                #1a1a1a 59%,
                #222 100%
              )
            `,
            boxShadow: isPlaying
              ? `0 0 0 3px ${song.color}66, 0 12px 40px rgba(0,0,0,0.5)`
              : "0 8px 32px rgba(0,0,0,0.4)",
            transition: "box-shadow 0.3s ease",
          }}
        >
          {/* Center label */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "29%",
              height: "29%",
              maxWidth: 52,
              maxHeight: 52,
              borderRadius: "50%",
              background: song.image
                ? `url(${song.image}) center/cover`
                : `radial-gradient(circle at 40% 35%, ${song.color}dd, ${darken(song.color)})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
            }}
          >
            {/* Center hole */}
            <div
              style={{
                width: "min(8px, 15%)",
                height: "min(8px, 15%)",
                borderRadius: "50%",
                background: "#ecdfcc",
                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.3)",
              }}
            />
          </div>

          {/* Groove shine */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, rgba(255,255,255,0.03) 100%)",
              pointerEvents: "none",
            }}
          />
        </motion.div>

        {/* Now playing glow ring */}
        {isPlaying && (
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.2, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              inset: "-8px",
              borderRadius: "50%",
              border: `2px solid ${song.color}`,
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      {/* Song info */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "4px",
          }}
        >
          {/* Equalizer bars when playing */}
          {isPlaying && (
            <div style={{ display: "flex", gap: "2px", alignItems: "flex-end", height: "14px" }}>
              {[1, 2, 3].map((b) => (
                <motion.div
                  key={b}
                  animate={{ height: ["4px", "12px", "6px", "14px", "4px"] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: b * 0.15, ease: "easeInOut" }}
                  style={{ width: "3px", background: song.color, borderRadius: "2px" }}
                />
              ))}
            </div>
          )}
          <p
            style={{
              fontFamily: "'Georgia', serif",
              fontWeight: 700,
              fontStyle: "italic",
              fontSize: "clamp(14px, 3.5vw, 16px)",
              color: isPlaying ? song.color : "#3d2b2b",
              margin: 0,
              transition: "color 0.3s ease",
            }}
          >
            {song.title}
          </p>
        </div>
        <p
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(11px, 2.8vw, 12px)",
            color: "#7a5a5a",
            margin: "0 0 2px 0",
            letterSpacing: "0.05em",
          }}
        >
          {song.artist}
        </p>
        <p
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(10px, 2.5vw, 11px)",
            color: "rgba(122,90,90,0.5)",
            margin: 0,
            letterSpacing: "0.1em",
          }}
        >
          {song.duration}
        </p>
      </div>
      {/* ← iframe removed from here */}
    </motion.div>
  );
}

export default function SoundsOfHer() {
  const [playing, setPlaying] = useState<number | null>(null);
  const playerRef = useRef<any>(null);
  const playerDivId = "yt-player";

  // Load YT script once
  useEffect(() => {
    if (!document.getElementById("yt-script")) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.id = "yt-script";
      document.body.appendChild(tag);
    }
  }, []);

  // React to playing state changes
  useEffect(() => {
    if (playing === null) {
      playerRef.current?.stopVideo();
      return;
    }

    const song = songs.find((s) => s.id === playing);
    if (!song) return;

    const initPlayer = () => {
      if (playerRef.current) {
        playerRef.current.loadVideoById({
          videoId: song.videoId,
          startSeconds: song.startTime || 0,
        });
      } else {
        playerRef.current = new window.YT.Player(playerDivId, {
          height: "0",
          width: "0",
          videoId: song.videoId,
          playerVars: {
            autoplay: 1,
            start: song.startTime || 0,
            controls: 0,
            playsinline: 1,
          },
          events: {
            onReady: (e: any) => e.target.playVideo(),
          },
        });
      }
    };

    if (window.YT?.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }
  }, [playing]);

  const toggle = (id: number) => {
    setPlaying((prev) => (prev === id ? null : id));
  };

  return (
    <section
      style={{
        background: "#ecdfcc",
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
      {/* Hidden YT player mount point */}
      <div
        id={playerDivId}
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          overflow: "hidden",
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      {/* Faint background rings */}
      {[280, 420, 560].map((size, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: size,
            height: size,
            borderRadius: "50%",
            border: "1px solid rgba(229,152,155,0.1)",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ textAlign: "center", marginBottom: "clamp(32px, 6vw, 64px)", zIndex: 1 }}
      >
        <p
          style={{
            fontFamily: "'Georgia', serif",
            fontStyle: "italic",
            fontSize: "clamp(11px, 1.4vw, 13px)",
            color: "#e5989b",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            margin: "0 0 10px 0",
          }}
        >
          ✦ &nbsp; the playlist &nbsp; ✦
        </p>
        <h2
          style={{
            fontFamily: "'Georgia', serif",
            fontWeight: 700,
            fontSize: "clamp(36px, 6vw, 72px)",
            color: "#3d2b2b",
            margin: 0,
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          the sounds of{" "}
          <span style={{ fontStyle: "italic", color: "#e5989b" }}>her</span>
        </h2>
        <p
          style={{
            fontFamily: "'Georgia', serif",
            fontStyle: "italic",
            fontSize: "clamp(12px, 1.5vw, 14px)",
            color: "#b07a7d",
            margin: "12px 0 0 0",
          }}
        >
          let's hear some of her favorite music
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            marginTop: "16px",
          }}
        >
          <div style={{ height: "1px", width: "60px", background: "#e5989b" }} />
          <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#e5989b" }} />
          <div style={{ height: "1px", width: "60px", background: "#e5989b" }} />
        </div>
        <p
          style={{
            fontFamily: "'Georgia', serif",
            fontStyle: "italic",
            fontSize: "clamp(12px, 1.5vw, 14px)",
            color: "#b07a7d",
            margin: "12px 0 0 0",
          }}
        >
          click a record to play
        </p>
      </motion.div>

      {/* Records grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))",
          gap: "clamp(20px, 4vw, 48px)",
          zIndex: 1,
          width: "100%",
          maxWidth: "900px",
          justifyItems: "center",
        }}
      >
        {songs.map((song, i) => (
          <VinylRecord
            key={song.id}
            song={song}
            isPlaying={playing === song.id}
            onClick={() => toggle(song.id)}
            index={i}
          />
        ))}
      </div>
      <p
        style={{
          fontFamily: "'Georgia', serif",
          fontStyle: "italic",
          fontSize: "clamp(12px, 1.5vw, 14px)",
          color: "#b07a7d",
          margin: "30px 0 0 0",
        }}
      >
        Real gospel girlie you gotta love it
      </p>
    </section>
  );
}