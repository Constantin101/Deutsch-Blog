import React, { useState } from 'react';
import { Bookmark, BookOpen, Trash2, ArrowRight, RotateCw, Sparkles, Layers } from 'lucide-react';
import { BlogArticle, VocabularyWord } from '../types';
import { BLOG_ARTICLES } from '../data/articles';
import { VOCABULARY_LIST } from '../data/vocabulary';
import { ArticleCard } from './ArticleCard';
import { AudioButton } from './AudioButton';
import { ProgressChart } from './ProgressChart';
import { SavedVocabularyFlashcards } from './SavedVocabularyFlashcards';
import { DailyProgressState } from '../utils/dailyProgress';

interface BookmarksViewProps {
  bookmarkedArticleIds: string[];
  savedWordIds: string[];
  onToggleBookmarkArticle: (id: string) => void;
  onToggleSaveWord: (id: string) => void;
  onReadArticle: (article: BlogArticle) => void;
  onExploreVocabulary: () => void;
  onExploreArticles: () => void;
  progress?: DailyProgressState;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  bookmarkedArticleIds,
  savedWordIds,
  onToggleBookmarkArticle,
  onToggleSaveWord,
  onReadArticle,
  onExploreVocabulary,
  onExploreArticles,
  progress
}) => {
  const [wordsViewMode, setWordsViewMode] = useState<'cards' | 'flashcards'>('cards');

  const savedArticles = BLOG_ARTICLES.filter((a) => bookmarkedArticleIds.includes(a.id));
  const savedWords = VOCABULARY_LIST.filter((w) => savedWordIds.includes(w.id));

  const isEmpty = savedArticles.length === 0 && savedWords.length === 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      <div className="space-y-3">
        <div className="text-xs font-mono tracking-widest text-[#7C858F] uppercase">
          Spațiul Tău Personal de Studiu
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#15191E] tracking-tight">
          Lecții, Cuvinte Salvate și Flashcards
        </h1>
        <p className="text-base text-[#525A62] max-w-2xl">
          Revizuiește oricând articolele și cuvintele pe care le-ai marcat ca fiind prioritare. Testează-ți memorarea activă prin flashcard-uri interactive (față/verso).
        </p>
      </div>

      {/* 7-Day Chart Overview in Bookmarks / Profile View */}
      {progress && (
        <section className="bg-white rounded-2xl border border-[#DFDAD0] p-6 sm:p-8 shadow-xs">
          <ProgressChart progress={progress} />
        </section>
      )}

      {isEmpty ? (
        <div className="bg-white rounded-2xl border border-[#DFDAD0] p-12 text-center space-y-4 max-w-lg mx-auto shadow-xs">
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mx-auto">
            <Bookmark className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-serif font-bold text-[#191E24]">
            Nu ai salvat încă niciun articol sau cuvânt
          </h2>
          <p className="text-xs sm:text-sm text-[#5B636B] leading-relaxed">
            Apasă pe pictograma de marcaj (semn de carte) din dreptul oricărui articol sau cuvânt pentru a-l adăuga în lista ta personalizată de revizuire.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onExploreArticles}
              className="px-4 py-2 rounded-lg bg-[#191E24] text-white text-xs font-medium hover:bg-[#2C343D] transition-colors cursor-pointer"
            >
              Răsfoiește Articolele
            </button>
            <button
              type="button"
              onClick={onExploreVocabulary}
              className="px-4 py-2 rounded-lg border border-[#DFDAD0] bg-white text-xs font-medium text-[#191E24] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
            >
              Vezi Vocabularul
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Saved Vocabulary Words Section */}
          {savedWords.length > 0 && (
            <section className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#E7E2D9]">
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#191E24]">
                    Vocabular Salvat ({savedWords.length} cuvinte)
                  </h2>
                  <p className="text-xs text-[#7C858F] mt-0.5">
                    Memorate local pe acest dispozitiv
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  {/* Mode Selector */}
                  <div className="flex items-center bg-[#EFECE6] p-1 rounded-lg text-xs font-medium">
                    <button
                      type="button"
                      onClick={() => setWordsViewMode('cards')}
                      className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                        wordsViewMode === 'cards'
                          ? 'bg-white text-[#191E24] shadow-xs font-semibold'
                          : 'text-[#5B636B] hover:text-[#191E24]'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Listă Carduri</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setWordsViewMode('flashcards')}
                      className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                        wordsViewMode === 'flashcards'
                          ? 'bg-white text-[#191E24] shadow-xs font-semibold'
                          : 'text-[#5B636B] hover:text-[#191E24]'
                      }`}
                    >
                      <RotateCw className="w-3.5 h-3.5 text-amber-700" />
                      <span>Antrenor Flashcards</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={onExploreVocabulary}
                    className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-[#191E24] hover:text-amber-800 transition-colors"
                  >
                    <span>Adaugă cuvinte</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* View 1: Flashcards Mode */}
              {wordsViewMode === 'flashcards' ? (
                <SavedVocabularyFlashcards
                  words={savedWords}
                  onExit={() => setWordsViewMode('cards')}
                  onExploreMore={onExploreVocabulary}
                />
              ) : (
                /* View 2: Cards Grid */
                <div className="space-y-4">
                  {/* Banner prompting user to practice with flashcards */}
                  <div className="bg-[#FAF8F5] rounded-xl p-4 border border-[#EAE5DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <h4 className="font-serif font-bold text-sm text-[#191E24] flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                        <span>Vrei să îți testezi memoria activă?</span>
                      </h4>
                      <p className="text-xs text-[#525A62]">
                        Întoarce cardurile față/verso pentru a verifica dacă știi genul, traducerea și pluralul.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setWordsViewMode('flashcards')}
                      className="px-4 py-2 rounded-lg bg-[#191E24] text-white text-xs font-semibold hover:bg-[#2C343D] transition-colors cursor-pointer whitespace-nowrap self-start sm:self-auto"
                    >
                      Pornește Flashcards ({savedWords.length}) →
                    </button>
                  </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedWords.map((word) => (
                  <div
                    key={word.id}
                    className="bg-white rounded-xl border border-[#DFDAD0] p-4 shadow-xs flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-[#7C858F]">
                        <span className="font-medium text-[#292F36]">{word.category}</span>
                        <button
                          type="button"
                          onClick={() => onToggleSaveWord(word.id)}
                          className="p-1 text-rose-600 hover:text-rose-800 transition-colors"
                          title="Elimină din salvate"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-baseline gap-1.5">
                          {word.article && (
                            <span
                              className={`text-xs font-bold uppercase font-mono px-1.5 py-0.2 rounded ${
                                word.article === 'der'
                                  ? 'text-blue-700 bg-blue-50'
                                  : word.article === 'die'
                                  ? 'text-rose-700 bg-rose-50'
                                  : 'text-emerald-700 bg-emerald-50'
                              }`}
                            >
                              {word.article}
                            </span>
                          )}
                          <span className="text-xl font-serif font-bold text-[#191E24]">
                            {word.german}
                          </span>
                        </div>
                        <p className="text-sm text-[#4E565E] font-medium">
                          = {word.romanian}
                        </p>
                      </div>

                      <div className="pt-1">
                        <AudioButton
                          text={`${word.article} ${word.german}`}
                          size="sm"
                          label="Pronunție"
                        />
                      </div>

                      {/* Example sentence */}
                      <div className="bg-[#FAF8F5] rounded-lg p-2.5 border border-[#EFECE6] text-xs space-y-1">
                        <p className="font-serif italic text-[#191E24]">
                          „{word.exampleGerman}”
                        </p>
                        <p className="text-[#646C76]">{word.exampleRomanian}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            )}
          </section>
        )}

          {/* Saved Articles */}
          {savedArticles.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#E7E2D9]">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#191E24]">
                  Articole & Ghiduri Salvate ({savedArticles.length})
                </h2>
                <button
                  type="button"
                  onClick={onExploreArticles}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#191E24] hover:text-amber-800 transition-colors"
                >
                  <span>Vezi toate ghidurile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedArticles.map((art) => (
                  <ArticleCard
                    key={art.id}
                    article={art}
                    onRead={onReadArticle}
                    isBookmarked={true}
                    onToggleBookmark={onToggleBookmarkArticle}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};
