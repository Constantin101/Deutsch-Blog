import React from 'react';
import { ArrowRight, BookOpen, Layers, Award } from 'lucide-react';
import { AudioButton } from './AudioButton';
import { VOCABULARY_LIST } from '../data/vocabulary';

interface HeroProps {
  onExploreArticles: () => void;
  onExploreGrammar: () => void;
  onExploreVocabulary: () => void;
  onStartQuiz: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreArticles,
  onExploreGrammar,
  onExploreVocabulary,
  onStartQuiz
}) => {
  // Word of the day (picked deterministically for today)
  const wordOfTheDay = VOCABULARY_LIST[19] || VOCABULARY_LIST[0]; // Feierabend or first

  const getArticleColor = (article: string) => {
    switch (article) {
      case 'der':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'die':
        return 'text-rose-700 bg-rose-50 border-rose-200';
      case 'das':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      default:
        return 'text-stone-700 bg-stone-100 border-stone-200';
    }
  };

  return (
    <section className="relative border-b border-[#E7E2D9] overflow-hidden bg-gradient-to-b from-[#F7F4EE] to-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-mono tracking-widest text-[#7C858F] uppercase">
              Educație Lingvistică · Niveluri A1 · A2 · B1
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#15191E] tracking-tight leading-[1.15] text-balance">
              Învață limba germană cu logică, pronunție și claritate.
            </h1>

            <p className="text-base sm:text-lg text-[#525A62] leading-relaxed max-w-xl">
              Fără memorare mecanică fără noimă. Descoperă regulile sufixelor pentru articolele <span className="text-blue-700 font-semibold">der</span>, <span className="text-rose-700 font-semibold">die</span>, <span className="text-emerald-700 font-semibold">das</span>, ordinea verbului în propoziție și tabele de cazuri explicate pe înțelesul vorbitorilor de limba română.
            </p>

            {/* Quiet metadata proofs */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#6F7780]">
              <span>6 Ghiduri aprofundate</span>
              <span aria-hidden="true">·</span>
              <span>Audio nativ de-DE</span>
              <span aria-hidden="true">·</span>
              <span>Cleștele verbal & TeKaMoLo</span>
              <span aria-hidden="true">·</span>
              <span>100% Gratuit</span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onExploreArticles}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#191E24] text-white text-sm font-medium hover:bg-[#2C343D] active:scale-98 transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Citește Ghidurile de Gramatică</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onExploreVocabulary}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#DCD6C9] bg-white text-[#2C343D] text-sm font-medium hover:bg-[#F2EFE9] transition-colors cursor-pointer whitespace-nowrap"
              >
                <BookOpen className="w-4 h-4 text-[#7C858F]" />
                <span>Vocabular Tematic</span>
              </button>

              <button
                type="button"
                onClick={onStartQuiz}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-amber-300 bg-amber-50 text-amber-900 text-sm font-medium hover:bg-amber-100 transition-colors cursor-pointer whitespace-nowrap"
              >
                <Award className="w-4 h-4 text-amber-700" />
                <span>Antrenează der/die/das</span>
              </button>
            </div>
          </div>

          {/* Right Column: Featured Word of the Day + Image Presentation */}
          <div className="lg:col-span-5 space-y-4">
            {/* Word of the Day Card */}
            <div className="bg-white rounded-xl border border-[#E7E2D9] p-5 shadow-xs transition-shadow hover:shadow-md">
              <div className="flex items-center justify-between text-xs text-[#7C858F] pb-3 border-b border-[#F0ECE4]">
                <span className="font-semibold uppercase tracking-wider text-[#40474F]">
                  Cuvântul Zilei (Wort des Tages)
                </span>
                <span className="font-mono text-stone-500">Nivel {wordOfTheDay.level}</span>
              </div>

              <div className="pt-3 pb-2 flex items-baseline justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    {wordOfTheDay.article && (
                      <span className={`text-sm font-bold uppercase px-1.5 py-0.5 rounded border ${getArticleColor(wordOfTheDay.article)}`}>
                        {wordOfTheDay.article}
                      </span>
                    )}
                    <span className="text-2xl font-serif font-bold text-[#15191E]">
                      {wordOfTheDay.german}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-[#4B535B]">
                    = {wordOfTheDay.romanian}
                  </p>
                  {wordOfTheDay.plural && (
                    <p className="text-xs text-[#7C858F]">
                      Plural: <span className="font-medium text-[#2C343D]">{wordOfTheDay.plural}</span>
                    </p>
                  )}
                </div>

                <AudioButton
                  text={`${wordOfTheDay.article} ${wordOfTheDay.german}`}
                  size="md"
                  label="Ascultă"
                />
              </div>

              {/* Example sentence */}
              <div className="mt-3 bg-[#FAF8F5] rounded-lg p-3 border border-[#EFECE6] text-xs space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-serif italic text-[#1C1F23]">
                    „{wordOfTheDay.exampleGerman}”
                  </span>
                  <AudioButton
                    text={wordOfTheDay.exampleGerman}
                    size="sm"
                    className="shrink-0 scale-90"
                  />
                </div>
                <div className="text-[#646C76]">
                  {wordOfTheDay.exampleRomanian}
                </div>
              </div>

              {wordOfTheDay.memoryTip && (
                <div className="mt-2.5 text-[11px] text-amber-800 bg-amber-50/70 rounded px-2.5 py-1.5 border border-amber-200/60">
                  <span className="font-semibold">Truc de memorare:</span> {wordOfTheDay.memoryTip}
                </div>
              )}
            </div>

            {/* Study Atmosphere Image with Fallback */}
            <div className="relative rounded-xl overflow-hidden border border-[#E7E2D9] h-40 bg-[#EFECE6] shadow-xs group">
              <img
                src="/src/assets/images/hero_german_learning_1790678984997.jpg"
                alt="Masă de studiu cu notițe și dicționar de limba germană"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                onError={(e) => {
                  // Fallback styling if image cannot load
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                <p className="text-white text-xs font-serif italic text-balance">
                  „Die Grenzen meiner Sprache bedeuten die Grenzen meiner Welt.” — Ludwig Wittgenstein
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
