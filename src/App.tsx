import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import PhoneShell from "./components/layout/PhoneShell";
import LockScreen from "./components/screens/LockScreen";

type Screen = "lock" | "camera";

function App() {
  const [screen, setScreen] = useState<Screen>("lock");

  const handleUnlock = () => {
    setScreen("camera");
    // TODO: start the background music here (must happen inside the swipe/tap).
  };

  return (
    <PhoneShell>
      {/* Sits underneath so it's revealed as the lock screen slides up */}
      <div
        className="screen"
        style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: "var(--subtext)" }}
      >
        Viewfinder goes here
      </div>

      <AnimatePresence>
        {screen === "lock" && <LockScreen key="lock" onUnlock={handleUnlock} />}
      </AnimatePresence>
    </PhoneShell>
  );
}

export default App;