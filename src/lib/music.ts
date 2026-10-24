import { useSyncExternalStore } from "react";
import { content } from "../content";

// One shared <audio> for the whole app. Browsers only allow it to start from a tap/swipe,
// so call startMusic() inside those handlers (it is safe to call again and again).

let audio: HTMLAudioElement | null = null;
let started = false; // has playback ever actually begun?
let userMuted = false; // she turned it off with the button
let paused = false; // paused for the voice note
let failed = !content.music.src; // no file / couldn't load
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

function get() {
  if (failed) return null;
  if (!audio) {
    audio = new Audio(content.music.src);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = content.music.volume; // ignored on iPhones
    audio.addEventListener("error", () => {
      failed = true;
      emit();
    });
  }
  return audio;
}

function play() {
  const a = get();
  if (!a || userMuted || paused) return;
  a.play()
    .then(() => {
      if (!started) {
        started = true;
        emit();
      }
    })
    .catch(() => {}); // blocked (no gesture yet): the next tap tries again
}

export const startMusic = () => play();
export const hasStarted = () => started;

export function pauseForVoice() {
  paused = true;
  audio?.pause();
}
export function resumeAfterVoice() {
  paused = false;
  if (started) play();
}
export function toggleMute() {
  userMuted = !userMuted;
  if (userMuted) audio?.pause();
  else play();
  emit();
}

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

// For the little on/off button
export function useMusicState() {
  const muted = useSyncExternalStore(subscribe, () => userMuted);
  const unavailable = useSyncExternalStore(subscribe, () => failed);
  return { muted, unavailable };
}
