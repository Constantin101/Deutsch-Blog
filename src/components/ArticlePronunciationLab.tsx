import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  HelpCircle,
  Headphones,
  Award
} from 'lucide-react';
import { PronunciationExercise } from '../types';
import { AudioButton } from './AudioButton';
import { playSuccessDing } from '../utils/soundEffects';

interface ArticlePronunciationLabProps {
  items: PronunciationExercise[];
  articleTitle?: string;
}

// Compute normalized Levenshtein-based similarity score (0 to 100%)
const computeSimilarity = (target: string, recognized: string): number => {
  const cleanTarget = target.toLowerCase().replace(/[.,!?;:"]/g, '').trim();
  const cleanRec = recognized.toLowerCase().replace(/[.,!?;:"]/g, '').trim();

  if (!cleanRec) return 0;
  if (cleanTarget === cleanRec) return 100;

  const targetWords = cleanTarget.split(/\s+/);
  const recWords = cleanRec.split(/\s+/);

  let matchingWords = 0;
  targetWords.forEach((word) => {
    if (recWords.includes(word)) {
      matchingWords++;
    }
  });

  const wordOverlapScore = (matchingWords / Math.max(targetWords.length, recWords.length)) * 100;

  // Character-level Levenshtein distance for finer estimation
  const m = cleanTarget.length;
  const n = cleanRec.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (cleanTarget[i - 1] === cleanRec[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + 1);
      }
    }
  }

  const distance = dp[m][n];
  const charScore = Math.max(0, 1 - distance / Math.max(m, n)) * 100;

  return Math.round(wordOverlapScore * 0.6 + charScore * 0.4);
};

export const ArticlePronunciationLab: React.FC<ArticlePronunciationLabProps> = ({
  items,
  articleTitle
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(0.9);
  const [micError, setMicError] = useState<string | null>(null);
  const [speechApiSupported, setSpeechApiSupported] = useState(true);

  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const userAudioElementRef = useRef<HTMLAudioElement | null>(null);

  const currentItem = items[currentIndex] || items[0];

  // Initialize SpeechRecognition & check browser support
  useEffect(() => {
    const SpeechRecognitionClass =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      setSpeechApiSupported(false);
    }
  }, []);

  // Reset state when switching exercise phrase
  useEffect(() => {
    stopAll();
    setTranscript('');
    setMatchScore(null);
    setMicError(null);
    if (recordedAudioUrl) {
      URL.revokeObjectURL(recordedAudioUrl);
      setRecordedAudioUrl(null);
    }
  }, [currentIndex]);

  const stopAll = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {}
      recognitionRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      try {
        mediaRecorderRef.current.stop();
      } catch {}
    }
    setIsListening(false);
    setIsRecordingAudio(false);
  };

  const handleStartListening = async () => {
    stopAll();
    setMicError(null);
    setTranscript('');
    setMatchScore(null);

    const SpeechRecognitionClass =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    // 1. Start Audio Recorder via MediaRecorder for playback comparison
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioChunksRef.current = [];
        const recorder = new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;

        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        recorder.onstop = () => {
          const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const url = URL.createObjectURL(blob);
          setRecordedAudioUrl(url);
          // Stop mic tracks
          stream.getTracks().forEach((track) => track.stop());
        };

        recorder.start();
        setIsRecordingAudio(true);
      }
    } catch {
      // Audio record fallback, continue with speech recognition if available
    }

    // 2. Start Web Speech Recognition
    if (SpeechRecognitionClass) {
      try {
        const recognition = new SpeechRecognitionClass();
        recognitionRef.current = recognition;
        recognition.lang = 'de-DE'; // German model
        recognition.continuous = false;
        recognition.interimResults = true;

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = 0; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscript(currentTranscript);
        };

        recognition.onerror = (event: any) => {
          if (event.error === 'not-allowed') {
            setMicError('Accesul la microfon a fost refuzat. Te rugăm să permiți microfonul în browser.');
          } else if (event.error === 'no-speech') {
            setMicError('Nu s-a detectat voce. Te rugăm să vorbești aproape de microfon.');
          } else {
            setMicError(`Eroare de recunoaștere: ${event.error}`);
          }
          stopAll();
        };

        recognition.onend = () => {
          setIsListening(false);
          setIsRecordingAudio(false);
          if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
          }
        };

        recognition.start();
      } catch (err: any) {
        setMicError('Nu s-a putut porni recunoașterea vocală.');
        setIsListening(false);
      }
    } else {
      setIsListening(true);
    }
  };

  const handleStopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      try {
        mediaRecorderRef.current.stop();
      } catch {}
    }
    setIsListening(false);
    setIsRecordingAudio(false);
  };

  // Evaluate similarity score whenever transcript finishes
  useEffect(() => {
    if (!isListening && transcript && currentItem) {
      const score = computeSimilarity(currentItem.german, transcript);
      setMatchScore(score);
      if (score >= 80) {
        playSuccessDing();
      }
    }
  }, [isListening, transcript, currentItem]);

  const handlePlayUserAudio = () => {
    if (recordedAudioUrl && userAudioElementRef.current) {
      userAudioElementRef.current.currentTime = 0;
      userAudioElementRef.current.play().catch(() => {});
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <section className="bg-white rounded-2xl border border-[#DFDAD0] p-6 sm:p-8 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#EAE5DC]">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-amber-800 font-semibold">
            <Headphones className="w-4 h-4 text-amber-600" />
            <span>Atelier de Pronunție & Voce (Web Speech API)</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#191E24]">
            Ascultă, Înregistrează și Compară
          </h3>
          <p className="text-xs sm:text-sm text-[#525A62]">
            Ascultă modelul nativ în limba germană, rostește fraza în microfon și verifică scorul tău de acuratețe.
          </p>
        </div>

        {/* Phrase counter badge */}
        <div className="self-start sm:self-auto font-mono text-xs bg-[#FAF8F5] border border-[#DFDAD0] px-3 py-1.5 rounded-lg text-[#191E24] font-semibold">
          Fraza {currentIndex + 1} din {items.length}
        </div>
      </div>

      {/* Phrase Stepper Buttons */}
      {items.length > 1 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {items.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentIndex === idx
                  ? 'bg-[#191E24] text-white shadow-xs'
                  : 'bg-[#FAF8F5] border border-[#DFDAD0] text-[#555E67] hover:bg-[#EFECE6]'
              }`}
            >
              <span>Exercițiul {idx + 1}</span>
            </button>
          ))}
        </div>
      )}

      {/* Target Phrase Box */}
      <div className="bg-[#FAF8F5] rounded-2xl border border-[#DFDAD0] p-6 space-y-4">
        <div className="flex items-center justify-between text-xs text-[#7C858F]">
          <span className="font-semibold text-amber-900 bg-amber-100/70 border border-amber-200 px-2 py-0.5 rounded">
            Focalizare: {currentItem.focusPoint}
          </span>
          {currentItem.phonetic && (
            <span className="font-mono text-xs">[{currentItem.phonetic}]</span>
          )}
        </div>

        {/* German Target Sentence */}
        <div className="space-y-1 text-center py-2">
          <h4 className="text-2xl sm:text-3xl font-serif font-bold text-[#15191E] tracking-tight">
            „{currentItem.german}”
          </h4>
          <p className="text-sm text-[#4E565E] font-medium">
            = {currentItem.romanian}
          </p>
        </div>

        {/* Pronunciation Tip */}
        {currentItem.tip && (
          <div className="bg-white/80 rounded-xl p-3 border border-[#EAE5DC] text-xs text-[#4E565E] flex items-start gap-2 max-w-lg mx-auto">
            <span className="font-bold text-amber-800 shrink-0">💡 Sfat pronunție:</span>
            <span>{currentItem.tip}</span>
          </div>
        )}

        {/* Predefined Audio Model Actions */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <AudioButton
            text={currentItem.german}
            rate={playbackSpeed}
            size="md"
            label={`Ascultă modelul nativ (${playbackSpeed}x)`}
          />

          <div className="flex items-center bg-[#EFECE6] rounded-lg p-0.5 text-xs font-mono">
            <button
              type="button"
              onClick={() => setPlaybackSpeed(0.75)}
              className={`px-2 py-1 rounded cursor-pointer ${
                playbackSpeed === 0.75 ? 'bg-white font-bold text-[#191E24] shadow-xs' : 'text-[#626A72]'
              }`}
            >
              0.75x Lent
            </button>
            <button
              type="button"
              onClick={() => setPlaybackSpeed(0.9)}
              className={`px-2 py-1 rounded cursor-pointer ${
                playbackSpeed === 0.9 ? 'bg-white font-bold text-[#191E24] shadow-xs' : 'text-[#626A72]'
              }`}
            >
              1.0x Normal
            </button>
          </div>
        </div>
      </div>

      {/* Recording & Comparison Console */}
      <div className="bg-white rounded-2xl border-2 border-dashed border-[#DFDAD0] p-6 space-y-6">
        <div className="text-center space-y-3">
          <p className="text-xs font-mono text-[#7C858F] uppercase tracking-wider">
            Înregistrarea și analiza vocii tale
          </p>

          {/* Big Recording Button */}
          <div className="flex justify-center">
            {!isListening ? (
              <button
                type="button"
                onClick={handleStartListening}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
              >
                <Mic className="w-5 h-5" />
                <span>Apasă și rostește în germană</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleStopListening}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm shadow-md transition-all animate-pulse active:scale-98 cursor-pointer"
              >
                <MicOff className="w-5 h-5" />
                <span>Oprește înregistrarea (Se ascultă...)</span>
              </button>
            )}
          </div>

          <p className="text-[11px] text-[#7C858F]">
            {isListening
              ? 'Vorbește acum clar în limba germană...'
              : 'Apasă butonul, citește fraza de mai sus cu voce tare, apoi oprește înregistrarea.'}
          </p>

          {micError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center justify-center gap-2 max-w-md mx-auto">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{micError}</span>
            </div>
          )}
        </div>

        {/* Live Audio & Transcript Comparison */}
        {(transcript || isListening || recordedAudioUrl) && (
          <div className="bg-[#FAF8F5] rounded-xl p-5 border border-[#DFDAD0] space-y-4 animate-fade-in">
            {/* Recognized text */}
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-[#7C858F] block">
                Ce a recunoscut sistemul:
              </span>
              <p className="text-base sm:text-lg font-serif font-semibold text-[#191E24]">
                {transcript || (
                  <span className="text-[#8C959F] italic font-sans text-sm">
                    Ascultare în curs...
                  </span>
                )}
              </p>
            </div>

            {/* Score & Evaluation Feedback */}
            {matchScore !== null && !isListening && (
              <div className="pt-3 border-t border-[#EAE5DC] space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-sm ${
                        matchScore >= 80
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : matchScore >= 60
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}
                    >
                      {matchScore}%
                    </div>
                    <div>
                      <h5 className="font-semibold text-sm text-[#191E24]">
                        {matchScore >= 80
                          ? 'Pronunție Excelentă! ✓'
                          : matchScore >= 60
                          ? 'Pronunție Bună! Continuă să exersezi.'
                          : 'Mai încearcă o dată pentru fidelitate.'}
                      </h5>
                      <p className="text-xs text-[#525A62]">
                        {matchScore >= 80
                          ? 'Modelul audio recunoaște fraza aproape perfect.'
                          : matchScore >= 60
                          ? 'Fraza este inteligibilă, fii atent la terminații și diftongi.'
                          : 'Ascultă modelul la 0.75x și pronunță mai apăsat fiecare consoană.'}
                      </p>
                    </div>
                  </div>

                  {/* Play user recording button */}
                  {recordedAudioUrl && (
                    <button
                      type="button"
                      onClick={handlePlayUserAudio}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DFDAD0] bg-white text-xs font-medium text-[#191E24] hover:bg-[#EFECE6] transition-colors cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 text-amber-700" />
                      <span>Ascultă vocea ta</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Hidden Audio element for user recording */}
        {recordedAudioUrl && (
          <audio
            ref={userAudioElementRef}
            src={recordedAudioUrl}
            className="hidden"
          />
        )}
      </div>
    </section>
  );
};
