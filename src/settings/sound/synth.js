import { getSound } from "./toggle.js";

let audioCtx = null;

function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

export function playSound() {
  if (!getSound()) return;

  const ctx = getCtx();

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  const detune = ctx.createOscillator();
  const dGain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  detune.connect(dGain);
  dGain.connect(ctx.destination);

  const now = ctx.currentTime;

  osc.type = "sine";
  osc.frequency.setValueAtTime(300, now);
  osc.frequency.exponentialRampToValueAtTime(680, now + 0.09);
  gain.gain.setValueAtTime(0.18, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
  osc.start(now);
  osc.stop(now + 0.16);

  detune.type = "triangle";
  detune.frequency.setValueAtTime(450, now);
  detune.frequency.exponentialRampToValueAtTime(900, now + 0.07);
  dGain.gain.setValueAtTime(0.06, now);
  dGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
  detune.start(now);
  detune.stop(now + 0.12);
}
