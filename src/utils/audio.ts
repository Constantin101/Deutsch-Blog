/**
 * Web Speech Synthesis helper for German pronunciation
 */

let currentUtterance: SpeechSynthesisUtterance | null = null;

export const speakGerman = (
  text: string,
  rate: number = 0.9,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: () => void
): boolean => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onError?.();
    return false;
  }

  try {
    window.speechSynthesis.cancel();

    // Clean up text if needed (e.g., remove slashes or parenthetical notes)
    const cleanText = text.replace(/\[.*?\]/g, '').replace(/\(.*?\)/g, '').trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'de-DE';
    utterance.rate = rate; // 0.8 to 1.0 is great for learners
    utterance.pitch = 1.0;

    // Try finding a German voice
    const voices = window.speechSynthesis.getVoices();
    const deVoice = voices.find(
      (v) => v.lang.startsWith('de') || v.name.toLowerCase().includes('german') || v.name.toLowerCase().includes('deutsch')
    );
    if (deVoice) {
      utterance.voice = deVoice;
    }

    utterance.onstart = () => {
      onStart?.();
    };

    utterance.onend = () => {
      currentUtterance = null;
      onEnd?.();
    };

    utterance.onerror = () => {
      currentUtterance = null;
      onError?.();
    };

    currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
    return true;
  } catch {
    onError?.();
    return false;
  }
};

export const stopSpeech = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
};
