import { useEffect, useState } from "react";
import { animate } from "framer-motion";

// Counts from 0 up to `target`, starting after `delay` seconds.
export function useCountUp(target: number, delay = 0.6, duration = 2.2) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const controls = animate(0, target, {
      delay,
      duration,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [target, delay, duration]);
  return value;
}
