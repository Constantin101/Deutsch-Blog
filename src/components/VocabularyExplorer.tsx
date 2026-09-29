import React, { useState, useMemo } from 'react';
import { Search, Filter, Volume2, Bookmark, RotateCw, CheckCircle2, SlidersHorizontal, BookMarked } from 'lucide-react';
import { VocabularyWord, CefrLevel } from '../types';
import { VOCABULARY_LIST, VOCABULARY_CATEGORIES } from '../data/vocabulary';
import { AudioButton } from './AudioButton';

interface VocabularyExplorerProps {
  initialLevel: CefrLevel;
  savedWordIds: string[];
  onToggleSaveWord: (wordId: string) => void;
  wordsSavedToday?: string[];
}

export const VocabularyExplorer: React.FC<VocabularyExplorerProps> = ({
  initialLevel,
  savedWordIds,
  onToggleSaveWord,
  wordsSavedToday = []
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Toate');
  const [selectedLevel, setSelectedLevel] = useState<CefrLevel>(initialLevel);
  const [viewMode, setViewMode] = useState<'cards' | 'flashcards'>('cards');
  const [speechRate, setSpeechRate] = useState<number>(0.9);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Filtered vocabulary
  const filteredWords = useMemo(() => {
    return VOCABULARY_LIST.filter((item) => {
      const matchesSearch =
        item.german.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.romanian.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.exampleGerman.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'Toate' || item.category === selectedCategory;

      const matchesLevel =
        selectedLevel === 'Toate' || item.level === selectedLevel;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchTerm, selectedCategory, selectedLevel]);

  // Current flashcard
  const currentFlashcard = filteredWords[flashcardIndex] || filteredWords[0];

  const handleNextFlashcard = () => {
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev + 1) % filteredWords.length);
  };

  const handlePrevFlashcard = () => {
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev - 1 + filteredWords.length) % filteredWords.length);
  };

  const getArticleBadge = (article: string) => {
    switch (article) {
      case 'der':
        return (
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
            der · Masc.
          </span>
        );
      case 'die':
        return (
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
            die · Fem.
          </span>
        );
      case 'das':
        return (
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
            das · Neutru
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Header and overview */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#7C858F] uppercase">
          <span>Dicționar Tematic German-Român</span>
          <span aria-hidden="true">·</span>
          <span>Pronunție Audio Nativă</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#15191E] tracking-tight">
          Vocabular Esențial cu Exemple Practice
        </h1>
        <p className="text-base text-[#525A62] max-w-2xl">
          Cuvinte uzuale ordonate pe categorii din viața de zi cu zi. Fiecare cuvânt include genul colorat, pluralul, pronunția audio și o propoziție exemplu tradusă.
        </p>
      </div>

      {/* Control bar: Search, filters, and view mode toggle */}
      <div className="bg-white rounded-xl border border-[#DFDAD0] p-4 sm:p-5 shadow-xs space-y-4">
        {/* Search input + View switcher */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7C858F]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setFlashcardIndex(0);
              }}
              placeholder="Caută un cuvânt în germană sau română (ex: Kaffee, gară, Arzt)..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-[#FAF8F5] border border-[#DFDAD0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#191E24] text-[#191E24] placeholder-[#8C959F]"
            />
          </div>

          {/* View mode toggle + audio speed selector */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            {/* Audio speed */}
            <div className="flex items-center bg-[#FAF8F5] border border-[#DFDAD0] rounded-lg p-1 text-xs">
              <span className="text-[#7C858F] px-1.5 font-mono">Viteză:</span>
              <button
                type="button"
                onClick={() => setSpeechRate(0.8)}
                className={`px-2 py-0.5 rounded cursor-pointer ${
                  speechRate === 0.8 ? 'bg-white text-[#191E24] font-semibold shadow-xs' : 'text-[#626A72]'
                }`}
              >
                0.8x
              </button>
              <button
                type="button"
                onClick={() => setSpeechRate(1.0)}
                className={`px-2 py-0.5 rounded cursor-pointer ${
                  speechRate === 1.0 ? 'bg-white text-[#191E24] font-semibold shadow-xs' : 'text-[#626A72]'
                }`}
              >
                1.0x
              </button>
            </div>

            {/* Mode switch */}
            <div className="flex items-center bg-[#EFECE6] p-1 rounded-lg text-xs font-medium">
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'cards'
                    ? 'bg-white text-[#191E24] shadow-xs font-semibold'
                    : 'text-[#5B636B] hover:text-[#191E24]'
                }`}
              >
                Listă Carduri
              </button>
              <button
                type="button"
                onClick={() => {
                  setViewMode('flashcards');
                  setIsFlipped(false);
                }}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'flashcards'
                    ? 'bg-white text-[#191E24] shadow-xs font-semibold'
                    : 'text-[#5B636B] hover:text-[#191E24]'
                }`}
              >
                Flashcards (Autotestare)
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills & Level Filter */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-3 border-t border-[#F0ECE4]">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
            {VOCABULARY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setFlashcardIndex(0);
                }}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer font-medium ${
                  selectedCategory === cat
                    ? 'bg-[#191E24] text-white'
                    : 'bg-[#F2EFE9] text-[#525A62] hover:bg-[#E7E2D9] hover:text-[#191E24]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Level Filter */}
          <div className="flex items-center gap-1.5 shrink-0 text-xs">
            <span className="text-[#7C858F] font-medium">Nivel:</span>
            {(['Toate', 'A1', 'A2', 'B1'] as CefrLevel[]).map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => {
                  setSelectedLevel(lvl);
                  setFlashcardIndex(0);
                }}
                className={`px-2.5 py-1 rounded-md cursor-pointer font-medium transition-colors ${
                  selectedLevel === lvl
                    ? 'bg-amber-100 text-amber-900 border border-amber-300 font-semibold'
                    : 'bg-[#F2EFE9] text-[#525A62] hover:bg-[#E7E2D9]'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result Counter & Active Filters Display */}
      <div className="flex items-center justify-between text-xs text-[#717A84] px-1">
        <span>
          Afișate <strong className="text-[#191E24] font-mono tabular-nums">{filteredWords.length}</strong> cuvinte din totalul de {VOCABULARY_LIST.length}
        </span>
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm('')}
            className="text-amber-800 hover:underline cursor-pointer"
          >
            Șterge căutarea „{searchTerm}”
          </button>
        )}
      </div>

      {/* VIEW MODE 1: Flashcard Trainer View */}
      {viewMode === 'flashcards' && (
        <div className="max-w-xl mx-auto space-y-6">
          {filteredWords.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-[#DFDAD0] p-6 space-y-2">
              <p className="font-serif text-lg text-[#191E24]">Nu a fost găsit niciun cuvânt conform filtrelor.</p>
              <p className="text-xs text-[#7C858F]">Încearcă să resetezi căutarea sau filtrele de categorie.</p>
            </div>
          ) : (
            <>
              {/* Flashcard container with flip animation */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="bg-white rounded-2xl border-2 border-[#DFDAD0] hover:border-[#C5BDAF] p-8 min-h-[300px] flex flex-col justify-between shadow-sm cursor-pointer select-none transition-all duration-200 relative group"
              >
                {/* Flashcard top bar */}
                <div className="flex items-center justify-between text-xs text-[#7C858F]">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[#292F36]">{currentFlashcard.category}</span>
                    <span>·</span>
                    <span>Nivel {currentFlashcard.level}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono tabular-nums">
                      {flashcardIndex + 1} / {filteredWords.length}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSaveWord(currentFlashcard.id);
                      }}
                      className="p-1 text-[#7C858F] hover:text-[#191E24]"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          savedWordIds.includes(currentFlashcard.id)
                            ? 'text-amber-600 fill-amber-600'
                            : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Card Center: Front or Back */}
                <div className="my-8 text-center space-y-3">
                  {!isFlipped ? (
                    /* Front side: German */
                    <div className="space-y-4">
                      {currentFlashcard.article && (
                        <div className="flex justify-center">
                          {getArticleBadge(currentFlashcard.article)}
                        </div>
                      )}
                      <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#15191E]">
                        {currentFlashcard.article ? `${currentFlashcard.article} ` : ''}
                        {currentFlashcard.german}
                      </h2>
                      {currentFlashcard.phonetic && (
                        <p className="text-xs font-mono text-[#7C858F]">
                          [{currentFlashcard.phonetic}]
                        </p>
                      )}
                      <div className="pt-2 flex justify-center" onClick={(e) => e.stopPropagation()}>
                        <AudioButton
                          text={`${currentFlashcard.article} ${currentFlashcard.german}`}
                          rate={speechRate}
                          size="lg"
                          label="Ascultă pronunția"
                        />
                      </div>
                      <p className="text-xs text-[#8C959F] pt-2">
                        Apasă pe card pentru a vedea traducerea și exemplul
                      </p>
                    </div>
                  ) : (
                    /* Back side: Romanian + Example */
                    <div className="space-y-4 animate-fade-in">
                      <div className="text-xs font-mono text-emerald-800 uppercase tracking-wider font-semibold">
                        Traducere în Română:
                      </div>
                      <h3 className="text-3xl sm:text-4xl font-serif font-bold text-emerald-950">
                        {currentFlashcard.romanian}
                      </h3>
                      {currentFlashcard.plural && (
                        <p className="text-sm text-[#525A62]">
                          Formă de plural: <span className="font-semibold text-[#191E24]">{currentFlashcard.plural}</span>
                        </p>
                      )}
                      {/* Example sentence */}
                      <div className="bg-[#FAF8F5] rounded-xl p-4 border border-[#EAE5DC] text-left text-xs space-y-1.5 max-w-md mx-auto">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-serif italic font-medium text-[#191E24]">
                            „{currentFlashcard.exampleGerman}”
                          </p>
                          <div onClick={(e) => e.stopPropagation()}>
                            <AudioButton
                              text={currentFlashcard.exampleGerman}
                              rate={speechRate}
                              size="sm"
                            />
                          </div>
                        </div>
                        <p className="text-[#626A72]">{currentFlashcard.exampleRomanian}</p>
                      </div>

                      {currentFlashcard.memoryTip && (
                        <p className="text-xs text-amber-900 bg-amber-50 rounded-lg p-2 max-w-md mx-auto border border-amber-200">
                          💡 <strong>Truc:</strong> {currentFlashcard.memoryTip}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Card footer instruction */}
                <div className="flex items-center justify-between text-xs text-[#7C858F] pt-4 border-t border-[#F0ECE4]">
                  <span className="flex items-center gap-1">
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Click pentru întoarcere</span>
                  </span>
                  <span>{isFlipped ? 'Față: Germană' : 'Verso: Română'}</span>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handlePrevFlashcard}
                  className="px-4 py-2 rounded-lg bg-white border border-[#DFDAD0] text-xs font-medium text-[#3E454D] hover:bg-[#F2EFE9] transition-colors cursor-pointer"
                >
                  ← Cuvântul Anterior
                </button>
                <button
                  type="button"
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="px-4 py-2 rounded-lg bg-[#FAF8F5] border border-[#DFDAD0] text-xs font-medium text-[#191E24] hover:bg-[#EFECE6] transition-colors cursor-pointer"
                >
                  {isFlipped ? 'Vezi Germana' : 'Vezi Româna'}
                </button>
                <button
                  type="button"
                  onClick={handleNextFlashcard}
                  className="px-4 py-2 rounded-lg bg-[#191E24] text-white text-xs font-medium hover:bg-[#2C343D] transition-colors cursor-pointer"
                >
                  Următorul Cuvânt →
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* VIEW MODE 2: Structured Cards Grid */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredWords.length === 0 ? (
            <div className="col-span-full text-center py-16 bg-white rounded-xl border border-[#DFDAD0] p-6 space-y-2">
              <p className="font-serif text-lg text-[#191E24]">Niciun cuvânt nu corespunde filtrelor selectate.</p>
              <p className="text-xs text-[#7C858F]">Resetează termenul de căutare sau selectează „Toate” la categorii.</p>
            </div>
          ) : (
            filteredWords.map((item) => {
              const isSaved = savedWordIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-[#DFDAD0] p-5 hover:border-[#BDB5A4] hover:shadow-sm transition-all duration-200 flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    {/* Top Row: Category, Level, Bookmark */}
                    <div className="flex items-center justify-between text-xs text-[#7C858F]">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-[#292F36]">{item.category}</span>
                        <span>·</span>
                        <span className="font-mono">Nivel {item.level}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {wordsSavedToday.includes(item.id) && (
                          <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                            ✓ Salvat azi
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => onToggleSaveWord(item.id)}
                          className="p-1 text-[#7C858F] hover:text-[#191E24] cursor-pointer"
                          title={isSaved ? 'Elimină din salvate' : 'Salvează cuvântul'}
                        >
                          <Bookmark
                            className={`w-4 h-4 ${
                              isSaved ? 'text-amber-600 fill-amber-600' : ''
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Word Presentation */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        {item.article && getArticleBadge(item.article)}
                        <h3 className="text-2xl font-serif font-bold text-[#15191E] tracking-tight">
                          {item.german}
                        </h3>
                      </div>
                      <p className="text-base font-medium text-[#384048]">
                        = {item.romanian}
                      </p>
                      {item.plural && (
                        <p className="text-xs text-[#7C858F]">
                          Plural: <span className="font-medium text-[#191E24]">{item.plural}</span>
                        </p>
                      )}
                      {item.phonetic && (
                        <p className="text-xs font-mono text-[#8C959F]">
                          [{item.phonetic}]
                        </p>
                      )}
                    </div>

                    {/* Pronunciation Audio Button */}
                    <div className="pt-1">
                      <AudioButton
                        text={`${item.article} ${item.german}`}
                        rate={speechRate}
                        size="sm"
                        label="Pronunție cuvânt"
                      />
                    </div>

                    {/* Example Sentence Box */}
                    <div className="bg-[#FAF8F5] rounded-lg p-3 border border-[#EFECE6] text-xs space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-serif italic font-medium text-[#191E24]">
                          „{item.exampleGerman}”
                        </p>
                        <AudioButton
                          text={item.exampleGerman}
                          rate={speechRate}
                          size="sm"
                          className="shrink-0 scale-90"
                        />
                      </div>
                      <p className="text-[#646C76]">{item.exampleRomanian}</p>
                    </div>

                    {/* Memory tip */}
                    {item.memoryTip && (
                      <div className="text-[11px] text-amber-900 bg-amber-50/70 rounded px-2.5 py-1.5 border border-amber-200/60">
                        <span className="font-semibold">💡 Sfat:</span> {item.memoryTip}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
