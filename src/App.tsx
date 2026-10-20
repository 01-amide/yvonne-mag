import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import PhoneShell from "./components/layout/PhoneShell";
import LockScreen from "./components/screens/LockScreen";
import Viewfinder from "./components/screens/ViewFinder";
import StoriesScreen from "./components/screens/StoriesScreen";

type Screen = "lock" | "camera" | "stories" | "profile";

function App() {
  const [screen, setScreen] = useState<Screen>("lock");

  const handleUnlock = () => {
    setScreen("camera");
    // TODO: start the background music here (must happen inside the swipe/tap).
  };

  return (
    <PhoneShell>
      {/* Placeholder for the next screen, sits underneath everything */}
      <div
        className="screen"
        style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: "var(--subtext)" }}
      >
        Profile grid goes here
      </div>

      <AnimatePresence>
        {screen === "stories" && <StoriesScreen key="stories" onNext={() => setScreen("profile")} />}
      </AnimatePresence>

      <AnimatePresence>
        {screen === "camera" && <Viewfinder key="camera" onNext={() => setScreen("stories")} />}
      </AnimatePresence>

      <AnimatePresence>
        {screen === "lock" && <LockScreen key="lock" onUnlock={handleUnlock} />}
      </AnimatePresence>
    </PhoneShell>
  );
}

export default App;