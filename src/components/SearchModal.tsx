import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Layers, ArrowRight, Volume2 } from 'lucide-react';
import { BLOG_ARTICLES } from '../data/articles';
import { VOCABULARY_LIST } from '../data/vocabulary';
import { GRAMMAR_TOPICS } from '../data/grammar';
import { BlogArticle, VocabularyWord } from '../types';
import { speakGerman } from '../utils/audio';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (article: BlogArticle) => void;
  onGoToVocabulary: (searchTerm?: string) => void;
  onGoToGrammar: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectArticle,
  onGoToVocabulary,
  onGoToGrammar
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const matchedArticles = trimmed
    ? BLOG_ARTICLES.filter(
        (a) =>
          a.title.toLowerCase().includes(trimmed) ||
          a.subtitle.toLowerCase().includes(trimmed) ||
          a.excerpt.toLowerCase().includes(trimmed)
      )
    : [];

  const matchedWords = trimmed
    ? VOCABULARY_LIST.filter(
        (w) =>
          w.german.toLowerCase().includes(trimmed) ||
          w.romanian.toLowerCase().includes(trimmed) ||
          w.exampleGerman.toLowerCase().includes(trimmed)
      ).slice(0, 6)
    : [];

  const matchedGrammar = trimmed
    ? GRAMMAR_TOPICS.filter(
        (g) =>
          g.title.toLowerCase().includes(trimmed) ||
          g.germanTitle.toLowerCase().includes(trimmed) ||
          g.summary.toLowerCase().includes(trimmed)
      )
    : [];

  const hasResults =
    matchedArticles.length > 0 || matchedWords.length > 0 || matchedGrammar.length > 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl border border-[#DFDAD0] shadow-2xl w-full max-w-2xl overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Box */}
        <div className="p-4 border-b border-[#E7E2D9] flex items-center gap-3 bg-[#FAF8F5]">
          <Search className="w-5 h-5 text-[#7C858F] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Caută orice: cazuri, der die das, cuvinte, verbe..."
            className="w-full text-base bg-transparent border-none focus:outline-none text-[#191E24] placeholder-[#8A939E]"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-[#7C858F] hover:text-[#191E24] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline text-xs font-mono bg-white border border-[#DFDAD0] px-2 py-0.5 rounded text-[#7C858F]">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          {!trimmed ? (
            <div className="py-8 text-center text-xs text-[#7C858F] space-y-2">
              <p className="font-medium text-[#40474F]">Căutare rapidă în toată platforma</p>
              <p>Încearcă: „der die das”, „Kaffee”, „Wechselpräpositionen”, „Perfekt”</p>
            </div>
          ) : !hasResults ? (
            <div className="py-12 text-center text-sm text-[#5B636B] space-y-1">
              <p className="font-semibold text-[#191E24]">Niciun rezultat pentru „{query}”</p>
              <p className="text-xs text-[#7C858F]">Verifică ortografia sau folosește cuvinte cheie mai generale.</p>
            </div>
          ) : (
            <>
              {/* Articles matched */}
              {matchedArticles.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#7C858F] font-semibold flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                    <span>Articole & Ghiduri ({matchedArticles.length})</span>
                  </div>
                  <div className="space-y-1">
                    {matchedArticles.map((art) => (
                      <div
                        key={art.id}
                        onClick={() => {
                          onSelectArticle(art);
                          onClose();
                        }}
                        className="p-3 rounded-xl hover:bg-[#FAF8F5] border border-transparent hover:border-[#DFDAD0] cursor-pointer transition-colors space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif font-bold text-sm text-[#191E24]">
                            {art.title}
                          </h4>
                          <span className="text-[11px] font-mono text-[#7C858F] shrink-0 ml-2">
                            {art.level}
                          </span>
                        </div>
                        <p className="text-xs text-[#525A62] line-clamp-1">
                          {art.excerpt}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Vocabulary words matched */}
              {matchedWords.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#7C858F] font-semibold flex items-center justify-between">
                    <span>Vocabular ({matchedWords.length})</span>
                    <button
                      type="button"
                      onClick={() => {
                        onGoToVocabulary(query);
                        onClose();
                      }}
                      className="text-amber-800 text-[11px] font-sans hover:underline cursor-pointer"
                    >
                      Vezi tot vocabularul →
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {matchedWords.map((w) => (
                      <div
                        key={w.id}
                        className="p-2.5 rounded-lg border border-[#DFDAD0] bg-[#FAF8F5] flex items-center justify-between gap-2"
                      >
                        <div>
                          <div className="flex items-baseline gap-1.5">
                            {w.article && (
                              <span className="text-[11px] font-mono font-bold uppercase text-amber-800">
                                {w.article}
                              </span>
                            )}
                            <span className="font-serif font-bold text-sm text-[#191E24]">
                              {w.german}
                            </span>
                          </div>
                          <span className="text-xs text-[#525A62]">= {w.romanian}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => speakGerman(`${w.article} ${w.german}`)}
                          className="p-1.5 rounded bg-white text-[#525A62] hover:text-[#191E24] shadow-2xs cursor-pointer"
                          title="Ascultă"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Grammar topics matched */}
              {matchedGrammar.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#7C858F] font-semibold flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-blue-700" />
                    <span>Lecții de Gramatică ({matchedGrammar.length})</span>
                  </div>
                  <div className="space-y-1">
                    {matchedGrammar.map((g) => (
                      <div
                        key={g.id}
                        onClick={() => {
                          onGoToGrammar();
                          onClose();
                        }}
                        className="p-3 rounded-xl hover:bg-[#FAF8F5] border border-transparent hover:border-[#DFDAD0] cursor-pointer transition-colors space-y-1"
                      >
                        <h4 className="font-serif font-bold text-sm text-[#191E24]">
                          {g.title} ({g.germanTitle})
                        </h4>
                        <p className="text-xs text-[#525A62] line-clamp-1">
                          {g.summary}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
