import React, { useEffect } from 'react';
import { ArrowLeft, Bookmark, Share2, Check, Sparkles, BookOpen, Headphones } from 'lucide-react';
import { BlogArticle, PronunciationExercise } from '../types';
import { AudioButton } from './AudioButton';
import { ArticlePronunciationLab } from './ArticlePronunciationLab';

interface ArticleDetailProps {
  article: BlogArticle;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
  onSelectArticle: (article: BlogArticle) => void;
  allArticles: BlogArticle[];
  isReadToday?: boolean;
  onMarkAsReadToday?: (articleId: string) => void;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({
  article,
  onBack,
  isBookmarked,
  onToggleBookmark,
  onSelectArticle,
  allArticles,
  isReadToday = false,
  onMarkAsReadToday
}) => {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onMarkAsReadToday?.(article.id);
  }, [article.id, onMarkAsReadToday]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 2);

  const pronunciationExercises: PronunciationExercise[] =
    article.pronunciationItems && article.pronunciationItems.length > 0
      ? article.pronunciationItems
      : article.sections
          .flatMap((s, sIdx) =>
            (s.examples || []).map((ex, eIdx) => ({
              id: `p-${article.id}-${sIdx}-${eIdx}`,
              german: ex.german,
              romanian: ex.romanian,
              focusPoint: s.heading.replace(/^\d+\.\s*/, ''),
              tip: ex.breakdown || s.tip
            }))
          )
          .slice(0, 4);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Top action bar */}
      <div className="flex items-center justify-between gap-4 border-b border-[#E7E2D9] pb-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#4B535B] hover:text-[#15191E] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Înapoi la toate articolele</span>
        </button>

        <div className="flex items-center gap-2">
          {isReadToday && (
            <span className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Bifat în progresul de azi</span>
            </span>
          )}

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DCD6C9] bg-white text-xs font-medium text-[#4B535B] hover:bg-[#F2EFE9] transition-colors cursor-pointer"
            title="Copiază linkul articolului"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copiat!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Distribuie</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => onToggleBookmark(article.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-amber-500 text-white border-amber-600'
                : 'border-[#DCD6C9] bg-white text-[#4B535B] hover:bg-[#F2EFE9]'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
            <span>{isBookmarked ? 'Salvat' : 'Salvează'}</span>
          </button>
        </div>
      </div>

      {/* Header section with editorial hierarchy */}
      <header className="space-y-4">
        {/* Zero-Pill Unboxed Metadata */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#717A84]">
          <span className="font-semibold text-[#191E24]">{article.category}</span>
          <span aria-hidden="true">·</span>
          <span>Nivel {article.level}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readTime}</span>
          <span aria-hidden="true">·</span>
          <span>Publicat la {article.publishedDate}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#15191E] tracking-tight leading-[1.18] text-balance">
          {article.title}
        </h1>

        <p className="text-lg sm:text-xl text-[#525A62] font-serif italic leading-relaxed">
          {article.subtitle}
        </p>
      </header>

      {/* Hero Image with Figure caption */}
      <figure className="space-y-2">
        <div className="rounded-xl overflow-hidden border border-[#E7E2D9] aspect-[16/9] w-full bg-[#EFECE6]">
          <img
            src={article.heroImage}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>
        <figcaption className="text-xs text-[#7A828B] text-center italic">
          Ghid pedagogic de limba germană · Exemple verificate și pronunție audio
        </figcaption>
      </figure>

      {/* Key Takeaway Callout */}
      <div className="bg-[#F6F3EC] rounded-xl p-5 border-l-4 border-amber-600 space-y-2">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs uppercase font-mono tracking-wider font-semibold text-amber-900 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Ideea principală a lecției</span>
          </div>
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('pronuntie-lab');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 hover:text-amber-950 underline decoration-amber-400 cursor-pointer"
          >
            <Headphones className="w-3.5 h-3.5" />
            <span>Exersează pronunția 🎙️</span>
          </button>
        </div>
        <p className="text-sm sm:text-base font-medium text-[#1E2328] leading-relaxed">
          {article.keyTakeaway}
        </p>
      </div>

      {/* Article Body Content */}
      <div className="space-y-12 max-w-none">
        {article.sections.map((section, sIdx) => (
          <section key={sIdx} className="space-y-5">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#191E24] tracking-tight pt-2 border-t border-[#EAE5DC]">
              {section.heading}
            </h2>

            {section.subheading && (
              <h3 className="text-lg font-serif italic text-[#485058]">
                {section.subheading}
              </h3>
            )}

            {/* Paragraphs with Drop Cap on the very first section */}
            <div className="space-y-4 text-base sm:text-lg text-[#2E353D] leading-relaxed">
              {section.body.map((para, pIdx) => {
                const isVeryFirst = sIdx === 0 && pIdx === 0;
                return (
                  <p
                    key={pIdx}
                    className={
                      isVeryFirst
                        ? 'first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-[#191E24]'
                        : ''
                    }
                  >
                    {para}
                  </p>
                );
              })}
            </div>

            {/* Table if present */}
            {section.table && (
              <div className="my-6 overflow-x-auto rounded-xl border border-[#DFDAD0] bg-white shadow-xs">
                {section.table.caption && (
                  <div className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#40474F] bg-[#FAF8F5] border-b border-[#DFDAD0]">
                    {section.table.caption}
                  </div>
                )}
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-[#DFDAD0] bg-[#F7F4EE]">
                      {section.table.headers.map((h, i) => (
                        <th key={i} className="px-4 py-3 font-semibold text-[#191E24]">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFECE6]">
                    {section.table.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-[#FAF8F5] transition-colors">
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`px-4 py-3 text-[#2E353D] ${
                              cIdx === 0 ? 'font-mono text-xs font-medium text-[#646D77]' : ''
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Examples block with Audio Button */}
            {section.examples && section.examples.length > 0 && (
              <div className="my-6 space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-[#737C86] font-semibold">
                  Exemple practice în propoziții:
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {section.examples.map((ex, eIdx) => (
                    <div
                      key={eIdx}
                      className="bg-white rounded-xl border border-[#DFDAD0] p-4 shadow-xs hover:border-[#CFC8BA] transition-colors space-y-2"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <p className="text-base sm:text-lg font-serif font-semibold text-[#191E24]">
                            {ex.german}
                          </p>
                          <p className="text-sm text-[#4E565E]">
                            = {ex.romanian}
                          </p>
                        </div>
                        <AudioButton
                          text={ex.german}
                          size="md"
                          label="Ascultă"
                          className="shrink-0"
                        />
                      </div>
                      {ex.breakdown && (
                        <div className="pt-2 border-t border-[#F0ECE4] text-xs font-mono text-amber-900 bg-amber-50/50 rounded px-2.5 py-1">
                          <span className="font-semibold">Explicație:</span> {ex.breakdown}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tip callout */}
            {section.tip && (
              <div className="bg-[#FAF8F3] rounded-lg p-4 border border-[#E8E2D5] text-xs sm:text-sm text-[#3E454D] flex items-start gap-2.5">
                <span className="font-bold text-amber-800 shrink-0">💡 Sfat util:</span>
                <span>{section.tip}</span>
              </div>
            )}

            {/* Warning callout */}
            {section.warning && (
              <div className="bg-rose-50/60 rounded-lg p-4 border border-rose-200 text-xs sm:text-sm text-rose-900 flex items-start gap-2.5">
                <span className="font-bold text-rose-700 shrink-0">⚠️ Atenție la capcană:</span>
                <span>{section.warning}</span>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Pronunciation & Voice Recording Lab (Web Speech API) */}
      {pronunciationExercises.length > 0 && (
        <div id="pronuntie-lab" className="pt-4">
          <ArticlePronunciationLab
            items={pronunciationExercises}
            articleTitle={article.title}
          />
        </div>
      )}

      {/* Related articles recommendation */}
      {relatedArticles.length > 0 && (
        <div className="pt-10 border-t border-[#E7E2D9] space-y-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-700" />
            <h3 className="text-xl font-serif font-bold text-[#191E24]">
              Alte articole recomandate pentru tine
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectArticle(rel)}
                className="bg-white rounded-xl border border-[#DFDAD0] p-4 hover:border-[#BDB5A4] transition-all cursor-pointer shadow-xs space-y-2 group"
              >
                <div className="flex items-center gap-2 text-xs text-[#717A84]">
                  <span>{rel.category}</span>
                  <span>·</span>
                  <span>{rel.level}</span>
                </div>
                <h4 className="font-serif font-bold text-base text-[#191E24] group-hover:text-amber-800 transition-colors line-clamp-2">
                  {rel.title}
                </h4>
                <p className="text-xs text-[#5B636B] line-clamp-2">
                  {rel.excerpt}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};
