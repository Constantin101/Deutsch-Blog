import React, { useState } from 'react';
import { Award, CheckCircle, XCircle, RotateCcw, ArrowRight, Sparkles, HelpCircle, RotateCw } from 'lucide-react';
import { ARTICLE_TRAINER_ITEMS, SENTENCE_BUILDER_PUZZLES, GRAMMAR_QUIZ_QUESTIONS } from '../data/quiz';
import { AudioButton } from './AudioButton';
import { SavedVocabularyFlashcards } from './SavedVocabularyFlashcards';
import { VocabularyWord } from '../types';

interface InteractivePracticeProps {
  savedWords?: VocabularyWord[];
  onExploreVocabulary?: () => void;
}

export const InteractivePractice: React.FC<InteractivePracticeProps> = ({
  savedWords = [],
  onExploreVocabulary
}) => {
  const [activeTrainer, setActiveTrainer] = useState<'article' | 'sentence' | 'quiz' | 'saved-flashcards'>('article');

  // --- 1. Article Trainer State ---
  const [articleIndex, setArticleIndex] = useState(0);
  const [articleScore, setArticleScore] = useState(0);
  const [articleStreak, setArticleStreak] = useState(0);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [hasAnsweredArticle, setHasAnsweredArticle] = useState(false);

  const currentArticleItem = ARTICLE_TRAINER_ITEMS[articleIndex % ARTICLE_TRAINER_ITEMS.length];

  const handleGenderChoice = (gender: 'der' | 'die' | 'das') => {
    if (hasAnsweredArticle) return;
    setSelectedGender(gender);
    setHasAnsweredArticle(true);

    if (gender === currentArticleItem.correct) {
      setArticleScore((prev) => prev + 1);
      setArticleStreak((prev) => prev + 1);
    } else {
      setArticleStreak(0);
    }
  };

  const handleNextArticle = () => {
    setSelectedGender(null);
    setHasAnsweredArticle(false);
    setArticleIndex((prev) => prev + 1);
  };

  // --- 2. Sentence Builder State ---
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const currentSentence = SENTENCE_BUILDER_PUZZLES[sentenceIndex % SENTENCE_BUILDER_PUZZLES.length];
  const [placedWords, setPlacedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>(() => [...currentSentence.scrambled]);
  const [sentenceChecked, setSentenceChecked] = useState(false);
  const [sentenceSuccess, setSentenceSuccess] = useState(false);

  const handleWordClick = (word: string, indexInAvailable: number) => {
    if (sentenceChecked) return;
    setPlacedWords([...placedWords, word]);
    const remaining = [...availableWords];
    remaining.splice(indexInAvailable, 1);
    setAvailableWords(remaining);
  };

  const handleRemovePlacedWord = (indexInPlaced: number) => {
    if (sentenceChecked) return;
    const word = placedWords[indexInPlaced];
    const newPlaced = [...placedWords];
    newPlaced.splice(indexInPlaced, 1);
    setPlacedWords(newPlaced);
    setAvailableWords([...availableWords, word]);
  };

  const handleCheckSentence = () => {
    const isCorrect = placedWords.join(' ') === currentSentence.correctOrder.join(' ');
    setSentenceSuccess(isCorrect);
    setSentenceChecked(true);
  };

  const handleResetSentence = () => {
    setPlacedWords([]);
    setAvailableWords([...currentSentence.scrambled]);
    setSentenceChecked(false);
    setSentenceSuccess(false);
  };

  const handleNextSentence = () => {
    const nextIdx = (sentenceIndex + 1) % SENTENCE_BUILDER_PUZZLES.length;
    setSentenceIndex(nextIdx);
    const nextSentence = SENTENCE_BUILDER_PUZZLES[nextIdx];
    setPlacedWords([]);
    setAvailableWords([...nextSentence.scrambled]);
    setSentenceChecked(false);
    setSentenceSuccess(false);
  };

  // --- 3. Grammar Quiz State ---
  const [quizAnswers, setQuizAnswers] = useState<{ [qId: string]: string }>({});

  const handleQuizSelect = (questionId: string, option: string) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: option
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Title & Tabs */}
      <div className="space-y-4">
        <div className="text-xs font-mono tracking-widest text-[#7C858F] uppercase">
          Exerciții Practice & Gamificate
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#15191E] tracking-tight">
          Antrenor Interactiv de Limba Germană
        </h1>
        <p className="text-base text-[#525A62]">
          Alege un mod de antrenament pentru a-ți fixa cunoștințele prin repetiție activă și feedback instantaneu.
        </p>

        {/* Practice Mode Tabs */}
        <div className="flex flex-wrap items-center bg-[#EFECE6] p-1 rounded-xl gap-1 text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTrainer('article')}
            className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
              activeTrainer === 'article'
                ? 'bg-white text-[#191E24] shadow-xs font-bold'
                : 'text-[#5B636B] hover:text-[#191E24]'
            }`}
          >
            Antrenor der / die / das
          </button>
          <button
            type="button"
            onClick={() => setActiveTrainer('sentence')}
            className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
              activeTrainer === 'sentence'
                ? 'bg-white text-[#191E24] shadow-xs font-bold'
                : 'text-[#5B636B] hover:text-[#191E24]'
            }`}
          >
            Constructor de Propoziții (Satzbau V2)
          </button>
          <button
            type="button"
            onClick={() => setActiveTrainer('quiz')}
            className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
              activeTrainer === 'quiz'
                ? 'bg-white text-[#191E24] shadow-xs font-bold'
                : 'text-[#5B636B] hover:text-[#191E24]'
            }`}
          >
            Test de Cunoștințe (Cazuri & Gramatică)
          </button>
          <button
            type="button"
            onClick={() => setActiveTrainer('saved-flashcards')}
            className={`px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTrainer === 'saved-flashcards'
                ? 'bg-white text-[#191E24] shadow-xs font-bold'
                : 'text-[#5B636B] hover:text-[#191E24]'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5 text-amber-700" />
            <span>Flashcards Cuvinte Salvate</span>
            {savedWords.length > 0 && (
              <span className="font-mono text-[11px] bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded font-semibold">
                {savedWords.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* TRAINER 1: der / die / das Arcade */}
      {activeTrainer === 'article' && (
        <div className="bg-white rounded-2xl border border-[#DFDAD0] p-6 sm:p-10 shadow-xs space-y-8">
          {/* Top Scorebar */}
          <div className="flex items-center justify-between text-xs text-[#7C858F] pb-4 border-b border-[#F0ECE4]">
            <div className="flex items-center gap-4">
              <span>
                Scor total: <strong className="font-mono text-[#191E24]">{articleScore}</strong>
              </span>
              <span>
                Serie consecutivă:{' '}
                <strong className="font-mono text-amber-700">🔥 {articleStreak}</strong>
              </span>
            </div>
            <span className="font-mono text-stone-500">
              Cuvântul #{articleIndex + 1}
            </span>
          </div>

          {/* Central Challenge Card */}
          <div className="text-center space-y-4 py-6">
            <div className="text-xs uppercase font-mono tracking-wider text-[#7C858F]">
              Alege articolul corect pentru substantivul:
            </div>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#15191E] tracking-tight">
              {currentArticleItem.word}
            </h2>
            <div className="flex justify-center">
              <AudioButton
                text={currentArticleItem.word}
                size="md"
                label="Ascultă cuvântul"
              />
            </div>
          </div>

          {/* The 3 Big Article Buttons */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-lg mx-auto">
            <button
              type="button"
              disabled={hasAnsweredArticle}
              onClick={() => handleGenderChoice('der')}
              className={`py-4 rounded-xl text-lg font-mono font-bold tracking-wider transition-all cursor-pointer shadow-xs ${
                hasAnsweredArticle && currentArticleItem.correct === 'der'
                  ? 'bg-blue-600 text-white ring-4 ring-blue-200'
                  : hasAnsweredArticle && selectedGender === 'der'
                  ? 'bg-rose-600 text-white ring-2 ring-rose-300'
                  : 'bg-blue-50 text-blue-800 border-2 border-blue-200 hover:bg-blue-100 hover:border-blue-400 active:scale-98'
              }`}
            >
              DER (M)
            </button>

            <button
              type="button"
              disabled={hasAnsweredArticle}
              onClick={() => handleGenderChoice('die')}
              className={`py-4 rounded-xl text-lg font-mono font-bold tracking-wider transition-all cursor-pointer shadow-xs ${
                hasAnsweredArticle && currentArticleItem.correct === 'die'
                  ? 'bg-rose-600 text-white ring-4 ring-rose-200'
                  : hasAnsweredArticle && selectedGender === 'die'
                  ? 'bg-rose-600 text-white ring-2 ring-rose-300'
                  : 'bg-rose-50 text-rose-800 border-2 border-rose-200 hover:bg-rose-100 hover:border-rose-400 active:scale-98'
              }`}
            >
              DIE (F)
            </button>

            <button
              type="button"
              disabled={hasAnsweredArticle}
              onClick={() => handleGenderChoice('das')}
              className={`py-4 rounded-xl text-lg font-mono font-bold tracking-wider transition-all cursor-pointer shadow-xs ${
                hasAnsweredArticle && currentArticleItem.correct === 'das'
                  ? 'bg-emerald-600 text-white ring-4 ring-emerald-200'
                  : hasAnsweredArticle && selectedGender === 'das'
                  ? 'bg-rose-600 text-white ring-2 ring-rose-300'
                  : 'bg-emerald-50 text-emerald-800 border-2 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-400 active:scale-98'
              }`}
            >
              DAS (N)
            </button>
          </div>

          {/* Feedback & Suffix Explanation */}
          {hasAnsweredArticle && (
            <div className="bg-[#FAF8F5] rounded-xl p-5 border border-[#DFDAD0] max-w-lg mx-auto space-y-3">
              <div className="flex items-center gap-2">
                {selectedGender === currentArticleItem.correct ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span className="font-semibold text-emerald-800 text-sm">
                      Corect! Este {currentArticleItem.correct} {currentArticleItem.word}
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span className="font-semibold text-rose-800 text-sm">
                      Greșit! Forma corectă este {currentArticleItem.correct} {currentArticleItem.word}
                    </span>
                  </>
                )}
              </div>

              <p className="text-xs text-[#525A62] leading-relaxed">
                <strong className="text-[#191E24]">De ce?</strong> {currentArticleItem.explanation}
              </p>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleNextArticle}
                  className="px-4 py-2 rounded-lg bg-[#191E24] text-white text-xs font-semibold hover:bg-[#2C343D] transition-colors cursor-pointer"
                >
                  Următorul Cuvânt →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TRAINER 2: Sentence Builder (Satzbau) */}
      {activeTrainer === 'sentence' && (
        <div className="bg-white rounded-2xl border border-[#DFDAD0] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between text-xs text-[#7C858F] pb-3 border-b border-[#F0ECE4]">
            <span className="font-mono text-amber-800 font-semibold uppercase">
              Puzzle #{sentenceIndex + 1} din {SENTENCE_BUILDER_PUZZLES.length}
            </span>
            <span className="text-[#646C76]">Regula Verbului pe Poziția 2</span>
          </div>

          {/* Prompt */}
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase text-[#7C858F]">Cerință:</div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#15191E]">
              {currentSentence.prompt}
            </h3>
            <p className="text-xs text-[#7C858F]">
              💡 <em>{currentSentence.hint}</em>
            </p>
          </div>

          {/* Placed Words Tray */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-[#525A62]">
              Propoziția ta (apasă pe un cuvânt pentru a-l elimina):
            </div>
            <div className="min-h-[64px] p-3 rounded-xl border-2 border-dashed border-[#DFDAD0] bg-[#FAF8F5] flex flex-wrap items-center gap-2">
              {placedWords.length === 0 ? (
                <span className="text-xs text-[#9AA2AB] italic select-none">
                  Apasă pe cuvintele de mai jos în ordinea corectă...
                </span>
              ) : (
                placedWords.map((word, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleRemovePlacedWord(i)}
                    className="px-3 py-1.5 rounded-lg bg-[#191E24] text-white text-xs font-medium hover:bg-rose-700 transition-colors cursor-pointer select-none"
                  >
                    {word}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Available Scrambled Words */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-[#525A62]">Cuvinte disponibile:</div>
            <div className="flex flex-wrap items-center gap-2">
              {availableWords.map((word, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleWordClick(word, i)}
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#DFDAD0] text-[#191E24] text-xs font-medium hover:bg-[#F2EFE9] transition-colors cursor-pointer select-none"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#F0ECE4]">
            <button
              type="button"
              onClick={handleResetSentence}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DFDAD0] text-xs font-medium text-[#525A62] hover:bg-[#FAF8F5] cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Resetează</span>
            </button>

            <button
              type="button"
              disabled={placedWords.length === 0}
              onClick={handleCheckSentence}
              className="px-5 py-2 rounded-lg bg-[#191E24] text-white text-xs font-semibold hover:bg-[#2C343D] disabled:opacity-40 transition-colors cursor-pointer"
            >
              Verifică Propoziția
            </button>
          </div>

          {/* Result Banner */}
          {sentenceChecked && (
            <div
              className={`p-4 rounded-xl border text-xs space-y-2 ${
                sentenceSuccess
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">
                  {sentenceSuccess ? '🎉 Excelent! Topică perfectă!' : '❌ Ordinea nu este chiar corectă'}
                </span>
                <AudioButton
                  text={currentSentence.correctOrder.join(' ')}
                  size="sm"
                  label="Ascultă forma corectă"
                />
              </div>
              <p>
                <strong>Forma corectă:</strong> „{currentSentence.correctOrder.join(' ')}”
              </p>
              <p className="opacity-90">{currentSentence.explanation}</p>
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleNextSentence}
                  className="px-3 py-1.5 rounded-md bg-[#191E24] text-white font-medium cursor-pointer"
                >
                  Următorul Exercițiu →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TRAINER 3: Grammar Quiz */}
      {activeTrainer === 'quiz' && (
        <div className="space-y-6">
          {GRAMMAR_QUIZ_QUESTIONS.map((q, idx) => {
            const userAnswer = quizAnswers[q.id];
            const isAnswered = userAnswer !== undefined;
            const isCorrect = userAnswer === q.correctAnswer;

            return (
              <div
                key={q.id}
                className="bg-white rounded-2xl border border-[#DFDAD0] p-6 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between text-xs text-[#7C858F] pb-2 border-b border-[#F0ECE4]">
                  <span className="font-mono">Întrebarea {idx + 1} / {GRAMMAR_QUIZ_QUESTIONS.length}</span>
                  <span className="font-mono font-semibold">Nivel {q.level}</span>
                </div>

                <h3 className="text-base sm:text-lg font-serif font-bold text-[#191E24]">
                  {q.prompt}
                </h3>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options?.map((opt, oIdx) => {
                    const isOptionSelected = userAnswer === opt;
                    const isOptionCorrect = opt === q.correctAnswer;

                    return (
                      <button
                        key={oIdx}
                        type="button"
                        disabled={isAnswered}
                        onClick={() => handleQuizSelect(q.id, opt)}
                        className={`p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                          !isAnswered
                            ? 'bg-[#FAF8F5] border-[#DFDAD0] hover:border-[#A8A093] hover:bg-white text-[#191E24]'
                            : isOptionCorrect
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold'
                            : isOptionSelected
                            ? 'bg-rose-50 border-rose-300 text-rose-900 line-through'
                            : 'bg-white border-[#DFDAD0] text-[#7C858F] opacity-60'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback */}
                {isAnswered && (
                  <div
                    className={`p-3 rounded-lg text-xs space-y-1 ${
                      isCorrect ? 'bg-emerald-50 text-emerald-950 border border-emerald-200' : 'bg-rose-50 text-rose-950 border border-rose-200'
                    }`}
                  >
                    <p className="font-semibold">
                      {isCorrect ? '✓ Corect!' : '✗ Răspuns greșit.'}
                    </p>
                    <p>{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* TRAINER 4: Saved Words Flashcards */}
      {activeTrainer === 'saved-flashcards' && (
        <SavedVocabularyFlashcards
          words={savedWords}
          onExit={() => setActiveTrainer('article')}
          onExploreMore={onExploreVocabulary}
        />
      )}
    </div>
  );
};
