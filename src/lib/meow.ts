import { content } from "../content";

type AudioCtor = typeof AudioContext;
let ctx: AudioContext | null = null;

// Plays a real recording if content.catSound is set, otherwise a synthesized meow.
// Call this from a tap/click handler so the browser allows audio.
export function playMeow(pitch = 1) {
  if (content.catSound) {
    const a = new Audio(content.catSound);
    a.play().catch(() => {});
    return;
  }

  const AC: AudioCtor | undefined =
    window.AudioContext ?? (window as unknown as { webkitAudioContext?: AudioCtor }).webkitAudioContext;
  if (!AC) return;
  if (!ctx) ctx = new AC();
  if (ctx.state === "suspended") void ctx.resume();

  const t = ctx.currentTime;
  const dur = 0.55;

  const osc = ctx.createOscillator();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(420 * pitch, t);
  osc.frequency.linearRampToValueAtTime(780 * pitch, t + 0.18);
  osc.frequency.linearRampToValueAtTime(520 * pitch, t + dur);

  // Sweeping vowel-like filter gives the "mee-ow" shape
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.Q.value = 4;
  filter.frequency.setValueAtTime(700, t);
  filter.frequency.linearRampToValueAtTime(1900, t + 0.2);
  filter.frequency.linearRampToValueAtTime(900, t + dur);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(0.6, t + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);

  osc.connect(filter).connect(gain).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + dur + 0.05);
}
