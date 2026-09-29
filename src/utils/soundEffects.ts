/**
 * Web Audio API synthesized sound effects for gamified learning feedback.
 * Zero network dependencies, zero lag, soft, non-jarring acoustic aesthetics.
 */

const SOUND_PREF_KEY = 'klardeutsch_sound_enabled';

let audioCtx: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
};

export const isSoundEnabled = (): boolean => {
  if (typeof window === 'undefined') return true;
  try {
    const pref = localStorage.getItem(SOUND_PREF_KEY);
    return pref === null ? true : pref === 'true';
  } catch {
    return true;
  }
};

export const setSoundEnabled = (enabled: boolean): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SOUND_PREF_KEY, String(enabled));
  } catch {}
};

export const toggleSound = (): boolean => {
  const next = !isSoundEnabled();
  setSoundEnabled(next);
  return next;
};

/**
 * Subtle warm chime when saving a word (two soft ascending notes: G5 -> C6)
 */
export const playSaveWordSound = () => {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    // Note 1: 587.33 Hz (D5) -> Note 2: 783.99 Hz (G5) -> Note 3: 1046.5 Hz (C6)
    const notes = [
      { freq: 659.25, time: 0, duration: 0.12, gain: 0.045 }, // E5
      { freq: 880.0, time: 0.06, duration: 0.16, gain: 0.055 }  // A5
    ];

    notes.forEach(({ freq, time, duration, gain }) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + time);

      // Soft attack & exponential decay
      gainNode.gain.setValueAtTime(0.0001, now + time);
      gainNode.gain.linearRampToValueAtTime(gain, now + time + 0.015);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + time + duration);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now + time);
      osc.stop(now + time + duration);
    });
  } catch {
    // Ignore audio restrictions
  }
};

/**
 * Satisfying, elegant chime when completing/reading an article
 * An ascending triad arpeggio: F5 -> A5 -> C6
 */
export const playReadArticleSound = () => {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    const notes = [
      { freq: 523.25, time: 0, duration: 0.14, gain: 0.04 },    // C5
      { freq: 659.25, time: 0.07, duration: 0.16, gain: 0.045 }, // E5
      { freq: 783.99, time: 0.14, duration: 0.22, gain: 0.055 }  // G5
    ];

    notes.forEach(({ freq, time, duration, gain }) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'triangle'; // Warmer, slightly rounded tone
      osc.frequency.setValueAtTime(freq, now + time);

      gainNode.gain.setValueAtTime(0.0001, now + time);
      gainNode.gain.linearRampToValueAtTime(gain, now + time + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + time + duration);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now + time);
      osc.stop(now + time + duration);
    });
  } catch {
    // Ignore audio restrictions
  }
};

/**
 * Celebratory chime when the user reaches their daily goal!
 */
export const playGoalAchievedSound = () => {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    const notes = [
      { freq: 523.25, time: 0, duration: 0.15, gain: 0.04 },    // C5
      { freq: 659.25, time: 0.08, duration: 0.16, gain: 0.045 }, // E5
      { freq: 783.99, time: 0.16, duration: 0.18, gain: 0.05 },  // G5
      { freq: 1046.5, time: 0.24, duration: 0.35, gain: 0.06 }   // C6
    ];

    notes.forEach(({ freq, time, duration, gain }) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + time);

      gainNode.gain.setValueAtTime(0.0001, now + time);
      gainNode.gain.linearRampToValueAtTime(gain, now + time + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + time + duration);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now + time);
      osc.stop(now + time + duration);
    });
  } catch {
    // Ignore audio restrictions
  }
};

/**
 * Quick, delightful micro-ding for correct flashcard or quiz answer
 */
export const playSuccessDing = () => {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880.0, now); // A5

    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.linearRampToValueAtTime(0.045, now + 0.015);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.18);
  } catch {}
};
