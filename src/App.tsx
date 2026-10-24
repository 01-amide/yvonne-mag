import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import PhoneShell from "./components/layout/PhoneShell";
import LockScreen from "./components/screens/LockScreen";
import Viewfinder from "./components/screens/ViewFinder";
import StoriesScreen from "./components/screens/StoriesScreen";
import ProfileScreen from "./components/screens/ProfileScreen";
import BankScreen from "./components/screens/BankScreen";
import CatCorner from "./components/screens/CatCorner";
import FinalScreen from "./components/screens/FinalScreen";

type Screen = "lock" | "camera" | "stories" | "profile" | "bank" | "cats" | "message";

function App() {
  const [screen, setScreen] = useState<Screen>("lock");

  const handleUnlock = () => {
    setScreen("camera");
    // TODO: start the background music here (must happen inside the swipe/tap).
  };

  return (
    <PhoneShell>
      <AnimatePresence>
        {screen === "message" && <FinalScreen key="message" onRestart={() => setScreen("lock")} />}
      </AnimatePresence>

      <AnimatePresence>
        {screen === "cats" && <CatCorner key="cats" onNext={() => setScreen("message")} />}
      </AnimatePresence>

      <AnimatePresence>
        {screen === "bank" && <BankScreen key="bank" onNext={() => setScreen("cats")} />}
      </AnimatePresence>

      <AnimatePresence>
        {screen === "profile" && <ProfileScreen key="profile" onNext={() => setScreen("bank")} />}
      </AnimatePresence>

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