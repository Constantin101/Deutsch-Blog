import React, { useState, useEffect, useCallback } from 'react';
import {
  RotateCw,
  CheckCircle2,
  XCircle,
  Shuffle,
  Volume2,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Trophy,
  BookOpen
} from 'lucide-react';
import { VocabularyWord } from '../types';
import { AudioButton } from './AudioButton';
import { playSuccessDing } from '../utils/soundEffects';

interface SavedVocabularyFlashcardsProps {
  words: VocabularyWord[];
  onExit: () => void;
  onExploreMore?: () => void;
}

export const SavedVocabularyFlashcards: React.FC<SavedVocabularyFlashcardsProps> = ({
  words,
  onExit,
  onExploreMore
}) => {
  const [deck, setDeck] = useState<VocabularyWord[]>(() => [...words]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownWordIds, setKnownWordIds] = useState<string[]>([]);
  const [reviewWordIds, setReviewWordIds] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(0.9);

  // Sync if words change
  useEffect(() => {
    setDeck([...words]);
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownWordIds([]);
    setReviewWordIds([]);
    setIsFinished(false);
  }, [words]);

  const currentWord = deck[currentIndex];

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const handleNextCard = useCallback((known: boolean) => {
    if (!currentWord) return;

    if (known) {
      playSuccessDing();
      setKnownWordIds((prev) => (prev.includes(currentWord.id) ? prev : [...prev, currentWord.id]));
      setReviewWordIds((prev) => prev.filter((id) => id !== currentWord.id));
    } else {
      setReviewWordIds((prev) => (prev.includes(currentWord.id) ? prev : [...prev, currentWord.id]));
      setKnownWordIds((prev) => prev.filter((id) => id !== currentWord.id));
    }

    if (currentIndex + 1 < deck.length) {
      setIsFlipped(false);
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  }, [currentIndex, deck.length, currentWord]);

  // Keyboard navigation support: Space/Enter to flip, 1/Left for review, 2/Right for known
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFinished) return;
      if (e.code === 'Space' || e.key === 'Enter') {
        e.preventDefault();
        handleFlip();
      } else if (isFlipped && (e.key === '1' || e.key === 'ArrowLeft')) {
        e.preventDefault();
        handleNextCard(false);
      } else if (isFlipped && (e.key === '2' || e.key === 'ArrowRight')) {
        e.preventDefault();
        handleNextCard(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, isFinished, handleFlip, handleNextCard]);

  const handleShuffle = () => {
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownWordIds([]);
    setReviewWordIds([]);
    setIsFinished(false);
  };

  const handleRestartAll = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownWordIds([]);
    setReviewWordIds([]);
    setIsFinished(false);
  };

  const handleRestartReviewOnly = () => {
    const onlyReviewWords = words.filter((w) => reviewWordIds.includes(w.id));
    if (onlyReviewWords.length > 0) {
      setDeck(onlyReviewWords);
      setCurrentIndex(0);
      setIsFlipped(false);
      setKnownWordIds([]);
      setReviewWordIds([]);
      setIsFinished(false);
    }
  };

  const getArticleBadge = (article: string) => {
    switch (article) {
      case 'der':
        return (
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-md">
            der · Masculin
          </span>
        );
      case 'die':
        return (
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-md">
            die · Feminin
          </span>
        );
      case 'das':
        return (
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
            das · Neutru
          </span>
        );
      default:
        return null;
    }
  };

  if (words.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-[#DFDAD0] p-10 text-center space-y-4 max-w-lg mx-auto shadow-xs">
        <h3 className="text-xl font-serif font-bold text-[#191E24]">
          Nu ai cuvinte salvate în colecție
        </h3>
        <p className="text-xs text-[#525A62] leading-relaxed">
          Accesează secțiunea de vocabular și apasă pe pictograma de marcaj (semn de carte) pentru a adăuga cuvintele pe care vrei să le exersezi aici.
        </p>
        <button
          type="button"
          onClick={onExploreMore || onExit}
          className="px-4 py-2 rounded-lg bg-[#191E24] text-white text-xs font-semibold hover:bg-[#2C343D] transition-colors cursor-pointer"
        >
          Deschide Vocabularul
        </button>
      </div>
    );
  }

  // --- FINISHED SUMMARY VIEW ---
  if (isFinished) {
    const accuracy = Math.round((knownWordIds.length / deck.length) * 100);

    return (
      <div className="bg-white rounded-2xl border border-[#DFDAD0] p-8 sm:p-10 shadow-xs max-w-xl mx-auto space-y-6 text-center animate-fade-in">
        <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center mx-auto text-amber-800">
          <Trophy className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#15191E]">
            Sesiune de Flashcards Finalizată!
          </h3>
          <p className="text-xs sm:text-sm text-[#5B636B]">
            Ai parcurs toate cele <strong>{deck.length}</strong> cuvinte din lista ta de salvare.
          </p>
        </div>

        {/* Score metrics */}
        <div className="grid grid-cols-2 gap-3 py-2 max-w-xs mx-auto">
          <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200">
            <span className="text-[11px] font-medium text-emerald-800 uppercase block">
              Știute bine
            </span>
            <span className="text-2xl font-mono font-bold text-emerald-900 tabular-nums">
              {knownWordIds.length}
            </span>
          </div>

          <div className="bg-rose-50 rounded-xl p-3 border border-rose-200">
            <span className="text-[11px] font-medium text-rose-800 uppercase block">
              De repetat
            </span>
            <span className="text-2xl font-mono font-bold text-rose-900 tabular-nums">
              {reviewWordIds.length}
            </span>
          </div>
        </div>

        <p className="text-xs text-[#525A62]">
          Rată de memorare: <strong className="text-[#191E24] font-mono text-sm">{accuracy}%</strong>
        </p>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          {reviewWordIds.length > 0 && (
            <button
              type="button"
              onClick={handleRestartReviewOnly}
              className="px-4 py-2.5 rounded-lg bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Repetă doar cele {reviewWordIds.length} cuvinte nesigure</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleRestartAll}
            className="px-4 py-2.5 rounded-lg border border-[#DFDAD0] bg-[#FAF8F5] text-[#191E24] text-xs font-semibold hover:bg-[#EFECE6] transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Reia tot pachetul</span>
          </button>

          <button
            type="button"
            onClick={onExit}
            className="px-4 py-2.5 rounded-lg bg-[#191E24] text-white text-xs font-semibold hover:bg-[#2C343D] transition-colors cursor-pointer"
          >
            Înapoi la lista de salvate
          </button>
        </div>
      </div>
    );
  }

  const progressPercent = Math.round(((currentIndex + 1) / deck.length) * 100);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between gap-3 text-xs text-[#5B636B] pb-2 border-b border-[#EAE5DC]">
        <button
          type="button"
          onClick={onExit}
          className="inline-flex items-center gap-1 text-[#4B535B] hover:text-[#191E24] font-medium cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Ieși din modul Flashcards</span>
        </button>

        <div className="flex items-center gap-3">
          {/* Audio speed */}
          <div className="hidden sm:flex items-center bg-[#EFECE6] rounded-md px-1.5 py-0.5 text-[11px] font-mono">
            <span className="text-[#7C858F] mr-1">Viteză:</span>
            <button
              type="button"
              onClick={() => setSpeechRate(0.8)}
              className={`px-1.5 py-0.2 rounded cursor-pointer ${
                speechRate === 0.8 ? 'bg-white font-bold text-[#191E24]' : 'text-[#626A72]'
              }`}
            >
              0.8x
            </button>
            <button
              type="button"
              onClick={() => setSpeechRate(1.0)}
              className={`px-1.5 py-0.2 rounded cursor-pointer ${
                speechRate === 1.0 ? 'bg-white font-bold text-[#191E24]' : 'text-[#626A72]'
              }`}
            >
              1.0x
            </button>
          </div>

          {/* Shuffle button */}
          <button
            type="button"
            onClick={handleShuffle}
            title="Amestecă ordinea cuvintelor"
            className="p-1 text-[#626A72] hover:text-[#191E24] rounded hover:bg-[#EFECE6] transition-colors cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5" />
          </button>

          <span className="font-mono text-xs tabular-nums text-[#191E24] font-semibold">
            {currentIndex + 1} / {deck.length}
          </span>
        </div>
      </div>

      {/* Progress Track */}
      <div className="w-full h-1.5 bg-[#EAE5DC] rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-600 transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Central Interactive Flashcard Container */}
      <div
        onClick={handleFlip}
        role="button"
        tabIndex={0}
        aria-label="Flashcard de vocabular, apasă pentru întoarcere"
        className="bg-white rounded-2xl border-2 border-[#DFDAD0] hover:border-[#BDB5A4] p-8 sm:p-10 min-h-[340px] flex flex-col justify-between shadow-md cursor-pointer select-none transition-all duration-200 relative group"
      >
        {/* Card Header */}
        <div className="flex items-center justify-between text-xs text-[#7C858F]">
          <div className="flex items-center gap-2">
            <span className="font-medium text-[#292F36]">{currentWord.category}</span>
            <span>·</span>
            <span>Nivel {currentWord.level}</span>
          </div>

          <span className="font-mono text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
            {isFlipped ? 'VERSO · Română' : 'FAȚĂ · Germană'}
          </span>
        </div>

        {/* Card Body: Front or Back */}
        <div className="my-6 text-center space-y-4">
          {!isFlipped ? (
            /* FRONT: German Word + Audio */
            <div className="space-y-4">
              {currentWord.article && (
                <div className="flex justify-center">
                  {getArticleBadge(currentWord.article)}
                </div>
              )}

              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#15191E] tracking-tight">
                {currentWord.article ? `${currentWord.article} ` : ''}
                {currentWord.german}
              </h2>

              {currentWord.phonetic && (
                <p className="text-xs font-mono text-[#7C858F]">
                  [{currentWord.phonetic}]
                </p>
              )}

              <div
                className="pt-2 flex justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <AudioButton
                  text={`${currentWord.article} ${currentWord.german}`}
                  rate={speechRate}
                  size="md"
                  label="Ascultă pronunția"
                />
              </div>

              <p className="text-xs text-[#8C959F] pt-3">
                (Apasă pe card sau tasta <kbd className="font-mono bg-[#EFECE6] px-1.5 py-0.5 rounded text-[10px]">Spațiu</kbd> pentru a verifica traducerea)
              </p>
            </div>
          ) : (
            /* BACK: Romanian Translation + Details */
            <div className="space-y-4 animate-fade-in text-center">
              <div className="text-xs font-mono text-emerald-800 uppercase tracking-wider font-semibold">
                Traducere în Limba Română:
              </div>

              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-emerald-950">
                {currentWord.romanian}
              </h3>

              {currentWord.plural && (
                <p className="text-xs sm:text-sm text-[#525A62]">
                  Forma de plural: <strong className="text-[#191E24]">{currentWord.plural}</strong>
                </p>
              )}

              {/* Example sentence */}
              <div
                className="bg-[#FAF8F5] rounded-xl p-3.5 border border-[#EAE5DC] text-left text-xs space-y-1.5 max-w-md mx-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-serif italic font-medium text-[#191E24]">
                    „{currentWord.exampleGerman}”
                  </p>
                  <AudioButton
                    text={currentWord.exampleGerman}
                    rate={speechRate}
                    size="sm"
                    className="scale-90 shrink-0"
                  />
                </div>
                <p className="text-[#626A72]">{currentWord.exampleRomanian}</p>
              </div>

              {currentWord.memoryTip && (
                <p className="text-[11px] text-amber-900 bg-amber-50 rounded-lg p-2 max-w-md mx-auto border border-amber-200">
                  💡 <strong>Truc:</strong> {currentWord.memoryTip}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Card Footer Helper */}
        <div className="flex items-center justify-between text-xs text-[#7C858F] pt-3 border-t border-[#F0ECE4]">
          <span className="flex items-center gap-1">
            <RotateCw className="w-3.5 h-3.5" />
            <span>Click pentru rotire față / verso</span>
          </span>
          <span className="text-[11px] font-mono">
            {knownWordIds.length} știute · {reviewWordIds.length} de repetat
          </span>
        </div>
      </div>

      {/* Evaluation Assessment Buttons (Visible once flipped or always ready) */}
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNextCard(false);
            }}
            className="py-3 px-4 rounded-xl border-2 border-rose-200 bg-rose-50 text-rose-900 text-xs sm:text-sm font-semibold hover:bg-rose-100 hover:border-rose-300 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <XCircle className="w-4 h-4 text-rose-600" />
            <span>Mai trebuie repetat</span>
            <kbd className="hidden sm:inline font-mono text-[10px] bg-white/70 px-1.5 py-0.5 rounded">
              1
            </kbd>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNextCard(true);
            }}
            className="py-3 px-4 rounded-xl border-2 border-emerald-300 bg-emerald-600 text-white text-xs sm:text-sm font-semibold hover:bg-emerald-700 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>Am știut cuvântul!</span>
            <kbd className="hidden sm:inline font-mono text-[10px] bg-emerald-800 text-white px-1.5 py-0.5 rounded">
              2
            </kbd>
          </button>
        </div>

        <div className="flex justify-center text-[11px] text-[#7C858F] gap-4 pt-1">
          <span>
            Scurtături: <kbd className="font-mono bg-[#EFECE6] px-1 rounded">Spațiu</kbd> = Întoarce cardul
          </span>
          <span>
            <kbd className="font-mono bg-[#EFECE6] px-1 rounded">1</kbd> = Repetă
          </span>
          <span>
            <kbd className="font-mono bg-[#EFECE6] px-1 rounded">2</kbd> = Știut
          </span>
        </div>
      </div>
    </div>
  );
};
