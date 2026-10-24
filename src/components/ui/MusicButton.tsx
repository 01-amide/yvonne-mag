import { toggleMute, useMusicState } from "../../lib/music";

// Small on/off toggle for the background music. Hidden if there's no music file.
export default function MusicButton() {
  const { muted, unavailable } = useMusicState();
  if (unavailable) return null;
  return (
    <button
      onClick={toggleMute}
      aria-label={muted ? "Turn music on" : "Turn music off"}
      style={{
        position: "absolute", top: "calc(env(safe-area-inset-top, 0px) + 8px)", left: "50%", transform: "translateX(-50%)",
        zIndex: 30, width: 34, height: 34, borderRadius: "50%", cursor: "pointer", fontSize: 15, lineHeight: 1,
        background: "rgba(20,11,31,0.55)", border: "1px solid var(--border)", color: "#fff",
        backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
      }}
    >
      {muted ? "🔇" : "🎵"}
    </button>
  );
}
