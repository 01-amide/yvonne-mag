import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import PhoneShell from "./components/layout/PhoneShell";
import LockScreen from "./components/screens/LockScreen";
import Viewfinder from "./components/screens/ViewFinder";
import StoriesScreen from "./components/screens/StoriesScreen";
import ProfileScreen from "./components/screens/ProfileScreen";
import BankScreen from "./components/screens/BankScreen";
import CatCorner from "./components/screens/CatCorner";
import FinalScreen from "./components/screens/FinalScreen";
import LegacyScreen from "./components/layout/LegacyScreen";
import Calendar from "./components/sections/Calendar";
import MusicButton from "./components/ui/MusicButton";
import { content } from "./content";
import { startMusic, hasStarted } from "./lib/music";
import { posterOf, preloadImage, preloadVideo, warmItem } from "./lib/media";

type Screen = "lock" | "camera" | "stories" | "profile" | "calendar" | "bank" | "cats" | "message";

function App() {
  const [screen, setScreen] = useState<Screen>("lock");

  const handleUnlock = () => {
    setScreen("camera");
    startMusic(); // must run inside the swipe/tap
  };

  // While she's on the lock screen, quietly download what the next screens need
  useEffect(() => {
    const run = () => {
      preloadVideo(content.camera.media);
      preloadImage(content.camera.thumb);
      content.stories.forEach((st) => {
        preloadImage(st.cover);
        warmItem(st.items[0] && { type: st.items[0].type, src: st.items[0].src });
      });
      content.posts.forEach((p) => preloadImage(p.type === "video" ? posterOf(p.src) : p.src));
      content.cats.forEach((c) => preloadImage(c.photo));
    };
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(run, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(run, 1500);
    return () => window.clearTimeout(id);
  }, []);

  // If the swipe didn't count as a "tap" for audio (some iPhones), the next tap starts the music
  useEffect(() => {
    if (screen === "lock" || screen === "message") return;
    const retry = () => {
      if (hasStarted()) {
        window.removeEventListener("pointerup", retry);
        return;
      }
      startMusic();
    };
    window.addEventListener("pointerup", retry);
    return () => window.removeEventListener("pointerup", retry);
  }, [screen]);

  return (
    <PhoneShell>
      {screen !== "lock" && screen !== "message" && <MusicButton />}

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
        {screen === "calendar" && (
          <LegacyScreen key="calendar" onNext={() => setScreen("stories")}>
            <Calendar />
          </LegacyScreen>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {screen === "camera" && <Viewfinder key="camera" onNext={() => setScreen("calendar")} />}
      </AnimatePresence>

      <AnimatePresence>
        {screen === "lock" && <LockScreen key="lock" onUnlock={handleUnlock} />}
      </AnimatePresence>
    </PhoneShell>
  );
}

export default App;
